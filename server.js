var express = require('express');
var path = require('path');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');
var cors = require('cors');
var app = express();

/****** import user route file ********/
const userRoute = require('./user/user.controller');
const companyRoute = require('./company/company.controller');
const contractorRoute = require('./contractor/contractor.controller');
const fileRoute = require('./file/file.controller');
const accountRoute = require ('./account/account.controller');
const fleetRoute = require ('./fleet/fleet.controller');
const journalRoute = require('./journal/journal.controller')
const driverRoute = require('./driver/driver.controller')
const employeeRoute = require('./employee/employee.controller')
const customerRoute = require('./customer/customer.controller')
const vendorRoute = require('./vendor/vendor.controller')









mongoose.set('useCreateIndex', true);
//connect to mongodb
mongoose.connect('mongodb://127.0.0.1:27017/transport', { useNewUrlParser: true });

//on successful connection
mongoose.connection.on('connected', () => {
    console.log('Connected to mongodb!!');
});


//port no
const port = 4052;

//middleware
app.use(cors());
app.use(expressValidator());
// app.use (multer());
//body-parser
app.use(bodyParser.json());

// port listen at
app.listen(port, () => {
    console.log('server started at port number :' + port);
});

/********ROUTES*******/
app.use('/user', userRoute);
app.use('/company', companyRoute);
app.use('/contractor',contractorRoute);
app.use('/file',fileRoute);
app.use('/account',accountRoute);
app.use('/fleet',fleetRoute);
app.use('/journal',journalRoute);
app.use('/driver',driverRoute);
app.use('/vendor',vendorRoute);
app.use('/customer',customerRoute);
app.use('/employee',employeeRoute);







