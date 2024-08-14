// File: src/api/search.js (updated)
import { users } from './users';
import { posts } from './posts';

export const searchUsers = async (query) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const results = users.filter(user =>
                user.username.toLowerCase().includes(query.toLowerCase()) ||
                user.name.toLowerCase().includes(query.toLowerCase())
            );
            resolve(results);
        }, 500);
    });
};

export const searchPosts = async (query) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const results = posts.filter(post =>
                post.content.toLowerCase().includes(query.toLowerCase())
            );
            resolve(results);
        }, 500);
    });
};