import { bootstrap } from './src/bootstrap';

bootstrap.listen(3001, () => console.log("Application running at port 3001"));