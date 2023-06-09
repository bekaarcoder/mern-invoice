import React from 'react';
import RegisterForm from '../features/auth/forms/RegisterForm';
import { Link } from 'react-router-dom';
import GoogleLogin from '../components/GoogleLogin';

const SignUp = () => {
    return (
        <div className="container">
            <div className="row justify-content-center vh-75 align-items-center">
                <div className="col-md-8 col-sm-12">
                    <div className="card">
                        <div className="card-body">
                            <h1 className="text-center mb-4">Sign Up</h1>
                            <RegisterForm />
                            <div className="text-center my-3">
                                Already Have An Account?{' '}
                                <Link to="/login" className="">
                                    Login Here
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

export default SignUp;
