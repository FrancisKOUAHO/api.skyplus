import { Router } from 'express';
import { connectProfileMessageLinkedinController } from "../controllers/connectProfileMessageLinkedin.controller";


const connectProfileMessageLinkedinRoute = () => {
    const router = Router();
    router.get('/connect-profile-message-linkedin', connectProfileMessageLinkedinController);
    return router;
}


export { connectProfileMessageLinkedinRoute };
