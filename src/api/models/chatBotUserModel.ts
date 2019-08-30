import { ModelBase } from "../../core/models/ModelBase";
import { ModelVailadtors } from "../../core/models/ModelVaildators";
import { RequierdVaildator } from "../vaildators/requierd.vaildator";
import { UniqueVaildator } from '../vaildators/unique.validator';
import { DataBaseTypes } from "../../core/dataAdpater/DataBaseAdpater/DataBaseTypes";
import { maxLengthtVaildator } from '../vaildators/maxLength.validator';

export class chatBotUserModel extends ModelBase {
    tableName = "Users";
    attrbuites: any = {
        name: DataBaseTypes.string,
        mpin: DataBaseTypes.int,
        email: DataBaseTypes.string,
        phone: DataBaseTypes.string,
        id: DataBaseTypes.id,
        totalBalance: DataBaseTypes.int,
        savingBalance: DataBaseTypes.int,
        currentBalance: DataBaseTypes.int,
        statues: DataBaseTypes.string
    };
    options = {
        timestamps: true
    };
    validators: ModelVailadtors[] = [

        {
            key: 'name',
            Vailadtors: [
                {
                    vaildator: new RequierdVaildator()
                }
            ]
        },
        {
            key: 'phone',
            Vailadtors: [
                {
                    vaildator: new RequierdVaildator()

                },
                {
                    vaildator: new UniqueVaildator(),
                    params: {
                        key: 'phone',
                        model: this
                    }
                }
            ]
        },
        {
            key: 'mpin',
            Vailadtors: [
                {
                    vaildator: new RequierdVaildator()

                },
                // {
                //     vaildator: new maxLengthtVaildator()

                // }
            ]
        }
    ];

    constructor() {
        super();
        this.initializeDataWrapper();
    }
    initializeAssociations() {
        this.ownMany('transactions', { as: 'transactions' })
        // this.ownOne('sessions', { as: 'sessions' })

    }
}
