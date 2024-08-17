import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth } from '../../FirebaseConfig';
import { onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, signOut, createUserWithEmailAndPassword, getIdTokenResult } from 'firebase/auth';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            setUser(user);
            setLoading(false);

            if (user) {
                // Force refresh to get the latest token with claims
                await user.getIdToken(true);
                const tokenResult = await getIdTokenResult(user);
                setIsAdmin(tokenResult.claims.admin || false);

            } else {
                setIsAdmin(false);
            }
        });

        return () => unsubscribe();
    }, []);

    const login = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    };

    const signup = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password);
    };

    const loginWithGoogle = () => {
        const provider = new GoogleAuthProvider();
        return signInWithPopup(auth, provider);
    };

    const logout = () => {
        signOut(auth);
        setIsAdmin(false); // Reset admin status on logout
    };

    return (
        <AuthContext.Provider value={{ user, isAdmin, login, signup, loginWithGoogle, logout }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
