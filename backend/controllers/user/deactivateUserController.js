import asyncHandler from 'express-async-handler';
import User from '../../models/UserModel.js';

// $-title  Deactivate User Account
// $-path   PATCH /api/v1/user/:id
// $-auth   Private/Admin

const deactivateAccount = asyncHandler(async (req, res) => {
    const userId = req.params.id;

    const user = await User.findById(userId);
    if (user) {
        user.active = false;
        const updatedUser = await user.save();

        res.status(200).json({
            success: true,
            updatedUser,
        });
    } else {
        res.status(400);
        throw new Error(`User not found with id ${userId}`);
    }
});

export default deactivateAccount;
