import asyncHandler from 'express-async-handler';
import User from '../../models/UserModel.js';

// $-title  Update User Profile
// $-path   PATCH /api/v1/user/profile
// $-auth   Private

const updateUserProfile = asyncHandler(async (req, res) => {
    const userId = req.user._id;

    // List of fiels to remove
    const fieldsToRemove = [
        'email',
        'isEmailVerified',
        'provider',
        'roles',
        'googleID',
        'password',
        'passwordConfirm',
    ];

    const user = await User.findById(userId);

    if (!user) {
        res.status(400);
        throw new Error('User does not exist');
    }

    fieldsToRemove.forEach((field) => {
        if (field in req.body) {
            delete req.body[field];
        }
    });

    const fieldsToUpdate = req.body;

    const updatedProfile = await User.findByIdAndUpdate(
        userId,
        { ...fieldsToUpdate },
        {
            new: true,
            runValidators: true,
        }
    ).select('-refreshToken');

    res.status(200).json({
        success: true,
        message: 'Profile is successfully updated',
        updatedProfile,
    });
});

export default updateUserProfile;
