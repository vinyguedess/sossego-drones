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
        let droneService:DroneService = new DroneService();
        
        droneService
            .insert(request.body.drone)
            .then((resposta:boolean):void => {
                if (!resposta)
                    return response.status(400).json({
                        status: false,
                        message: droneService.getErrors()
                    });

                response.status(200).json({
                    status: true,
                    data: droneService.getLastInsertedId()
                });
            });
    }

}