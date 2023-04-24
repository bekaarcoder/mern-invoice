import express from 'express';
import checkAuth from '../middleware/checkAuthMiddleware.js';
import createCustomer from '../controllers/customer/createCustomerController.js';
import updateCustomer from '../controllers/customer/updateCustomerController.js';
import deleteCustomer from '../controllers/customer/deleteCustomerController.js';
import getAllCustomer from '../controllers/customer/getAllCustomersController.js';
import getCustomer from '../controllers/customer/getCustomerController.js';

const router = express.Router();

router.route('/create').post(checkAuth, createCustomer);

router.route('/all').get(checkAuth, getAllCustomer);

router
    .route('/:id')
    .get(checkAuth, getCustomer)
    .patch(checkAuth, updateCustomer)
    .delete(checkAuth, deleteCustomer);

export default router;
