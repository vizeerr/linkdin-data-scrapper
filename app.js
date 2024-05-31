const express = require('express');
const app = express();
const port = 8080;

app.use(express.json()); 

require('./models');
var profilCtrl = require('./controller/profileController');

app.get("/", (req, resp) => {
    resp.send("Home");
});

app.post("/addProfile", profilCtrl.addProfile);
app.listen(port, () => {
    console.log(`http://127.0.0.1:${port}`);
});
