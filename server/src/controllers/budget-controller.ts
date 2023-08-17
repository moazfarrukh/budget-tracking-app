import { Response, Request, NextFunction } from 'express';
import { ReqUser } from '../types/user';
import Budget from '../models/budget.model';
import mongoose, { Schema } from 'mongoose';
import moment from 'moment';
import userModel from "../models/user.model";



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

export const getBudgetAnalytics = async (req: Request, res: Response, next: NextFunction) => {
    const reqUser = req.user as ReqUser
    const start_date = new Date();
    start_date.setDate(start_date.getDate() - 365);
    const end_date = new Date();

    try {
        const analytics_data = await Budget.aggregate([{
            $match: {
                "user": reqUser._id,
                "transaction_date": {
                    "$gte": start_date,
                    "$lte": end_date,
                }

            },
        },
        {

            $group: {
                _id: { $dateToString: { format: '%m/%d/%Y', date: '$transaction_date' } },
                price: { $sum: '$price' },
            },

        },
        {
            $project: {
                date: '$_id',
                price: '$price',
            },
        },
        ])
        // create array that will store default data of all dates
        const resultData = [];
        let currentDate = new Date(start_date);

        // populate intial values
        for (let i = 0; i <= 365; i++) {
            resultData.push({ date: moment(currentDate).toDate(), price: 0 });
            currentDate.setDate(currentDate.getDate() + 1);
        }

        // replace intial data with values from database
        resultData.map((data) => {
            const found = (analytics_data.find((item) => {
                return data.date.setHours(0, 0, 0, 0) === moment(item.date).toDate().setHours(0, 0, 0, 0)
            }))

            if (found) {
                data.price = found.price;
            }
            return { price: data.price, date: data.date.toString() }
        })
        res.send({ "analytics": resultData });

    } catch (err) {
        res.statusCode = 500
        res.send("internal server error")
        next(err)

    }

}
export const getBudgetLimitState = async (req: Request, res: Response, next: NextFunction) => {

    const reqUser = req.user as ReqUser
    const start_date = new Date();
    start_date.setDate(start_date.getDate() - 30);
    const end_date = new Date();

    try {
        const totalMonthlyBudget = await Budget.aggregate([{
            $match: {
                "user": reqUser._id,
                "transaction_date": {
                    "$gte": start_date,
                    "$lte": end_date,
                }

            },
        },
        {

            $group: {
                _id: "$user",
                price: { $sum: '$price' },
            },

        },
        {
            $project: {
                price: '$price',
            },
        },
        ])
        const userInfo = await userModel.findById(reqUser._id)
        const userBudgetLimit = userInfo?.get("budget_limit");
        if (typeof userBudgetLimit === "number") {
            if (userBudgetLimit < totalMonthlyBudget[0].price) {
                res.send({ "budgetExceeded": true })

            }
            else {
                res.send({ "budgetExceeded": false })

            }
        }
        else {
            res.statusCode = 401;
            res.send("unauthorized");
        }
    } catch (err) {
        res.statusCode = 500
        res.send("internal server error")
        next(err)
    }
}


