import { Router } from 'express';
import { DronesController } from './Controllers';


let router:Router = Router();

router.get('/drones', new DronesController().indexAction);
router.post('/drones', new DronesController().insertAction);

module.exports = router;