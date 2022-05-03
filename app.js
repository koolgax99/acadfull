const express = require('express')
const app = express();
const path = require("path")
const mongoose = require("mongoose")
const session = require("express-session")
const passport = require("passport")
const contactRoutes = require("./routes/contact")
const ApplicationDetails = require("./routes/application")
const userRoutes = require("./routes/Auth")
const localStrategy = require("passport-local")
const User = require("./models/user")
const isLoggedIn = require("./middleware/index")
const flash = require("connect-flash");
// Connecting to database
const dbUrl = "mongodb+srv://admin:Aparna@09@cluster0.j3rqs.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
mongoose.connect(dbUrl, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
})
app.set("views", path.join(__dirname, "views"))
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"))
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const db = mongoose.connection
db.on("error", console.error.bind(console, "Mongoose connection denied"))
db.once("open", () => {
    console.log("Mongoose connection established")
})

const secret = process.env.SECRET || "This is secret"
const sessionConfigs = {
  name: 'session',
  secret,
  resave: false,
  saveUninitialized: false,
  cookie: {
      httpOnly: true,
      expires: Date.now() + 1000 * 60 * 60 * 24,
      maxAge: 1000 * 60 * 60 * 24
  }
}
app.use(session(sessionConfigs))
app.use(flash())
// Passport configurations
app.use(passport.initialize())
app.use(passport.session())
passport.use(new localStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

// Preserving user data
app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  res.locals.success = req.flash("success")
  res.locals.error = req.flash("error")
  next()
})
app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    next()
})


app.get("/", (req, res) => {
  res.render("index")
})
app.get("/home", (req, res) => {
  res.render("home")
})
app.get("/about", (req, res) => {
  res.render("about")
})
app.get("/acadamics", (req, res) => {
  res.render("acadamics")
})
app.get("/life@Acadamy", (req, res) => {
  res.render("life")
})
app.get("/fee", (req, res) => {
  res.render("TutionFee")
})
app.get("/attendancePolicy", (req, res) => {
  res.render("Policies/Attendance")
})
app.get("/behaviourPolicy", (req, res) => {
  res.render("Policies/Behaviour")
})
app.get("/dresscodePolicy", (req, res) => {
  res.render("Policies/Dresscode", { page: "" })
})
app.get("/rules", (req, res) => {
  res.render("Policies/Rules", { page: "" })
})

app.use(contactRoutes)
app.use(ApplicationDetails)
app.use(userRoutes)
app.use(passport.initialize());
app.use((req,res,next)=>{
  res.locals.currentUser = req.user;
  next();
})
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
})
