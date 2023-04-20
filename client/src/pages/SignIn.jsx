import React from 'react';
import LoginForm from '../features/auth/forms/LoginForm';
import { Link } from 'react-router-dom';
import GoogleLogin from '../components/GoogleLogin';

const SignIn = () => {
    return (
        <div className="container">
            <div className="row justify-content-center vh-75 align-items-center">
                <div className="col-md-6 col-sm-12">
                    <div className="card">
                        <div className="card-body">
                            <h1 className="text-center mb-4">Sign In</h1>
                            <LoginForm />
                            <div className="text-center my-3">
                                Don't Have An Account?{' '}
                                <Link to="/register" className="">
                                    Sign Up
                                </Link>
                            </div>
                            <div className="text-center my-3">
                                Didn't Get The Verification Email?{' '}
                                <Link
                                    to="/resend-verification-email"
                                    className=""
                                >
                                    Resend Email
                                </Link>
                            </div>
                            <div className="d-flex align-items-center gap-3 my-3">
                                <span className="border-bottom flex-grow-1"></span>
                                <span>OR</span>
                                <span className="border-bottom flex-grow-1"></span>
                            </div>
                            <div className="d-flex justify-content-center">
                                <GoogleLogin />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignIn;
