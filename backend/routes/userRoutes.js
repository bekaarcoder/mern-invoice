import express from 'express';
import getUserProfile from '../controllers/user/getUserProfileController.js';
import checkAuth from '../middleware/checkAuthMiddleware.js';
import updateUserProfile from '../controllers/user/updateUserProfileController.js';
import deleteUserProfile from '../controllers/user/deleteAccountController.js';

const router = express.Router();

router
    .route('/profile')
    .get(checkAuth, getUserProfile)
    .patch(checkAuth, updateUserProfile)
    .delete(checkAuth, deleteUserProfile);

export default router;
