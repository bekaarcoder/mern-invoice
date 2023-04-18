import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import { useLoginUserMutation } from '../authApiSlice';
import { Formik } from 'formik';
import Spinner from '../../../components/Spinner';
import useTitle from '../../../hooks/useTitle';
import { useDispatch } from 'react-redux';
import { login } from '../authSlice';

const LoginForm = () => {
    useTitle('Sign In - MERN Invoice');

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || '/dashboard';

    const [loginUser, { data, isLoading, isSuccess }] = useLoginUserMutation();

    useEffect(() => {
        if (isSuccess) {
            navigate(from, { replace: true });
            const message = data?.message;
            toast.success(message);
        }
    }, [data, isSuccess, navigate, from]);

    return (
        <>
            <Formik
                initialValues={{
                    email: '',
                    password: '',
                    submit: null,
                }}
                validationSchema={Yup.object().shape({
                    email: Yup.string()
                        .email('Must be a valid email.')
                        .max(255)
                        .required('Email is required.'),
                    password: Yup.string()
                        .max(255)
                        .required('Password is required.'),
                })}
                onSubmit={async (values, { setStatus, setSubmitting }) => {
                    try {
                        const getUserCredentials = await loginUser(
                            values
                        ).unwrap(); // unwrap handles the errors with try-catch
                        dispatch(login({ ...getUserCredentials }));
                        setStatus({ success: true });
                        setSubmitting(false);
                    } catch (err) {
                        console.log(err);
                        const message = err.data.message;
                        toast.error(message);
                        setStatus({ success: false });
                        setSubmitting(false);
                    }
                }}
            >
                {({
                    errors,
                    handleBlur,
                    handleChange,
                    handleSubmit,
                    isSubmitting,
                    touched,
                    values,
                }) => (
                    <form noValidate autoComplete="off" onSubmit={handleSubmit}>
                        {isLoading ? (
                            <Spinner />
                        ) : (
                            <>
                                <div className="row">
                                    <div className="col-md-12 col-sm-12 mb-3">
                                        <label
                                            htmlFor="emailSignIn"
                                            className="form-label"
                                        >
                                            Email Address
                                        </label>
                                        <input
                                            type="email"
                                            className={`form-control ${
                                                touched.email &&
                                                errors.email &&
                                                'is-invalid'
                                            }`}
                                            name="email"
                                            value={values.email}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            id="emailSignIn"
                                        />
                                        {touched.email && errors.email && (
                                            <div
                                                className="invalid-feedback"
                                                id="emailSignInFeedback"
                                            >
                                                {errors.email}
                                            </div>
                                        )}
                                    </div>

                                    <div className="col-md-12 col-sm-12 mb-3">
                                        <div className="d-flex justify-content-between">
                                            <label
                                                htmlFor="passwordSignIn"
                                                className="form-label"
                                            >
                                                Password
                                            </label>
                                            <Link to="/forgot-password">
                                                Forgot your password?
                                            </Link>
                                        </div>
                                        <input
                                            type="password"
                                            className={`form-control ${
                                                touched.password &&
                                                errors.password &&
                                                'is-invalid'
                                            }`}
                                            name="password"
                                            value={values.password}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            id="passwordSignIn"
                                        />
                                        {touched.password &&
                                            errors.password && (
                                                <div
                                                    className="invalid-feedback"
                                                    id="passwordSignInFeedback"
                                                >
                                                    {errors.password}
                                                </div>
                                            )}
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-md-12">
                                        <p className="text-center">
                                            By signing in, you agree to our
                                            &nbsp;
                                            <Link to="#">Terms of Service</Link>
                                            &nbsp; and &nbsp;
                                            <Link to="#">Privacy Policy</Link>.
                                        </p>
                                    </div>
                                </div>

                                {errors.submit && (
                                    <div className="row">
                                        <div className="col-md-12">
                                            <p className="text-danger small">
                                                {errors.submit}
                                            </p>
                                        </div>
                                    </div>
                                )}

                                <div className="row justify-content-center">
                                    <div className="col-md-12 col-sm-12 d-grid">
                                        <button
                                            className="btn btn-dark"
                                            disabled={isSubmitting}
                                        >
                                            Sign In
                                        </button>
                                    </div>
                                </div>
                            </>
                        )}
                    </form>
                )}
            </Formik>
        </>
    );
};

export default LoginForm;
