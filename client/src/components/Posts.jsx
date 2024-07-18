import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts, createPost } from '../features/postSlice';
import './Posts.css'; // Import the CSS file

const Posts = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts.posts);
  const [form, setForm] = useState({ title: '', content: '', image: null });

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setForm({ ...form, image: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', form.title);
    formData.append('content', form.content);
    if (form.image) {
      formData.append('image', form.image);
    }
    dispatch(createPost(formData));
  };

  return (
    <div className="posts-container">
      <form className="posts-form" onSubmit={handleSubmit}>
        <input 
          type="text" 
          name="title" 
          value={form.title} 
          onChange={handleChange} 
          placeholder="Title" 
          className="posts-input"
        />
        <textarea 
          name="content" 
          value={form.content} 
          onChange={handleChange} 
          placeholder="Content" 
          className="posts-textarea"
        ></textarea>
        <input 
          type="file" 
          onChange={handleFileChange} 
          className="posts-file-input"
        />
        <button type="submit" className="posts-button">Create Post</button>
      </form>
      <div className="posts-list">
        {posts.map((post) => (
          <div key={post._id} className="post-item">
            <h2 className="post-title">{post.title}</h2>
            <p className="post-content">{post.content}</p>
            {post.image && <img src={post.image} alt={post.title} className="post-image" />}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Posts;


