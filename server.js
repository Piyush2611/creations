const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();
const db = require('./app/index'); // Sequelize models
const path = require('path');
const cookieParser = require('cookie-parser');

const app = express();

// --------------------- CORS ---------------------
const allowedOrigins = [
  "http://localhost:3000",
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With", "Accept"],
  credentials: true,
};

app.use(cors(corsOptions));

// --------------------- Middleware ---------------------
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// --------------------- Database ---------------------
db.sequelize.authenticate()
  .then(() => console.log("Database connected."))
  .catch(err => console.log("Unable to connect to database:", err));

// Optional: Sync tables (use force: true only for testing)
// db.sequelize.sync({ alter: true })
//   .then(() => console.log("Database synced successfully."))
//   .catch(err => console.error("Failed to sync database:", err));

// --------------------- Routes --------------------- 
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Palak Creations." });
});

// Load your API routes
require("./app/route/routes")(app);

// --------------------- Global Error Handling ---------------------
app.use((err, req, res, next) => {
  console.error("Internal Server Error:", err.stack);
  res.status(500).send({
    message: "Something went wrong!",
    error: err.message,
  });
});

// --------------------- Start Server ---------------------
const port =  5000;
app.listen(port, () => {
  console.log(`\u001b[1;32mServer is running on port ${port}..\u001b[0m`);
});
