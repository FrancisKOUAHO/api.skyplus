import { Router } from 'express';
import {scrapingController} from "../controllers/scraping.controller";

const scrapingRoute = () => {
    const router = Router();

    router.get('/scrappin-data-linkedin', scrapingController);
    return router;
};

export { scrapingRoute };
