import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import SearchBar from './SearchBar';
import './Header.css';

function Header() {
    const { user, logout } = useAuth();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <header className="header">
            <div className="container header-content">
                <div className="header-logo">
                    <Link to="/">Twitter</Link>
                </div>
                <SearchBar />
                <nav className={`header-nav ${isMenuOpen ? 'open' : ''}`}>
                    <ul>
                        <li><Link to="/" onClick={toggleMenu}>Home</Link></li>
                        {user ? (
                            <>
                                <li><Link to={`/profile/${user.username}`} onClick={toggleMenu}>Profile</Link></li>
                                <li><Link to="/notifications" onClick={toggleMenu}>Notifications</Link></li>
                                <li><button onClick={() => { logout(); toggleMenu(); }}>Logout</button></li>
                            </>
                        ) : (
                            <>
                                <li><Link to="/login" onClick={toggleMenu}>Login</Link></li>
                                <li><Link to="/register" onClick={toggleMenu}>Register</Link></li>
                            </>
                        )}
                    </ul>
                </nav>
                <button className="menu-toggle" onClick={toggleMenu}>
                    <span className="menu-toggle-icon"></span>
                </button>
            </div>
        </header>
    );
}

export default Header;