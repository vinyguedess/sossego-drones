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
            .then((response:any):boolean => this.checkQueryResponse(response));
    }

    public findAll(limit:number=50, offset:number=0):Promise<Array<any>>
    {
        return Connection.query(
            `SELECT * FROM drones LIMIT ${limit} OFFSET ${offset};`
        );
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
        if (!(response.insertId > 0))
            return false;

        this.lastInsertedId = response.insertId;
        return true;
    }

}