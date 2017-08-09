import { Router } from 'express';
import { DronesController } from './Controllers';


let router:Router = Router();

router.get('/drones', new DronesController().indexAction);
router.get('/drones/:id', new DronesController().viewAction);
router.post('/drones', new DronesController().insertAction);
router.put('/drones/:id', new DronesController().updateAction);
router.delete('/drones/:id', new DronesController().deleteAction);

module.exports = router;