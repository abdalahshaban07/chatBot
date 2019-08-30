import { ModelBase } from "../../core/models/ModelBase";
import { ModelVailadtors } from "../../core/models/ModelVaildators";
import { DataBaseTypes } from "../../core/dataAdpater/DataBaseAdpater/DataBaseTypes";

export class StepsModel extends ModelBase {
    tableName = "steps";

    attrbuites: any = {
        id: DataBaseTypes.id,
        name: DataBaseTypes.string,
        order: DataBaseTypes.int,
        categoryId: DataBaseTypes.int,
        description: DataBaseTypes.string
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
