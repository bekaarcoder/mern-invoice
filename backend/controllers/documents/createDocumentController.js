import asyncHandler from 'express-async-handler';
import Document from '../../models/documentModel.js';
import Customer from '../../models/customerModel.js';

// $-title  Create Document
// $-path   POST /api/v1/document/create
// $-auth   Private

const createDocument = asyncHandler(async (req, res) => {
    const customer = await Customer.findOne({ createdBy: req.user._id });

    if (!customer) {
        res.status(404);
        throw new Error(
            'Customer does not exist for the current logged in user'
        );
    }

    if (customer.createdBy.toString() !== req.user._id.toString()) {
        res.status(401);
        throw new Error(
            'You are not authorized to create document for this customer'
        );
    }

    const fieldsToCreate = req.body;

    const newDocument = new Document({
        createdBy: req.user._id,
        ...fieldsToCreate,
    });

    const createdDocument = await newDocument.save();

    if (!createDocument) {
        res.status(400);
        throw new Error('Document could not be created');
    }

    res.status(200).json({
        success: true,
        newDocument,
    });
});

export default createDocument;
