import { BalanceAPI } from "./BalanceAPI";
import { SmsAPI } from './SmsResAPI';
import { SessionModel } from '../models/sessionModel';

export class resetAPI {
    private smsRes = new SmsAPI()
    private session = new SessionModel()
    constructor() {

    }

    reset = async (to, from) => {
        let resetIntention = await this.session.create({ name: 'reset', nextStep: null, value: 'reset', userPhone: from, expDate: new Date(Date.now() + 8 * 3600 * 1000) })
        let body = ` what are you sesrching for ?`
        await this.smsRes.sendRes(to, from, body)
    }
    arr = [{ 'send-otp': this.smsRes.sendOtp }]
}





