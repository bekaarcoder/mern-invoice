import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';
import User from '../../models/UserModel.js';
import { systemLogs } from '../../utils/Logger.js';

// $-title  Login User and generate access and refresh token
// $-path   POST /api/v1/auth/login
// $-auth   Public

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        res.status(400);
        throw new Error('Please provide an email or password');
    }

    const existingUser = await User.findOne({ email }).select('+password');

    if (!existingUser || !(await existingUser.comparePassword(password))) {
        res.status(401);
        systemLogs.error('Incorrect email or password');
        throw new Error('Incorrect email or password');
    }

    if (!existingUser.isEmailVerified) {
        res.status(400);
        throw new Error(
            'You have not verified your email. Please check your email. A verification link was sent to your registered email'
        );
    }

    if (!existingUser.active) {
        throw new Error('Your account is not active. Contact us for queries');
    }

    if (existingUser && (await existingUser.comparePassword(password))) {
        // Generate access token
        const accessToken = jwt.sign(
            {
                id: existingUser._id,
                roles: existingUser.roles,
            },
            process.env.JWT_ACCESS_SECRET_KEY,
            { expiresIn: '1h' }
        );

        // Generate refresh token
        const newRefreshToken = jwt.sign(
            {
                id: existingUser._id,
            },
            process.env.JWT_REFRESH_SECRET_KEY,
            { expiresIn: '1d' }
        );

        const cookies = req.cookies;
        let newRefreshTokenArray = !cookies?.jwt
            ? existingUser.refreshToken
            : existingUser.refreshToken.filter(
                  (refToken) => refToken !== cookies.jwt
              );

        if (cookies?.jwt) {
            const refreshToken = cookies.jwt;
            const existingRefreshToken = await User.findOne({
                refreshToken,
            }).exec();

            if (!existingRefreshToken) {
                newRefreshTokenArray = [];
            }

            const options = {
                httpOnly: true,
                maxAge: 24 * 60 * 60 * 1000,
                secure: true,
                sameSite: 'None',
            };

            res.clearCookie('jwt', options);
        }

        existingUser.refreshToken = [...newRefreshTokenArray, newRefreshToken];
        await existingUser.save();

        const options = {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000,
            secure: true,
            sameSite: 'None',
        };
        res.cookie('jwt', newRefreshToken, options);

        res.json({
            success: true,
            firstName: existingUser.firstName,
            lastName: existingUser.lastName,
            username: existingUser.username,
            provider: existingUser.provider,
            avatar: existingUser.avatar,
            accessToken,
        });
    } else {
        res.status(401);
        throw new Error('Invalid credentials provided');
    }
});

export default loginUser;
