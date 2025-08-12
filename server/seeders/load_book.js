

import fs from 'fs';
import path from 'path';
import csv from 'csv-parser';
import { pool } from '../connection_db.js';






export async function loadbokDb() {
    const loadArchive = path.resolve('server/data/books.csv');
    const bok = [];
    
    
    return new Promise ((resolve, reject)=>{
        fs.createReadStream(loadArchive)
            .pipe(csv())
            .on("data", (fila) =>{
                bok.push([ //crea un array
                   fila.isbn,
                   fila.title.trim(),
                   fila.publication_year,
                   fila.author
                ]);
            })
            .on('end', async() =>{  
                try {
                    const sql ='INSERT INTO books(isbn,title,publication_year,author) VALUES ?';
                    const [result] = await pool.query(sql,[bok]);

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



