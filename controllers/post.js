const fs = require('fs');
const path = require('path');
const { getStorage } = require('firebase-admin/storage');
const { User, Post } = require('../models');
const bucket = getStorage().bucket();

module.exports = {
  async createPost(req, res, next) {
    try {
      const post = await Post.create({
        content: req.body.content,
        UserId: req.user.id,
        placeName: req.body.place_name,
        placeId: req.body.place_id
      });

      const images = [];

      for (let i = 0; i < req.files.length; i++) {
        const file = req.files[i];
        const fileUrl = await uploadFile(post.id, file, i+1);
        images.push(fileUrl);
        await cleanTempFile(file);
      }

      await Post.update({
        imageUrls: images.join(';')
      }, {
        where: { id: post.id }
      });

      await makePublic(post.id);

      res.status(201).json({
        id: post.id,
        images,
        createdAt: post.createdAt
      });
    } catch(err) {
      next(err);
    }
  },

  async getPosts(req, res, next) {
    try {
      const options = {
        where: {},
        include: [
          {
            model: User,
            attributes: ['id', 'name']
          }
        ],
        order: [['createdAt', 'DESC']]
      };

      if (req.query.userId) {
        options.where.UserId = req.query.userId;
      }

      if (req.query.placeId) {
        options.where.placeId = req.query.placeId;
      }

      if (req.query.excludeUser) {
        delete options.include;
      }

      const posts = await Post.findAll(options);

      res.json(posts);
    } catch(err) {
      next(err);
    }
  },

  async deletePost(req, res, next) {
    try {
      const post = await Post.findByPk(req.params.id);

      if (!post) {
        throw { name: 'NotFound' };
      }

      if (post.UserId != req.user.id) {
        throw { name: 'Forbidden' };
      }

      await deleteUploadedFiles(req.params.id);
      
      const deletedCount = await Post.destroy({
        where: { id: req.params.id }
      });

      res.json({
        message: 'post has been deleted'
      });
    } catch(err) {
      next(err);
    }
  }
}

function cleanTempFile(file) {
  return new Promise((resolve, reject) => {
    fs.unlink(path.join(__dirname, `../uploads/${file.filename}`), err => {
      if (err) reject(err)
      else resolve();
    });
  });
}

function makePublic(postId) {
  const options = {
    prefix: `${process.env.NODE_ENV}/posts/${postId}/`
  };
  
  return new Promise((resolve, reject) => {
    bucket.getFiles(options, (err, files) => {
      if (err) return reject(err);

      Promise.all(files.map(file => file.makePublic()))
        .then(() => resolve())
        .catch(reject);
    });
  });
}

async function uploadFile(postId, file, index) {
  const options = {
    destination: `${process.env.NODE_ENV}/posts/${postId}/img-${index}${path.extname(file.filename)}`,
    validation: 'crc32c',
    resumable: true,
    public: true
  };

  return new Promise((resolve, reject) => {
    bucket.upload(path.join(__dirname, `../uploads/${file.filename}`), options, (err, file) => {
      if (err) return reject(err)
      
      file.makePublic((err, resp) => {
        if (err) reject(err)
        else resolve(file.publicUrl());
      })
    });
  });
}

function deleteUploadedFiles(postId) {
  const options = {
    prefix: `${process.env.NODE_ENV}/posts/${postId}/`
  }

  return new Promise((resolve, reject) => {
    bucket.getFiles(options, (err, files) => {
      if (err) return reject(err);

      Promise.all(files.map(file => file.delete()))
        .then(() => resolve())
        .catch(reject);
    });
  });
}
