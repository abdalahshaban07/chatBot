import { Response, Request } from "express";
import { SIGN_TOKEN } from '../../core/middlewares/JWT';
import { CategoryModel } from "../models/CategoryModel";
import { SessionModel } from '../models/sessionModel';
import { StepsModel } from '../models/StepsModel';
import { ReplaysModel } from '../models/ReplaysModel';
import { OperationsAPI } from './OperationsAPI';
const accountSid = 'AC2222c23b88db1d4e55e1b51ed4df0847'
const authToken = 'eeee3b8547ce84e22ae21203e5c5b3da'

const client = require('twilio')(accountSid, authToken)

export class SmsAPI {
    constructor() {
    }
    private category = new CategoryModel()
    private session = new SessionModel()
    private steps = new StepsModel()
    private replays = new ReplaysModel()
    // private op = new OperationsAPI()

    makeChooseSms = async (to, from, nameOfCategory, intent) => {
        console.log(nameOfCategory, 'names');

        // console.log(req.session);

        let choices = nameOfCategory.reduce((accum, value, index) => {
            return accum += (index) ? ` or ${value}` : `${value}`
        }, '')

        await client.messages
            .create({
                from: `whatsapp:+${to}`,
                body: `What do you mean from ${intent} meaning ${choices}`,
                to: `whatsapp:+2${from}`,

            })
            .then(message => {
                // console.log(message)

            }).catch(err => {
                console.log(err);

            })
        let nameOfCategorytSession = await this.session.create({ name: 'nameOfCategory', value: JSON.stringify(nameOfCategory), currentStep: 0, defaultStep: 0, userPhone: from, expDate: new Date(Date.now() + 8 * 3600 * 1000) })

        return true

        // req.session.nameOfCategory = nameOfCategory
    }

    makeChoose = async (to, from, intents, intent) => {
        console.log('in choice');

        let getCategoryId = intents.map(category => {
            return category

        })
        // console.log(getCategoryId, 'idd'); //[1,3]
        let nameOfCategory: string[] = []
        for (let i = 0; i < getCategoryId.length; i++) {
            let getCategoryName = await this.category.findAll({ equalTo: [{ attribute: 'id', value: getCategoryId[i] }] })
            let name = getCategoryName.map(n => {
                let name = n.dataValues.description
                nameOfCategory.push(name)
                return n.dataValues.description
            })
        }

        let choose = await this.makeChooseSms(to, from, nameOfCategory, intent)

        return true


    }

    sendOtp = async (to, from, req, intent) => {
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
        console.log(lastSearchQuery.searchQuery, 'lastSearchQuery');

        // let searchQuery = await this.session.findOne({
        //     equalTo: [
        //         {
        //             attribute: 'name',
        //             value: 'searchQuery'
        //         }
        //     ]
        // })
        // console.log(searchQuery.dataValues.searchQuery, 'searchQuery.dataValues.searchQurey in sms');
        let getRequiredOtp = await this.replays.findOne({
            equalTo: [{
                attribute: 'replay',
                value: lastSearchQuery.searchQuery
            }]
        })
        console.log(getRequiredOtp, 'getRequiredOtp');

        if (getRequiredOtp.dataValues.requiredOtp) {
            // let send_otp = await this.session.create({ name: 'send_otp', value: 'send-otp', userPhone: from, expDate: new Date(Date.now() + 8 * 3600 * 1000), currentStep: 1, defaultStep: 1 })
            let send_otp = await this.session.create({ name: 'send-otp', currentStep: 1, value: req.session.otp, userPhone: from, expDate: new Date(Date.now() + 8 * 3600 * 1000), defaultStep: 1, searchQuery: lastSearchQuery.searchQuery })

            let token = SIGN_TOKEN(from)
            if (send_otp) {
                await client.messages
                    .create({
                        from: `whatsapp:+${to}`,
                        body: `please get code from this link blew that will send `,
                        to: `whatsapp:+2${from}`,

                    })
                    .then(message => {
                        // console.log(message)
                    }).catch(err => {
                        console.log(err);

                    })

                // let body = ''
                await client.messages
                    .create({
                        from: `whatsapp:+${to}`,
                        // body: `http://172.31.45.66:4001/send-otp?${token}`,
                        // body: `www.bitly.com`,
                        to: `whatsapp:+2${from}`,

                    })
                    .then(message => {
                        // console.log(message)
                    }).catch(err => {
                        console.log(err);

                    })


            }
        }
        else {
            let send_otp = await this.session.create({ name: 'send_otp', value: 'send-otp', userPhone: from, expDate: new Date(Date.now() + 8 * 3600 * 1000), currentStep: 1, defaultStep: 1 })
            await this.waitSms(to, from)
        }

    }
    waitSms = async (to, from) => {
        await client.messages
            .create({
                from: `whatsapp:+${to}`,
                body: ` wait until do this service`,
                to: `whatsapp:+2${from}`,

            })
            .then(message => {
                // console.log(message)
            }).catch(err => {
                console.log(err);

            })
    }

    sendRes = async (to, from, body) => {
        await client.messages
            .create({
                from: `whatsapp:+${to}`,
                body: body,
                to: `whatsapp:+2${from}`,

            })
            .then(message => {
                return true

            }).catch(err => {
                console.log(err);

            })
        return true

    }

    verifyOtp = async (to, from, req) => {

        let getSession = await this.session.findAll()
        let getAllSessionRows = await getSession.map(value => {
            return value.dataValues
        })//get las session row
        let getLastRow = getAllSessionRows[getAllSessionRows.length - 1]
        let searchQueryN = await this.session.findOne({
            equalTo: [
                {
                    attribute: 'name',
                    value: 'searchQuery'
                }
            ]
        })
        console.log(searchQueryN.dataValues.searchQuery, 'searchQuery.dataValues.searchQurey in op');
        let searchQueryName = searchQueryN.dataValues.searchQuery
        //get otp code from session to compare
        let otp_code = await this.session.findAll({
            equalTo: [
                {
                    attribute: 'name',
                    value: 'otp-code'
                }
            ]
        })

        console.log(otp_code.dataValues, 'otp_code.dataValues.value');

        //get last otp i send
        let getOtpRows = await otp_code.map(value => {
            return value.dataValues.value
        })//get las session row
        console.log('getAllSessionRows', getAllSessionRows[getAllSessionRows.length - 1]);
        let getOtp = await getOtpRows[getOtpRows.length - 1] //get last session row
        console.log(getOtp, 'getOtp');

        ///// to go next step after veriy directly
        //get categoryid from last intent to know steps to do
        //get last session of last searchQuery andlast not searchquery 
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
        console.log(lastSearchQuery.searchQuery, 'lastSearchQuery'); //transactions


        let getCategoryId = await this.steps.findOne({
            equalTo: [
                {
                    attribute: 'name',
                    value: lastSearchQuery.searchQuery
                }
            ]
        })

        console.log(getCategoryId.dataValues.categoryId, 'getCategoryId');//1

        let getNextStep = await this.steps.findOne({
            equalTo: [{
                attribute: 'categoryId',
                value: getCategoryId.dataValues.categoryId //1
            }, {
                attribute: 'order',
                value: getLastRow.currentStep + 1
            }]
        })

        console.log(getNextStep.dataValues.name, 'getNextStep');

        // await this.op.operationSwitch(to, from, getNextStep.dataValues.name, req)

        /////

        console.log(req.body.Body);
        if (!Number(req.body.Body) || String(req.body.Body).length != 5) {
            console.log('invalidNo')
            let body = ` not correct word `
            await this.session.create({ name: 'verify-otp', currentStep: 1, value: 'fail', userPhone: from, expDate: new Date(Date.now() + 8 * 3600 * 1000), defaultStep: 1, searchQuery: searchQueryName })
            await this.sendRes(to, from, body)
            return false

        } else {
            console.log('valid number', req.body.Body)

            if (Number(req.body.Body) == getOtp) {
                await this.session.create({ name: 'verify-otp', currentStep: 2, value: 'ok', userPhone: from, expDate: new Date(Date.now() + 8 * 3600 * 1000), defaultStep: 1 })
                return true

            }
            else {
                let notCorrectPin = ` this pin is not match with pin we send`
                await this.session.create({ name: 'verify-otp', currentStep: 1, value: 'fail', userPhone: from, expDate: new Date(Date.now() + 8 * 3600 * 1000), defaultStep: 1, searchQuery: searchQueryName })
                await this.sendRes(to, from, notCorrectPin)
                return false
            }

        }

    }

}


