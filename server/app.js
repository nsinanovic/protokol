const _ = require('lodash');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const jwt_secret = 'statistic-app-super-shared-secret';
const expressJwt = require('express-jwt');
const usersService = require('../server/services/users');
const passwordsService = require('../server/services/passwords');
const projectsService = require('../server/services/projects');



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

app.get('/api/projects/:id', function (req, res) {
    var statisticID = req.params.id;
    res.type("json");
    res.send(getstatistic(statisticID));
});

app.get('/api/users', async function (req, res) {   
    const users = await usersService.getAllUsers();
    res.type("json");
    res.send(users);
});

app.get('/api/projects', async function (req, res) {   
    const projects = await projectsService.getAllProjects();
    res.type("json");
    res.send(projects);
});

app.get('/api/passwords', async function (req, res) {   
    const passwords = await passwordsService.getAllPasswords();
    res.type("json");
    res.send(passwords);
});

app.listen(4000, function () {
    console.log('Angular JWT statistic API Server listening on port 4000!')
});
