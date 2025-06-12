import express from 'express';
import {
    getCart,
    createOrUpdateCart,
    updateCart,
    deleteCart,
} from '../controllers/cartController.js';

const router = express.Router();

router.get('/:id', getCart);
router.post('/', createOrUpdateCart);
router.put('/:id', updateCart);
router.delete('/:id', deleteCart);

export default router;
