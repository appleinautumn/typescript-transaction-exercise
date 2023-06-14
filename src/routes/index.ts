import { Router } from 'express';

import { getTransaction, listTransactions } from '../controllers/transaction';

const router = Router();

router.get('/:id', getTransaction);

router.get('/', listTransactions);

export default router;
