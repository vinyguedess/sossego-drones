import { Request, Response } from 'express';
import { DroneService } from './Services';


export class DronesController
{

    public indexAction(request:Request, response:Response):void
    {
        new DroneService()
            .findAll()
            .then((results:Array<any>):void => {
                response.status(200).json({
                    status: true,
                    data: results
                });
            });
    }

    public insertAction(request:Request, response:Response):void
    {
        return response.status(200).json({
            data: request.body
        });

        //new DroneService()
        //    .insert(request.body.drone)
        //    .then((resposta:boolean):void => {
        //        response.status(200).json({
        //            data: response
        //        });
        //    });
    }

}