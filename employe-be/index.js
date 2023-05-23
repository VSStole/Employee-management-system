var express = require('express');
  var cityRouter = require('./route/cities');
 var userRouter = require('./route/users');
const cors = require('cors');
 var manufacturerRouter = require('./route/manufacturer');

const port = 3000;
var app = express();
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:4200'
}));

// Bind route with path
  app.use('/city', cityRouter);
 app.use('/user', userRouter);
 app.use('/manufacturer', manufacturerRouter);

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    console.error(err.message, err.stack);
    res.status(statusCode).json({ message: err.message });
    return;
});


app.listen(port, () => {
    console.log(` application is up and running at http://localhost:${port}`);
});