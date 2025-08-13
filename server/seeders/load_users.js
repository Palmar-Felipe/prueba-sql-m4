

import fs from 'fs';
import path from 'path';
import csv from 'csv-parser';
import { pool } from '../connection_db.js';






export async function loadusersDb() {
    const loadArchive = path.resolve('server/data/users.csv');
    const users = [];
    
    
    return new Promise ((resolve, reject)=>{
        fs.createReadStream(loadArchive)
            .pipe(csv())
            .on("data", (fila) =>{
                users.push([ //crea un array
                   fila.id_user,
                   fila.namei?.trim(),
                   fila.dni,
                   fila.address,
                   fila.phone,
                   fila.email,
                   
                ]);
            })
            .on('end', async() =>{  
                try {
                    const sql ='INSERT INTO users(id_user,namei,dni,address,phone, email) VALUES ?';
                    const [result] = await pool.query(sql,[users]);

                    console.log(` se inserto ${result.affectedRows} autores` )
                    resolve();

                } catch (error) {
                    console.error('error al insertar:', error.message)
                    reject(error);
                }
            } )
            .on('error', (err) => {
                console.error('error al leer el archivo', err.message)
                reject(err);
            })              
    }) 
}   



