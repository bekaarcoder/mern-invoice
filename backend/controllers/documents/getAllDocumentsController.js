import asyncHandler from 'express-async-handler';
import Document from '../../models/documentModel.js';

// $-title  Get All Documents
// $-path   GET /api/v1/document/all
// $-auth   Private

const getAllDocuments = asyncHandler(async (req, res) => {
    const pageSize = 10;
    const page = Number(req.query.pageNumber) || 1;
    const count = await Document.countDocuments({ createdBy: req.user._id });
    const documents = await Document.find({ createdBy: req.user._id })
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
        documents: documents,
    });
});

export default getAllDocuments;
