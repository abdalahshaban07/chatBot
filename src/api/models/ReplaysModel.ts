import { ModelBase } from "../../core/models/ModelBase";
import { ModelVailadtors } from "../../core/models/ModelVaildators";
import { DataBaseTypes } from "../../core/dataAdpater/DataBaseAdpater/DataBaseTypes";
import { RequierdVaildator } from "../vaildators/requierd.vaildator";

export class ReplaysModel extends ModelBase {
    tableName = "Replays";
    attrbuites: any = {
        id: DataBaseTypes.id,
        intention: DataBaseTypes.string,
        replay: DataBaseTypes.string,
        requiredOtp: DataBaseTypes.boolean
    };
    options = {
        timestamps: true
    };
    validators: ModelVailadtors[] = [
        // {
        //     key: "name",
        //     Vailadtors: [
        //         {
        //             vaildator: new RequierdVaildator()
        //         }
        //     ]
        // }
    ];
    // private static _insistence: ReplaysModel;

    constructor() {
        super();
        this.initializeDataWrapper();
    }
}
