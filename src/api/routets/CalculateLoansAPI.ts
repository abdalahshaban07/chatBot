
import { SmsAPI } from './SmsResAPI';
import { SessionModel } from '../models/sessionModel';

export class CalculateLoansAPI {
    path: string = '';
    private smsRes = new SmsAPI()
    private session = new SessionModel()
    constructor() {

    }


    vaildLoans = async (to, from, intent) => {
        console.log(intent, 'intent');

        if (!Number(intent)) {
            console.log('invalidNo')
            let body = ` not correct character for amount please need number only `
            await this.session.create({ name: 'your-amount', currentStep: 1, value: 'fail', userPhone: from, expDate: new Date(Date.now() + 8 * 3600 * 1000), defaultStep: 1 })
            await this.smsRes.sendRes(to, from, body)
            return false

        }
        // console.log('valid number', intent)

        if (Number(intent)) {
            // await this.session.create({ name: 'correct-number', currentStep: 2, value: 'ok', userPhone: from, expDate: new Date(Date.now() + 8 * 3600 * 1000), defaultStep: 1 })
            let monthly_income = `what is your monthly income`
            await this.smsRes.sendRes(to, from, monthly_income)
            return true

        }




    }

    calculateLoans = async (to, from, intent) => {

        if (!Number(intent)) {
            console.log('invalidNo')
            let body = ` not correct character for amount please need number only `
            await this.session.create({ name: 'monthly_income', currentStep: 2, value: 'fail character of number', userPhone: from, expDate: new Date(Date.now() + 8 * 3600 * 1000), defaultStep: 1 })
            await this.smsRes.sendRes(to, from, body)
            return false

        }
        console.log('valid number', intent)

        if (Number(intent)) {
            let getAllAmountOfLoans = await this.session.findAll({
                equalTo: [
                    {
                        attribute: 'name',
                        value: 'your-amount'
                    }
                ]
            })
            let getLastAmountOfLoans = await getAllAmountOfLoans.map(value => {
                // console.log(value.dataValues, 'value.dataValues');

                return value.dataValues
            })
            let getAmountOfLaons = await getLastAmountOfLoans[getLastAmountOfLoans.length - 1]
            console.log(getAmountOfLaons.value, 'getAmountOfLaons'); //transactions

            let body = `you can take ${getAmountOfLaons.value} amount acording to your monthly ${intent} amount  on xx number of years`
            await this.smsRes.sendRes(to, from, body)
            return true

        }



    }

}


