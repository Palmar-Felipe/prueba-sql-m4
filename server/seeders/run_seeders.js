import { loadbokDb } from "./load_book.js";
import { loadloanDb } from "./load_loans.js";
import { loadUsDb } from "./load_users.js";


(async () =>{
    try {
        console.log('iniciando el seeders ');

        await loadUsDb();
        await loadbokDb();
        await loadloanDb();

        console.log('todos los seeders se ejecutaron de manera correcta')
    } catch (error) {
        console.error ('error en el seeders;', error.message)
    }finally{
        
        process.exit();
    }
})()