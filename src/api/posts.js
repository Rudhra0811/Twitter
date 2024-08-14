let posts = [
    { id: 1, content: "Hello, Twitter clone!", author: "demo", timestamp: new Date().toISOString() },
    { id: 2, content: "This is a test post.", author: "musk", timestamp: new Date().toISOString() }
];

export const fetchPosts = async () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve([...posts]);
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
                timestamp: new Date().toISOString()
            };
            posts = [newPost, ...posts];
            resolve(newPost);
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