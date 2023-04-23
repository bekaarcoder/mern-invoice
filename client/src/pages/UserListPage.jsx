import { useEffect, useState } from 'react';
import moment from 'moment';
import { toast } from 'react-toastify';
import Spinner from '../components/Spinner';
import useTitle from '../hooks/useTitle';
import { useGetAllUsersQuery } from '../features/users/usersApiSlice';
import { Link } from 'react-router-dom';

const UserListPage = () => {
    useTitle('All Users - MERN Invoice');

    const [params, setParams] = useState({});
    const [currentPage, setCurrentPage] = useState(1);

    const { data, isLoading, isSuccess, isError, error } = useGetAllUsersQuery(
        params,
        'allUsersList',
        {
            pollingInterval: 60000,
            refetchOnFocus: true,
            refetchOnMountOrArgChange: true,
        }
    );

    const handleNext = () => {
        setCurrentPage((prevPage) => prevPage + 1);
        const queryParams = {
            pageNumber: currentPage + 1,
        };
        setParams(queryParams);
    };

    const handlePrevious = () => {
        setCurrentPage((prevPage) => prevPage - 1);
        const queryParams = {
            pageNumber: currentPage - 1,
        };
        setParams(queryParams);
    };

    useEffect(() => {
        if (isError) {
            const message = error.data.message;
            toast.error(message);
        }
    }, [error, isError]);

    return (
        <div className="container">
            <div className="row my-5">
                <div className="col-md-12">
                    <h3>All Users</h3>
                    {isLoading ? (
                        <Spinner />
                    ) : (
                        <>
                            <table className="table table-hover table-striped">
                                <thead>
                                    <tr>
                                        <th>Email</th>
                                        <th>Username</th>
                                        <th>Is Email Verified</th>
                                        <th>Provider</th>
                                        <th>Roles</th>
                                        <th>Joined</th>
                                        <th>Active User</th>
                                        <th>Delete</th>
                                    </tr>
                                </thead>
                                {data?.users.length > 0 && (
                                    <tbody>
                                        {data?.users.map((row, index) => (
                                            <tr key={index}>
                                                <td>{row.email}</td>
                                                <td>{row.username}</td>
                                                <td>{row.isEmailVerified}</td>
                                                <td>{row.provider}</td>
                                                <td>{row.roles}</td>
                                                <td>{row.createdAt}</td>
                                                <td>{row.active}</td>
                                                <td></td>
                                            </tr>
                                        ))}
                                    </tbody>
                                )}
                            </table>
                            {/* Pagination */}
                            {isSuccess && data?.numberOfPages > 1 && (
                                <nav aria-label="Page navigation example">
                                    <ul className="pagination justify-content-center">
                                        <li
                                            className={`page-item ${
                                                currentPage === 1
                                                    ? 'disabled'
                                                    : ''
                                            }`}
                                        >
                                            <Link
                                                className="page-link"
                                                href="#"
                                                aria-label="Previous"
                                                onClick={handlePrevious}
                                            >
                                                <span aria-hidden="true">
                                                    &laquo; Previous
                                                </span>
                                            </Link>
                                        </li>
                                        <li
                                            className={`page-item ${
                                                currentPage ===
                                                data?.numberOfPages
                                                    ? 'disabled'
                                                    : ''
                                            }`}
                                        >
                                            <Link
                                                className="page-link"
                                                href="#"
                                                aria-label="Next"
                                                onClick={handleNext}
                                            >
                                                <span aria-hidden="true">
                                                    Next &raquo;
                                                </span>
                                            </Link>
                                        </li>
                                    </ul>
                                </nav>
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default UserListPage;
