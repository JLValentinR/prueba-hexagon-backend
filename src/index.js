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

app.post("/api/buscar/", function(req, res, next){
    let token = '2f8f64ebec31084a75213053ec72070d673b74e8';
    let numero = req.body.numero;
    let tipo = req.body.tipo;
    let sql = "SELECT id FROM tokens WHERE token = ?";
    console.log(tipo);

    db.query(sql, [token], (err, result)=>{
        if(err) throw err;
        if(result == ''){
            res.json([{"id": "", "nombre":"", "descripcion":"", "matchs":"", "subida":"", "modificacion":"", "tipo":""}]);
        }else{
            if(numero == 1){
                sql2 = "SELECT id, nombre, descripcion, matchs, subida, modificacion, tipo FROM favoritos WHERE nombre LIKE ? ORDER BY id DESC";
                db.query(sql2, ["%" + req.body.palabra + "%"], (err, result)=>{
                    if(err) throw err;
                    if(result == ''){
                        res.json([{"id": "", "nombre":"", "descripcion":"", "matchs":"", "subida":"", "modificacion":"", "tipo":""}]);
                    }else{
                        res.json(result);
                    }
                });
            }else if(numero == 2){
                sql2 = "SELECT id, nombre, descripcion, matchs, subida, modificacion, tipo FROM segmentos WHERE tipo = ? AND nombre LIKE ? ORDER BY id ASC";
                db.query(sql2, [tipo, "%" + req.body.palabra + "%"], (err, result)=>{
                    if(err) throw err;
                    if(result == ''){
                        res.json([{"id": "", "nombre":"", "descripcion":"", "matchs":"", "subida":"", "modificacion":"", "tipo":""}]);
                    }else{
                        res.json(result);
                    }
                });
            }else{
                res.json([{"id": "", "nombre":"", "descripcion":"", "matchs":"", "subida":"", "modificacion":"", "tipo":""}]);
            }
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