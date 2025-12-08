import React, { createContext, useEffect, useState } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {

    // khoi tao state user
    const [ user, setUser ] = useState(() => {
        const stored = localStorage.getItem('user');
        return stored ? JSON.parse(stored) : null;
    });

    // theo doi thay doi user de luu vao localStorage
    useEffect(() => {
        const syncUserFromStorage = () => {
            const stored = localStorage.getItem('user');
            setUser(stored ? JSON.parse(stored) : null);
        };

        window.addEventListener('storage', syncUserFromStorage);
        return () => {
            window.removeEventListener('storage', syncUserFromStorage);
        };
    }, []);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};