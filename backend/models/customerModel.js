import mongoose from 'mongoose';
import validator from 'validator';

const { Schema } = mongoose;
const { randomBytes } = await import('crypto');

const customerSchema = new Schema(
    {
        createdBy: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        name: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            lowercase: true,
            unique: true,
            validate: [
                validator.isEmail,
                'Customer must have a valid email address',
            ],
        },
        accountNo: String,
        vatTinNo: {
            type: Number,
            default: 0,
        },
        address: String,
        city: String,
        country: String,
        phoneNumber: {
            type: String,
            required: true,
            validate: {
                validator: function (v) {
                    return validator.isMobilePhone(v, 'any');
                },
                message:
                    "Your phone number must begin with a '+', followed by your country code. e.g. +919009009090",
            },
        },
    },
    {
        timestamps: true,
    }
);

customerSchema.pre('save', async function (next) {
    this.accountNo = `CUS-${randomBytes(3).toString('hex').toUpperCase()}`;
    next();
});

const Customer = mongoose.model('Customer', customerSchema);

export default Customer;
