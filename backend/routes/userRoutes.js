import express from 'express';
import getUserProfile from '../controllers/user/getUserProfileController.js';
import checkAuth from '../middleware/checkAuthMiddleware.js';
import updateUserProfile from '../controllers/user/updateUserProfileController.js';
import deleteUserProfile from '../controllers/user/deleteAccountController.js';
import getAllUserAccounts from '../controllers/user/getAllUserAccountController.js';
import deleteUserAccount from '../controllers/user/deleteUserAccountController.js';
import deactivateAccount from '../controllers/user/deactivateUserController.js';
import role from '../middleware/roleMiddleware.js';

const router = express.Router();

router
    .route('/profile')
    .get(checkAuth, getUserProfile)
    .patch(checkAuth, updateUserProfile)
    .delete(checkAuth, deleteUserProfile);

router
    .route('/all')
    .get(checkAuth, role.checkRole(role.ROLES.Admin), getAllUserAccounts);

router
    .route('/:id')
    .delete(checkAuth, role.checkRole(role.ROLES.Admin), deleteUserAccount)
    .patch(checkAuth, role.checkRole(role.ROLES.Admin), deactivateAccount);

export default router;
