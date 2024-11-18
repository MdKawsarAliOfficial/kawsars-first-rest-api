const express = require("express");
const cors = require("cors");
require("./config/db");
const userRouter = require("./routes/user.route");

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true}));
app.use(express.json());
app.use('/api/users', userRouter);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/./views/index.html');
});

// handling invalid route error
app.use((req, res, next) => {
    res.status(404).json({
        message: 'Not found',
    });
});
// handling server error
app.use((err, req, res, next) => {
    res.status(500).json({
        message: 'Something Broke',
    });
});

module.exports = app;

// api/users : GET
// api/users/:id : GET
// api/users/ : POST
// api/users/:id : PATCH
// api/users/:id : DELETE