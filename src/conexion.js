const mysql = require('mysql');
const {promisify} = require('util');
const {database}  = require('./keys');

const connection = mysql.createPool(database);
connection.getConnection((error,connection)=>{
    if(error){
        if(error.code === 'PROTOCOL_CONNECTION_LOST'){
            console.log('CONEXION CANCELADA');
        }
        if(error.code === 'ER_CON_COUNT_ERROR'){
            console.log('MUCHAS CONEXIONES AL TIEMPO');
        }
        if(error.code === 'ECONNREFUSED'){
            console.log('CONEXION RECHAZADA');
        }
    }
    if(connection){
        connection.release();
        console.log('BASE DE DATOS CONECTADA')
    }
});

connection.query = promisify(connection.query);
module.exports = connection;