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
        Connection.connect();
        return new Promise((resolve:Function, reject:Function):void => 
        {
            this.conn.query(query, params, (err:Error, results:any):void => {
                if (err)
                    return reject(err);

                resolve(results);
            });
        })
            .then((response) => {
                this.disconnect();

                return response;
            });
    }

    public static disconnect()
    {
        this.conn.destroy();
    }

}


export const bootstrap = express();

bootstrap.use(bodyParser.json());
bootstrap.use('/api/v1', v1);