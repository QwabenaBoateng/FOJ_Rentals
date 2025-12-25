import { useState, useEffect } from 'react';
import AdminLogin from './AdminLogin';
import { AdminPanel } from './AdminPanel';

const SESSION_KEY = 'admin_session';
const SESSION_EXPIRY_KEY = 'admin_session_expiry';
const SESSION_DURATION = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

export default function AdminPortal() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    // Check for existing session on mount
    useEffect(() => {
        const checkSession = () => {
            try {
                const sessionData = localStorage.getItem(SESSION_KEY);
                const expiryTime = localStorage.getItem(SESSION_EXPIRY_KEY);

                if (sessionData && expiryTime) {
                    const now = new Date().getTime();
                    const expiry = parseInt(expiryTime, 10);

                    if (now < expiry) {
                        // Session is still valid
                        const parsedData = JSON.parse(sessionData);
                        setUsername(parsedData.username);
                        setIsLoggedIn(true);
                    } else {
                        // Session expired, clear it
                        localStorage.removeItem(SESSION_KEY);
                        localStorage.removeItem(SESSION_EXPIRY_KEY);
                    }
                }
            } catch (error) {
                console.error('Error checking session:', error);
                // Clear potentially corrupted data
                localStorage.removeItem(SESSION_KEY);
                localStorage.removeItem(SESSION_EXPIRY_KEY);
            } finally {
                setIsLoading(false);
            }
        };

        checkSession();
    }, []);

    const handleLogin = (user: string) => {
        const sessionData = {
            username: user,
            loginTime: new Date().getTime()
        };
        const expiryTime = new Date().getTime() + SESSION_DURATION;

        // Store session in localStorage
        localStorage.setItem(SESSION_KEY, JSON.stringify(sessionData));
        localStorage.setItem(SESSION_EXPIRY_KEY, expiryTime.toString());

        setUsername(user);
        setIsLoggedIn(true);
    };

    const handleLogout = () => {
        // Clear session from localStorage
        localStorage.removeItem(SESSION_KEY);
        localStorage.removeItem(SESSION_EXPIRY_KEY);

        setUsername('');
        setIsLoggedIn(false);
    };

    // Show loading state while checking session
    if (isLoading) {
        return (
            <div className="admin-loading-container">
                <div className="loading-content">
                    <div className="loading-spinner"></div>
                    <p className="loading-text">Loading...</p>
                </div>
            </div>
        );
    }

    return (
        <>
            {isLoggedIn ? (
                <AdminPanel username={username} onLogout={handleLogout} />
            ) : (
                <AdminLogin onLogin={handleLogin} />
            )}
        </>
    );
}
