import asyncHandler from 'express-async-handler';
import User from '../../models/UserModel.js';

// $-title  Delete User Account
// $-path   DELETE /api/v1/user/profile
// $-auth   Private

const deleteUserProfile = asyncHandler(async (req, res) => {
    const userId = req.user._id;

    await User.findByIdAndDelete(userId);

    res.status(200).json({
        success: true,
        message: 'Your account has been deleted successfully',
    });
});

export default deleteUserProfile;
