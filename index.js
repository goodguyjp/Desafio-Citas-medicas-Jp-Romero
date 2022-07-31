const http = require('http');
const axios = require('axios');
const {v4: uuidV4} = require('uuid');
const moment = require('moment');
const _lodash = require('lodash');
const chalk = require('chalk');

let arr_usuarios = [];
let arr_consola_usuarios = [];
let arr_genders = [];
http.createServer((req, res) =>{
    if(req.url.startsWith('/usuarios')){
        res.writeHead(200, {'Content-type': 'text/html'});
        axios.get('https://randomuser.me/api')
        .then(function (datos){
            const {first, last} = datos.data.results[0].name;
            const gender = datos.data.results[0].gender;
            console.log(datos.data.results[0].gender);
            console.log(gender);            
            const id = uuidV4().slice(0,6);
            const timestamp = moment().format('MMMM Do YYYY, h:mm:ss a')
            arr_usuarios.push({first, last, id, timestamp, gender});             
            arr_consola_usuarios.push({first, last, id, timestamp}); 

            res.write('<ol>');
            _lodash.forEach(arr_usuarios, (usuario) =>{
                res.write(`<li>Nombre: ${usuario.first} - Apellido: ${usuario.last} - ID: ${usuario.id} - timestamp: ${usuario.timestamp} </li>`);
            });

            res.write('</ol>');
                  
           arr_genders = _lodash.partition(arr_usuarios, (g) =>g.gender=='female');

            _lodash.forEach(arr_consola_usuarios, (usuario) =>{
                console.log(
                    chalk.blue.bgWhite
                    (`Nombre: ${usuario.first} - Apellido: ${usuario.last} - ID: ${usuario.id} - timestamp: ${usuario.timestamp}`)
                    );
            });
            
            arr_consola_usuarios.pop();
            
            res.end();
        }).catch((error) => {
            console.log(error); 
        })
    }

}).listen(8080, () =>{
    console.log("servidor en puerto 8080");
});