// AuthContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from './config';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [ready, setReady] = useState(false); // new state

    useEffect(() => {
        const fetchUser = async () => {
            try {
                await axios.get(`${API_URL}/sanctum/csrf-cookie`);
                const res = await axios.get(`${API_URL}/api/authenticated/user`);
                setUser(res.data.user);
            } catch {
                setUser(null);
            } finally {
                setReady(true);
            }
        };

        fetchUser();
    }, []);

    return (
        <AuthContext.Provider value={{ user, ready }}>
            {children}
        </AuthContext.Provider>
    );
};
