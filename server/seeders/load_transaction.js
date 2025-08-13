
/*bookstores and exports */
import fs from 'fs';
import path from 'path';
import csv from 'csv-parser';
import { pool } from '../connection_db.js';






/*function of transaction*/

export async function loadtransDb() {
    const loadArchive = path.resolve('server/data/transaction.csv');
    const trans = [];
    
    /*funtion read the entire CSV*/
    return new Promise ((resolve, reject)=>{
        fs.createReadStream(loadArchive)
            .pipe(csv())
            .on("data", (fila) =>{
                trans.push([ 
                   fila.id_transaction,
                   fila.id_user,
                   fila.id_billings,
                   fila.Date_and_Time_Transaction,
                   fila.Amount,
                   fila.State,
                   fila.Transaction_Type

                ]);
            })
            /*insert the entire CSV file into Mysql */
            .on('end', async() =>{  
                try {
                    const sql ='INSERT INTO transactions(id_transaction,id_user,id_billings,Date_and_Time_Transaction,Amount,State,Transaction_Type) VALUES ?';
                    const [result] = await pool.query(sql,[trans]);

                    console.log(` se inserto ${result.affectedRows} facturas` )
                    resolve();
                    /*error handler* */
                } catch (error) {
                    console.error('error al insertar:', error.message)
                    reject(error);
                }
            } )
            /* error handler archive*/
            .on('error', (err) => {
                console.error('error al leer el archivo', err.message)
                reject(err);
            })              
    }) 
}   



