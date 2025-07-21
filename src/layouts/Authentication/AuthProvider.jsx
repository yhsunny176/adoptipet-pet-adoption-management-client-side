import React, { useEffect, useState } from "react";
import {
    createUserWithEmailAndPassword,
    getAuth,
    GoogleAuthProvider,
    FacebookAuthProvider,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
    updateProfile,
    sendPasswordResetEmail,
} from "firebase/auth";
import { AuthContext } from "@/contexts/AuthContext";
import app from "@/firebase/firebase.config";
import "react-loading-skeleton/dist/skeleton.css";
import axios from "axios";

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            setUser(currentUser);
            if (currentUser?.email) {
                setUser(currentUser);

                // Get JWT token
                await axios.post(
                    `${import.meta.env.VITE_API_URL}/jwt`,
                    {
                        email: currentUser?.email,
                    },
                    { withCredentials: true }
                );
            } else {
                setUser(currentUser);
                await axios.get(`${import.meta.env.VITE_API_URL}/logout`, {
                    withCredentials: true,
                });
            }
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    const createUser = async (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    };

    const updateUser = async (updatedData) => {
        setLoading(true);
        return updateProfile(auth.currentUser, updatedData);
    };

    const signInUser = async (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    };

    const signInWithGoogle = async () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    };

    const signInWithFacebook = async () => {
        setLoading(true);
        return signInWithPopup(auth, facebookProvider);
    };

    const logOut = async () => {
        setLoading(true);
        return signOut(auth);
    };

    const passwordReset = (email) => {
        return sendPasswordResetEmail(auth, email);
    };

    const authData = {
        user,
        setUser,
        loading,
        createUser,
        setLoading,
        updateUser,
        signInUser,
        signInWithGoogle,
        signInWithFacebook,
        logOut,
        passwordReset,
    };

    return <AuthContext.Provider value={authData}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
