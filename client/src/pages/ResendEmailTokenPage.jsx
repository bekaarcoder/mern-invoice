import { useEffect } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Spinner from '../components/Spinner';
import useTitle from '../hooks/useTitle';
import { useResendVerifyEmailMutation } from '../features/auth/authApiSlice';

const ResendEmailTokenPage = () => {
    useTitle('Resend Verification Email');

    const navigate = useNavigate();
    const goBack = () => navigate(-1);

    const [resendVerifyEmail, { data, isLoading, isSuccess }] =
        useResendVerifyEmailMutation();

    useEffect(() => {
        if (isSuccess) {
            navigate('/');
            const message = data?.message;
            toast.success(message);
        }
    }, [data, isSuccess, navigate]);
    return (
        <div className="container">
            <div className="row justify-content-center vh-75 align-items-center">
                <div className="col-md-5">
                    <div className="card">
                        <div className="card-body">
                            <h1 className="text-center">Verify Account</h1>
                            <p className="text-center mb-4">
                                Enter you email address to send the verification
                                email.
                            </p>
                            <Formik
                                initialValues={{ email: '' }}
                                validationSchema={Yup.object().shape({
                                    email: Yup.string()
                                        .email('Must be a valid email')
                                        .max(255)
                                        .required('Email is required'),
                                })}
                                onSubmit={async (
                                    values,
                                    { setStatus, setSubmitting }
                                ) => {
                                    try {
                                        await resendVerifyEmail(
                                            values
                                        ).unwrap();
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
                                    <form
                                        noValidate
                                        autoComplete="off"
                                        onSubmit={handleSubmit}
                                    >
                                        {isLoading ? (
                                            <Spinner />
                                        ) : (
                                            <>
                                                <div className="mb-3">
                                                    <label
                                                        htmlFor="emailVerification"
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
                                                        id="emailVerification"
                                                    />
                                                    {touched.email &&
                                                        errors.email && (
                                                            <div
                                                                className="invalid-feedback"
                                                                id="emailVerificationFeedback"
                                                            >
                                                                {errors.email}
                                                            </div>
                                                        )}
                                                </div>
                                                <div className="d-grid gap-3">
                                                    <button
                                                        className="btn btn-dark"
                                                        disabled={
                                                            isSubmitting ||
                                                            !values.email
                                                        }
                                                    >
                                                        Resend Verification
                                                        Email
                                                    </button>
                                                    <button
                                                        className="btn btn-secondary"
                                                        onClick={goBack}
                                                    >
                                                        Go Back
                                                    </button>
                                                </div>
                                            </>
                                        )}
                                    </form>
                                )}
                            </Formik>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResendEmailTokenPage;
