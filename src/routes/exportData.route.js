import { Router } from 'express';
import {exportDataController} from "../controllers/exportData.controller";

const exportDataRoute = () => {
    const router = Router();

    router.get('/get-data-linkedin', exportDataController);
    return router;
};

export { exportDataRoute };
