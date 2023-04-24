import asyncHandler from 'express-async-handler';
import Customer from '../../models/customerModel.js';

// $-title  Delete Customer
// $-path   DELETE /api/v1/customer/:id
// $-auth   Private

const deleteCustomer = asyncHandler(async (req, res) => {
    const customer = await Customer.findById(req.params.id);
    const { accountNo } = customer;

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

    await Customer.deleteOne({ _id: req.params.id });

    res.status(200).json({
        success: true,
        message: `${accountNo} has been deleted successfully`,
    });
});

export default deleteCustomer;
