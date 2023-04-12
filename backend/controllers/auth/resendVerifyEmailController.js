import asyncHandler from 'express-async-handler';
import User from '../../models/UserModel.js';
import VerifyResetToken from '../../models/verifyResetTokenModel.js';
import sendEmail from '../../utils/sendEmail.js';

const domainURL = process.env.DOMAIN;
const { randomBytes } = await import('crypto');

// $-title  Resend Email Verification token
// $-path   POST /api/v1/auth/resend_email_token
// $-auth   Public

const resendEmailVerificationToken = asyncHandler(async (req, res) => {
    const { email } = req.body;

    if (!email) {
        res.status(400);
        throw new Error('An email must be provided');
    }

    const user = await User.findOne({ email });

    if (!user) {
        res.status(400);
        throw new Error('We were unable to find a user with the email address');
    }

    if (user.isEmailVerified) {
        res.status(400);
        throw new Error('This account has already been verified');
    }

    let verificationToken = await VerifyResetToken.findOne({
        _userId: user._id,
    });
    if (verificationToken) {
        await VerifyResetToken.deleteOne({ _userId: user._id });
    }

    const resentToken = randomBytes(32).toString('hex');
    let emailVerificationToken = await new VerifyResetToken({
        _userId: user._id,
        token: resentToken,
    }).save();

    const emailLink = `${domainURL}/api/v1/auth/verify/${emailVerificationToken.token}/${user._id}`;

    const payload = {
        name: user.firstName,
        link: emailLink,
    };

    await sendEmail(
        user.email,
        'Account Verification',
        payload,
        './emails/template/accountVerification.handlebars'
    );

    res.json({
        success: true,
        message: `A verification email has been sent to ${user.email}. Please verify within 15 minutes.`,
    });
});

export default resendEmailVerificationToken;
