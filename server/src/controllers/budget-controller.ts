import { Response, Request, NextFunction } from 'express';
import { ReqUser } from '../types/user';
import Budget from '../models/budget.model';
export const budgetGet = (req: Request, res: Response, next: NextFunction) => {
    const reqUser = req.user as ReqUser
    Budget.find({ user: reqUser._id }
    ).then((docs) => { res.send({ "budget_list": docs }) }).catch((err: Error) => {
        res.statusCode = 500
        res.send("internal server error")
    })
}

export const budgetUpdate = (req: Request, res: Response, next: NextFunction) => {

    Budget.findByIdAndUpdate(req.body.object_id, new Budget({ transaction_name: req.body.transaction_name, transaction_date: new Date(req.body.transaction_date), price: req.body.price })).then((budget: any) => {
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

export const budgetDelete = (req: Request, res: Response, next: NextFunction) => {

    Budget.findByIdAndDelete(req.body.object_id).then((budget: any) => {
        res.statusCode = 204;
        res.send({ success: true });

    }).catch((err) => {
        res.statusCode = 400;
        res.send("bad request")
        next(err);
    }
    )

}
export const budgetAdd = (req: Request, res: Response, next: NextFunction) => {

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