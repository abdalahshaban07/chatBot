
import { chatBotUserModel } from '../models/chatBotUserModel'
import { SmsAPI } from './SmsResAPI';
import { TransactionModel } from '../models/TransactionModel';

export class TransactionAPI {
    path: string = '';
    private user = new chatBotUserModel()
    private smsRes = new SmsAPI()
    private trx = new TransactionModel()
    constructor() {

    }


    getTransaction = async (to, from) => {
        let trx = await this.user.findOne({
            equalTo: [
                { attribute: 'id', value: 1 },
            ]
        }, [{ modelName: 'transactions', includeAs: 'transactions' }])
        console.log(trx.dataValues.transactions.length, 'trx')

        if (trx.dataValues.transactions.length === 0) {
            let body = `you don't have any trx yet`
            await this.smsRes.sendRes(to, from, body)
        } else {

            let allTransaction: string[] = []
            for (let i = 0; i < trx.dataValues.transactions.length; i++) {
                // console.log(trx.dataValues.transactions[i].dataValues);
                allTransaction.push(trx.dataValues.transactions[i].dataValues)
            }
            // console.log(allTransaction.length);
            let body = ` your last 5 trx`
            let ok = await this.smsRes.sendRes(to, from, body)
            if (ok) {
                let size = 5;
                let newArr = await allTransaction.slice(0, size).map(async el => {
                    // console.log(el.length, 'el');
                    // return el
                    let type = el['type']
                    let description = el['description']
                    let amount = el['amount']
                    let body = `type [ ${type} ]  [ ${description} ]  amount [ ${amount} ]`
                    await this.smsRes.sendRes(to, from, body)

                })
            }
        }


    }
    getCardTransaction = async (to, from) => {
        let trx = await this.user.findOne({
            equalTo: [
                { attribute: 'id', value: 1 },
            ]
        }, [{ modelName: 'transactions', includeAs: 'transactions' }])
        console.log(trx.dataValues.transactions.length, 'trx')

        if (trx.dataValues.transactions.length === 0) {
            let body = `you don't have any trx yet`
            await this.smsRes.sendRes(to, from, body)
        } else {

            let allTransaction: string[] = []
            for (let i = 0; i < trx.dataValues.transactions.length; i++) {
                // console.log(trx.dataValues.transactions[i].dataValues);
                allTransaction.push(trx.dataValues.transactions[i].dataValues)
            }
            // console.log(allTransaction.length);
            let body = ` your last 5 trx for this Card`
            let ok = await this.smsRes.sendRes(to, from, body)
            if (ok) {
                let size = 5;
                let newArr = await allTransaction.slice(0, size).map(async el => {
                    // console.log(el.length, 'el');
                    // return el
                    let type = el['type']
                    let description = el['description']
                    let amount = el['amount']
                    let body = `type [ ${type} ]  [ ${description} ]  amount [ ${amount} ]`
                    await this.smsRes.sendRes(to, from, body)

                })
            }
        }


    }

}


