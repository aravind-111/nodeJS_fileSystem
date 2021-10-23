const express = require("express");
const fs = require("fs");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT || 5000;

if (!fs.existsSync("TimeFiles")) fs.mkdir("TimeFiles");

app.get("/createfile", (req, res) => {
  // creating a variable called fileName which is to be the real filename(time and date)
  let date = new Date();
  let fileName = `${date.toISOString()}.txt`;
  fileName = fileName.slice(0, 19).replace(/:/g, "-");
  console.log(fileName);

  //   converting hours from 24 to 12 hour format
  let hours = date.getHours() % 12;
  hours = hours < 10 ? `0${hours}` : hours;

  //   adding 0 before minutes if its less than 10
  let minutes = date.getMinutes();
  minutes = minutes < 10 ? `0${minutes}` : minutes;

  //   adding 0 before seconds if its less than 10
  let seconds = date.getSeconds();
  seconds = seconds < 10 ? `0${seconds}` : seconds;

  //   creating the data which is to be inside the file
  let data = `${hours}:${minutes}:${seconds} ${
    date.getHours() > 12 ? "PM" : "AM"
  }`;
  console.log(data);

  //   creating the file and the data in it.
  fs.writeFile(`TimeFiles/${fileName}`, data, (err) => {
    if (err) console.log(err);
  });
  res.send("file successfully created");
});

// retriving the data
app.get("/getfile", (req, res) => {
  let storage = fs.readdirSync("./TimeFiles");
  console.log(storage);
  res.send(storage);
});

// const create = "http://localhost:5000/createfile";
// const view = "http://localhost:5000/getfile";

app.get("/", (req, res) => {
  res.send(
    `go to ${'"https://aravind-node-filesystem.herokuapp.com/createfile"'} to create a file. <br><br> go to ${'"https://aravind-node-filesystem.herokuapp.com/getfile" to view the files.'}`
  );
});

app.listen(PORT, () => {
  console.log("server running at port 5000");
});
