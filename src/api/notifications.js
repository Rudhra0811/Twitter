let notifications = [];
let notificationId = 1;

export const fetchNotifications = async (username) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const userNotifications = notifications.filter(n => n.recipient === username);
            resolve([...userNotifications]);
        }, 500);
    });
};

export const createNotification = async (type, recipient, sender, postId = null) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const newNotification = {
                id: notificationId++,
                type,
                recipient,
                sender,
                postId,
                timestamp: new Date().toISOString(),
                read: false
            };
            notifications.unshift(newNotification);
            resolve(newNotification);
        }, 500);
    });
};

export const markNotificationAsRead = async (notificationId) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const index = notifications.findIndex(n => n.id === notificationId);
            if (index !== -1) {
                notifications[index].read = true;
                resolve(notifications[index]);
            } else {
                reject(new Error('Notification not found'));
            }
        }, 500);
    });
};