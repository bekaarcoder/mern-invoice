import asyncHandler from 'express-async-handler';
import Customer from '../../models/customerModel.js';

// $-title  Create Customer
// $-path   POST /api/v1/customer/create
// $-auth   Private

const createCustomer = asyncHandler(async (req, res) => {
    const { name, email, vatTinNo, address, city, country, phoneNumber } =
        req.body;

    if (!email || !name || !phoneNumber) {
        res.status(400);
        throw new Error(
            'Customer must have at least a name, email and phone number'
        );
    }

    const customerExists = await Customer.findOne({ email });

    if (customerExists) {
        res.status(400);
        throw new Error('Customer already exists.');
    }

    const newCustomer = new Customer({
        createdBy: req.user._id,
        name,
        email,
        phoneNumber,
        vatTinNo,
        address,
        city,
        country,
    });

    const createdCustomer = await newCustomer.save();

    if (!createdCustomer) {
        res.status(400);
        throw new Error('Customer could not be created');
    }

    res.status(201).json({
        success: true,
        message: `Customer ${createdCustomer.accountNo} was created successfully`,
        createdCustomer,
    });
});

export default createCustomer;
