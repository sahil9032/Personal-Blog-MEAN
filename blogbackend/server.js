let express, path, mongoose, cors, bodyParser, dbConfig, multer;
express = require('express');
path = require('path');
mongoose = require('mongoose');
cors = require('cors');
bodyParser = require('body-parser');
dbConfig = require('./database/db');
multer = require('multer');

var storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, '../Blog/src/assets/img');
    },
    filename: function (req, file, callback) {
        callback(null, file.originalname);
    }
});

var upload = multer({storage: storage}).single('image');

mongoose.Promise = global.Promise;
mongoose.connect(dbConfig.db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
}).then(() => {
        console.log('Database sucessfully connected')
    },
    error => {
        console.log('Database could not connected: ' + error)
    }
)

const postRoute = require('./routes/post.route')
const accountRoute = require('./routes/accounts.route')
const app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cors());

app.post('/upload', function (req, res) {
    upload(req, res, function (err) {
        if (err) {
            console.log("error");
            return res.end("Error uploading file.");
        }
        return res.json({
            "msg": "Sucess"
        })
    });
});
app.use('/post', postRoute)
app.use('/account', accountRoute)

const port = process.env.PORT || 4000;
const server = app.listen(port, () => {
    console.log('Connected to port ' + port)
})

app.use(function (err, req, res, next) {
    console.error(err.message);
    if (!err.statusCode) err.statusCode = 500;
    res.status(err.statusCode).send(err.message);
});
