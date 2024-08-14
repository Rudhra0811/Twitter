import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { likePost, unlikePost, addComment } from '../api/posts';
import { createNotification } from '../api/notifications';
import './Post.css';

function Post({ post, onUpdate }) {
    const { user } = useAuth();
    const [comment, setComment] = useState('');
    const [isLiked, setIsLiked] = useState(user ? post.likes.includes(user.username) : false);

    const handleLike = async () => {
        if (!user) return;
        try {
            const updatedPost = isLiked
                ? await unlikePost(post.id, user.username)
                : await likePost(post.id, user.username);
            setIsLiked(!isLiked);
            onUpdate(updatedPost);
            if (!isLiked) {
                await createNotification('like', post.author, user.username, post.id);
            }
        } catch (error) {
            console.error('Failed to like/unlike post:', error);
        }
    };

    const handleComment = async (e) => {
        e.preventDefault();
        if (!user || !comment.trim()) return;
        try {
            const updatedPost = await addComment(post.id, user.username, comment);
            setComment('');
            onUpdate(updatedPost);
            await createNotification('comment', post.author, user.username, post.id);
        } catch (error) {
            console.error('Failed to add comment:', error);
        }
    };

    return (
        <div className="post">
            <div className="post-header">
                <img src={`/profile1.jpeg`} alt={post.author} className="post-avatar" />
                <div className="post-user-info">
                    <span className="post-author">{post.author}</span>
                    <span className="post-username">@{post.author}</span>
                </div>
            </div>
            <p className="post-content">{post.content}</p>
            <p className="post-timestamp">{new Date(post.timestamp).toLocaleString()}</p>
            <div className="post-actions">
                <div className={`post-action ${isLiked ? 'liked' : ''}`} onClick={handleLike}>
                    <span className="post-action-icon">❤️</span>
                    <span>{post.likes.length}</span>
                </div>
                <div className="post-action">
                    <span className="post-action-icon">💬</span>
                    <span>{post.comments.length}</span>
                </div>
            </div>
            {user && (
                <form onSubmit={handleComment} className="comment-form">
                    <input
                        type="text"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="Add a comment..."
                    />
                    <button type="submit">Comment</button>
                </form>
            )}
            <div className="comments">
                {post.comments.map((comment) => (
                    <div key={comment.id} className="comment">
                        <p className="comment-author">{comment.author}</p>
                        <p className="comment-content">{comment.content}</p>
                        <p className="comment-timestamp">{new Date(comment.timestamp).toLocaleString()}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Post;