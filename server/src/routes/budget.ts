import express, { Response, Request, NextFunction } from 'express';
import { verifyUser } from '../middleware/authentication';
import { budgetAdd, budgetGet } from '../controllers/budget-controller';

const budgetRouter = express.Router();


budgetRouter.get('/',verifyUser,budgetGet);
budgetRouter.post('/',verifyUser,budgetAdd);
budgetRouter.delete('/',verifyUser);

export default budgetRouter;