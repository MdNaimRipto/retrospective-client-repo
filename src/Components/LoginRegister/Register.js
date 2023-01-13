import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../ContextProvider/UserContext';
import GoogleLogin from './GoogleLogin';

const Register = () => {
    const { registerWithEmailPassword, updateUser } = useContext(AuthContext)

    const navigate = useNavigate()

    const handleRegister = (e) => {
        e.preventDefault()
        const form = e.target
        const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;
        const img = form.img.files[0]
        const formData = new FormData()
        formData.append("image", img);
        const url = 'https://api.imgbb.com/1/upload?key=cd143a9b2573c176586ba52f643962d2'
        fetch(url, {
            method: "POST",
            body: formData
        })
            .then(res => res.json())
            .then(imageData => {
                if (imageData.success) {
                    registerWithEmailPassword(email, password)
                        .then(result => {
                            const user = result.user;
                            const userInfo = {
                                displayName: name,
                                photoURL: imageData.data.url
                            }
                            updateUser(userInfo)
                            console.log(user);
                            navigate("/")
                            form.reset()
                        })
                        .catch(err => console.error(err))
                }
            })
    }
    return (
        <div className='mb-12'>
            <div className="hero-content flex-col lg:flex-row-reverse mx-auto">
                <div className="card flex-shrink-0 w-full md:w-3/4 lg:w-2/5 shadow-2xl bg-base-200">
                    <div className="card-body">
                        <h2 className='text-3xl font-bold text-center'>Register Now</h2>
                        <form onSubmit={handleRegister}>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-semibold">Name</span>
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Enter Name"
                                    className="input input-bordered"
                                    required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-semibold">Email</span>
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Enter Email"
                                    className="input input-bordered"
                                    required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-semibold">Password</span>
                                </label>
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="Enter Password"
                                    className="input input-bordered"
                                    required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-semibold">Select Image</span>
                                </label>
                                <input
                                    type="file"
                                    name='img'
                                    required
                                    className="file-input file-input-bordered file-input-primary w-full" />
                            </div>

                            <p className='text-sm text-center font-semibold mt-3 mb-2'>
                                Already Have an Account?
                                <Link to="/login" className='text-[#e9923d] ml-1'>Login Now</Link>
                            </p>
                            <div className="form-control mt-2">
                                <button className="btn btn-primary">Register</button>
                            </div>
                        </form>
                        <div className="divider">OR</div>
                        <GoogleLogin />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;