import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { fetchUserProfile, updateUserProfile } from '../api/users';
import { fetchUserPosts } from '../api/posts';
import PostList from './PostList';
import './Profile.css';

function Profile() {
    const { username } = useParams();
    const { user: currentUser } = useAuth();
    const [profile, setProfile] = useState(null);
    const [posts, setPosts] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [editedProfile, setEditedProfile] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        loadProfileAndPosts();
    }, [username]);

    const loadProfileAndPosts = async () => {
        setIsLoading(true);
        try {
            const [userProfile, userPosts] = await Promise.all([
                fetchUserProfile(username),
                fetchUserPosts(username)
            ]);
            setProfile(userProfile);
            setPosts(userPosts);
            setEditedProfile(userProfile);
        } catch (error) {
            console.error('Failed to load profile or posts:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleCancelEdit = () => {
        setIsEditing(false);
        setEditedProfile(profile);
    };

    const handleSaveEdit = async () => {
        try {
            const updatedProfile = await updateUserProfile(username, editedProfile);
            setProfile(updatedProfile);
            setIsEditing(false);
        } catch (error) {
            console.error('Failed to update profile:', error);
        }
    };

    const handleChange = (e) => {
        setEditedProfile({ ...editedProfile, [e.target.name]: e.target.value });
    };

    if (isLoading) {
        return <div>Loading profile...</div>;
    }

    if (!profile) {
        return <div>Profile not found</div>;
    }

    return (
        <div className="profile">
            <div className="profile-header">
                <img src={profile.profileImage} alt={profile.name} className="profile-image" />
                {isEditing ? (
                    <div className="profile-edit">
                        <input
                            type="text"
                            name="name"
                            value={editedProfile.name}
                            onChange={handleChange}
                        />
                        <textarea
                            name="bio"
                            value={editedProfile.bio}
                            onChange={handleChange}
                        />
                        <button onClick={handleSaveEdit}>Save</button>
                        <button onClick={handleCancelEdit}>Cancel</button>
                    </div>
                ) : (
                    <div className="profile-info">
                        <h1>{profile.name}</h1>
                        <p>@{profile.username}</p>
                        <p>{profile.bio}</p>
                        {currentUser && currentUser.username === username && (
                            <button onClick={handleEdit}>Edit Profile</button>
                        )}
                    </div>
                )}
            </div>
            <div className="profile-posts">
                <h2>Posts</h2>
                <PostList posts={posts} />
            </div>
        </div>
    );
}

export default Profile;