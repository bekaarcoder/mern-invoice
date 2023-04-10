import mongoose from 'mongoose';

const { Schema } = mongoose;

const verifyResetTokenSchema = new Schema({
    _userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    token: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now,
        expired: 900, // 900s (15 mins)
    },
});

const VerifyResetToken = mongoose.model(
    'VerifyResetToken',
    verifyResetTokenSchema
);

export default VerifyResetToken;
