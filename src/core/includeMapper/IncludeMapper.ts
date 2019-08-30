import { IncludeQuery } from "./IncludeQuery";
import { QueryMapper } from "../queryMapper/QueryMapper";

export abstract class IncludeMapper {

    abstract getIncludeQuery(query?: IncludeQuery[], modelsInstances?: any): any;
}