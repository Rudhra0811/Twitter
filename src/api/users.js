// File: src/api/users.js (updated)
export let users = [
    { id: 1, username: 'demo', name: 'Demo User', bio: 'This is a demo account', profileImage: '/profile1.jpeg', following: [] },
    { id: 2, username: 'zoro', name: 'zoro', bio: 'Zoro Desu!!!', profileImage: '/profile1.jpeg', following: [] }
  ];

export const fetchUserProfile = async (username) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const user = users.find(u => u.username === username);
            if (user) {
                resolve({ ...user, followersCount: users.filter(u => u.following.includes(user.id)).length });
            } else {
                reject(new Error('User not found'));
            }
        }, 500);
    });
};

export const updateUserProfile = async (username, updates) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const index = users.findIndex(u => u.username === username);
            if (index !== -1) {
                users[index] = { ...users[index], ...updates };
                resolve({ ...users[index] });
            } else {
                reject(new Error('User not found'));
            }
        }, 500);
    });
};

export const followUser = async (currentUsername, targetUsername) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const currentUser = users.find(u => u.username === currentUsername);
            const targetUser = users.find(u => u.username === targetUsername);
            if (currentUser && targetUser) {
                if (!currentUser.following.includes(targetUser.id)) {
                    currentUser.following.push(targetUser.id);
                }
                resolve({ success: true });
            } else {
                reject(new Error('User not found'));
            }
        }, 500);
    });
};

export const unfollowUser = async (currentUsername, targetUsername) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const currentUser = users.find(u => u.username === currentUsername);
            const targetUser = users.find(u => u.username === targetUsername);
            if (currentUser && targetUser) {
                currentUser.following = currentUser.following.filter(id => id !== targetUser.id);
                resolve({ success: true });
            } else {
                reject(new Error('User not found'));
            }
        }, 500);
    });
};

export const checkFollowStatus = async (currentUsername, targetUsername) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const currentUser = users.find(u => u.username === currentUsername);
            const targetUser = users.find(u => u.username === targetUsername);
            if (currentUser && targetUser) {
                resolve(currentUser.following.includes(targetUser.id));
            } else {
                reject(new Error('User not found'));
            }
        }, 500);
    });
};