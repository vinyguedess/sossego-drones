import { expect } from 'chai';
import { bootstrap } from './../../../src/bootstrap';
import { IMadeAPromise, makeGetPromise, makePostPromise, makePutPromise, makeDeletePromise } from './../../bootstrap';

describe('DronesTest', function():void {

    let lastInsertedId:number;
    this.timeout(10000);
    before(function():void { this.server = bootstrap.listen(3001) });

    describe('Inserting drones', ():void => {
        it('Should insert a drone without problems', (done:Function):void => {
            makePostPromise('/api/v1/drones', { 
                'drone': { 'cor': 'purple', 'tamanho': 'grande', 'preco': 4223.99 } 
            })
                .then((response:IMadeAPromise):void => {
                    expect(response.statusCode).to.be.equal(200);
                    expect(response.body.status).to.be.true;
                    lastInsertedId = response.body.data;
                })
                .then(():void => done());
        });

        it('Should present error trying to insert a Drone', (done:Function):void => {
            makePostPromise('/api/v1/drones', {
                'drone': { 'cor': 'brown' }
            })
                .then((response:IMadeAPromise):void => {
                    expect(response.statusCode).to.be.equal(400);
                    expect(response.body.status).to.be.false;
                })
                .then(() => done());
        });
    });

    describe('Updating drones data', ():void => {
        it('Should update a drone without problems', (done:Function):void => {
            makePutPromise(`/api/v1/drones/${lastInsertedId}`, {
                'drone': { 'cor': 'striped', preco: 4882.10 }
            })
                .then((response:IMadeAPromise) => {
                    expect(response.statusCode).to.be.equal(200);
                    expect(response.body.status).to.be.true
                })
                .then(() => done());
        });

        it('Should present problems trying to update non existent drone', (done:Function) => {
            makePutPromise('/api/v1/drones/0', {
                'drone': { 'cor': 'orange' }
            })
                .then((response:IMadeAPromise):void => {
                    expect(response.statusCode).to.be.equal(404);
                    expect(response.body.status).to.be.false;
                })
                .then(() => done());
        });

        it('Should present problem trying to insert invalid data', (done:Function):void => {
            makePutPromise(`/api/v1/drones/${lastInsertedId}`, {
                'drone': { 'unkown_field': 'unknown_value' }
            })
                .then((response:IMadeAPromise):void => {
                    expect(response.statusCode).to.be.equal(400);
                    expect(response.body.status).to.be.false;
                })
                .then(():void => done());
        });
    });

    describe('Listing drones', ():void => {
        it('Should list Drones without trouble', (done:Function):void => {
            makeGetPromise('/api/v1/drones')
                .then((response:IMadeAPromise):void => {
                    expect(response.statusCode).to.be.equal(200);
                    expect(response.body.status).to.be.true;
                })
                .then(():void => done());
        });

        it('Should get a selected Drone', (done:Function):void => {
            makeGetPromise(`/api/v1/drones/${lastInsertedId}`)
                .then((response:IMadeAPromise):void => {
                    expect(response.statusCode).to.be.equal(200);
                    expect(response.body.status).to.be.true;
                })
                .then(():void => done());
        });

        it('Should present error trying to find a non existent Drone', (done:Function):void => {
            makeGetPromise('/api/v1/drones/0')
                .then((response:IMadeAPromise):void => {
                    expect(response.statusCode).to.be.equal(404);
                    expect(response.body.status).to.be.false;
                })
                .then(():void => done());
        });
    });

    describe('Deleting drones', ():void => {
        it('Should delete a Drone without problem', (done:Function):void => {
            makeDeletePromise(`/api/v1/drones/${lastInsertedId}`)
                .then((response:IMadeAPromise):void => {
                    expect(response.statusCode).to.be.equal(200);
                    expect(response.body.status).to.be.true;
                })
                .then(():void => done());
        });

        it('Should present problem trying to delete non existent Drone', (done:Function):void => {
            makeDeletePromise(`/api/v1/drones/${lastInsertedId}`)
                .then((response:IMadeAPromise):void => {
                    expect(response.statusCode).to.be.equal(404);
                    expect(response.body.status).to.be.false;
                })
                .then(():void => done());
        });
    });

    after(function():void { this.server.close() });

});