import express, { Response, Request, NextFunction } from 'express';
import { verifyUser } from '../middleware/authentication';
import { budgetAdd, budgetDelete, budgetGet, budgetUpdate, getBudgetAnalytics } from '../controllers/budget-controller';

const budgetRouter = express.Router();


budgetRouter.get('/', verifyUser, budgetGet);
budgetRouter.post('/', verifyUser, budgetAdd);
budgetRouter.delete('/', verifyUser, budgetDelete);
budgetRouter.put('/', verifyUser, budgetUpdate);
budgetRouter.get('/analytics', verifyUser, getBudgetAnalytics);

export default budgetRouter;