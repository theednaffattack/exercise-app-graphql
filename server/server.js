// server.js

// init project
const atob = require("atob");
const bodyParser = require("body-parser");
const btoa = require("btoa");
const chalk = require("chalk");
const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const moment = require("moment");
const path = require("path");
const { ApolloServer, gql } = require("apollo-server-express");

const myNetworkInterfaces = require("./helpers/networkInterfaces");

const typeDefs = require("./graphql/schema");
const resolvers = require("./graphql/resolvers");

const { log } = console;

// const bottomLabel = log(
//   chalk
//     .bgHex("#89CFF0")
//     .hex("#36454F")
//     .bold("\n   👍🏾   inside POST /api/exercise/add   👍🏾  \n")
// );

const whitelist = [
  "http://localhost:7070",
  "http://evil.com/",
  "http://192.168.180.160:7070",
  "http://192.168.180.248:7070"
];
const corsOptions = {
  origin(origin, callback) {
    if (origin) {
      if (whitelist.indexOf(origin) !== -1) {
        console.log("origin");
        console.log(origin);
        callback(null, true);
      } else {
        console.log("not reading whitelist??????");
        console.log(origin);
        callback(null, true);

        // callback(new Error("Not allowed by CORS"));
      }
    } else {
      // callback(new Error("Can't detect Origin!!!"));
      callback(null, true);
    }
  },
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};

const { Exercise } = require("./models/Exercise");
const { ExerciseUser } = require("./models/ExerciseUser");

const app = express();

const connectionString = process.env.MONGO_ATLAS_CONNECTION_STRING.replace(
  "'",
  ""
);

const port = process.env.PORT || 8000;

const server = new ApolloServer({
  typeDefs,
  resolvers
  // playground: {
  //   // settings: {
  //   //   'editor.theme': 'light',
  //   // },
  //   // tabs: [
  //   //   {
  //   //     endpoint,
  //   //     query: defaultQuery,
  //   //   },
  //   // ],
  // }
});

server.applyMiddleware({ app });

app.use(express.static("dist"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//
// ROUTES
// http://expressjs.com/en/starter/basic-routing.html
app.get("/*", function(request, response) {
  if (request.path === "/api/exercise/log")
    return exerciseLogGet(request, response);
  response.sendFile(path.resolve(__dirname + "/../dist/index.html"), function(
    err
  ) {
    if (err) {
      response.status(500).send(err);
    }
  });
});

// app.get('/*', function(req, res) {
//   res.sendFile(path.resolve(__dirname, 'path/to/your/index.html'), function(err) {
//     if (err) {
//       res.status(500).send(err)
//     }
//   })
// })

app.get("/:hash", (req, res) => {
  const baseId = req.params.hash;
  const id = atob(baseId);
  Exercise.findOne({ _id: id }, (err, doc) => {
    if (doc) {
      res.redirect(doc.url);
    } else {
      res.redirect("/");
    }
  });
});

const findbyExerciseId = function(exercise, callback) {};

const callback = function(error, exercise) {
  if (error) return next(error);
  return res.render("exercise", exercise);
};

const exerciseLogGet = function(req, res, next) {
  console.log("view `/api/exercise/log` req object");
  if (!req.query.hasOwnProperty("_id")) {
    // console.log("whooo" + "\n" + JSON.stringify(req.query, null, 2));
    console.log("reached no _id if statement");
    return res.json({ message: "Expected a `_id` key in this request" });
  }
  const {
    _id,
    from = "2018-01-28T07:45:01.343Z",
    to = new Date(),
    limit = 20
  } = req.query;
  if (req.query == undefined || _id === "undefined" || _id === undefined) {
    return res.json({ data: "Not Found" });
  }

  Exercise.find({
    userId: _id,
    createdAt: {
      $gte: new Date(from).toISOString(),
      $lte: new Date(to).toISOString()
    }
  })
    .sort({ updatedAt: -1 })
    .limit(parseInt(limit, 10))
    .exec(function(error, docs) {
      console.log("INSIDE FIND");
      if (error) return console.error(error);
      console.log(JSON.stringify(docs));
      // return res.json({ data: { message: "suckaaaa" } });
      return res.json(docs);
    });
};

app.post("/api/user", function(req, res, next) {
  console.log("view `/api/user` req object");
  // console.log(JSON.stringify(req, null, 2));
  console.log(JSON.stringify(req.query, null, 2));
  const { _id } = req.query;

  ExerciseUser.findOne({ _id: _id }, function(error, user) {
    if (error) return next(error);
    return res.json(user);
  });
});

app.post("/api/exercise/new-user", function(req, res, next) {
  log(
    chalk
      .bgHex("#89CFF0")
      .hex("#36454F")
      .bold("\n   👍🏾   inside POST /api/exercise/new-user   👍🏾  \n")
  );
  log(req.body);

  let { username } = req.body;

  const exerciseUser = new ExerciseUser({
    username
  });
  exerciseUser.save((err, doc) => {
    // Use any CSS color name

    // crayon('#ffcc00').log('old gold');

    // Compose multiple styles using the chainable API
    // log(chalk.grey.bgGreen.bold('FROM SAVE'));

    log(
      chalk
        .bgHex("#89CFF0")
        .hex("#36454F")
        .bold("\n      SAVING EXERCISE    \n")
    );
    // guard-if statement to block execution if an error is detected
    if (err) return new Error(err); //JSON.stringify(err))
    let { username, _id } = doc;

    // log the doc returned from mongo?
    log(
      chalk
        .bgHex("#89CFF0")
        .hex("#36454F")
        .bold("\n      FROM MONGO: USER    \n" + JSON.stringify(doc, null, 2))
    );

    // otherwise log it on the console and respond
    log("saving \n", {
      username,
      status: 200,
      statusTxt: "OK"
    });
    res.send({
      username,
      _id,
      status: 200,
      statusTxt: "OK"
    });
  });
});

app.post("/api/exercise/add", function(req, res, next) {
  log(
    chalk
      .bgHex("#89CFF0")
      .hex("#36454F")
      .bold("\n   👍🏾   inside POST /api/exercise/add   👍🏾  \n")
  );
  log(req.body);

  let { _id, date, description, duration } = req.body;

  const exercise = new Exercise({
    userId: _id,
    date,
    description,
    duration
  });
  exercise.save(err => {
    // Use any CSS color name

    // crayon('#ffcc00').log('old gold');

    // Compose multiple styles using the chainable API
    // log(chalk.grey.bgGreen.bold('FROM SAVE'));

    log(
      chalk
        .bgHex("#89CFF0")
        .hex("#36454F")
        .bold("\n      SAVING EXERCISE    \n")
    );
    // guard-if statement to block execution if an error is detected
    if (err) return console.error(err);

    // otherwise log it on the console and respond
    log("saving \n", {
      userId: _id,
      date,
      description,
      duration,
      status: 200,
      statusTxt: "OK"
    });
    res.send({
      userId: _id,
      date,
      description,
      duration,
      status: 200,
      statusTxt: "OK"
    });
  });
});

app.post("/shorten", (req, res, next) => {
  console.log("Inside post req.body.url");
  console.log(req.body);
  const urlData = req.body.url;
  Url.findOne({ url: urlData }, (err, doc) => {
    if (doc) {
      console.log("entry found in db");
      console.log({
        url: urlData,
        hash: btoa(doc._id),
        status: 200,
        statusTxt: "OK"
      });
      res.send({
        url: urlData,
        hash: btoa(doc._id),
        status: 200,
        statusTxt: "OK"
      });
    } else {
      console.log("entry NOT found in db, saving new");
      const stringUrl = urlData.toString();
      const url = new Url({
        url: stringUrl
      });
      url.save(() => {
        // Use any CSS color name

        // crayon('#ffcc00').log('old gold');

        // Compose multiple styles using the chainable API
        // log(chalk.grey.bgGreen.bold('FROM SAVE'));

        log(
          chalk
            .bgHex("#89CFF0")
            .hex("#36454F")
            .bold("\n      FROM SAVE    \n")
        );
        console.log("url._id");
        console.log(url._id);
        console.log("btoa");
        console.log(btoa(url._id));
        if (err) console.error(err);
        res.send({
          url: urlData,
          hash: btoa(url._id),
          status: 200,
          statusTxt: "OK"
        });
      });
    }
  });
});

// ROUTES
// listen for requests :)
const listener = app.listen(process.env.PORT, function() {
  log(
    chalk
      .bgHex("#FFCC00")
      .hex("#36454F")
      .bold(
        `              Your app is listening at http://${
          myNetworkInterfaces[0].address
        }:${port}              `
      )
  );
  log(
    chalk
      .bgHex("#FF69B4")
      .hex("#36454F")
      .bold(
        `              Your playground can be found at http://${
          myNetworkInterfaces[0].address
        }:${port}/graphql      `
      )
  );
});

// connect to mongoose
// the `dbName` below is essential, the db in the connection string is now ignored
const db = mongoose.connect(
  connectionString,
  {
    useNewUrlParser: true,
    dbName: "test"
  }
);

db.then(
  database => {
    console.log("we're connected to mongoDB!");
    log(Date.now());
    // log(
    //   `
    //   host: ${database.connections[0]}
    //   `
    // )
  },
  err => {
    console.error(err);
  }
).catch(err => {
  console.error(err);
});
