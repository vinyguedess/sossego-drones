import { Request, Response } from 'express';
import { DroneService } from './Services';


export class DronesController
{

    public indexAction(request:Request, response:Response, next:Function):void
    {
        new DroneService()
            .findAll(
                request.query.limit || 50,
                request.query.offset || 0
            )
            .then((results:any):void => {
                response.status(200).json({
                    status: true,
                    data: results
                });
            })
            .catch((err:Error):void => {                
                response.status(500).json({
                    status: false,
                    message: [err.message]
                });
            })
            .then(() => next());
    }

    public viewAction(request:Request, response:Response):void
    {
        new DroneService()
            .find(request.params.id)
            .then((drone:any):void => {
                if (drone === null)
                    return response.status(404).json({ 
                        status: false, 
                        message: ['Drone not found']
                    });

                return response.status(200).json({
                    status: true,
                    data: drone
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

                if (typeof request.body.drone.foto !== 'undefined')
                    droneService.upload(droneService.getLastInsertedId(), request.body.drone.foto);

                response.status(200).json({
                    status: true,
                    data: droneService.getLastInsertedId()
                });
            });
    }

    public updateAction(request:Request, response:Response):void
    {
        let droneService:DroneService = new DroneService();
        
        droneService
            .find(request.params.id)
            .then((drone:any):void => {
                if (drone === null)
                    return response.status(404).json({
                        status: false,
                        message: ['Drone not found']
                    });
                
                droneService
                    .update(drone.id, request.body.drone)
                    .then((isUpdated:boolean):void => {
                        return response.status(isUpdated ? 200 : 400).json({
                            status: isUpdated
                        });
                    });
            });
    }

    public deleteAction(request:Request, response:Response):void
    {
        let droneService:DroneService = new DroneService();
        
        droneService
            .find(request.params.id)
            .then((drone:any):void => {
                if (drone === null)
                    return response.status(404).json({
                        status: false,
                        message: ['Drone not found']
                    });
                
                droneService
                    .delete(drone.id)
                    .then((isUpdated:boolean):void => {
                        return response.status(isUpdated ? 200 : 400).json({
                            status: isUpdated
                        });
                    });
            });
    }

}