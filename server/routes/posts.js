const express = require('express');
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('cloudinary').v2;
const Post = require('../models/Post');
const dotenv = require('dotenv');
const auth = require('../middleware/auth');
const router = express.Router();
const util = require('util');

// Load environment variables from .env file
dotenv.config();

// Cloudinary configuration using CLOUDINARY_URL
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Multer storage configuration for Cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'blog-posts',
    format: async (req, file) => 'jpg', // supports promises as well
    public_id: (req, file) => Date.now() + '-' + file.originalname,
  },
});

const upload = multer({ storage });

const uploadToCloudinary = util.promisify(cloudinary.uploader.upload);

// Create Post
router.post('/', [auth, upload.single('image')], async (req, res) => {
  const { title, content } = req.body;
  try {
    let imageUrl = null;
    if (req.file) {
      const result = await uploadToCloudinary(req.file.path);
      imageUrl = result.secure_url;
      console.log(imageUrl);
    }

    const newPost = new Post({
      title,
      content,
      image: imageUrl,
      author: req.user.id,
    });
    const post = await newPost.save();
    res.json(post);
  } catch (err) {
    console.error('Error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get All Posts
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find().populate('author', 'username');
    res.json(posts);
  } catch (err) {
    console.error('Error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;


