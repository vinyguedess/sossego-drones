import * as fs from 'fs';
import { Connection } from './../../bootstrap'


export class DroneService
{

    private lastInsertedId:number = null;
    private errors:Array<string> = [];

    public insert(drone:any):Promise<boolean>
    {
        return Connection.query(
            'INSERT INTO drones (cor, tamanho, preco) VALUES (?, ?, ?);',
            [drone.cor, drone.tamanho, drone.preco]
        )
            .then((response:any):boolean => this.checkQueryResponse(response))
            .catch((err:Error):boolean => {
                this.addError(err.message);

                return false;
            });
    }

    public update(id:number, drone:any):Promise<boolean>
    {
        let fields:Array<any> = Object.keys(drone);
        
        return Connection.query(
            'UPDATE drones ' + 
            `SET ${fields.map((f:string):string => f + " = ?").join(',')} ` +
            'WHERE id = ?',
            fields.map((f:string):any => drone[f]).concat(id)
        )
            .then((response:any):boolean => this.checkQueryResponse(response))
            .catch((err:Error):boolean => {
                this.addError(err.message);
                
                return false;
            });    
    }

    public findAll(limit:number=50, offset:number=0):Promise<Array<any>>
    {
        return Promise.all([
            Connection.query('SELECT COUNT(*) `total` FROM drones;')
                .then((response:Array<any>):number => response[0].total),
            Connection.query(`SELECT * FROM drones LIMIT ${limit} OFFSET ${offset};`)
        ])
            .then((responses:Array<any>):any => {
                let [total, drones] = responses;

                return {
                    'total': total,
                    'resultSet': drones
                };
            });
    }

    public find(id:number):Promise<any>
    {
        return Connection.query(
            'SELECT * FROM drones WHERE id = ? LIMIT 1;',
            [ id ]
        )
            .then((response:Array<any>):any => {
                if (response.length < 1)
                    return null;

                return response[0];
            });
    }

    public delete(id:number):Promise<boolean>
    {
        return Connection.query(`DELETE FROM drones WHERE id = ?`, [ id ])
            .then((response:any):boolean => this.checkQueryResponse(response));
    }

    public upload(id:number, foto:string):Promise<boolean>
    {
        let newName:string = 'drone_' + new Buffer(id + '').toString('base64');
        return new Promise((resolve:Function, reject:Function):void => 
        {
            fs.writeFile(
                `${process.cwd()}/../storage/${newName}.png`,
                new Buffer(foto, 'base64'),
                (err:Error) => err ? reject(err) : resolve(true)
            );
        })
            .then((response:boolean):boolean => response)
            .catch((err:Error):boolean => {
                this.addError(err.message);

                return false;
            });
    }

    public getErrors():Array<string>
    {
        return this.errors;
    }

    public addError(message:string):void
    {
        this.errors.push(message);
    }

    public getLastInsertedId()
    {
        return this.lastInsertedId;
    }

    private checkQueryResponse(response:any):boolean
    {
        if (!(response.insertId > 0 || response.affectedRows > 0))
            return false;

        if (response.insertId > 0)
            this.lastInsertedId = response.insertId;
        
        return true;
    }

}