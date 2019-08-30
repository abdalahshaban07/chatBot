import { Query } from "../queryMapper/Query";

export interface IncludeQuery {
    modelName: string,
    includeAs?: string,
    query?: Query,
    includeWith?: IncludeQuery[]
} 