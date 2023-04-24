import asyncHandler from 'express-async-handler';
import Customer from '../../models/customerModel.js';

// $-title  Get All Customer
// $-path   GET /api/v1/customer/all
// $-auth   Private

const getAllCustomer = asyncHandler(async (req, res) => {
    const pageSize = 10;
    const page = Number(req.query.pageNumber) || 1;
    const count = await Customer.countDocuments({ createdBy: req.user._id });
    const customers = await Customer.find({ createdBy: req.user._id })
        .sort({
            createdAt: -1,
        })
        .limit(pageSize)
        .skip(pageSize * (page - 1))
        .lean();

    res.status(200).json({
        success: true,
        totalCustomers: count,
        numberOfPages: Math.ceil(count / pageSize),
        customers: customers,
    });
});

export default getAllCustomer;
