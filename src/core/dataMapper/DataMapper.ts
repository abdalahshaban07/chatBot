import { DataBaseTypes } from "../dataAdapter/DataBaseAdpater/DataBaseTypes";

export abstract class DataMapper {


    constructor() {
    }

    abstract getType(key: DataBaseTypes): any;

}  