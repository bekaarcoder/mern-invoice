import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import { useRegisterUserMutation } from '../authApiSlice';
import { Formik } from 'formik';
import Spinner from '../../../components/Spinner';
import useTitle from '../../../hooks/useTitle';

const USERNAME_REGEX = /^[a-zA-Z0-9_-]{3,23}$/;

const RegisterForm = () => {
    useTitle('Sign Up - MERN Invoice');
    const navigate = useNavigate();

    const [registerUser, { data, isLoading, isSuccess }] =
        useRegisterUserMutation();

    useEffect(() => {
        if (isSuccess) {
            navigate('/');
            const message = data?.message;
            toast.success(message);
        }
    }, [data, isSuccess, navigate]);

    return (
        <>
            <Formik
                initialValues={{
                    firstName: '',
                    lastName: '',
                    email: '',
                    username: '',
                    password: '',
                    passwordConfirm: '',
                    submit: null,
                }}
                validationSchema={Yup.object().shape({
                    firstName: Yup.string()
                        .max(255)
                        .required('First Name is required.'),
                    lastName: Yup.string()
                        .max(255)
                        .required('Last Name is required.'),
                    username: Yup.string()
                        .matches(
                            USERNAME_REGEX,
                            'Should be between 4 and 23 characters. Letters, numbers, underscore, hyphens allowed. Special characters not allowed.'
                        )
                        .required('Username is required'),
                    email: Yup.string()
                        .email('Must be a valid email.')
                        .max(255)
                        .required('Email is required.'),
                    password: Yup.string()
                        .max(255)
                        .required('Password is required.'),
                    passwordConfirm: Yup.string()
                        .oneOf(
                            [Yup.ref('password')],
                            'Password does not match.'
                        )
                        .max(255)
                        .required('Please confirm your password.'),
                })}
                onSubmit={async (values, { setStatus, setSubmitting }) => {
                    try {
                        await registerUser(values).unwrap(); // unwrap handles the errors with try-catch
                        setStatus({ success: true });
                        setSubmitting(false);
                    } catch (err) {
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
                                    <div className="col-md-6 col-sm-12 mb-3">
                                        <label
                                            htmlFor="firstNameSignUp"
                                            className="form-label"
                                        >
                                            First Name
                                        </label>
                                        <input
                                            type="text"
                                            className={`form-control ${
                                                touched.firstName &&
                                                errors.firstName &&
                                                'is-invalid'
                                            }`}
                                            name="firstName"
                                            value={values.firstName}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            id="firstNameSignUp"
                                        />
                                        {touched.firstName &&
                                            errors.firstName && (
                                                <div
                                                    className="invalid-feedback"
                                                    id="firstNameSignUpFeedback"
                                                >
                                                    {errors.firstName}
                                                </div>
                                            )}
                                    </div>

                                    <div className="col-md-6 col-sm-12 mb-3">
                                        <label
                                            htmlFor="lastNameSignUp"
                                            className="form-label"
                                        >
                                            Last Name
                                        </label>
                                        <input
                                            type="text"
                                            className={`form-control ${
                                                touched.lastName &&
                                                errors.lastName &&
                                                'is-invalid'
                                            }`}
                                            name="lastName"
                                            value={values.lastName}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            id="lastNameSignUp"
                                        />
                                        {touched.lastName &&
                                            errors.lastName && (
                                                <div
                                                    className="invalid-feedback"
                                                    id="lastNameSignUpFeedback"
                                                >
                                                    {errors.lastName}
                                                </div>
                                            )}
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-md-6 col-sm-12 mb-3">
                                        <label
                                            htmlFor="usernameSignUp"
                                            className="form-label"
                                        >
                                            Username
                                        </label>
                                        <input
                                            type="text"
                                            className={`form-control ${
                                                touched.username &&
                                                errors.username &&
                                                'is-invalid'
                                            }`}
                                            name="username"
                                            value={values.username}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            id="usernameSignUp"
                                        />
                                        {touched.username &&
                                            errors.username && (
                                                <div
                                                    className="invalid-feedback"
                                                    id="usernameSignUpFeedback"
                                                >
                                                    {errors.username}
                                                </div>
                                            )}
                                    </div>

                                    <div className="col-md-6 col-sm-12 mb-3">
                                        <label
                                            htmlFor="emailSignUp"
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
                                            id="emailSignUp"
                                        />
                                        {touched.email && errors.email && (
                                            <div
                                                className="invalid-feedback"
                                                id="emailSignUpFeedback"
                                            >
                                                {errors.email}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-md-6 col-sm-12 mb-3">
                                        <label
                                            htmlFor="passwordSignUp"
                                            className="form-label"
                                        >
                                            Password
                                        </label>
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
                                            id="passwordSignUp"
                                        />
                                        {touched.password &&
                                            errors.password && (
                                                <div
                                                    className="invalid-feedback"
                                                    id="passwordSignUpFeedback"
                                                >
                                                    {errors.password}
                                                </div>
                                            )}
                                    </div>

                                    <div className="col-md-6 col-sm-12 mb-3">
                                        <label
                                            htmlFor="passwordConfirmSignUp"
                                            className="form-label"
                                        >
                                            Confirm Password
                                        </label>
                                        <input
                                            type="password"
                                            className={`form-control ${
                                                touched.passwordConfirm &&
                                                errors.passwordConfirm &&
                                                'is-invalid'
                                            }`}
                                            name="passwordConfirm"
                                            value={values.passwordConfirm}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            id="passwordConfirmSignUp"
                                        />
                                        {touched.passwordConfirm &&
                                            errors.passwordConfirm && (
                                                <div
                                                    className="invalid-feedback"
                                                    id="passwordConfirmSignUpFeedback"
                                                >
                                                    {errors.passwordConfirm}
                                                </div>
                                            )}
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-md-12">
                                        <p className="text-center">
                                            By signing up, you agree to our
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
                                    <div className="col-md-6 col-sm-12 d-grid">
                                        <button
                                            className="btn btn-dark"
                                            disabled={isSubmitting}
                                        >
                                            Create Account
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

export default RegisterForm;
