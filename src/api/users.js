let users = [
    { id: 1, username: 'demo', name: 'Demo User', bio: 'This is a demo account', profileImage: 'https://via.placeholder.com/150' },
    { id: 2, username: 'musk', name: 'Elon musk', bio: 'Hello, I\'m Musk!', profileImage: 'https://via.placeholder.com/150' } 
  ];

export const fetchUserProfile = async (username) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const user = users.find(u => u.username === username);
            if (user) {
                resolve({ ...user });
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