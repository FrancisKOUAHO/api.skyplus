import { Router } from 'express';
import {getDataLinkedinController} from "../controllers/getDataLinkedin.controller";

const getDataLinkedinRoute = () => {
    const router = Router();

    router.get('/get-data-linkedin', getDataLinkedinController);
    return router;
};

export { getDataLinkedinRoute };
