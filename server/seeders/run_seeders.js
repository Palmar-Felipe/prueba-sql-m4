
/*import funtion they user, transaction, billing */
import { loadbillDb } from "./load_billings.js";
import { loadtransDb } from "./load_transaction.js";
import { loadusersDb } from "./load_users.js";



(async () =>{
    try {
        console.log('iniciando el seeders ');

        await loadusersDb();
        await loadtransDb();
        await loadbillDb();
        
        

        console.log('todos los seeders se ejecutaron de manera correcta')
    } catch (error) {
        console.error ('error en el seeders;', error.message)
    }finally{
        
        process.exit();
    }
})()