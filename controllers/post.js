const fs = require('fs');
const path = require('path');

const { getStorage } = require('firebase-admin/storage');
const { Post } = require('../models');

const bucket = getStorage().bucket();

function deleteFile(file) {
  return new Promise((resolve, reject) => {
    fs.unlink(path.join(__dirname, `../uploads/${file.filename}`), err => {
      if (err) reject(err)
      else resolve();
    });
  });
}

function uploadFile(postId, file, index) {
  const options = {
    destination: `posts/${postId}/img-${index}${path.extname(file.filename)}`,
    validation: 'crc32c',
    public: true
  };

  return new Promise((resolve, reject) => {
    bucket.upload(file.path, options, (err, file) => {
      if (err) reject(err)
      else resolve(file.publicUrl());
    });
  });
}

module.exports = {
  async createPost(req, res, next) {
    try {
      const post = await Post.create({
        content: req.body.content,
        UserId: req.user.id
      });

      const images = [];

      for (let i = 0; i < req.files.length; i++) {
        const file = req.files[i];
        const fileUrl = await uploadFile(post.id, file, i+1);
        images.push(fileUrl);
        await deleteFile(file);
      }

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
