import { APIBase } from "../../core/routes/APIBase";
import { Response, Request } from "express";
import { ReplaysModel } from '../models/ReplaysModel';
import { chatBotUserModel } from '../models/chatBotUserModel';
import { SmsAPI } from './SmsResAPI';
import { ParsingAPI } from "./ParsingAPI";
import { StepsModel } from '../models/StepsModel';
import { OperationsAPI } from './OperationsAPI';
import { SessionModel } from '../models/sessionModel';
import { resetAPI } from './resetAPI';
import { CategoryModel } from '../models/CategoryModel';


export class TwilioAPI extends APIBase {
    path: string = '/twilio';
    private replay = new ReplaysModel()
    private user = new chatBotUserModel()
    private smsRes = new SmsAPI()
    private wit = new ParsingAPI()
    private steps = new StepsModel()
    private op = new OperationsAPI()
    private session = new SessionModel()
    private reset = new resetAPI()
    private category = new CategoryModel()
    constructor() {
        super();
        this.initRoutes();
    }
    initRoutes(): void {
        this.router.post("/inbound", this.twilioSms);
    }

    private twilioSms = async (req: any, res: Response) => {



        let phoneNumberFrom = (req.body.From as string).substring(11)
        let phoneNumberTo = (req.body.To as string).substring(10)

        let intent = await this.wit.parsingString(phoneNumberTo, phoneNumberFrom, req.body.Body)
        console.log(intent, 'intent');

        if (intent === 'reset') {

            await this.session.create({ name: 'reset', currentStep: 0, defaultStep: 0, value: 'reset', userPhone: phoneNumberFrom, expDate: new Date(Date.now() + 8 * 3600 * 1000) })
            let body = `reset `
            await this.smsRes.sendRes(phoneNumberTo, phoneNumberFrom, body)
            res.end()
        }

        let getSession = await this.session.findAll()

        // console.log(getSession.length, 'getSession'); //first time =0

        // check if user exist or not 
        if (getSession.length == 0) {

            //check for user 
            let user = await this.user.findOne({
                equalTo: [
                    { attribute: 'phone', value: phoneNumberFrom }
                ]
            })
            if (!user) {
                let body = 'this user not assign'
                await this.smsRes.sendRes(phoneNumberTo, phoneNumberFrom, body)
                res.end()
            }
            //user Founded
            else {
                let defaultSession = await this.session.create({ name: 'userFounded', currentStep: 0, value: 'userFounded', userPhone: phoneNumberFrom, expDate: new Date(Date.now() + 8 * 3600 * 1000), defaultStep: 0 })
            }
        }
        //after create session for default step
        let getSessionAfterCreate = await this.session.findAll()

        let getAllSessionRows = await getSessionAfterCreate.map(value => {
            return value.dataValues
        })//get las session row
        console.log('getAllSessionRows', getAllSessionRows[getAllSessionRows.length - 1]);
        let getLastRow = await getAllSessionRows[getAllSessionRows.length - 1] //get last session row
        console.log(getLastRow.defaultStep, 'getLastRow.defaultStep=0');
        let self = this
        async function implementStep(self) {
            console.log(intent, 'self.intent');

            if (intent === undefined) {
                let body = ` sorry this services no available now`;
                await self.smsRes.sendRes(phoneNumberTo, phoneNumberFrom, body);
                res.end()
            } else {
                //get categoryid from last intent to know steps to do
                let searchQuery = await self.session.findOne({
                    equalTo: [
                        {
                            attribute: 'name',
                            value: 'searchQuery'
                        }
                    ]
                })
                // console.log(searchQuery, 'searchQuery.dataValues.searchQurey in op');
                // let getAllSessionRows = await searchQuery.map(value => {
                //     // console.log(value.dataValues, 'value');
                //     return value.dataValues
                // })//get las session row
                // let getLastRow = await getAllSessionRows[getAllSessionRows.length - 1] //get last session row
                // console.log(getLastRow.searchQuery, 'getLastRow.searchQuery');



                let getCategoryId = await self.session.findAll({
                    equalTo: [
                        {
                            attribute: 'name',
                            value: 'categoryId'
                            // value: getLastRow.searchQuery
                        },
                    ]
                })
                let getAllCategory = await getCategoryId.map(value => {
                    // console.log(value.dataValues, 'value');

                    return value.dataValues
                })
                let getLastCategory = await getAllCategory[getAllCategory.length - 1]
                console.log(getLastCategory, 'getLastCategory');

                // console.log(getCategoryId[0], 'getCategoryId');//1
                console.log(getLastRow.name, 'getLastRow.name');
                console.log(getLastRow.currentStep, 'getLastRow.currentStep');
                let getNextStep = await self.steps.findOne({
                    equalTo: [{
                        attribute: 'categoryId',
                        value: getLastCategory.categoryId //1
                    }, {
                        attribute: 'order',
                        value: getLastRow.currentStep + 1
                    }]
                })

                console.log(getNextStep.dataValues.name, 'getNextStep');


                //check statues of user 
                let statues = await self.user.findOne({
                    equalTo: [{
                        attribute: 'phone',
                        value: phoneNumberFrom
                    }]
                })

                console.log(statues.statues, 'statues.statues');



                if (getLastCategory.categoryId === 3 && statues.statues === 'disable') {
                    if (intent === 'active') {

                        let activeAccount = await self.user.update({ statues: intent }, {
                            equalTo: [{
                                attribute: 'phone', value: phoneNumberFrom
                            }]
                        })
                        await self.session.create({ name: 'activeCard', currentStep: 0, value: intent, userPhone: phoneNumberFrom, expDate: new Date(Date.now() + 8 * 3600 * 1000), defaultStep: 0 })
                        let body = `your account is active Now And you can using card services `
                        await self.smsRes.sendRes(phoneNumberTo, phoneNumberFrom, body)
                        res.end()
                    } else {
                        await self.session.create({ name: 'disableCard', currentStep: 0, value: intent, userPhone: phoneNumberFrom, expDate: new Date(Date.now() + 8 * 3600 * 1000), defaultStep: 0 })
                        let disableMsg = ` you must active card first by sending active to able to using services for card `
                        await self.smsRes.sendRes(phoneNumberTo, phoneNumberFrom, disableMsg)
                        res.end()
                    }
                } else {
                    await self.op.operationSwitch(phoneNumberTo, phoneNumberFrom, getNextStep.dataValues.name, req, intent)
                }



            }

        }
        if (getLastRow.defaultStep == 0) {
            //get intent of word
            //creat new session for this intent to know what user search about
            if (intent === undefined) {
                let body = ` sorry this services no available now `;
                await this.smsRes.sendRes(phoneNumberTo, phoneNumberFrom, body);
                res.end()
            } else {
                //check for this intent to know if in replays
                let getReplays = await this.replay.findOne({
                    equalTo: [
                        {
                            attribute: 'intention',
                            value: intent
                        }
                    ]
                })
                console.log(getReplays, 'getReplays');

                if (getReplays) {
                    let searchQuery = await this.session.create({ name: 'searchQuery', currentStep: 0, value: 'searchQuery', userPhone: phoneNumberFrom, expDate: new Date(Date.now() + 8 * 3600 * 1000), defaultStep: 0, searchQuery: intent })
                }
                else {
                    let searchQuery = await this.session.create({ name: 'notSearchQuery', currentStep: 0, value: 'notSearchQuery', userPhone: phoneNumberFrom, expDate: new Date(Date.now() + 8 * 3600 * 1000), defaultStep: 0, searchQuery: intent })
                }




                let getIntentFromSteps = await this.steps.findAll({
                    equalTo: [{
                        attribute: 'name',
                        value: intent,
                    }]
                })

                let intents = getIntentFromSteps.map(m => {
                    return m.dataValues.categoryId
                })

                console.log(intents.length, 'intent length in getLastRow.defaultStep == 0');

                // start check for length of entent 
                if (intents.length === 0) {
                    if (intent === 'reset') {
                        await this.session.create({ name: 'reset', currentStep: 0, defaultStep: 0, value: 'reset', userPhone: phoneNumberFrom, expDate: new Date(Date.now() + 8 * 3600 * 1000) })
                    } else {
                        let updateDefualtStep = await this.session.create({ name: 'wrong intent', currentStep: 0, value: req.body.Body, userPhone: phoneNumberFrom, expDate: new Date(Date.now() + 8 * 3600 * 1000), defaultStep: 0, })
                        let body = ` this services not available for now `
                        await this.smsRes.sendRes(phoneNumberTo, phoneNumberFrom, body)
                    }


                }//end of intents.lenth==0 
                if (intents.length === 1) {
                    console.log(intents[0], 'category id');
                    let categoryId = intents[0]

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
                    // let searchQueryName = searchQuery.dataValues.searchQuery

                    //make defult step =0 to retren again to case in intent.lenght=0 to update default step =1
                    let categoryIdStep = await this.session.create({ name: 'categoryId', currentStep: 0, value: 'categoryId', userPhone: phoneNumberFrom, categoryId: categoryId, searchQuery: lastSearchQuery.searchQuery, expDate: new Date(Date.now() + 8 * 3600 * 1000), defaultStep: 1 })
                    let updateDefualtStep = await this.session.create({ name: 'intent length ==1', currentStep: 0, value: 'intent length ==1', userPhone: phoneNumberFrom, categoryId: categoryId, expDate: new Date(Date.now() + 8 * 3600 * 1000), defaultStep: 1 })
                    await implementStep(self)
                } //end of intents.lenght>0
                if (intents.length > 1) {
                    //make defult step =0 to retren again to case in intent.lenght=0 to update default step =1
                    let updateDefualtStep = await this.session.create({ name: 'intents.length > 1', currentStep: 0, value: 'intents.length > 1', userPhone: phoneNumberFrom, expDate: new Date(Date.now() + 8 * 3600 * 1000), defaultStep: 0 })
                    // //make choose for more intent
                    let makeChoose = await this.smsRes.makeChoose(phoneNumberTo, phoneNumberFrom, intents, intent)
                }

            }
        } //end of getLastRow.defaultStep =0
        //start of lastDefultStep=1
        else if (getLastRow.defaultStep == 1) {
            await implementStep(self)
        } //end of getLastRow.defaultStep>1


    }
}



