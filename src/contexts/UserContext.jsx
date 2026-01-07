import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {

    // khoi tao state user
    const [ user, setUser ] = useState(() => {
        const stored = localStorage.getItem('user');
        return stored ? JSON.parse(stored) : null;
    });

    const refreshUser = async () => {
        let token = localStorage.getItem('token');

        if(token && token.startsWith('"') && token.endsWith('"')) {
            token = token.slice(1, -1);
        }

        if (!token) return;

        try {
            const res = await axios.get('http://localhost:5000/api/users/profile', {
                headers: { Authorization: `Bearer ${token}` }
            });

            if (res.data.success || res.data.data) {
                const freshUser = res.data.data || res.data.user;
                
                // Ép kiểu số dư sang number cho chắc chắn
                const updatedUser = { 
                    ...freshUser, 
                    account_balance: parseFloat(freshUser.account_balance || 0),

                    token: token
                };

                // Cập nhật State và LocalStorage
                setUser(updatedUser);
                localStorage.setItem('user', JSON.stringify(updatedUser));
                console.log("✅ Đã đồng bộ dữ liệu mới nhất từ Server:", updatedUser.account_balance);
            }
        } catch (error) {
            console.error("Lỗi đồng bộ user: ", error);
            if (error.response?.status === 401) {
                logout();
            }
        }
    };

    useEffect(() => {
        refreshUser();
    }, []);

    const login = (userData, token) => {
        const safeUser = {
            ...userData,
            account_balance: parseFloat(userData.account_balance || 0)
        };
        setUser(safeUser);
        localStorage.setItem('user', JSON.stringify(safeUser));
        localStorage.setItem('token', token);
    };

    // 5. Hàm Logout
    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
        localStorage.removeItem('token');
    };

    return (
        <UserContext.Provider value={{ user, setUser, login, logout, refreshUser }}>
            {children}
        </UserContext.Provider>
    );
};