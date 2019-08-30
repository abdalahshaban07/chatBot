import { ModelBase } from "../../core/models/ModelBase";
import { ModelVailadtors } from "../../core/models/ModelVaildators";
import { DataBaseTypes } from "../../core/dataAdpater/DataBaseAdpater/DataBaseTypes";

export class CategoryModel extends ModelBase {
    tableName = "categories";
    attrbuites: any = {
        id: DataBaseTypes.id,
        categoryName: DataBaseTypes.string,
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
    initializeAssociations() {
        this.ownMany('steps', { as: 'steps' })
    }
}
