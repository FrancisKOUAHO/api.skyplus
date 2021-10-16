import { Router } from 'express';
import { extractDataProfileLinkedInController } from "../controllers/extractDataProfileLinkedIn.controller";

const extractDataProfileLinkedInRoute = () => {
    const router = Router();
    router.get('/extract-data-profile-linkedin', extractDataProfileLinkedInController);
    return router;
};

export { extractDataProfileLinkedInRoute };
