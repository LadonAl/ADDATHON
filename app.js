const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static("public"));

const spawn = require("child_process").spawn;

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/html/index.html");
});

app.post("/", (req, res) => {
  console.log("here");
  console.log(Object.values(req.body));

  const pythonProcess = spawn("python", [
    "./tsp.py",
    Object.keys(req.body).length,
    Object.values(req.body)
  ]);

  pythonProcess.stdout.on("data", data => {
    let stuff = data.toString();
    res.write(stuff);
    res.end();
  });
  

  //res.send();
});

app.listen(3000, () => {
  console.log("on 3000");
});
