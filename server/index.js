
import cors from "cors"
import express from "express"
import { pool } from './conexion_db.js'

const app = express()
app.use(cors()) // this library (cors) allow to conect the fronted with the back
app.use(express.json()) // Express allow to interpetr automatically the body on JSON when it's recibe a query from the CRUD Like POST, PUT or DELETE.
app.use((req, res, next) => {
    console.log('Body recibido:', req.body);
    next();
});


/*GET ALL PLATAFORMS*/
app.get('/plataforms', async (req, res) => {
    try {
        const [rows] = await pool.query(`
        SELECT * FROM plataforms;
        `);
        res.json(rows);
    } catch (error) {
        res.status(500).json({
            status: 'error',
            endpoint: req.originalUrl,
            method: req.method,
            message: error.message
        });
    }
})

/*POST  CREATE NEW PLATAFROMS*/
app.post('/plataforms', async (req, res) => {
    try {
        const { name_plataform } = req.body;
        const [result] = await pool.query(
            `INSERT INTO plataforms (name_plataform)
             VALUES (?)`,
            [name_plataform]
        );
        res.status(201).json({
            status: 'ok',
            id_usuario: result.insertId
        });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
});

/*UPDATE A PLATAFORM*/
app.put('/plataforms/:id_plataform', async (req, res) => {
    try {
        const { id_plataform } = req.params;
        const { name_plataform } = req.body;

        const [result] = await pool.query(
            'UPDATE plataforms SET name_plataform = ? WHERE id_plataform = ?;',
            [id_plataform, name_plataform]
        );


        if (result.affectedRows === 0) {
            return res.status(404).json({ status: 'error', message: 'Plataforma no encontrada' });
        }


        res.json({ status: 'ok', message: 'Plataforma actualizada correctamente' });
    } catch (error) {
        // 
        res.status(500).json({ status: 'error', message: error.message });
    }
});


/*DELETE A PLATAFORM*/
app.delete('/plataforms/:id_plataform', async (req, res) => {
    try {
        const { id_plataform } = req.params;

        const [result] = await pool.query(
            `DELETE FROM plataforms WHERE id_plataform = ?`,
            [id_plataform]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ status: 'error', message: 'Platafprma no encontrada' });
        }

        res.json({ status: 'ok', message: 'Plataforma eliminada correctamente' });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
});

/*-------------------------------------------------- */
/*****************COSTUMERS************************* */
/*--------------------------------------------------- */

/*GET ALL COSTUMERS*/
app.get('/costumers', async (req, res) => {
    try {
        const [rows] = await pool.query(`
        SELECT * FROM costumers;
        `);
        res.json(rows);
    } catch (error) {
        res.status(500).json({
            status: 'error',
            endpoint: req.originalUrl,
            method: req.method,
            message: error.message
        });
    }
})

/*POST  CREATE NEW COSTUMER*/
app.post('/costumers', async (req, res) => {
    try {
        const { full_name, identification, address, phone, email } = req.body;
        const [result] = await pool.query(
            `INSERT INTO costumers (full_name,identification,address,phone,email)
             VALUES (?, ?, ?, ?,?)`,
            [full_name, identification, address, phone, email]
        );
        res.status(201).json({
            status: 'ok',
            id_usuario: result.insertId
        });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
});

/*PUT UPDATE A COSTUMER */

app.put('/costumers/:id_costumer', async (req, res) => {
    try {
        const { id_costumer } = req.params;
        const { full_name, identification, address, phone, email } = req.body;

        const [result] = await pool.query('UPDATE costumers SET full_name = ?, identification = ?, address = ?, phone = ?, email = ? WHERE id_costumer = ?;',
            [full_name, identification, address, phone, email, id_costumer]
        );


        if (result.affectedRows === 0) {
            return res.status(404).json({ status: 'error', message: 'Cliente no encontrada' });
        }


        res.json({ status: 'ok', message: 'Cliente actualizada correctamente' });
    } catch (error) {
        // 
        res.status(500).json({ status: 'error', message: error.message });
    }
});

/*DELETE A COSTUMER*/
app.delete('/costumers/:id_costumer', async (req, res) => {
    try {
        const { id_costumer } = req.params;

        const [result] = await pool.query(
            `DELETE FROM costumers WHERE id_costumer = ?`,
            [id_costumer]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ status: 'error', message: 'Cliente no encontrada' });
        }

        res.json({ status: 'ok', message: 'Cliente eliminada correctamente' });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
});


/************/
/*INVOICES */
/***********/

/*GET */
app.get('/invoices/:invoice_number', async (req, res) => {
    try {
        const [rows] = await pool.query(`
        SELECT * FROM invoices;
        `);
        res.json(rows);
    } catch (error) {
        res.status(500).json({
            status: 'error',
            endpoint: req.originalUrl,
            method: req.method,
            message: error.message
        });
    }
})

/*POST */
app.post('/invoices', async (req, res) => {
    try {
        const { id_transaction, id_costumer, billing_period, id_plataform, invoice_amount, amount_paid } = req.body;
        const [result] = await pool.query(
            `INSERT INTO invoices (id_transaction, id_costumer, billing_period,id_plataform,invoice_amount,amount_paid)
             VALUES (?, ?, ?, ?,?,?,?)`,
            [invoice_number, id_transaction, id_costumer, billing_period, id_plataform, invoice_amount, amount_paid, invoice_number]
        );
        res.status(201).json({
            status: 'ok',
            id_usuario: result.insertId
        });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
});

//Total paid by each customer
app.get('/costumers/total-paid', async (req, res) => {
    try {
        const [rows] = await pool.query(`
            SELECT
            c.id_costumer,
            c.full_name,
            SUM(i.amount_paid) AS total_pagado
            FROM invoices i
            JOIN costumers c ON i.id_costumer = c.id_costumer
            GROUP BY c.id_costumer, c.full_name
            ORDER BY total_pagado DESC;
            `);

        res.json(rows);
    } catch (error) {
        res.status(500).json({
            status: 'error',
            endpoint: req.originalUrl,
            method: req.method,
            message: error.message
        });
    }
});

// Facturas pendientes con info de cliente y transacción
app.get('/invoices/pendientes', async (req, res) => {
    try {
        const [rows] = await pool.query(`
        SELECT
        i.invoice_number,
        c.full_name AS cliente,
        c.identification,
        c.phone,
        c.email,
        t.id_transaction,
        t.date_time,
        t.transaction_amount,
        t.invoice_status
        FROM invoices i
        JOIN costumers c ON i.id_costumer = c.id_costumer
        JOIN transactions t ON i.id_transaction = t.id_transaction
        WHERE t.invoice_status = 'Pendiente'
        ORDER BY t.date_time DESC;
        `);

        res.json(rows);
    } catch (error) {
        res.status(500).json({
            status: 'error',
            endpoint: req.originalUrl,
            method: req.method,
            message: error.message
        });
    }
});

// Listado de transacciones por plataforma
app.get('/transactions/plataforms', async (req, res) => {
    try {
        const [rows] = await pool.query(`
        SELECT
        p.name_plataform,
        t.id_transaction,
        t.date_time,
        t.transaction_amount,
        t.invoice_status,
        t.transaction_type
        FROM transactions t
        JOIN invoices i ON t.id_transaction = i.id_transaction
        JOIN plataforms p ON i.id_plataform = p.id_plataform
        ORDER BY p.name_plataform, t.date_time DESC;
        `);

        res.json(rows);
    } catch (error) {
        res.status(500).json({
            status: 'error',
            endpoint: req.originalUrl,
            method: req.method,
            message: error.message
        });
    }
});



//Inicio del servidor cuando este todo listo
app.listen(3000, () => {
    console.log("servidor prepado correctamente en http://localhost:3000");
})













