import {Router} from 'express';
import clientRender from '../clientRender';
const router = Router();

router.get('/', clientRender)

export default router;
