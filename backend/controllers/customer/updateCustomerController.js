import asyncHandler from 'express-async-handler';
import Customer from '../../models/customerModel.js';

// $-title  Update Customer
// $-path   PATCH /api/v1/customer/:id
// $-auth   Private

const updateCustomer = asyncHandler(async (req, res) => {
    console.log(req.user);
    const customer = await Customer.findById(req.params.id);

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

    const { id: _id } = req.params;
    const fieldsToUpdate = req.body;

    const updatedCustomerInfo = await Customer.findByIdAndUpdate(
        _id,
        { ...fieldsToUpdate },
        { new: true, runValidators: true }
    );

    res.status(200).json({
        success: true,
        message: `${updatedCustomerInfo.accountNo} details was successfully updated`,
        updatedCustomerInfo,
    });
});

export default updateCustomer;
