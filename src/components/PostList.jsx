import React from 'react';
import './PostList.css';

function PostList({ posts }) {
    return (
        <div className="post-list">
            {posts.map((post) => (
                <div key={post.id} className="post">
                    <p className="post-author">{post.author}</p>
                    <p className="post-content">{post.content}</p>
                    <p className="post-timestamp">{new Date(post.timestamp).toLocaleString()}</p>
                </div>
            ))}
        </div>
    );
}

export default PostList;