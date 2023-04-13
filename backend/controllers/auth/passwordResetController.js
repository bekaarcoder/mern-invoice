import asyncHandler from 'express-async-handler';
import User from '../../models/UserModel.js';
import VerifyResetToken from '../../models/verifyResetTokenModel.js';
import sendEmail from '../../utils/sendEmail.js';

const domainURL = process.env.DOMAIN;
const { randomBytes } = await import('crypto');

// $-title  Send Password reset email link
// $-path   POST /api/v1/auth/reset_password_request
// $-auth   Public

const resetPasswordRequest = asyncHandler(async (req, res) => {
    const { email } = req.body;

    if (!email) {
        res.status(400);
        throw new Error('You must enter your email address');
    }

    const existingUser = await User.findOne({ email }).select(
        '-passwordConfirm'
    );
    if (!existingUser) {
        res.status(400);
        throw new Error('That email is not associated with any account');
    }

    let verificationToken = await VerifyResetToken.findOne({
        _userId: existingUser._id,
    });

    if (verificationToken) {
        await VerifyResetToken.deleteOne({ _userId: existingUser._id });
    }

    const resetToken = randomBytes(32).toString('hex');
    let newVerificationToken = await new VerifyResetToken({
        _userId: existingUser._id,
        token: resetToken,
        createdAt: Date.now(),
    }).save();

    if (existingUser && existingUser.isEmailVerified) {
        const emailLink = `${domainURL}/auth/reset_password?token=${newVerificationToken.token}&userId=${existingUser._id}`;
        const payload = {
            name: existingUser.firstName,
            link: emailLink,
        };
        await sendEmail(
            existingUser.email,
            'Password Reset Request',
            payload,
            './emails/template/requestResetPassword.handlebars'
        );
        res.status(200).json({
            success: true,
            message:
                'An email has been send to your email address with the password reset link',
        });
    }
});

// $-title  Reset Password
// $-path   POST /api/v1/auth/reset_password
// $-auth   Public

const resetPassword = asyncHandler(async (req, res) => {
    const { password, passwordConfirm, userId, emailToken } = req.body;

    if (!password) {
        res.status(400);
        throw new Error('Password is required');
    }

    if (password !== passwordConfirm) {
        res.status(400);
        throw new Error('Passwords does not match');
    }

    if (password.length < 8) {
        res.status(400);
        throw new Error('Password must be at least 8 characters long');
    }

    const existingUser = await User.findById({ _id: userId });
    if (!existingUser) {
        res.status(400);
        throw new Error('Account cannot be found with the user id');
    }

    const passwordResetToken = await VerifyResetToken.findOne({
        token: emailToken,
    });
    if (!passwordResetToken) {
        res.status(400);
        throw new Error(
            'Token is either invalid or expired. Try resetting your password again'
        );
    }

    const user = await User.findById({
        _id: passwordResetToken._userId,
    }).select('-passwordConfirm');
    if (user && passwordResetToken) {
        user.password = password;
        await user.save();

        const payload = {
            name: user.firstName,
        };

        await sendEmail(
            user.email,
            'Password Reset Success',
            payload,
            './emails/template/resetPassword.handlebars'
        );

        res.status(200).json({
            success: true,
            message: 'Password reset was successful',
        });
    } else {
        res.status(400);
        throw new Error('User ID or token is invalid');
    }
});

export { resetPasswordRequest, resetPassword };
