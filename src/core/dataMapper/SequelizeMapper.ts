import { Sequelize, DataTypes } from 'sequelize'
import { DataBaseTypes } from "../dataAdapter/DataBaseAdpater/DataBaseTypes";
import { DataMapper } from "./DataMapper";

export class SequelizeMapper extends DataMapper {


    constructor() {
        super()
    }

    getType(key: DataBaseTypes): any {

        switch (key) {
            case 'string':
                return DataTypes.STRING
            case 'int':
                return DataTypes.INTEGER
            case 'text':
                return DataTypes.TEXT
            case 'date':
                return DataTypes.DATE
            case 'id':
                return {
                    type: DataTypes.INTEGER,
                    primaryKey: true,
                    autoIncrement: true
                }
            case 'boolean':
                return DataTypes.BOOLEAN
            default:
                return null

        }
    }

} 