const validateBalances = (balances) => {
    // const { balances } = req.body;
    // "balances": [
    //     {
    //    //     "_id": "6407f9ca9d8db63c04d713e1",
    //         "code": "BTC",
    //         "address": "0x123",
    //         "balance": 12,
    //         "price": 23000
    //     },
    let result = false;
    if (!balances || balances.length == 0) {
        // return res.status(401).json({ message: 'balances array does not exist nor contain any objects.' });
        return false;
    } else {

    // try {
        
        for (let i = 0; i < balances.length; i++) {
            const element = balances[i];
            if (element?.code.toLowerCase() in ['btc', 'eth', 'usdt', 'usdc']) {
                result = true;
            };
        }

        // if (result) {
        //     next();
        // } else {
        //     return res.status(401).json({message: "Contains invalid balances"});
        // }

        return result;
    // } catch (error) {
        // return res.status(401).json({
        //     message: error.message
        // });
    //     return false;
    // };
    };
};

module.exports = validateBalances();