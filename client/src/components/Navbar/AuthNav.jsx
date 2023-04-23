import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import useAuthUser from '../../hooks/useAuthUser';
import { FiLogOut } from 'react-icons/fi';
import { CgProfile } from 'react-icons/cg';
import { BsPersonGear } from 'react-icons/bs';
import { useLogoutUserMutation } from '../../features/auth/authApiSlice';
import { toast } from 'react-toastify';
import { isExpired } from 'react-jwt';
import { logout } from '../../features/auth/authSlice';

const AuthNav = () => {
    const { user, googleToken } = useSelector((state) => state.auth);
    const { isAdmin } = useAuthUser();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [logoutUser, { data, isSuccess }] = useLogoutUserMutation();

    const handleLogout = async () => {
        try {
            await logoutUser().unwrap();
            navigate('/login');
        } catch (err) {
            toast.error(err);
        }
    };

    useEffect(() => {
        if (isSuccess) {
            const message = data?.message;
            toast.success(message);
        }
    }, [isSuccess, data]);

    useEffect(() => {
        if (googleToken) {
            const isTokenExpired = isExpired(googleToken);
            if (isTokenExpired) {
                dispatch(logout());
                navigate('/login');
                toast.warning('You have been logged out. Please login again.');
            }
        }
    }, [navigate, dispatch, googleToken]);

    return (
        <nav
            className="navbar navbar-expand-lg bg-body-tertiary bg-dark"
            data-bs-theme="dark"
        >
            <div className="container">
                <Link className="navbar-brand" to="/dashboard">
                    MERN INVOICE
                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div
                    className="collapse navbar-collapse"
                    id="navbarSupportedContent"
                >
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <NavLink
                                className="nav-link"
                                activeClassName="active"
                                aria-current="page"
                                to="/dashboard"
                            >
                                Dashboard
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink
                                className="nav-link"
                                activeClassName="active"
                                aria-current="page"
                                to="/documents"
                            >
                                Documents
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink
                                className="nav-link"
                                activeClassName="active"
                                aria-current="page"
                                to="/customers"
                            >
                                Customers
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink
                                className="nav-link"
                                activeClassName="active"
                                aria-current="page"
                                to="/manage"
                            >
                                Manage Profiles
                            </NavLink>
                        </li>
                        {isAdmin && (
                            <li className="nav-item">
                                <NavLink
                                    className="nav-link"
                                    activeClassName="active"
                                    aria-current="page"
                                    to="/admin"
                                >
                                    Admin Panel
                                </NavLink>
                            </li>
                        )}
                    </ul>
                    <ul className="navbar-nav mb-2 mb-lg-0 d-flex align-items-center">
                        <li className="nav-item dropdown">
                            <Link
                                className="nav-link dropdown-toggle"
                                href="#"
                                role="button"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                            >
                                {user.firstName} {user.lastName}
                            </Link>
                            <ul className="dropdown-menu dropdown-menu-dark">
                                <li>
                                    <Link
                                        className="dropdown-item d-flex align-items-center gap-1"
                                        href="#"
                                    >
                                        <CgProfile className="text-success" />{' '}
                                        View Profile
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        className="dropdown-item d-flex align-items-center gap-1"
                                        href="#"
                                    >
                                        <BsPersonGear className="text-success" />{' '}
                                        Manage Profile
                                    </Link>
                                </li>
                                <li>
                                    <hr className="dropdown-divider" />
                                </li>
                                <li>
                                    <Link
                                        className="dropdown-item d-flex align-items-center gap-1"
                                        href="#"
                                        onClick={handleLogout}
                                    >
                                        <FiLogOut className="text-success" />{' '}
                                        Logout
                                    </Link>
                                </li>
                            </ul>
                        </li>
                        <li className="nav-item">
                            {!user?.avatar ? (
                                <Link
                                    className="nav-link rounded-circle bg-success d-flex align-items-center justify-content-center text-white avatar"
                                    to="/profile"
                                >
                                    {user.firstName.charAt(0).toUpperCase()}
                                    {user.lastName?.charAt(0).toUpperCase()}
                                </Link>
                            ) : (
                                <Link className="nav-link " to="/profile">
                                    <img
                                        src={user.avatar}
                                        alt="profile"
                                        className="rounded-circle bg-success d-flex align-items-center justify-content-center avatar"
                                    />
                                </Link>
                            )}
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default AuthNav;
