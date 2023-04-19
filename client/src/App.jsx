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
                    <Route path="auth/verify" element={<VerifiedPage />} />
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
