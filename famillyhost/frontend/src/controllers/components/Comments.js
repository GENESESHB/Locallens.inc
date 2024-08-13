import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Comments.css';

function Comments({ serviceId }) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState({
    name: '',
    comment: '',
    rating: 0,
    image: null
  });
  const [editingComment, setEditingComment] = useState(null);
  const [editingCommentData, setEditingCommentData] = useState({
    name: '',
    comment: '',
    rating: 0,
    image: null
  });

  useEffect(() => {
    fetchComments();
  }, [serviceId]);

  const fetchComments = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/comments/${serviceId}`);
      setComments(response.data);
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewComment({ ...newComment, [name]: value });
  };

  const handleFileChange = (e) => {
    setNewComment({ ...newComment, image: e.target.files[0] });
  };

  const handleRatingChange = (rating) => {
    setNewComment({ ...newComment, rating });
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditingCommentData({ ...editingCommentData, [name]: value });
  };

  const handleEditFileChange = (e) => {
    setEditingCommentData({ ...editingCommentData, image: e.target.files[0] });
  };

  const handleEditRatingChange = (rating) => {
    setEditingCommentData({ ...editingCommentData, rating });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', newComment.name);
    formData.append('comment', newComment.comment);
    formData.append('rating', newComment.rating);
    if (newComment.image) {
      formData.append('image', newComment.image);
    }

    try {
      await axios.post(`http://localhost:5000/api/comments/${serviceId}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setNewComment({ name: '', comment: '', rating: 0, image: null });
      fetchComments();
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', editingCommentData.name);
    formData.append('comment', editingCommentData.comment);
    formData.append('rating', editingCommentData.rating);
    if (editingCommentData.image) {
      formData.append('image', editingCommentData.image);
    }

    try {
      await axios.put(`http://localhost:5000/api/comments/${editingComment._id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setEditingComment(null);
      fetchComments();
    } catch (error) {
      console.error('Error updating comment:', error);
    }
  };

  const handleDelete = async (commentId) => {
    try {
      await axios.delete(`http://localhost:5000/api/comments/${commentId}`);
      fetchComments();
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };

  const startEditing = (comment) => {
    setEditingComment(comment);
    setEditingCommentData({
      name: comment.name,
      comment: comment.comment,
      rating: comment.rating,
      image: null
    });
  };

  const renderStarRating = (rating, onRatingChange) => (
    <div className="star-rating">
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          className={`star ${rating >= star ? 'filled' : ''}`}
          onClick={() => onRatingChange(star)}
        >
          &#9733;
        </span>
      ))}
    </div>
  );

  return (
    <div className="comments-container">
      <h2>Comments</h2>
      <form onSubmit={handleSubmit} className="comment-form">
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={newComment.name}
            onChange={handleInputChange}
            required
          />
        </label>
        <label className='comnts'>
          Comment:
          <textarea
            name="comment"
            value={newComment.comment}
            onChange={handleInputChange}
            required
          />
        </label>
        <label>
          Rating:
          {renderStarRating(newComment.rating, handleRatingChange)}
        </label>
        <label>
          Image:
          <input
            type="file"
            name="image"
            onChange={handleFileChange}
          />
        </label>
        <button type="submit" className="submit-button">Add Comment</button>
      </form>

      {comments.length === 0 ? (
        <p>No comments yet.</p>
      ) : (
        <div className="comments-list">
          {comments.map((comment) => (
            <div key={comment._id} className="comment-card">
              <div className="comment-header">
                {comment.image && <img src={`http://localhost:5000/uploadscoment/${comment.image}`} alt="Comment" className="comment-image" />}
                <strong>{comment.name}</strong>
              </div>
              <p>{comment.comment}</p>
              <div className="star-rating">
                {[...Array(comment.rating)].map((_, i) => (
                  <span key={i} className="star filled">&#9733;</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {editingComment && (
        <div className="edit-form-container">
          <h3>Edit Comment</h3>
          <form onSubmit={handleEditSubmit} className="comment-form">
            <label>
              Name:
              <input
                type="text"
                name="name"
                value={editingCommentData.name}
                onChange={handleEditInputChange}
                required
              />
            </label>
            <label>
              Comment:
              <textarea
                name="comment"
                value={editingCommentData.comment}
                onChange={handleEditInputChange}
                required
              />
            </label>
            <label>
              Rating:
              {renderStarRating(editingCommentData.rating, handleEditRatingChange)}
            </label>
            <label>
              Image:
              <input
                type="file"
                name="image"
                onChange={handleEditFileChange}
              />
            </label>
            <button type="submit" className="submit-button">Update Comment</button>
            <button type="button" onClick={() => setEditingComment(null)} className="cancel-button">Cancel</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default Comments;

