import express from 'express';
import { tennisController } from '../controllers/tennisController.js';
import { validateTennis } from '../middlewares/validaTennis.js';

const router = express.Router();

router.get('/', tennisController.getAllTennis);
router.get('/:id', tennisController.getTennisById);
router.post('/', validateTennis, tennisController.createTennis);
router.put('/:id', validateTennis, tennisController.updateTennis);
router.delete('/:id', tennisController.deleteTennis);

export default router;