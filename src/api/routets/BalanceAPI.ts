
import { chatBotUserModel } from '../models/chatBotUserModel'
import { SmsAPI } from './SmsResAPI';
import * as express from 'express';

export class BalanceAPI {
    path: string = '';
    private user = new chatBotUserModel()
    private smsRes = new SmsAPI()
    constructor() {

    }


    getAllBalance = async (to, from) => {



        let totlaBalance = await this.user.findOne({
            equalTo: [{
                attribute: 'phone',
                value: from
            }]
        })
        console.log(totlaBalance.dataValues.totalBalance, 'totla');
        let body = ` your card balance ${totlaBalance.dataValues.totalBalance}`
        await this.smsRes.sendRes(to, from, body)



    }

    getSavingBalance = async (to, from) => {
        let savingBalance = await this.user.findOne({
            equalTo: [{
                attribute: 'phone',
                value: from
            }]
        })

        let body = `your saving balance ${savingBalance.dataValues.savingBalance}`
        await this.smsRes.sendRes(to, from, body)
    }

    getCurrentBalance = async (to, from) => {
        let currentBalance = await this.user.findOne({
            equalTo: [{
                attribute: 'phone',
                value: from
            }]
        })

        let body = `your current balance ${currentBalance.dataValues.currentBalance}`
        await this.smsRes.sendRes(to, from, body)
    }

}


