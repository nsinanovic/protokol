const _ = require('lodash');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const jwt_secret = 'todo-app-super-shared-secret';
const expressJwt = require('express-jwt');
const usersService = require('../server/services/users');

var TODOS = [
    { 'id': 1, 'user_id': 1, 'name': "Get Milk", 'completed': false },
    { 'id': 2, 'user_id': 1, 'name': "Fetch Kids", 'completed': true },
    { 'id': 3, 'user_id': 2, 'name': "Buy flowers for wife", 'completed': false },
    { 'id': 4, 'user_id': 3, 'name': "Finish Angular JWT Todo App", 'completed': false },
];

function getTodos(userID) {
    var todos = _.filter(TODOS, ['user_id', userID]);

    return todos;
}
function getTodo(todoID) {
    var todo = _.find(TODOS, function (todo) { return todo.id == todoID; })

    return todo;
}

app.use(bodyParser.json());
app.use(expressJwt({secret: jwt_secret}).unless({path: ['/api/auth']}));

app.get('/', function (req, res) {
    res.send('Angular JWT Todo API Server')
});
app.post('/api/auth', async function(req, res) {
    try {      
        const user = await usersService.getUserByUsername(req.body.username);     
        if (!user || req.body.password != user.password) {
            return res.sendStatus(401);
        }        
        var token = jwt.sign({ userID: user._id }, jwt_secret, { expiresIn: '2h' });     
        res.type("json");
        res.send({ token, username: user.username });
    }
    catch(exception) {
        console.log(exception);
        res.sendStatus(401)
    }
});
app.get('/api/todos', function (req, res) {
    res.type("json");
    res.send(getTodos(req.user.userID));
});
app.get('/api/todos/:id', function (req, res) {
    var todoID = req.params.id;
    res.type("json");
    res.send(getTodo(todoID));
});
app.get('/api/users', async function (req, res) {   
    const users = await usersService.getAllUsers();
    res.type("json");
    res.send(users);
});

app.listen(4000, function () {
    console.log('Angular JWT Todo API Server listening on port 4000!')
});
