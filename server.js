const express = require("express");
// const session = require("express-session");
// const passport = require("./config/passport");
const logger = require("morgan");
const mongoose = require("mongoose");
// const compression = require("compression");

require("dotenv").config();

const PORT = process.env.PORT || 3001;

const app = express();

//body-parser for url encoding and json
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//morgan logger
app.use(logger("dev"));
//compression for photos
// app.use(compression());
//session info
app.use(
    session({ secret: process.env.SESSION_SECRET, resave: true, saveUninitialized: true })
);
app.use(passport.initialize());
app.use(passport.session());

if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
}

mongoose.connect(
    process.env.MONGODB_URI || "mongodb://localhost/monthlybudgetapp",
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
    }
);

// routes
require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

app.listen(PORT, () => {
    console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});
