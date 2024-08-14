import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { fetchPosts, createPost } from '../api/posts';
import PostForm from './PostForm';
import PostList from './PostList';
import './Home.css';

function Home() {
    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { user } = useAuth();

    useEffect(() => {
        loadPosts();
    }, []);

    const loadPosts = async () => {
        setIsLoading(true);
        try {
            const fetchedPosts = await fetchPosts();
            // If user is logged in, filter posts to show only from followed users and the user themselves
            if (user) {
                const filteredPosts = fetchedPosts.filter(post =>
                    post.author === user.username || user.following.includes(post.authorId)
                );
                setPosts(filteredPosts);
            } else {
                setPosts(fetchedPosts);
            }
        } catch (error) {
            console.error('Failed to fetch posts:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleCreatePost = async (content) => {
        if (!user) return;
        try {
            const newPost = await createPost(content, user.username);
            setPosts([newPost, ...posts]);
        } catch (error) {
            console.error('Failed to create post:', error);
        }
    };

    const handleUpdatePost = (updatedPost) => {
        setPosts(posts.map(post => post.id === updatedPost.id ? updatedPost : post));
    };

    return (
        <div className="home">
            <h1>Home</h1>
            {user && <PostForm onSubmit={handleCreatePost} />}
            {isLoading ? (
                <p>Loading posts...</p>
            ) : (
                <PostList posts={posts} onUpdatePost={handleUpdatePost} />
            )}
        </div>
    );
}

export default Home;