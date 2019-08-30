import { Response, Request } from "express";
let jwt = require('jsonwebtoken');
import { APIBase } from "../../core/routes/APIBase";
import { chatBotUserModel } from '../models/chatBotUserModel';
import * as securePin from "secure-pin";
import { SessionModel } from '../models/sessionModel';

export class AddNewUserAPI extends APIBase {
    path: string = "";
    private user = new chatBotUserModel()
    constructor() {
        super();
        this.initRoutes();
    }
    initRoutes(): void {

        this.router.post("/add", this.addNewUser)
    }


    private addNewUser = async (req: Request, res: Response) => {
        console.log('in add new user');


        // let email = `${req.body.name}${(req.body.phone as string).substring(0, 3)}@Payme.co`

        let addUser = await this.user.create(req.body)
        // console.log(addUser, 'add');

        if (addUser.errors) {
            return res.status(400).json({ errors: addUser.errors });
        }
        res.status(200).json({ status: "success", data: addUser });



    }

}
