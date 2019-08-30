import { ModelBase } from "../../core/models/ModelBase";
import { ModelVailadtors } from "../../core/models/ModelVaildators";
import { DataBaseTypes } from "../../core/dataAdpater/DataBaseAdpater/DataBaseTypes";

export class TransactionModel extends ModelBase {
    tableName = "transactions";

    attrbuites: any = {
        id: DataBaseTypes.id,
        type: DataBaseTypes.string,
        amount: DataBaseTypes.int,
        description: DataBaseTypes.string,
        UserId: DataBaseTypes.int
    };
    options = {
        timestamps: true
    };
    validators: ModelVailadtors[] = [
    ];

    constructor() {
        super();
        this.initializeDataWrapper();
    }
}
