import express from 'express';
import checkAuth from '../middleware/checkAuthMiddleware.js';
import createDocument from '../controllers/documents/createDocumentController.js';
import updateDocument from '../controllers/documents/updateDocumentController.js';
import deleteDocument from '../controllers/documents/deleteDocumentController.js';
import getAllDocuments from '../controllers/documents/getAllDocumentsController.js';
import getDocument from '../controllers/documents/getDocumentController.js';

const router = express.Router();

router.route('/create').post(checkAuth, createDocument);

router.route('/all').get(checkAuth, getAllDocuments);

router
    .route('/:id')
    .get(checkAuth, getDocument)
    .patch(checkAuth, updateDocument)
    .delete(checkAuth, deleteDocument);

export default router;
