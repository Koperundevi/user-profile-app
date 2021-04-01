// Serve the build files using express

const express = require("express");
const path = require("path");

const app = express();

// Set the port to default heroku port
app.set("port", process.env.PORT || 8080);
// Serve only the static files form the dist directory
app.use(express.static("./dist/user-profile-app"));

app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "/dist/user-profile-app/index.html"));
});

app.listen(app.get("port"), () => {
  console.log(`Angular application is being served at port ${app.get("port")}`);
});
