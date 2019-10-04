const express = require('express');
const path = require('path');
const app = express();
const mysql = require('mysql');
const bodyParser = require('body-parser');
const sha1 = require('sha1');
const cors = require('cors');

app.use(bodyParser.json());
app.use(cors());
const router = express.Router();

const db = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : '',
    database : 'prueba'
});

db.connect();

router.use(function(req, res, next) {
    app.locals.test = 0;  
    next();
});

router.use(function(req, res, next) {
    if (!req.route)
        return next (new Error("<script> window.location = '/'; </script>"));  
    next();
});

router.use(function(err, req, res, next){
    res.send(err.message);
})

router.use(function(req, res){
    res.send(app.locals.test + '');
});

app.get("/api/favorite/:userId", function(req, res, next){
	sql = 'SELECT * FROM completados';
    db.query(sql, (err, result)=>{
        if(err) throw err;
        if(result == ''){
            res.json({"nombre":"", "match":"", "subida":"", "update":""});
        }else{
            res.json(result);
        }
    });
});

app.set('port', process.env.PORT || 3030);
app.set('json spaces', 2);

app.use(express.static(path.join(__dirname, '../public')));

app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'));
});

app.use(router);