// File: src/api/posts.js (updated)
let posts = [
    { id: 1, content: "Hello, Twitter clone!", author: "demo", timestamp: new Date().toISOString(), likes: [], comments: [] },
    { id: 2, content: "This is a test post.", author: "demo", timestamp: new Date().toISOString(), likes: [], comments: [] }
];

export const fetchPosts = async () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve([...posts]);
        }, 500);
    });
};

export const fetchUserPosts = async (username) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const userPosts = posts.filter(post => post.author === username);
            resolve([...userPosts]);
        }, 500);
    });
};

export const createPost = async (content, author) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const newPost = {
                id: posts.length + 1,
                content,
                author,
                timestamp: new Date().toISOString(),
                likes: [],
                comments: []
            };
            posts = [newPost, ...posts];
            resolve(newPost);
        }, 500);
    });
};

export const likePost = async (postId, username) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const postIndex = posts.findIndex(post => post.id === postId);
            if (postIndex !== -1) {
                if (!posts[postIndex].likes.includes(username)) {
                    posts[postIndex].likes.push(username);
                }
                resolve({ ...posts[postIndex] });
            } else {
                reject(new Error('Post not found'));
            }
        }, 500);
    });
};

export const unlikePost = async (postId, username) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const postIndex = posts.findIndex(post => post.id === postId);
            if (postIndex !== -1) {
                posts[postIndex].likes = posts[postIndex].likes.filter(like => like !== username);
                resolve({ ...posts[postIndex] });
            } else {
                reject(new Error('Post not found'));
            }
        }, 500);
    });
};

export const addComment = async (postId, username, content) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const postIndex = posts.findIndex(post => post.id === postId);
            if (postIndex !== -1) {
                const newComment = {
                    id: posts[postIndex].comments.length + 1,
                    author: username,
                    content,
                    timestamp: new Date().toISOString()
                };
                posts[postIndex].comments.push(newComment);
                resolve({ ...posts[postIndex] });
            } else {
                reject(new Error('Post not found'));
            }
        }, 500);
    });
};