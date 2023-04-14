import asyncHandler from 'express-async-handler';
import User from '../../models/UserModel.js';

// $-title  Delete User Account
// $-path   GET /api/v1/user/:id
// $-auth   Private/Admin

const deleteUserAccount = asyncHandler(async (req, res) => {
    const userId = req.params.id;

    const user = await User.findById(userId);
    console.log(user instanceof User);
    if (user) {
        await User.deleteOne({ _id: userId });

        res.status(200).json({
            success: true,
            message: `Account deleted with user id ${userId}`,
        });
    } else {
        res.status(400);
        throw new Error(`User not found with user id ${userId}`);
    }
});

export default deleteUserAccount;
