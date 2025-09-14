import express from 'express';
import { userController } from './user.contllors';

const router = express.Router();

// Example route
router.post('/users', userController.createUser);


export const userRoutes = router;