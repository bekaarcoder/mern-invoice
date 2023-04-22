import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import NotFound from './components/NotFound';
import useTitle from './hooks/useTitle';
import SignUp from './pages/SignUp';
import VerifiedPage from './pages/VerifiedPage';
import SignIn from './pages/SignIn';
import { useSelector } from 'react-redux';
import Navbar from './components/Navbar';
import ResendEmailTokenPage from './pages/ResendEmailTokenPage';
import ResetPasswordRequestPage from './pages/ResetPasswordRequestPage';
import PasswordResetPage from './pages/PasswordResetPage';
import { ROLES } from './config/roles';
import UserListPage from './pages/UserListPage';
import DashboardPage from './pages/DashboardPage';
import AuthRequired from './components/AuthRequired';

const App = () => {
    useTitle('MERN Invoice - Home');
    const { user } = useSelector((state) => state.auth);
    return (
        <>
            {user && <Navbar />}
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<HomePage />} />
                    <Route path="register" element={<SignUp />} />
                    <Route path="login" element={<SignIn />} />
                    <Route
                        path="resend-verification-email"
                        element={<ResendEmailTokenPage />}
                    />
                    <Route
                        path="reset-password-request"
                        element={<ResetPasswordRequestPage />}
                    />
                    <Route
                        path="auth/reset_password"
                        element={<PasswordResetPage />}
                    />
                    <Route path="auth/verify" element={<VerifiedPage />} />

                    {/* Private Routes - Users*/}
                    <Route
                        element={<AuthRequired allowedRoles={[ROLES.USER]} />}
                    >
                        <Route path="dashboard" element={<DashboardPage />} />
                    </Route>

                    {/* Private Routes - Admin */}
                    <Route
                        element={<AuthRequired allowedRoles={[ROLES.ADMIN]} />}
                    >
                        <Route path="users" element={<UserListPage />} />
                    </Route>
                    <Route path="*" element={<NotFound />} />
                </Route>
            </Routes>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </>
    );
};

export default App;
