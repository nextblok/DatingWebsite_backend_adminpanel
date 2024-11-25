const {
  validateNewUser,
  validateUser,
  register,
  login,
  listUsers,
  search,
  find
} = require('./controllers/users.js');
const { validateAccount, setBalance, getBalance, withdraw, getPrice, getWallet } = require('./controllers/account.js');
const maincontroller = require('./controllers/maincontroller.js');
const admincontroller = require('./controllers/admincontroller');

const { validateBalances } = require('./middlewares/validateBalances.js');

const requireAuth = require('./middlewares/requireAuth');

const multer = require('multer');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
  filename: function (req, file, cb) {
    let exploded_name = file.originalname.split(".");
    let ext = exploded_name[exploded_name.length - 1];
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix + '.' + ext)
  }
})
const upload = multer({ storage: storage })


const router = require('express').Router();
const path = require('path');

router.get('/ping', maincontroller.ping);
router.get('/test', maincontroller.test);
router.get('/initialize', maincontroller.initialize);

//authentication
router.post('/register', [upload.single('avatar'), validateNewUser], register);
router.post('/login', validateUser, login);

//like
router.post('/user/get', maincontroller.getUser);
router.post('/user/update', maincontroller.updateUser);

//like
router.post('/like/create', maincontroller.createLike);
router.post('/like/get', maincontroller.getLike);


// user account balance
router.post('/balance', validateAccount, setBalance);
router.post('/get-balance', requireAuth, getBalance);
router.post('/get-price', [], getPrice);
router.post('/get-wallet', [], getWallet);


//users
router.get('/users', listUsers);
router.get('/users/:search', search);
router.get('/user/:username', find);

//orders
router.get('/order/get', maincontroller.getorders);
router.post('/order/get', maincontroller.getorders);
router.post('/order/place', maincontroller.placeorder);
router.post('/order/create', maincontroller.createorder);
router.post('/order/update', maincontroller.updateorder);
router.post('/order/delete', maincontroller.deleteorder);
router.post('/order/new', maincontroller.newOrder);

// withdraw operation
router.post('/withdraw', requireAuth, withdraw);
router.post('/withdrawal/get', maincontroller.getWithdrawals);
router.post('/withdrawal/upsert', maincontroller.updatewithdrawal);
router.post('/withdrawal/delete', maincontroller.deletewithdrawal);

//deposit
router.post('/deposit/get', maincontroller.getdeposits);
router.post('/deposit/create', maincontroller.createdeposit);
router.post('/deposit/delete', maincontroller.deletedeposit);

//admin panel 
router.post('/admin/login', admincontroller.login);
router.post('/appuser/get', admincontroller.appuser_get);
router.post('/appuser/upsert', [], admincontroller.appuser_upsert);
router.post('/appuser/delete', [], admincontroller.appuser_delete);
router.post('/appuser/updateAvatar', upload.single('avatar'), admincontroller.appuser_updateAvatar);
router.post('/appuser/export', [], admincontroller.appuser_export);
router.post('/appuser/changePassword', [], admincontroller.appuser_changePassword);

// Features API
router.post('/feature/get', admincontroller.feature_get);
router.post('/feature/upsert', admincontroller.feature_upsert);

module.exports = (app) => {
  app.use('/api', router);
  app.get('*', function (req, res) {
    res.sendFile(path.resolve(__dirname, 'adminpanel/build', 'index.html'));
  });

  app.use((req, res, next) => {
    const error = new Error('API Not found');
    error.status = 404;
    next(error);
  });

  app.use((error, req, res, next) => {
    console.log(error)
    res.status(error.status || 500).json({
      message: error.message
    });
  });
};
