import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { fetchUserProfile, updateUserProfile, followUser, unfollowUser, checkFollowStatus } from '../api/users';
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
    const [isFollowing, setIsFollowing] = useState(false);

    useEffect(() => {
        loadProfileAndPosts();
    }, [username]);

    useEffect(() => {
        if (currentUser && profile && currentUser.username !== profile.username) {
            checkFollowStatus(currentUser.username, profile.username)
                .then(status => setIsFollowing(status))
                .catch(error => console.error('Failed to check follow status:', error));
        }
    }, [currentUser, profile]);

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

    const handleFollow = async () => {
        if (!currentUser) return;
        try {
            await followUser(currentUser.username, profile.username);
            setIsFollowing(true);
            setProfile(prev => ({ ...prev, followersCount: prev.followersCount + 1 }));
        } catch (error) {
            console.error('Failed to follow user:', error);
        }
    };

    const handleUnfollow = async () => {
        if (!currentUser) return;
        try {
            await unfollowUser(currentUser.username, profile.username);
            setIsFollowing(false);
            setProfile(prev => ({ ...prev, followersCount: prev.followersCount - 1 }));
        } catch (error) {
            console.error('Failed to unfollow user:', error);
        }
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
                        <p>Followers: {profile.followersCount}</p>
                        {currentUser && currentUser.username === username ? (
                            <button onClick={handleEdit}>Edit Profile</button>
                        ) : currentUser ? (
                            isFollowing ? (
                                <button onClick={handleUnfollow}>Unfollow</button>
                            ) : (
                                <button onClick={handleFollow}>Follow</button>
                            )
                        ) : null}
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