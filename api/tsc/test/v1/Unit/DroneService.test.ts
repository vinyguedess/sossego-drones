import * as fs from 'fs';
import { expect } from 'chai';
import { DroneService } from './../../../src/app/v1/Services';


describe('DroneServiceTest', ():void => {

    describe('Testing file upload', ():void => {
        it('Should do a file upload without problem', (done:Function):void => {
            new DroneService()
                .upload(
                    100,
                    fs.readFileSync(`${process.cwd()}/test/DataProvider/image-for-test.png`).toString('base64')
                )
                .then((response):void => {
                    expect(response).to.be.true;
                })
                .then(():void => done());
        });
    });

});