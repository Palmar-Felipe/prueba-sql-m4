

import fs from 'fs'
import path, { resolve } from 'path'
import { pool } from '../connection_db.js'
import { console } from 'inspector';






export async function loadUsDb() {
    const loadArchive = path.resolve('server/data/users.csv');
    const us = [];
    
    
    return new Promise ((resolve, reject)=>{
        fs.createReadStream(loadArchive)
            .pipe(csv())
            .on("data", (fila) =>{
                us.push([ //crea un array
                   fila.id_user,
                   fila.namei.trim(),
                   fila.dni,
                   fila.phone
                ]);
            })
            .on('end', async() =>{  
                try {
                    const sql ='INSERT INTO us(id_user,namei,dni,phone) VALUES ?';
                    const [result] = await pool.query(sql,[us]);

                    console.log(` se inserto ${result.affectedRows} autores` )
                    resolve();

                } catch (error) {
                    
                }
            } )
            .on('error', (err) => {
                console.error('error al leer el archivo', err.message)
                reject(err);
            })              
    }) 
}   



