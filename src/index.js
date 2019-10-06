const express = require('express');
const path = require('path');
const app = express();
const mysql = require('mysql');
const bodyParser = require('body-parser');
const sha1 = require('sha1');
const cors = require('cors');
const env = require('node-env-file');
env(path.join(__dirname, '../.env'));

app.use(bodyParser.json());
app.use(cors());
const router = express.Router();

const db = mysql.createConnection({
    host : process.env.HOST,
    user : process.env.USER,
    password : process.env.PASSWORD,
    database : process.env.DATABASE
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
    let sql = "SELECT id FROM tokens WHERE token = ?";
    let sql2 = "";

    db.query(sql, [process.env.TOKEN], (err, result)=>{
        if(err) throw err;
        if(result == ''){
            res.json([{"id": "", "nombre":"", "descripcion":"", "matchs":"", "subida":"", "modificacion":"", "tipo":""}]);
        }else{
            if(req.body.numero == 1){
                sql2 = "SELECT id, nombre, descripcion, matchs, subida, modificacion, tipo FROM favoritos WHERE nombre LIKE ? ORDER BY id DESC";
                db.query(sql2, ["%" + req.body.palabra + "%"], (err, result)=>{
                    if(err) throw err;
                    if(result == ''){
                        res.json([{"id": "", "nombre":"", "descripcion":"", "matchs":"", "subida":"", "modificacion":"", "tipo":""}]);
                    }else{
                        res.json(result);
                    }
                });
            }else if(req.body.numero == 2){
                if(req.body.orden == 'id'){
                    sql2 = "SELECT id, nombre, descripcion, matchs, subida, modificacion, tipo FROM segmentos WHERE tipo = ? AND nombre LIKE ? ORDER BY id DESC";
                }else if(req.body.orden == 'snombre'){
                    sql2 = "SELECT id, nombre, descripcion, matchs, subida, modificacion, tipo FROM segmentos WHERE tipo = ? AND nombre LIKE ? ORDER BY nombre ASC";
                }else if(req.body.orden == 'smatch'){
                    sql2 = "SELECT id, nombre, descripcion, matchs, subida, modificacion, tipo FROM segmentos WHERE tipo = ? AND nombre LIKE ? ORDER BY matchs DESC";
                }else if(req.body.orden == 'ssubida'){
                    sql2 = "SELECT id, nombre, descripcion, matchs, subida, modificacion, tipo FROM segmentos WHERE tipo = ? AND nombre LIKE ? ORDER BY subida DESC";
                }else if(req.body.orden == 'smodificacion'){
                    sql2 = "SELECT id, nombre, descripcion, matchs, subida, modificacion, tipo FROM segmentos WHERE tipo = ? AND nombre LIKE ? ORDER BY modificacion DESC";
                }

                db.query(sql2, [req.body.tipo, "%" + req.body.palabra + "%"], (err, result)=>{
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

app.post("/api/guardar/", function(req, res, next){
    if(req.body.snombre != '' && req.body.snombre != ' '){
        if(req.body.sdescripcion != '' && req.body.sdescripcion != ' '){
            if(req.body.smatch != '' && req.body.smatch != ' '){
                if(entero(req.body.smatch)){
                    if(req.body.stipo != '' && req.body.stipo != ' '){
                        hoy = new Date();
                        dd = hoy.getDate();
                        mm = hoy.getMonth()+1;
                        yyyy = hoy.getFullYear();
                        hh = hoy.getHours();
                        mmm = hoy.getMinutes();
                        ss = hoy.getSeconds();

                        let dia = yyyy + '-' + fecha(mm) + '-' + fecha(dd);
                        let hora = hh + ':' + mmm + ':' + ss;

                        let sql = "SELECT id FROM tokens WHERE token = ?";

                        db.query(sql, [process.env.TOKEN], (err, result)=>{
                            if(err) throw err;
                            if(result == ''){
                                res.json([{"mensaje": "¡Lo sentimos, intentalo nuevamente!", "estado": false}]);
                            }else{
                                sql = 'INSERT INTO segmentos SET ?';
                                db.query(sql, { nombre: req.body.snombre, descripcion: req.body.sdescripcion, matchs: req.body.smatch, subida: dia, modificacion: dia, tipo: req.body.stipo}, (err, result)=>{
                                    if(err) throw err;
                                    if(result.insertId){
                                        res.json([{"mensaje": "guardado exitosamante", "estado": true}]);
                                    }
                                });
                            }
                        });
                    }else{
                        res.json([{"mensaje": "elige un tipo", "estado": false}]);
                    }
                }else{
                    res.json([{"mensaje": "el match debe ser número", "estado": false}]);
                }
            }else{
                res.json([{"mensaje": "ingresa un match", "estado": false}]);
            }
        }else{
            res.json([{"mensaje": "ingresa una descripción", "estado": false}]);
        }
    }else{
        res.json([{"mensaje": "ingresa un nombre", "estado": false}]);
    }
});

function fecha(params){
    if (params < 10) {
        params = '0' + params;
    }
    return params;
}

function entero(x) {
  if (isNaN(x)) {
    return false;
  }
  return true;
}

app.set('port', process.env.PORT || 3030);
app.set('json spaces', 2);

app.use(express.static(path.join(__dirname, '../public')));

app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'));
});

app.use(router);