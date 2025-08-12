

import fs from 'fs';
import path from 'path';
import csv from 'csv-parser';
import { pool } from '../connection_db.js';






export async function loadloanDb() {
    const loadArchive = path.resolve('server/data/loans.csv');
    const loan = [];
    
    
    return new Promise ((resolve, reject)=>{
        fs.createReadStream(loadArchive)
            .pipe(csv())
            .on("data", (fila) =>{
                loan.push([ //crea un array
                   fila.id_loan,
                   fila.id_user,
                   fila.isbn,
                   fila.loan_date,
                   fila.return_date,
                   fila.statuss
                ]);
            })
            .on('end', async() =>{  
                try {
                    const sql ='INSERT INTO loans(id_loan,id_user,isbn,loan_date,return_date,statuss) VALUES ?';
                    const [result] = await pool.query(sql,[loan]);

                    console.log(` se inserto ${result.affectedRows} libros` )
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



