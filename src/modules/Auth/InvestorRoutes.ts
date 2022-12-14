import { Router } from "express";
import AuthController from "./controller/InvestorController";
import { container } from 'tsyringe';

const authRouter = Router();
const authController = container.resolve(AuthController)

authRouter.post('/register', (req, res)=>authController.register(req, res));
authRouter.post('/login', (req, res)=>authController.Login(req, res));
authRouter.post('/forgotpassword', (req, res)=>authController.Forgotpassword(req, res));
authRouter.patch('/changepassword', (req, res)=>authController.Changepassword(req, res));
authRouter.post('/verifyaccount', (req, res)=>authController.verify(req, res));

export default authRouter