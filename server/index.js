const express = require("express");
const mongoose = require("mongoose");
const { config } = require("./config/config");
const userRouter = require("./routes/User");
const app = express();
const cors = require("cors");
const bodyparser = require("body-parser");
const { ObjectId } = require("mongodb");

// Connect to MongoDB
mongoose
  .connect(config.database.uri, config.database.options)
  .then(() => console.log("Connected to database"))
  .catch((err) => console.error(err));

const db = mongoose.connection;

app.use(express.json());
app.use(express.static("public"));

app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());
const allowedOrigins = [
  "http://localhost:4200",
  "https://angular-booking.vercel.app/",
];

const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};
app.use(cors('*'));

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
app.post("/checkout", async (req, res, next) => {
  try {
    if (isNaN(req.body.amount)) {
      throw new Error("Invalid amount value");
    }
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: `${req.body.hotelName} - ${req.body.roomName}`,
              description: "Room booking",
              images: [req.body.roomPhoto],
            },
            unit_amount: req.body.amount * 100,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: "http://localhost:4200/success",
      cancel_url: "http://localhost:4200/payment",
    });
    res.status(200).json({ id: session.id });
  } catch (error) {
    next(error);
  }
});
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:4200");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});
app.use("/user", userRouter);

app.get("/", (req, res) => {
  res.send("Server is running");
});

app.get("/user/:id", async (req, res) => {
  const userId = req.params.id;
  if (!ObjectId.isValid(userId)) {
    return res.status(400).json({ error: "Invalid user ID" });
  }
  const user = await db
    .collection("users")
    .findOne({ _id: new ObjectId(userId) });
  if (user) {
    user._id = user._id.toString();
  }
  res.json(user);
});

// Start server
const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Server started on port ${port}`));
