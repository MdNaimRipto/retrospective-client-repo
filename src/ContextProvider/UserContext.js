import React, { createContext, useEffect, useState } from 'react';
import app from '../firebase/firebase.init';
import {
    createUserWithEmailAndPassword,
    getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile
} from "firebase/auth"

export const AuthContext = createContext()

const auth = getAuth(app)

const googleProvider = new GoogleAuthProvider()

const UserContext = ({ children }) => {

    const [user, setUser] = useState(null)
    const [loader, setLoader] = useState(true)
    console.log(user);

    const registerWithEmailPassword = (email, password) => {
        setLoader(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const loginWithEmailPassword = (email, password) => {
        setLoader(true)
        return signInWithEmailAndPassword(auth, email, password)
    }

    const googleLogin = () => {
        setLoader(true)
        return signInWithPopup(auth, googleProvider)
    }

    const updateUser = (displayName, photoURL) => {
        setLoader(true)
        return updateProfile(auth.currentUser, displayName, photoURL)
    }

    const logout = () => {
        setLoader(true)
        return signOut(auth)
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser)
            setLoader(false)
        })
        return () => {
            unsubscribe()
        }
    }, [])

    const authInfo = {
        user,
        loader,
        setLoader,
        googleLogin,
        registerWithEmailPassword,
        loginWithEmailPassword,
        updateUser,
        logout
    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default UserContext;