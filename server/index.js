var express = require('express');
var bodyParser = require("body-parser");
const cors = require('cors');
const { DateTime } = require('luxon');
const connectDb = require('./dbConnect')
const resultModel = require('./resultModel');


var app = express();
app.use(cors());
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

const dotenv = require("dotenv").config();

let team = "0"
let globalFlag = false;

connectDb();

app.get('/', (req, res) => {
    res.json({
        mess: "hello world"
    });
});

app.post('/test', (req, res) => {
    console.log(req.body);
    
    res.json({
        mess: "hello world"
    });
});

app.get('/getTeam', (req, res) => {
    res.json({
        team
    });
});
    
app.post('/postResult', async (req, res) => {
    const { team, question, answer, correct } = req.body;
    const time = String(DateTime.now().setZone('Asia/Ho_Chi_Minh').toFormat('yyyy-MM-dd HH:mm:ss'));
    const result = await resultModel.create({
        team,
        question,
        answer,
        correct,
        time,
    });
    console.log({ team: team, question, answer, correct, time });
    res.status(201).send(result);
});

app.post('/resetTeam', (req, res) => {
    team = "0";
    globalFlag = false;
    res.status(201).send("reseted team");
});

app.post('/updateTeamStateWemos', (req, res) => {
    res.status(201).send({flag: globalFlag});
});

app.post('/setTeam',  (req, res) => {
    const { chooseTeam } =  req.body;
    team=chooseTeam;
    globalFlag = true;
    res.status(201).send({flag: true});
});

var server = app.listen(8000, function () {
    var port = server.address().port
    console.log(`Example app listening at http://localhost:${port}`);
})