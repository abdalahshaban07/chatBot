import { ModelBase } from "../../core/models/ModelBase";
import { ModelVailadtors } from "../../core/models/ModelVaildators";
import { DataBaseTypes } from "../../core/dataAdpater/DataBaseAdpater/DataBaseTypes";

export class SessionModel extends ModelBase {
    tableName = "sessions";
    attrbuites: any = {
        id: DataBaseTypes.id,
        name: DataBaseTypes.string,
        value: DataBaseTypes.string,
        expDate: DataBaseTypes.date,
        userPhone: DataBaseTypes.string,
        currentStep: DataBaseTypes.int,
        defaultStep: DataBaseTypes.int,
        categoryId: DataBaseTypes.int,
        searchQuery: DataBaseTypes.string
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
    initializeAssociations() {
    }
}
