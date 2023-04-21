import { useEffect } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Spinner from '../components/Spinner';
import useTitle from '../hooks/useTitle';
import { useResetPasswordMutation } from '../features/auth/authApiSlice';

const ResetPasswordPage = () => {
    useTitle('Reset Password');

    const navigate = useNavigate();
    const goBack = () => navigate(-1);

    const [searchParams] = useSearchParams();
    const token = searchParams.get('token');
    const userId = searchParams.get('userId');

    const [resetPassword, { data, isLoading, isSuccess }] =
        useResetPasswordMutation();

    useEffect(() => {
        if (isSuccess) {
            navigate('/login');
            const message = data?.message;
            console.log(message);
            toast.success(message);
        }
    }, [data, isSuccess, navigate]);
    return (
        <div className="container">
            <div className="row justify-content-center vh-75 align-items-center">
                <div className="col-md-5">
                    <div className="card">
                        <div className="card-body">
                            <h1 className="text-center">Reset Password</h1>
                            <p className="text-center mb-4">
                                Enter new password to reset your password.
                            </p>
                            <Formik
                                initialValues={{
                                    password: '',
                                    passwordConfirm: '',
                                }}
                                validationSchema={Yup.object().shape({
                                    password: Yup.string()
                                        .max(255)
                                        .required('Password is required'),
                                    passwordConfirm: Yup.string()
                                        .oneOf(
                                            [Yup.ref('password')],
                                            'Password does not match'
                                        )
                                        .max(255)
                                        .required(
                                            'Please confirm your password'
                                        ),
                                })}
                                onSubmit={async (
                                    values,
                                    { setStatus, setSubmitting }
                                ) => {
                                    try {
                                        const formData = {
                                            ...values,
                                            token: token,
                                            userId: userId,
                                        };
                                        await resetPassword(formData).unwrap();
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
                                                        htmlFor="passwordReset"
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
                                                        id="passwordReset"
                                                    />
                                                    {touched.password &&
                                                        errors.password && (
                                                            <div
                                                                className="invalid-feedback"
                                                                id="passwordResetFeedback"
                                                            >
                                                                {
                                                                    errors.password
                                                                }
                                                            </div>
                                                        )}
                                                </div>

                                                <div className="mb-3">
                                                    <label
                                                        htmlFor="passwordConfirmReset"
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
                                                        value={
                                                            values.passwordConfirm
                                                        }
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        id="passwordConfirmReset"
                                                    />
                                                    {touched.passwordConfirm &&
                                                        errors.passwordConfirm && (
                                                            <div
                                                                className="invalid-feedback"
                                                                id="passwordConfirmResetFeedback"
                                                            >
                                                                {
                                                                    errors.passwordConfirm
                                                                }
                                                            </div>
                                                        )}
                                                </div>
                                                <div className="d-grid gap-3">
                                                    <button
                                                        className="btn btn-dark"
                                                        disabled={isSubmitting}
                                                    >
                                                        Submit
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

export default ResetPasswordPage;
