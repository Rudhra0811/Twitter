import React, { useState } from 'react';
import './PostForm.css';

function PostForm({ onSubmit }) {
    const [content, setContent] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (content.trim()) {
            onSubmit(content);
            setContent('');
        }
    };

    return (
        <form className="post-form" onSubmit={handleSubmit}>
            <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="What's happening?"
                maxLength={280}
            />
            <button type="submit">Tweet</button>
        </form>
    );
}

export default PostForm;