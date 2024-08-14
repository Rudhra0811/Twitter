import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { searchUsers, searchPosts } from '../api/search';
import UserList from './UserList';
import PostList from './PostList';
import './SearchResults.css';

function SearchResults() {
    const [users, setUsers] = useState([]);
    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const location = useLocation();

    useEffect(() => {
        const searchQuery = new URLSearchParams(location.search).get('q');
        if (searchQuery) {
            performSearch(searchQuery);
        }
    }, [location.search]);

    const performSearch = async (query) => {
        setIsLoading(true);
        try {
            const [userResults, postResults] = await Promise.all([
                searchUsers(query),
                searchPosts(query)
            ]);
            setUsers(userResults);
            setPosts(postResults);
        } catch (error) {
            console.error('Failed to perform search:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="search-results">
            <h2>Search Results</h2>
            {isLoading ? (
                <p>Loading results...</p>
            ) : (
                <>
                    <h3>Users</h3>
                    {users.length > 0 ? (
                        <UserList users={users} />
                    ) : (
                        <p>No users found</p>
                    )}
                    <h3>Posts</h3>
                    {posts.length > 0 ? (
                        <PostList posts={posts} />
                    ) : (
                        <p>No posts found</p>
                    )}
                </>
            )}
        </div>
    );
}

export default SearchResults;