import { expect } from 'chai';
import { bootstrap } from './../../../src/bootstrap';
import { IMadeAPromise, makeGetPromise, makePostPromise } from './../../bootstrap';

describe('DronesTest', function():void {

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
                })
                .then(() => done());
        });
    });

    describe('Listing drones', ():void => {
        it('Should list Drones without trouble', (done:Function):void => {
            makeGetPromise('/api/v1/drones')
                .then((response:IMadeAPromise):void => {
                    expect(response.statusCode).to.be.equal(200);
                    expect(response.body.status).to.be.true;
                })
                .then(() => done());
        });
    });

    after(function():void { this.server.close() });

});