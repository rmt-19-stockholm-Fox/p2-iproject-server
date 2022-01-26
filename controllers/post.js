const fs = require('fs');
const path = require('path');
const { getStorage } = require('firebase-admin/storage');
const { Post } = require('../models');
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

      res.json({
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
      const posts = await Post.findAll({
        order: [['createdAt', 'DESC']]
      });

      res.json(posts);
    } catch(err) {
      next(err);
    }
  },

  async deletePost(req, res, next) {
    try {
      await deleteUploadedFiles(req.params.id);
      
      const deletedCount = await Post.destroy({
        where: { id: req.params.id }
      });

      if (deletedCount === 0) {
        throw { name: 'NotFound' };
      }

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
    prefix: `posts/${postId}/`
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
    destination: `posts/${postId}/img-${index}${path.extname(file.filename)}`,
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
    prefix: `posts/${postId}/`
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
