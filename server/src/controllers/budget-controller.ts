import { Response, Request, NextFunction } from 'express';
import { ReqUser } from '../types/user';
import Budget from '../models/budget.model';
import mongoose, { Schema } from 'mongoose';
export const budgetGet = (req: Request, res: Response, next: NextFunction) => {
    const reqUser = req.user as ReqUser
    Budget.find({ user: reqUser._id }
    ).then((docs) => { res.send({ "budget_list": docs }) }).catch((err: Error) => {
        res.statusCode = 500
        res.send("internal server error")
        next(err)
    })
}

export const budgetUpdate = (req: Request, res: Response, next: NextFunction) => {

    const update = {
        transaction_name: req.body.transaction_name, price: req.body.price, transaction_date: req.body.transaction_date
    }
    Budget.findByIdAndUpdate({ _id: new mongoose.Types.ObjectId(req.body.object_id) }, update).then((budget: any) => {
        res.statusCode = 200;
        res.send({ success: true });
        console.log(budget)
    }).catch((err) => {
        res.statusCode = 400;
        res.send("bad request")
        next(err);
    }
    )

}

export const budgetDelete = (req: Request, res: Response, next: NextFunction) => {

    Budget.findByIdAndDelete(req.body.object_id).then((budget: any) => {
        res.statusCode = 204;
        res.send({ success: true });
        console.log(budget)
    }).catch((err) => {
        res.statusCode = 400;
        res.send("bad request")
        next(err);
    }
    )

}
export const budgetAdd = (req: Request, res: Response, next: NextFunction) => {
    Budget.create(new Budget({ _id: new mongoose.Types.ObjectId(), transaction_name: req.body.transaction_name, transaction_date: new Date(req.body.transaction_date), price: req.body.price })).then((budget: any) => {
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