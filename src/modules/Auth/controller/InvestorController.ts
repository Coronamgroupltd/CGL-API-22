import { injectable } from "tsyringe";
import { Request, Response } from "express";
import { Http } from "../../../infrastruture/utils";
import Register from "../application/Investor/Register";
import Login from "../application/Investor/Login";
import Forgotpassword from "../application/Investor/Forgotpassword";
import Changepassword from "../application/Investor/Changepassword";
import VerifyEmail from "../application/Investor/VerifyEmail";

@injectable()
export default class AuthController {

    constructor(
        private addUser: Register,
        private login: Login,
        private forgotpassword: Forgotpassword,
        private changepassword: Changepassword,
        private verifyEmail: VerifyEmail
    ){

    }

    //Register investor
    async register(req: Request, res: Response){
        try{

            const createuser = await this.addUser.execute(req.body);
            
            if(createuser === "emailExist"){
                return   new Http().Response({
                    res: res,
                    statuscode: 401,
                    message: "Email already taken",
                })
            }

            if(createuser === "phoneExist"){
                return   new Http().Response({
                    res: res,
                    statuscode: 402,
                    message: "Phone already taken",
                })
            }

            new Http().Response({
                res: res,
                statuscode: 200,
                message: "User account created",
                data: createuser
            })


        }catch(err: any){
            new Http().Response({
                res: res,
                statuscode: 500,
                message: err.message
            })
        }
    }

    //login investor
    async Login(req: Request, res: Response){
        try{
            
            const { email, password } = req.body;
            
            const token = await this.login.execute(email, password);
         
            if(!token){
                return new Http().Response({
                    res: res,
                    statuscode: 401,
                    message: "Invalid Email/Password Provided",
                })
            }

            const data = {
                token: token.token,
                firstname: token.firstname,
                id: token.id,
                email: token.email
            }

            new Http().Response({
                res: res,
                statuscode: 200,
                message: "User authorized",
                data: data
            })

        }catch(err: any){
            new Http().Response({
                res: res,
                statuscode: 500,
                message: err.message
            })
        }
    }

    //forgotpassword
    async Forgotpassword(req: Request, res: Response){
        try{

            const { email, url } = req.body;

            const user = await this.forgotpassword.execute(email, url);

            if(user === false){
                return new Http().Response({
                    res: res,
                    statuscode: 404,
                    message: "Email not found",
                })
            }

            new Http().Response({
                res: res,
                statuscode: 200,
                message: "Check email for changepassword link",
                data: user
            })


        }catch(err: any){
            new Http().Response({
                res: res,
                statuscode: 500,
                message: err.message
            })
        }
    }

    //changepassword
    async Changepassword(req: Request, res: Response){
        try{

            const { token, password} = req.body;

            const payload = {
                token,
                password: password
            }

            const user = await this.changepassword.execute(payload);

            new Http().Response({
                res: res,
                statuscode: 200,
                message: "User password updated",
                data: user
            })


        }catch(err: any){
            new Http().Response({
                res: res,
                statuscode: 500,
                message: err.message
            })
        }
    }

    async verify(req: Request, res: Response){
        try{

            const { token } = req.body;

            const user = await this.verifyEmail.execute(token);

            if (user === false) {
                new Http().Response({
                    res: res,
                    statuscode: 400,
                    message: "Account Not Verified",
                })
            }

            new Http().Response({
                res: res,
                statuscode: 200,
                message: "Account Verified",
                data: user
            })


        }catch(err: any){
            new Http().Response({
                res: res,
                statuscode: 500,
                message: err.message
            })
        }
    }
    
}