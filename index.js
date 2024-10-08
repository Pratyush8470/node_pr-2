const express = require('express');
const app = express();
const path = require('path');
const env = require('dotenv').config();
const port = process.env.PORT || 3000;
const Path = path.join(__dirname, 'views/');
const router = require('./router/index.js')
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const db = require("./model/db/config");
const passport = require('passport');


app.set('view engine', 'ejs');
app.set('views', Path);


app.use(require('express-session')({ secret: 'secrethello', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

app.use(bodyParser.urlencoded({ extended: false }));
app.use("/public", express.static(path.join(__dirname, "/public")));
app.use(bodyParser.json());
app.use(express.static(Path));
app.use(cookieParser());

app.use('/', router);

app.listen(port, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log(`Server running on port http://localhost:${port}`);
    }
});