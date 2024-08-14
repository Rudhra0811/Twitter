import React from 'react';
import Post from './Post';
import './PostList.css';

function PostList({ posts, onUpdatePost }) {
    return (
        <div className="post-list">
            {posts.map((post) => (
                <Post key={post.id} post={post} onUpdate={onUpdatePost} />
            ))}
        </div>
    );
}

export default PostList;