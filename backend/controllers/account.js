const User = require('../models/user');
const Account = require('../models/account.js');
const Withdraw = require('../models/withdraw.js');
const { body, check, validationResult } = require('express-validator');
const { validateBalances } = require('../middlewares/validateBalances.js');
const coins = require("../config/coins.js");
const mongoose = require('mongoose');
mongoose.set('debug', true);

// post balance
exports.setBalance = async (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
        const errors = result.array({ onlyFirstError: true });
        return res.status(422).json({ errors });
    };
    try {
        const { username, balance } = req.body;
        // let price = 100;

        // some middleware for  validation
        // let validationResult = validateBalances(balances);
        // console.log('validationResult =>', validationResult);
        // if (!validationResult) return res.status(400).json({message: "invalid balances"});

        // Create userAccount
        // console.log('user_id =>', req.user.id);
        console.log('username =>', username);
        console.log("balances =>", balance);
        // console.log("balances =>", balances[0]);
        // console.log("balances =>", balances[1]);
        const user = await User.findOneAndUpdate({ username }, { balance });
        if (!user) {
            return res.status(400).json({ message: "username was not registered." })
        }
        res.json({ user })




        // const userAccount = {
        //     user: user._id,
        //     username,
        //     balances
        // };

        // // let account = await Account.find({user: user.id});
        // let account = await Account.findOne({ username });
        // if (account) {
        //     // Update Account
        //     account = await Account.findOneAndUpdate(
        //         { $set: balances },
        //         { new: true }
        //     );
        //     return res.json(account);
        // }
        // // Create Account
        // account = new Account(userAccount);
        // console.log("account =>", account);
        // await account.save(err => console.log(err));
        // res.json({ account });
    } catch (error) {
        res.status(400).json({ error: "Something went wrong in account controller." });
    };
};

exports.getBalance = async (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
        const errors = result.array({ onlyFirstError: true });
        return res.status(422).json({ errors });
    };
    try {
        const { username, token } = req.body;
        console.log("username =>", username);
        // const token = req.headers.authorization;
        console.log('token =>', token);
        // let account = await Account.findOne({ username });
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ message: "username was not registered." })
        }
        // let account = await Account.findOne({ user: user._id });
        const balance = user.balance;
        res.json({ balance });
    } catch (error) {
        res.status(400).json({ error: "Something went wrong with getBalance." });
    };
};
//price
exports.getPrice = async (req, res) => {
    try {
        const { price } = global;
        res.json(price);
    } catch (error) {
        res.status(400).json({ error: error.message });
    };
};

//get coins list, address, balance, price
exports.getWallet = async (req, res) => {
    try {
        //get balance from db
        const { user_id } = req.body;
        const user = await User.findOne({ _id: user_id });
        if (!user) {
            return res.status(400).json({ message: "username was not registered." })
        }
        const balance = user.balance;
        //get price from global
        const { price } = global;

        var result = {};
        for (const coin in coins) {
            let info = coins[coin]
            info.balance = balance[coin] || 0;

            let ppp = 0;
            if (price) ppp = Number(price[coin]);
            if (coin == 'USDT') ppp = 1;
            info.price = ppp;

            result[coin] = info
        }
        return res.json({ success: true, data: result })


    } catch (error) {
        res.status(400).json({ error: error.message });
    };
};

// post withdraw
exports.withdraw = async (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
        const errors = result.array({ onlyFirstError: true });
        return res.status(422).json({ errors });
    };
    try {
        // console.log(req.params);
        // { username: 'admin', code: 'USDC', address: '0x123', amount: '10' }
        const { user_id, code, address, amount } = req.body;
        console.log(req.body);
        console.log(amount);

        let newWithdraw = new Withdraw({ user_id, code, address, amount: Number(amount) });
        await newWithdraw.save(err => console.log(err));
        res.json({ withdraw: newWithdraw });
        // }
        // let updateWithdraw = await Withdraw.findOneAndUpdate({username}, {code, address, amount: Number(amount)});
        // res.json({ withdraw: updateWithdraw });
        // res.json({message: "ok"});
    } catch (error) {
        res.status(400).json({ error: "Something went wrong with withdraw." });
    };
};

// exports.find = async (req, res, next) => {
//     try {
//         const users = await User.findOne({ username: req.params.username });
//         res.json(users);
//     } catch (error) {
//         next(error);
//     }
// };

exports.validateAccount = [
    check('username', 'Username is required').not().isEmpty(),

    body('balance')
        .exists()
        // .trim()
        .withMessage('balance is required')

        // .isArray().withMessage('balances is not array')

        .notEmpty()
        .withMessage('cannot be blank'),

    // body('balances.*')

    //     .isLength({ min: 6 })
    //     .withMessage('must be at least 6 characters long')

    //     .isLength({ max: 50 })
    //     .withMessage('must be at most 50 characters long')
];