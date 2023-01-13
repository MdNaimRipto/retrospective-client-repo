import React, { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../ContextProvider/UserContext';
import GoogleLogin from './GoogleLogin';

const Login = () => {
    const { loginWithEmailPassword } = useContext(AuthContext)
    const [error, setError] = useState('')

    const location = useLocation()
    const navigate = useNavigate()
    const from = location.state?.from?.pathname || "/"

    const handleLogin = (e) => {
        e.preventDefault()
        const form = e.target
        const email = form.email.value;
        const password = form.password.value;
        loginWithEmailPassword(email, password)
            .then(result => {
                const user = result.user
                console.log(user);
                form.reset()
                setError('')
                navigate(from, { replace: true })
            })
            .catch(err => {
                console.error(err)
                setError(err.message)
            })
    }
    return (
        <div className='mb-12'>
            <div className="hero-content flex-col lg:flex-row-reverse mx-auto">
                <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-200">
                    <div className="card-body">
                        <h2 className='text-3xl font-bold text-center'>Login Now</h2>
                        <form onSubmit={handleLogin}>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-semibold">Email</span>
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Enter Email"
                                    className="input input-bordered" />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-semibold">Password</span>
                                </label>
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="Enter Password"
                                    className="input input-bordered" />
                                <p className='text-sm text-center font-semibold mt-3 mb-2'>
                                    Don't Have an Account?
                                    <Link to="/register" className='text-[#e9923d] ml-1'>Create New Account</Link>
                                </p>
                                <label className="label">
                                    <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                </label>
                            </div>
                            <div className="form-control mt-2">
                                <button className="btn btn-primary ">Login</button>
                            </div>
                            {
                                error &&
                                <p className='text-red-500 text-center my-3 font-semibold'>
                                    {error}
                                </p>
                            }
                        </form>
                        <div className="divider">OR</div>
                        <GoogleLogin />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;