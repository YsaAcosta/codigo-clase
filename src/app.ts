import {MongoDB} from "./database/mongodb/database";
import {Server} from "./presentation/server";

(async()=>{
    main();
})();


async function main (){

    //connect database
    await MongoDB.connection();

    //run server
    const server = new Server();
    server.start();
}