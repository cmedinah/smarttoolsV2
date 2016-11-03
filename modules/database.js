"use strict";
const mysql = require('mysql');
let conexion = 0;

var host = process.env.HOST_MYSQL_AWS;
var user = process.env.USER_MYSQL_AWS;
var pass = process.env.PASS_MYSQL_AWS;
var database = process.env.BD_MYSQL_AWS;

exports.conectaDatabase = () => 
{
    //Realizar la conexión a la base de datos Mysql...
    conexion = mysql.createConnection({
      host     	: host,
      user     	: user,
      password 	: pass,
      database 	: database, 
      "pool"    : { maxConnections: 50, maxIdleTime: 30}
    });
    conexion.connect();
};

//Realiza la consulta...
exports.queryMysql = (sql, callback) => 
{
	conexion.query(sql, (err, rows, fields) => 
	{
		if (err) throw err;
		callback(err, rows);
	});
};

exports.closeConection = () => 
{
    conexion.end();
};
