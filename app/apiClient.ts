import * as $ from "jquery";
import { IStatPrenom, Sexe } from "./statPrenom";

export interface ApiResult<TData> {
    version: string;
    bn_resultats: number;
    data: TData[];
}

export class ApiClient {
    constructor(private baseUrl: string) {}

    public list(): JQueryPromise<ApiResult<IStatPrenom>> {
        return $.getJSON(this.baseUrl + "/content.json");
    }
}