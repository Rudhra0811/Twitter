import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { fetchNotifications, markNotificationAsRead } from '../api/notifications';
import './Notifications.css';

function Notifications() {
    const [notifications, setNotifications] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { user } = useAuth();

    useEffect(() => {
        if (user) {
            loadNotifications();
        }
    }, [user]);

    const loadNotifications = async () => {
        setIsLoading(true);
        try {
            const fetchedNotifications = await fetchNotifications(user.username);
            setNotifications(fetchedNotifications);
        } catch (error) {
            console.error('Failed to fetch notifications:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleMarkAsRead = async (notificationId) => {
        try {
            await markNotificationAsRead(notificationId);
            setNotifications(notifications.map(n =>
                n.id === notificationId ? { ...n, read: true } : n
            ));
        } catch (error) {
            console.error('Failed to mark notification as read:', error);
        }
    };

    const renderNotificationContent = (notification) => {
        switch (notification.type) {
            case 'like':
                return `${notification.sender} liked your post`;
            case 'comment':
                return `${notification.sender} commented on your post`;
            case 'follow':
                return `${notification.sender} started following you`;
            default:
                return 'You have a new notification';
        }
    };

    const getNotificationIcon = (type) => {
        switch (type) {
            case 'like':
                return '❤️';
            case 'comment':
                return '💬';
            case 'follow':
                return '👤';
            default:
                return '🔔';
        }
    };

    return (
        <div className="notifications-container">
            <h2>Notifications</h2>
            {isLoading ? (
                <p>Loading notifications...</p>
            ) : notifications.length === 0 ? (
                <p>No new notifications</p>
            ) : (
                <ul className="notification-list">
                    {notifications.map(notification => (
                        <li
                            key={notification.id}
                            className={`notification ${notification.read ? 'read' : 'unread'}`}
                            onClick={() => !notification.read && handleMarkAsRead(notification.id)}
                        >
                            <div className="notification-icon">
                                {getNotificationIcon(notification.type)}
                            </div>
                            <div className="notification-content">
                                <p>{renderNotificationContent(notification)}</p>
                                <span className="notification-time">
                                    {new Date(notification.timestamp).toLocaleString()}
                                </span>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default Notifications;