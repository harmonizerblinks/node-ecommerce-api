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

var morgan = require('morgan');
const processImage = require('express-processimage');

const fs = require("fs");
const Sharp = require('sharp');

// initialize the app
const app = express();

global.appRoot = path.resolve(__dirname);

const PORT = process.env.PORT || 4000;

// Configuring the database
const Config = require('./config/mongodb.config.js');

mongoose.Promise = global.Promise;

// mongo configuration
mongoose.set('useCreateIndex', true);
mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);
mongoose.set('useFindAndModify', false);

// Connecting to the database
mongoose.connect(Config.url)
    .then((data) => {
        // console.log(data);
        console.log("Successfully connected to MongoDB.");
    }).catch(err => {
        console.log('Could not connect to MongoDB.');
        process.exit();
    });

// defining the Middleware
app.use(cors());

app.use(fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 },
    useTempFiles: true,
    tempFileDir: '/tmp/'
}));

// Body Parser
app.use(express.json({ limit: '30mb' })); // Body limit is 30Mb

// Set the static folder
// const resize = require('./middleware/resize.js');

// app.use('/public/items/:img', resize.resizeImage);
// const Media = require('./middleware/image_render.js');

// app.get('/public/items/:img', (req, res) => {
//     if (req.params.img) {
//         console.log(req._parsedUrl.pathname);
//         // const img = 'public/items/' + req.params.img;
//         // console.log(img);
//         let image = new Media(req._parsedUrl.pathname);
//         image.thumb(req, res);
//     } else {
//         res.sendStatus(403);
//     }
// });
// console.log(__dirname)
let root = path.join(__dirname, '../public')
app.use(morgan('dev'));
// app.use(processImage({ root: root })); //New line
// app.use(express.static('public'));
app.use(processImage({ root: root }));

app.set('view engine', 'jade');
app.set('port', PORT);

app.use('/public', express.static(path.join(__dirname, '../public')));
// image resizer library
// const resizer = require('resize-as-a-service');
// const conf = {
//     imagesFolder: path.resolve(__dirname, 'public', 'resized'),
//     originalsFolder: path.resolve(__dirname, 'public', 'items'),
//     apiRoute: '/api'
// };
// app.use('/public', resizer.create(conf))
//     .use(function(req, res) {
//         res.end('You probably thought this was a path to a real image... Nope. Chuck Testa!');
//     });

// Bodyparser Middleware
// app.use(bodyParser.json({ limit: '10kb' }));

// Helmet
app.use(helmet());
// Rate Limiting
const limit = rateLimit({
    max: 1000, // max requests
    windowMs: 60 * 60 * 1000, // 1 Hour of 'ban' / lockout 
    message: 'Too many requests' // message to send
});
// app.use('/api', limit); // Setting limiter on specific route

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
require('./routes/gallery.routes.js')(app);
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

app.get('/public', function(req, res, next) {
    res.render('index');
});

// Handler for 404 - Resource Not Found
app.use((req, res, next) => {
    res.status(404).send({ message: 'We think you are lost!' });
});

// Handler for Error 500
app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send({ message: 'Internal Server error!' });
    // res.sendFile(path.join(__dirname, '../public/500.html'))
});

// Create a Server
var server = app.listen(PORT, function(data) {
    console.log(data);
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