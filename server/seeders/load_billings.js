
/*bookstores and exports */

import fs from 'fs';
import path from 'path';
import csv from 'csv-parser';
import { pool } from '../connection_db.js';




/*function of invoices*/

export async function loadbillDb() {
    const loadArchive = path.resolve('server/data/billings.csv');
    const bill = [];
    
        /*funtion read the entire CSV*/
    return new Promise ((resolve, reject)=>{
        fs.createReadStream(loadArchive)
            .pipe(csv())
            .on("data", (fila) =>{
                bill.push([ 
                   fila.id_billing,
                   fila.id_transaction,
                   fila.id_user,
                   fila.User_Platform,
                   fila.Invoice_Platform,
                   fila.Billing_Period,
                   fila.Billed_Amount,
                   fila.Amount_Paid

                ]);
            })
            /*insert the entire CSV file into Mysql */
            .on('end', async() =>{  
                try {
                    const sql ='INSERT INTO billings(id_billing,id_transaction,id_user,Used_Platform,Invoice_Number,Billing_Period,Billed_Amount,Amount_Paid) VALUES ?';
                    const [result] = await pool.query(sql,[bill]);

                    console.log(` se inserto ${result.affectedRows} libros` )
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



