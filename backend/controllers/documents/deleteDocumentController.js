import asyncHandler from 'express-async-handler';
import Document from '../../models/documentModel.js';

// $-title  Delete A Single Document
// $-path   DELETE /api/v1/document/:id
// $-auth   Private

const deleteDocument = asyncHandler(async (req, res) => {
    const document = await Document.findById(req.params.id);
    const { documentNumber, documentType } = document;

    if (!document) {
        res.status(404);
        throw new Error('Document does not exist.');
    }

    if (document.createdBy.toString() !== req.user.id) {
        res.status(401);
        throw new Error('You are not authorized to delete this document.');
    }

    await Document.deleteOne({ _id: req.params.id });

    res.status(200).json({
        success: true,
        message: `${documentType} no. ${documentNumber} has been deleted successfully`,
    });
});

export default deleteDocument;
