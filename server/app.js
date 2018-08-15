const _ = require('lodash');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const jwt_secret = 'statistic-app-super-shared-secret';
const expressJwt = require('express-jwt');
const usersService = require('../server/services/users');

var statisticS = [
    { 'id': 1, 'user_id': 1, 'name': "Get Milk", 'completed': false },
    { 'id': 2, 'user_id': 1, 'name': "Fetch Kids", 'completed': true },
    { 'id': 3, 'user_id': 2, 'name': "Buy flowers for wife", 'completed': false },
    { 'id': 4, 'user_id': 3, 'name': "Finish Angular JWT statistic App", 'completed': false },
];

function getstatistics(userID) {
    var statistics = _.filter(statisticS, ['user_id', userID]);

    return statistics;
}
function getstatistic(statisticID) {
    var statistic = _.find(statisticS, function (statistic) { return statistic.id == statisticID; })

    return statistic;
}

app.use(bodyParser.json());
app.use(expressJwt({secret: jwt_secret}).unless({path: ['/api/auth']}));

app.get('/', function (req, res) {
    res.send('Angular JWT statistic API Server')
});
app.post('/api/auth', async function(req, res) {
    try {      
        const user = await usersService.getUserByUsername(req.body.username);     
        if (!user || req.body.password != user.password) {
            return res.sendStatus(401);
        }        
        var token = jwt.sign({ userID: user._id }, jwt_secret, { expiresIn: '2h' });     
        res.type("json");
        const fullname = user.firstname + ' ' + user.lastname;
        res.send({ token, fullname });
    }
    catch(exception) {
        console.log(exception);
        res.sendStatus(401)
    }
});
app.get('/api/statistics', function (req, res) {
    res.type("json");
    res.send(getstatistics(req.user.userID));
});
app.get('/api/statistics/:id', function (req, res) {
    var statisticID = req.params.id;
    res.type("json");
    res.send(getstatistic(statisticID));
});
app.get('/api/users', async function (req, res) {   
    const users = await usersService.getAllUsers();
    res.type("json");
    res.send(users);
});

app.listen(4000, function () {
    console.log('Angular JWT statistic API Server listening on port 4000!')
});
