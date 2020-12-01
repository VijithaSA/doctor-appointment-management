var http         = require('http');
var express      = require('express');
var app          = express();
var bodyParser   = require('body-parser');
var mongoose     = require('mongoose');
var cors         = require('cors');

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({extended: true,limit: '50mb'}));
app.use(express.json());

// "mongodb+srv://MongodbAccessSet:7ECmS19cdpQ7EgyX@cluster0.68j9c.mongodb.net/docSite?retryWrites=true&w=majority"

mongoose.connect("mongodb+srv://db_user:12345678_db_user@cluster0.68j9c.mongodb.net/doc_site?retryWrites=true&w=majority", { useNewUrlParser: true });
var server = http.createServer(app);

server.listen(8080);

app.use(cors());

let slotRouter = require('./router/slots');
let appointmentRouter = require('./router/appointment');

app.use('/slots', slotRouter);
app.use('/appointment',appointmentRouter);


app.get('/sample',function(req,res){
    console.log('hittted');
    res.send('hitted')
});

module.export = app;