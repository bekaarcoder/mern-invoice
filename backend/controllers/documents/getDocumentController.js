import asyncHandler from 'express-async-handler';
import Document from '../../models/documentModel.js';

// $-title  Get A Single Document
// $-path   GET /api/v1/document/:id
// $-auth   Private

const getDocument = asyncHandler(async (req, res) => {
    const document = await Document.findById(req.params.id);

    if (!document) {
        res.status(404);
        throw new Error('Document does not exist.');
    }

    if (document.createdBy.toString() !== req.user.id) {
        res.status(401);
        throw new Error(
            "You are not authorized to get this document's information."
        );
    }

    res.status(200).json({
        success: true,
        document,
    });
});

export default getDocument;
