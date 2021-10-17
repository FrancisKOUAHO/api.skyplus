import { Router } from 'express';
import { autoConnectLinkedInController } from "../controllers/autoConnectLinkedIn.controller";


const connectProfileMessageLinkedinRoute = () => {
    const router = Router();
    router.get('/connect-profile-message-linkedin', autoConnectLinkedInController);
    return router;
}


export { connectProfileMessageLinkedinRoute };
