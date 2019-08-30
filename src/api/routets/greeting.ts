import { BalanceAPI } from "./BalanceAPI";
import { SmsAPI } from './SmsResAPI';
import { SessionModel } from '../models/sessionModel';
import { chatBotUserModel } from "../models/chatBotUserModel";

export class greeting {
    private smsRes = new SmsAPI()
    private user = new chatBotUserModel()
    constructor() {

    }

    greeting = async (to, from) => {

        let getName = await this.user.findOne({
            equalTo: [{
                attribute: 'phone',
                value: from
            }]
        })

        console.log(getName.name);

        let help = `how can help you ? ${getName.name} `
        return await this.smsRes.sendRes(to, from, help)

    }

}





