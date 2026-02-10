import React, { useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const GoogleLogin = () => {
    useEffect(() => {
        // Load Google Identity Services script
        const script = document.createElement('script');
        script.src = 'https://accounts.google.com/gsi/client';
        script.async = true;
        script.defer = true;
        document.head.appendChild(script);

        script.onload = () => {
            window.google.accounts.id.initialize({
                client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
                callback: handleCredentialResponse,
            });

            window.google.accounts.id.renderButton(
                document.getElementById('google-signin-button'),
                {
                    theme: 'outline',
                    size: 'large',
                    text: 'continue_with',
                    shape: 'rectangular',
                }
            );
        };

        return () => {
            document.head.removeChild(script);
        };
    }, []);

    const handleCredentialResponse = async (response) => {
        try {
            const res = await axios.post('http://localhost:5000/api/auth/google', {
                token: response.credential,
            });

            if (res.data.success) {
                toast.success('Google login successful!');
                window.location.href = '/';
            } else {
                toast.error(res.data.message || 'Google login failed');
            }
        } catch (error) {
            console.error('Google login error:', error);
            toast.error('Google login failed');
        }
    };

    return (
        <div
            id="google-signin-button"
            className="flex justify-center"
        ></div>
    );
};

export default GoogleLogin;
