
/* importar la función conectar del módulo mongoose */

import { connect } from "mongoose";

/* realizar la conexión a la base de datos */

( async () => {
    try {
        // const db = await connect("mongodb://localhost/crud-mongo");
        const db = await connect("mongodb+srv://lambdabit:passphrase2023M@cluster0.8dlkgp8.mongodb.net/?retryWrites=true&w=majority");
        console.log("Base de datos", db.connection.name, "conectada");
    } catch( error ) {
        console.error( error.message );
    } 
})();