import { SmsAPI } from './SmsResAPI';
import { SessionModel } from '../models/sessionModel';

const { Wit, log } = require('node-wit');
const parseString = new Wit({
    accessToken: 'QXSJ3RJEF36LTOM5DEGSZDH7AWBUUGHB',
    logger: new log.Logger(log.DEBUG) // optional
});

export class ParsingAPI {
    private smsRes = new SmsAPI();
    private session = new SessionModel();
    constructor() { }

    parsingString = async (to, from, body) => {
        let intent = await parseString
            .message(body, {})
            .then(async data => {
                let getSession = await this.session.findAll();
                let getAllSessionRows = await getSession.map(value => {
                    return value.dataValues;
                }); //get las session row
                let getLastRow = getAllSessionRows[getAllSessionRows.length - 1];



                if (Object.keys(data.entities).length === 0 && (getLastRow.name === 'verify-otp' || getLastRow.name === 'otp-code' || getLastRow.name === 'make-lonas' || getLastRow.name === 'monthly_income' || getLastRow.name === 'your-amount')) {
                    // console.log('in');
                    // console.log(data._text, 'data.text');
                    return data._text
                    // return Object.keys(data.entities)[0]
                }
                if (Object.keys(data.entities).length > 0 && data.entities.constructor === Object) {
                    console.log(Object.keys(data.entities)[0], 'key');
                    let confidence = Object.values(data.entities)[0][0]['confidence'];
                    if (Math.round(confidence * 100) < 60 && (getLastRow.name === 'verify-otp' || getLastRow.name === 'otp-code' || getLastRow.name === 'make-lonas' || getLastRow.name === 'monthly_income' || getLastRow.name === 'your-amount')) {
                        // return undefined
                        console.log(data.text, 'data.text');
                        return data._text
                        // return Object.keys(data.entities)[0]
                    }
                    // if (Math.round(confidence * 100) < 60 && (getLastRow.name === 'make-loand' || getLastRow.name === 'monthly_income')) {
                    //     // return undefined
                    //     console.log(data.text, 'data.text');
                    //     return data._text
                    //     // return Object.keys(data.entities)[0]
                    // }
                    if (Math.round(confidence * 100) < 60) {
                        return undefined

                    }
                    if (Math.round(confidence * 100) > 60) {
                        return Object.keys(data.entities)[0]
                    }
                }


                // return Object.keys(data.entities)[0]
            })
            .catch(err => {
                console.log(err);
            });
        return intent; //balance // saving_balance
    };
}
