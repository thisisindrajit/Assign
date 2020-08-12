const express = require('express');

const app = express();

const port = 5000;

app.get("/", (req, res) => {
    return res.status(200).send("Hello World!");
});

app.get("/login", (req, res) => {
    return res.status(200).json({"msg": "This is the login page of my site!"});
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})