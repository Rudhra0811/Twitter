import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import SearchBar from './SearchBar';
import './Header.css';

function Header() {
    const { user, logout } = useAuth();

    return (
        <header className="header">
            <div className="header-logo">
                <Link to="/">Twitter</Link>
            </div>
            <SearchBar />
            <nav className="header-nav">
                <ul>
                    <li><Link to="/">Home</Link></li>
                    {user ? (
                        <>
                            <li><Link to={`/profile/${user.username}`}>Profile</Link></li>
                            <li><Link to="/notifications">Notifications</Link></li>
                            <li><button onClick={logout}>Logout</button></li>
                        </>
                    ) : (
                        <>
                            <li><Link to="/login">Login</Link></li>
                            <li><Link to="/register">Register</Link></li>
                        </>
                    )}
                </ul>
            </nav>
        </header>
    );
}

export default Header;