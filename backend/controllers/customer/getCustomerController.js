import asyncHandler from 'express-async-handler';
import Customer from '../../models/customerModel.js';

// $-title  Get A Single Customer
// $-path   GET /api/v1/customer/:id
// $-auth   Private

const getCustomer = asyncHandler(async (req, res) => {
    const customer = await Customer.findById(req.params.id);
    console.log(customer.id);
    console.log(req.user.id);
    if (customer.id === req.user.id) {
        console.log('true');
    } else {
        console.log('false');
    }

    if (!customer) {
        res.status(404);
        throw new Error('Customer does not exist.');
    }

    if (customer.createdBy.toString() !== req.user.id) {
        res.status(401);
        throw new Error(
            "You are not authorized to update this customer's information."
        );
    }

    res.status(200).json({
        success: true,
        customer,
    });
});

export default getCustomer;
