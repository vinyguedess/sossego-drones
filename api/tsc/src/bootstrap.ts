import * as mysql from 'mysql';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as dotenv from 'dotenv';
import * as v1 from './app/v1/router';


dotenv.config();


export class Connection
{

    private static conn;

    public static connect()
    {
        this.conn = mysql.createConnection({
            host: process.env.DB_HOST,
            database: process.env.DB_NAME,
            user: process.env.DB_USER,
            password: process.env.DB_PASS
        });
    }

    public static query(query:string, params:any={}):Promise<any>
    {
        return new Promise((resolve:Function, reject:Function):void => 
        {
            this.conn.query(query, params, (err:Error, results:any):void => {
                if (err)
                    return reject(err);

                resolve(results);
            });
        });
    }

    public static disconnect():Promise<boolean>
    {
        return new Promise((resolve:Function, reject:Function):void => 
        {
            this.conn.end((err:Error) => {
                if (err)
                    return reject(err);

                resolve(true);
            });
        })
            .then(() => {
                console.log('Disconected');
                return true;
            })
            .catch((err:Error) => {
                console.log(err.message);
                return false;
            });
    }

}


export const bootstrap = express();

bootstrap.use((request, response, next:Function) => {
    response.header("Access-Control-Allow-Origin", "*");
    response.header("Access-Control-Allow-Credentials", true);
    response.header("Access-Control-Allow-Methods", "POST,GET,PUT,DELETE,OPTIONS");
    response.header("Access-Control-Allow-Headers", "Content-Type");

    next();
});
bootstrap.use(bodyParser.json({ limit: '4mb' }));
bootstrap.use('/images', express.static('./../storage/'));

bootstrap.use((request, response, next:Function) => {
    Connection.connect();
    next();
});

bootstrap.use('/api/v1', v1);

bootstrap.use(() => {
    Connection.disconnect();
});