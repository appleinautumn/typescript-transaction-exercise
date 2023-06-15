import { Router } from 'express';

import TransactionRepository from '../repositories/transaction';
import TransactionController from '../controllers/transaction';

const repository = new TransactionRepository('data.csv');
const controller = new TransactionController(repository);

const router = Router();

router.get('/:id', controller.getTransaction);

router.get('/', controller.listTransactions);

export default router;
