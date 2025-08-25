import {Router} from 'express';
import { SearchController } from '../controllers/search';

const searchRouter = Router();

searchRouter.get('/global', SearchController.search);

export default searchRouter;