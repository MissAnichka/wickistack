let express = require('express');
let morgan = require('morgan');
let bodyParser = require('body-parser');
let nunjucks = require('nunjucks');
let models = require('./models');
let router = require('./routes');
let app = express();

//nunjucks boilerplate:
var env = nunjucks.configure('views', {noCache: true});
app.set('view engine', 'html');
app.engine('html', nunjucks.render);

//bodyparser, morgan, static, (all b4 redirected to router)
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan('combined')); //server status code for request & path & method type
app.use(express.static('public'));

//redirecting parsed request to routers:
app.use('/', router);

// server initiation, want to access db b4 we start our server
models.db.sync({force: true})
.then(function() {
    app.listen(3000, function() {
        console.log("Server is listening!");
    })
})
.catch(console.error);
