import { Connection } from './../../bootstrap'


export class DroneService
{

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

    private checkQueryResponse(resposta:any):boolean
    {
        return resposta.insertId > 0;
    }

}