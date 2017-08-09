import * as request from 'request';


let baseRequest = request.defaults({
    baseUrl: 'http://localhost:3001',
    timeout: 10000,
    headers: {
        'Content-type': 'application/json; charset=utf-8'
    }
});

export const makeGetPromise = (url:string):Promise<IMadeAPromise> => 
{
    return new Promise((resolve:Function, reject:Function):void => 
    {
        let willBeResolved:IMadeAPromise = {};

        baseRequest.get(url)
            .on('error', (err:Error):void => reject(err))
            .on('response', (response:any):void => willBeResolved.statusCode = response.statusCode)
            .on('data', (bufferedData:Buffer):void => willBeResolved.body = JSON.parse(bufferedData.toString()))
            .on('end', () => resolve(willBeResolved));
    });
}


export const makePostPromise = (url:string, params:any):Promise<IMadeAPromise> =>
{
    return new Promise((resolve:Function, reject:Function):void => 
    {
        let willBeResolved:IMadeAPromise = {};

        baseRequest.post(url, { 'body': JSON.stringify(params) })
            .on('error', (err:Error):void => reject(err))
            .on('response', (response:any):void => willBeResolved.statusCode = response.statusCode)
            .on('data', (bufferedData:Buffer):void => willBeResolved.body = JSON.parse(bufferedData.toString()))
            .on('end', () => resolve(willBeResolved));
    });
}


export interface IMadeAPromise
{

    statusCode?:number;

    body?:
    {
        status:boolean;

        data:any;
    }

}