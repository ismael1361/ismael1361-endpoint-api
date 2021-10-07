const express = require("express");
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');

const controllers = require("./controllers");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type, X-Requested-With, Origin');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
    next();
});

app.use(cors({
    credentials: true,
    origin: true
}));
app.options('*', cors());

app.use(function(err, req, res, next) {
  console.error(err.stack);
  next(err);
});

app.use(function (err, req, res, next) {
  if (req.xhr) {
    res.status(500).send({ error: 'Something failed!' });
  } else {
    next(err);
  }
});

app.use(function (err, req, res, next) {
  res.status(500);
  res.render('error', {
        version: "1.0",
        code: -1,
        description: "Convocação inválida!",
        error: err
    });
});

controllers(app);

app.listen(process.env.PORT || 3000, () =>
    console.log("Server is running @3000 ...")
);
