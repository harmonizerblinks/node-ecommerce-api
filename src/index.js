const express = require('express');
const mongoose = require('mongoose');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const http = require('http');
const socketIO = require('socket.io');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const passport = require('passport');
const path = require('path');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// initialize the app
const app = express();

const PORT = process.env.PORT || 4000;

// Configuring the database
const Config = require('./config/mongodb.config.js');

mongoose.Promise = global.Promise;

// mongo configuration
mongoose.set('useCreateIndex', true);
mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);
mongoose.set('useFindAndModify', true);

// Connecting to the database
mongoose.connect(Config.url)
    .then(() => {
        console.log("Successfully connected to MongoDB.");
    }).catch(err => {
        console.log('Could not connect to MongoDB.');
        process.exit();
    });

// defining the Middleware
app.use(cors());

// Bodyparser Middleware
app.use(bodyParser.json());

app.use(fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 },
    useTempFiles: true,
    tempFileDir: '/tmp/'
}));
// Set the static folder
app.use('/public', express.static(path.join(__dirname, '../public')))

// Bodyparser Middleware
// app.use(bodyParser.json({ limit: '10kb' }));

// Helmet
app.use(helmet());
// Rate Limiting
const limit = rateLimit({
    max: 100, // max requests
    windowMs: 60 * 60 * 1000, // 1 Hour of 'ban' / lockout 
    message: 'Too many requests' // message to send
});
app.use('/routeName', limit); // Setting limiter on specific route
// Body Parser
app.use(express.json({ limit: '1000kb' })); // Body limit is 10

// Data Sanitization against NoSQL Injection Attacks
app.use(mongoSanitize());
// Data Sanitization against XSS attacks
app.use(xss());

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

console.log('working')

// require('./config/authguard.config.js')(passport);
require('./routes/customers.routes.js')(app);
require('./routes/brands.routes.js')(app);
require('./routes/branch.routes.js')(app);
require('./routes/category.routes.js')(app);
require('./routes/brands.routes.js')(app);
require('./routes/blogs.routes.js')(app);
require('./routes/users.routes.js')(app);
require('./routes/products.routes.js')(app);
require('./routes/website.routes.js')(app);

// Api Documentation Setup
const swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: 'E-Commerce Api',
            description: 'Complete E-Commerce and Inventory Api',
            contact: {
                name: 'Harmony Alabi',
            },
            servers: ["http://localhost:" + PORT]
        },
    },
    apis: ["./routes/*.routes.js"]
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Handler for 404 - Resource Not Found
app.use((req, res, next) => {
    res.status(404).send({ message: 'We think you are lost!' });
})

// Handler for Error 500
app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send({ message: 'Internal Server error!' });
    // res.sendFile(path.join(__dirname, '../public/500.html'))
})

// Create a Server
var server = app.listen(PORT, function() {

    var host = server.address().address
    var port = server.address().port

    console.log("App listening at http://%s:%s", host, port)

});

var io = require('socket.io')(server);

io.on('connection', function(socket) {
    socket.on('message', function(msg) {
        io.emit('message', msg);
    });
});