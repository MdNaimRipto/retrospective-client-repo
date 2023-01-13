import React, { useContext } from 'react';
import { FcGoogle } from "react-icons/fc"
import { AuthContext } from '../../ContextProvider/UserContext';
import { useLocation, useNavigate } from "react-router-dom"

const GoogleLogin = () => {
    const { googleLogin } = useContext(AuthContext)

    const location = useLocation()
    const navigate = useNavigate()
    const from = location.state?.from?.pathname || "/"

    const handleGoogleLogin = () => {
        googleLogin()
            .then(result => {
                const user = result.user;
                console.log(user);
                navigate(from, { replace: true })
            })
            .catch(err => console.error(err))
    }
    return (
        <button
            onClick={handleGoogleLogin}
            className='flex items-center w-full bg-white btn btn-circle text-[#333333] border-0 hover:bg-primary'>
            <FcGoogle className='rounded-full text-4xl ml-1' />
            <p className='font-semibold'>Login With Google</p>
        </button>
    );
};

export default GoogleLogin;