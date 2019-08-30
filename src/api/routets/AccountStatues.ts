
import { chatBotUserModel } from '../models/chatBotUserModel'
import { SmsAPI } from './SmsResAPI';
import * as express from 'express';
import { SessionModel } from '../models/sessionModel';

export class AccountStatues {
    path: string = '';
    private user = new chatBotUserModel()
    private session = new SessionModel()
    private smsRes = new SmsAPI()
    constructor() {

    }




    activeAccount = async (to, from) => {
        let searchQuery = await this.session.findAll({
            equalTo: [
                {
                    attribute: 'name',
                    value: 'searchQuery'
                }
            ]
        })
        let getAllSearchQuery = await searchQuery.map(value => {
            // console.log(value.dataValues, 'value.dataValues');
            return value.dataValues
        })
        let lastSearchQuery = await getAllSearchQuery[getAllSearchQuery.length - 1]
        console.log(lastSearchQuery.searchQuery, 'statues in active');
        let activeAccount = await this.user.update({ statues: lastSearchQuery.searchQuery }, { equalTo: [{ attribute: 'phone', value: from }] })
        let body = `your account is active Now`
        return await this.smsRes.sendRes(to, from, body)

    }

    disableAccount = async (to, from) => {

        let searchQuery = await this.session.findAll({
            equalTo: [
                {
                    attribute: 'name',
                    value: 'searchQuery'
                }
            ]
        })
        let getAllSearchQuery = await searchQuery.map(value => {
            // console.log(value.dataValues, 'value.dataValues');

            return value.dataValues
        })
        let lastSearchQuery = await getAllSearchQuery[getAllSearchQuery.length - 1]
        console.log(lastSearchQuery.searchQuery, 'statues in disable');



        let disableAccount = await this.user.update({ statues: lastSearchQuery.searchQuery }, { equalTo: [{ attribute: 'phone', value: from }] })

        let body = `your account is disable Now`
        return await this.smsRes.sendRes(to, from, body)
    }

}


