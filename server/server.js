import express from "express";
const app = express();
import fs from "fs";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import User from "./models/user.js";
import multer from "multer";
import jwt from "jsonwebtoken";
import "dotenv/config";
import bcrypt from "bcrypt";
import cookieParser from "cookie-parser";
import { fileURLToPath } from "url";
import path, { resolve } from "path";
import Book from "./models/booking.js";
import Room from "./models/roomsmodel.js";
import { promises } from "dns";
import { rejects } from "assert";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
app.use("/uploads", express.static(path.join(__dirname + "/uploads")));
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);

const bcryptsalt = bcrypt.genSaltSync(10);
const jwtSecrete = "gdghfjfgsgffhgsgfhfghdf";

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/logout", (req, res) => {
  res.cookie("token", "").json(true);
});

function getUserData(req) {
try {
  return new Promise((resolve, rejects) => {
    jwt.verify(req.cookies.token, jwtSecrete, {}, async (err, userdata) => {
      if (err) throw err;
      resolve(userdata);
    });
  });
} catch (error) {
  return error; 
} 
}

app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const userdoc = await User.create({
      name,
      email,
      password: bcrypt.hashSync(password, bcryptsalt),
    });
    res.json(userdoc);
  } catch (err) {
    res.status(422).json(err);
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const userdoc = await User.findOne({ email });
  if (userdoc) {
    const passok = bcrypt.compareSync(password, userdoc.password);
    if (passok) {
      jwt.sign(
        { email: userdoc.email, id: userdoc._id },
        jwtSecrete,
        {},
        (err, token) => {
          if (err) throw err;
          res.cookie("token", token).json(userdoc);
        }
      );
    } else {
      res.status(422).json("wrong password");
    }
  } else {
    res.json("not found");
  }
});

app.get("/profile", (req, res) => {
  const { token } = req.cookies;
  if (token) {
    jwt.verify(token, jwtSecrete, {}, async (err, userdata) => {
      if (err) throw err;
      const { name, _id, email } = await User.findById(userdata.id);
      res.json({ name, email, _id });
    });
  } else {
    res.json(null);
  }
});

const uploadphoto = multer({ dest: "uploads/" });
app.post("/uploads", uploadphoto.array("photos", 100), (req, res) => {
  const uploadFiles = [];
  for (let i = 0; i < req.files.length; i++) {
    const { path, originalname } = req.files[i];
    const parts = originalname.split(".");
    const ext = parts[parts.length - 1];
    const newPath = path + "." + ext;
    fs.renameSync(path, newPath);
    uploadFiles.push(newPath.replace("uploads\\", ""));
  }
  res.json(uploadFiles);
});

app.post("/places", (req, res) => {
  const { token } = req.cookies;
  try {
    const {
      title,
      addphoto,
      price,
      bed,
      description,
      perks,
      CheckIn,
      CheckOut,
      MaxGuestAdult,
      MaxGuestChild,
    } = req.body;
    jwt.verify(token, jwtSecrete, {}, async (err, userData) => {
      if (err) throw err;
      const placeDoc = await Room.create({
        owner: userData.id,
        title,
        addphoto,
        price,
        bed,
        description,
        perks,
        CheckIn,
        CheckOut,
        MaxGuestAdult,
        MaxGuestChild,
      });
      res.json(placeDoc);
    });
  } catch (err) {
    res.status(402).json(err);
    console.log(err);
  }
});

app.get("/rooms", (req, res) => {
  try {
    const { token } = req.cookies;
  jwt.verify(token, jwtSecrete, {}, async (err, userData) => {
    const { id } = userData;
    res.json(await Room.find({ owner: id }));
  });
  } catch (error) {
    res.json(error)
  }
});

app.delete("/delete", (req, res) => {
  const { token } = req.cookies;
  jwt.verify(token, jwtSecrete, {}, async (err, userData) => {
    const { id } = userData;
    res.json(await Room.deleteOne({ owner: id }));
  });
});

app.get("/addroom/:id", async (req, res) => {
  const { id } = req.params;
  res.json(await Room.findById(id));
});

app.put("/places", async (req, res) => {
  const { token } = req.cookies;
  const {
    id,
    title,
    addphoto,
    price,
    bed,
    description,
    perks,
    CheckIn,
    CheckOut,
    MaxGuestAdult,
    MaxGuestChild,
  } = req.body;
  jwt.verify(token, jwtSecrete, {}, async (err, userData) => {
    if (err) throw err;
    const roomDoc = await Room.findById(id);
    if (userData.id === roomDoc.owner.toString()) {
      roomDoc.set({
        title,
        addphoto,
        price,
        bed,
        description,
        perks,
        CheckIn,
        CheckOut,
        MaxGuestAdult,
        MaxGuestChild,
      });
      await roomDoc.save();
      res.json("ok");
    }
  });
});

app.get("/allrooms", async (req, res) => {
  res.json(await Room.find());
});

app.get("/newrooms", async (req, res) => {
  res.json(await Room.find().limit(8));
});

app.get("/mostpopular", async (req, res) => {
  res.json(await Room.find().limit(6));
});

app.get("/specialoffer", async (req, res) => {
  res.json(await Room.find().limit(6));
});

app.post("/booking", async (req, res) => {
  const userData = await getUserData(req);
  const {
    room,
    price,
    name,
    phone,
    checkIn,
    checkOut,
    adultGuest,
    childGuest,
  } = req.body;
  try {
    const bookDoc = await Book.create({
      room,
      user: userData.id,
      price,
      name,
      phone,
      checkIn,
      checkOut,
      adultGuest,
      childGuest,
    });
    res.json(bookDoc);
  } catch (err) {
    res.status(402).json(err);
    console.log(err);
  }
});

app.get("/roompage/:id", async (req, res) => {
  const { id } = req.params;
  res.json(await Room.findById(id));
});

app.get("/book", async (req, res) => {
  try {
    const userData = await getUserData(req);
    res.json(await Book.find({ user: userData.id }).populate("room"));
  } catch (error) {
    res.json(error)
  }
});

app.get("/recentbookings", async (req, res) => {
  try {
    const userData = await getUserData(req);
    res.json(await Book.find({ user: userData.id }).populate("room").limit(2));
  } catch (error) {
    res.json(error)
  }
});

app.get("/mybookings", async (req, res) => {
  const userData = await getUserData(req);
  res.json(await Book.find({ user: userData.id }).populate("room"));
});

const port = 3000;
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

mongoose.connect(process.env.MongoUrl);
