import React from 'react';
import { Link } from 'react-router-dom';
import './UserList.css';

function UserList({ users }) {
    return (
        <div className="user-list">
            {users.map(user => (
                <div key={user.id} className="user-item">
                    <img src={user.profileImage} alt={user.name} className="user-avatar" />
                    <div className="user-info">
                        <h4>{user.name}</h4>
                        <p>@{user.username}</p>
                    </div>
                    <Link to={`/profile/${user.username}`} className="view-profile">View Profile</Link>
                </div>
            ))}
        </div>
    );
}

export default UserList;