import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom'

export default function AuthView({children}) {
    const token = useSelector((state) => state.auth.token);
    return token ? <Navigate to="/home" /> : children;
}
