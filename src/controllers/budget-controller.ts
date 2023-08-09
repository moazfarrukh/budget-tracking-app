import { Response, Request, NextFunction } from 'express';
import { ReqUser } from '../types/user';
import Budget from '../models/budget.model';
export const budgetGet = (req: Request, res: Response, next: NextFunction) => {
    const reqUser = req.user as ReqUser
    Budget.find({ user: reqUser._id }
    ).then((docs)=>{console.log(docs)}).catch((err:Error)=>{
        res.statusCode = 500
        res.send("internal server error")
    })
}

export const budgetAdd = (req: Request, res: Response, next: NextFunction) => {
    if (!req.body.transaction_name) {
        res.statusCode = 400;
        res.send({
            name: "No transaction name Error",
            message: "The transaction_name is required",
        })
    }
    else if (!req.body.transaction_date) {
        res.statusCode = 400;
        res.send({
            name: "No transaction date Error",
            message: "The transaction_date  is required",
        })
    }
    else if (!req.body.price) {
        res.statusCode = 400;
        res.send({
            name: "No price Error",
            message: "The price field is required",
        })
    }
    else {
        Budget.create(new Budget({ transaction_name: req.body.transaction_name, transaction_date: new Date(req.body.transaction_date), price: req.body.price })).then((budget: any) => {
            const reqUser = req.user as ReqUser;
            budget.user = reqUser._id;
            budget.save().then(() => {
                res.statusCode = 201;
                res.send({ success: true });
            }
            ).catch((err: Error) => {
                res.statusCode = 500;
                res.send("internal server error")
                next(err);
            })

        }).catch((err) => {
            res.statusCode = 400;
            res.send("bad request")
            next(err);
        }
        )
    }
}