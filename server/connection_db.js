

import mysql from "mysql2/promise";



async function checkConnection() {
  
    const pool = mysql.createPool({

        host: "localhost",
        database: "libros",
        port: "3306",
        user:"root",
        password: "789456femi",
        connectionLimit: 10,
        waitForConnections: true,
        queueLimit: 0

    });

  
    try {

        const connection = await pool.getConnection();
        console.log("Conexión exitosa a MySQL");
        // devuelve la conexión al pool para que otro código la use.
        connection.release();
        //cierra el pool cuando no se utilice 
        await pool.end();
    } catch (error) {
        console.error("error al conectar a la base de datos en MySQL:", error.message);
        
    }
    
}

checkConnection();