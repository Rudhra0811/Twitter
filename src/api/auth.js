// mock API
export const loginUser = async (username, password) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (username === 'demo' && password === 'password') {
                resolve({ id: 1, username: 'demo', name: 'Demo User' });
            }
            else if (username === 'zoro' && password === 'password') {
                resolve({ id: 2, username: 'zoro', name: 'zoro' });
            } else {
                reject(new Error('Invalid credentials'));
            }
        }, 1000);
    });
};

export const registerUser = async (username, email, password) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (username && email && password) {
                resolve({ id: 2, username, email, name: 'New User' });
            } else {
                reject(new Error('Invalid input'));
            }
        }, 1000);
    });
};