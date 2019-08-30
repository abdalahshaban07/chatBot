import { Response, Request } from "express";
let jwt = require('jsonwebtoken');
import { APIBase } from "../../core/routes/APIBase";
import { chatBotUserModel } from "../models/chatBotUserModel";
import * as securePin from "secure-pin";
import { SessionModel } from '../models/sessionModel';

export class SendOtpAPI extends APIBase {
    path: string = "";
    private user = new chatBotUserModel()
    private sessions = new SessionModel()
    constructor() {
        super();
        this.initRoutes();
    }
    initRoutes(): void {
        this.router.get("/send-otp", this.sendOtpGet);
        this.router.post("/send-otp", this.sendOtpPost)
    }

    private sendOtpGet = async (req: Request, res: Response) => {
        res.render('sendOtp.ejs')
    };

    private sendOtpPost = async (req: any, res: Response) => {
        console.log(req.body, 'in post');
        let TokenVerify = jwt.verify(Object.keys(req.query)[0], "payme");

        let user = await this.user.findOne({
            equalTo: [{
                attribute: 'mpin',
                value: req.body.pin
            }, { attribute: 'phone', value: TokenVerify }]
        })

        if (!user) {
            res.render('error.ejs')
        } else {

            let otp = securePin.generatePinSync(5)
            // req.session.cookie.otp = otp
            await this.sessions.create({ name: 'otp-code', value: otp, currentStep: 1, defaultStep: 1, userPhone: TokenVerify, expDate: new Date(Date.now() + 8 * 3600 * 1000) })
            res.render('otp.ejs', { otp: otp })

        }

    }
}
