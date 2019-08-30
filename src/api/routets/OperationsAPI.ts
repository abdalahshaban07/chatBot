import { BalanceAPI } from "./BalanceAPI";
import { SmsAPI } from "./SmsResAPI";
import { SessionModel } from '../models/sessionModel';
import { StepsModel } from '../models/StepsModel';
// import { otpAPI } from './otpAPI';
import { TransactionAPI } from './TransactionAPI';
import { CalculateLoansAPI } from "./CalculateLoansAPI";
import { AccountStatues } from './AccountStatues';
import { greeting } from "./greeting";

export class OperationsAPI {
    private balance = new BalanceAPI()
    private smsRes = new SmsAPI()
    private session = new SessionModel()
    private steps = new StepsModel()
    private trx = new TransactionAPI()
    private cal = new CalculateLoansAPI()
    private statues = new AccountStatues()
    private greeting = new greeting()
    // private otp = new otpAPI()

    operationSwitch = async (to, from, operation, req, intent) => {
        console.log(operation, 'op');

        ///get session
        let getSession = await this.session.findAll()
        ///


        switch (operation) {
            case 'choose your account':
                let body = ` current or saving`
                await this.smsRes.sendRes(to, from, body)
                await this.session.create({ name: 'choose your account', currentStep: 3, value: 'choose your account', userPhone: from, expDate: new Date(Date.now() + 8 * 3600 * 1000), defaultStep: 1 })
                break
            case 'choice-of-account':
                let choice_of_account = await this.session.create({ name: 'choice-of-account', currentStep: 4, value: intent, userPhone: from, expDate: new Date(Date.now() + 8 * 3600 * 1000), defaultStep: 1 })
                if (choice_of_account) {
                    let getSessionAfterCreate = await this.session.findAll()

                    let getAllSessionRows = await getSessionAfterCreate.map(value => {
                        return value.dataValues
                    })//get las session row
                    console.log('getAllSessionRows', getAllSessionRows[getAllSessionRows.length - 1]);
                    let getLastRow = await getAllSessionRows[getAllSessionRows.length - 1] //get last session row
                    console.log(getLastRow.defaultStep, 'getLastRow.defaultStep=0 in choice-of-account');
                    ///
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

                    ///get id category
                    let getCategoryId = await this.session.findAll({
                        equalTo: [
                            {
                                attribute: 'name',
                                value: 'categoryId'
                            }
                        ]
                    })
                    //
                    let getAllCategory = await getCategoryId.map(value => {
                        // console.log(value.dataValues, 'value');

                        return value.dataValues
                    })
                    let getLastCategory = await getAllCategory[getAllCategory.length - 1]
                    console.log(getLastCategory.categoryId, 'getLastCategory');
                    console.log(intent, 'intent');


                    let getNextStep = await this.steps.findOne({
                        equalTo: [{
                            attribute: 'categoryId',
                            value: getLastCategory.categoryId //1
                        }, {
                            attribute: 'description',
                            value: `${intent}_balance`
                        }]
                    })

                    console.log(getNextStep.dataValues.name, 'getNextStep in choice-of-account');
                    ///

                    await this.operationSwitch(to, from, getNextStep.dataValues.name, req, intent)
                }
                break
            //get last row from session table
            case 'balance':
                await this.balance.getAllBalance(to, from)
                await this.session.create({ name: 'balance', currentStep: 0, value: 'balance', userPhone: from, expDate: new Date(Date.now() + 8 * 3600 * 1000), defaultStep: 0 })
                break;
            case 'current':
                await this.balance.getCurrentBalance(to, from)
                await this.session.create({ name: 'current Balance', currentStep: 0, value: 'current Balance', userPhone: from, expDate: new Date(Date.now() + 8 * 3600 * 1000), defaultStep: 0 })
                break;
            case 'saving':
                await this.balance.getSavingBalance(to, from)
                await this.session.create({ name: 'saving Balance', currentStep: 0, value: 'saving Balance', userPhone: from, expDate: new Date(Date.now() + 8 * 3600 * 1000), defaultStep: 0 })
                break;
            case 'transactions':
                await this.trx.getCardTransaction(to, from)
                await this.session.create({ name: 'transaction-for-card-services', currentStep: 0, value: 'transaction-for-card-services', userPhone: from, expDate: new Date(Date.now() + 8 * 3600 * 1000), defaultStep: 0 })
                break
            case 'current_transactions':
                await this.trx.getTransaction(to, from)
                await this.session.create({ name: 'transaction', currentStep: 0, value: 'transaction', userPhone: from, expDate: new Date(Date.now() + 8 * 3600 * 1000), defaultStep: 0 })
                break
            case 'saving_transactions':
                await this.trx.getTransaction(to, from)
                await this.session.create({ name: 'transaction', currentStep: 0, value: 'transaction', userPhone: from, expDate: new Date(Date.now() + 8 * 3600 * 1000), defaultStep: 0 })
                break
            case 'loans':
                let loans = `what is your needed amount`
                await this.session.create({ name: 'make-lonas', currentStep: 1, value: intent, userPhone: from, expDate: new Date(Date.now() + 8 * 3600 * 1000), defaultStep: 1 })
                await this.smsRes.sendRes(to, from, loans)
                break
            case 'your_amount':
                let vaildLoans = await this.cal.vaildLoans(to, from, intent)
                if (vaildLoans) {
                    await this.session.create({ name: 'your-amount', currentStep: 2, value: intent, userPhone: from, expDate: new Date(Date.now() + 8 * 3600 * 1000), defaultStep: 1 })
                    break
                } else { break }
            case 'coming_amount':
                let calLoans = await this.cal.calculateLoans(to, from, intent)
                if (calLoans) {
                    await this.session.create({ name: 'calculateLoans', currentStep: 0, value: intent, userPhone: from, expDate: new Date(Date.now() + 8 * 3600 * 1000), defaultStep: 0 })
                    break
                } else {
                    break
                }
            case 'active':
                let active = await this.statues.activeAccount(to, from)
                if (active) {
                    await this.session.create({ name: 'activeCard', currentStep: 0, value: intent, userPhone: from, expDate: new Date(Date.now() + 8 * 3600 * 1000), defaultStep: 0 })
                    break
                } else {
                    break
                }

            case 'disable':
                let disable = await this.statues.disableAccount(to, from)
                if (disable) {
                    await this.session.create({ name: 'disableCard', currentStep: 0, value: intent, userPhone: from, expDate: new Date(Date.now() + 8 * 3600 * 1000), defaultStep: 0 })
                    break
                } else {
                    break
                }
            case 'how-can-help-you':
                let greeting = await this.greeting.greeting(to, from)
                if (greeting) {
                    await this.session.create({ name: 'help', currentStep: 0, value: intent, userPhone: from, expDate: new Date(Date.now() + 8 * 3600 * 1000), defaultStep: 0 })
                    break
                } else {
                    break
                }
            case 'send-otp':
                await this.smsRes.sendOtp(to, from, req, intent)
                break
            case 'verify-otp':
                let verify = await this.smsRes.verifyOtp(to, from, req)
                if (verify) {
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
                    ///get category id 
                    let getCategoryId = await this.session.findAll({
                        equalTo: [
                            {
                                attribute: 'name',
                                value: 'categoryId'
                            }
                        ]
                    })
                    //
                    let getAllCategory = await getCategoryId.map(value => {
                        // console.log(value.dataValues, 'value');

                        return value.dataValues
                    })
                    let getLastCategory = await getAllCategory[getAllCategory.length - 1]
                    console.log(getLastCategory.categoryId, 'getLastCategory in trx card');
                    ////
                    ////
                    //case in searchQuery and notSearchQuery card_services
                    if (getLastCategory.categoryId === 3 && lastSearchQuery.searchQuery === 'transactions') {


                        //get next function to do
                        // console.log(getCategoryId.dataValues.categoryId, 'getCategoryId');//1

                        let getNextStep = await this.steps.findOne({
                            equalTo: [{
                                attribute: 'categoryId',
                                value: getLastCategory.categoryId //1
                            }, {
                                attribute: 'name',
                                value: lastSearchQuery.searchQuery
                            }]
                        })

                        console.log(getNextStep.dataValues.name, 'getNextStep in trx card services');
                        ///
                        await this.operationSwitch(to, from, getNextStep.dataValues.name, req, intent)
                        break;

                    }
                    if (getLastCategory.categoryId === 3 && lastSearchQuery.searchQuery === 'active') {


                        //get next function to do
                        // console.log(getCategoryId.dataValues.categoryId, 'getCategoryId');//1

                        let getNextStep = await this.steps.findOne({
                            equalTo: [{
                                attribute: 'categoryId',
                                value: getLastCategory.categoryId //1
                            }, {
                                attribute: 'name',
                                value: lastSearchQuery.searchQuery
                            }]
                        })

                        console.log(getNextStep.dataValues.name, 'getNextStep in active card services');
                        ///
                        await this.operationSwitch(to, from, getNextStep.dataValues.name, req, intent)
                        break;

                    }
                    if (getLastCategory.categoryId === 3 && lastSearchQuery.searchQuery === 'disable') {


                        //get next function to do
                        // console.log(getCategoryId.dataValues.categoryId, 'getCategoryId');//1

                        let getNextStep = await this.steps.findOne({
                            equalTo: [{
                                attribute: 'categoryId',
                                value: getLastCategory.categoryId //1
                            }, {
                                attribute: 'name',
                                value: lastSearchQuery.searchQuery
                            }]
                        })

                        console.log(getNextStep.dataValues.name, 'getNextStep in disable card services');
                        ///
                        await this.operationSwitch(to, from, getNextStep.dataValues.name, req, intent)
                        break;

                    }
                    //get last row from session table
                    let getSessionAfterCreate = await this.session.findAll()

                    let getAllSessionRows = await getSessionAfterCreate.map(value => {
                        return value.dataValues
                    })//get las session row
                    console.log('getAllSessionRows', getAllSessionRows[getAllSessionRows.length - 1]);
                    let getLastRow = await getAllSessionRows[getAllSessionRows.length - 1] //get last session row
                    console.log(getLastRow.defaultStep, 'getLastRow.defaultStep=0');
                    let getNextStep = await this.steps.findOne({
                        equalTo: [{
                            attribute: 'categoryId',
                            value: getLastCategory.categoryId //1
                        }, {
                            attribute: 'order',
                            value: getLastRow.currentStep + 1
                        }]
                    })

                    console.log(getNextStep.dataValues.name, 'getNextStep');
                    ///
                    await this.operationSwitch(to, from, getNextStep.dataValues.name, req, intent)
                }
                // await this.operationSwitch(to, from, getNextStep.dataValues.name, req)
                break

            default:
                break;
        }

        return true
    }
}






