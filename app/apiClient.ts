import * as $ from "jquery";
import { IStatPrenom } from "./statPrenom";

export interface ApiResult<TData> {
    version: string;
    nb_resultats: number;
    data: TData[];
}

export interface IApiFilter {
    sexe?: "FILLE" | "GARCON";
    prenom?: string;
    annee?: number;
}

export class ApiClient {
    constructor(private baseUrl: string) {}

    public list(filter?: IApiFilter): JQueryPromise<ApiResult<IStatPrenom>> {
        if(filter) {
            return $.getJSON(this.baseUrl + "/content.json").pipe(results => ApiClient.filter(results, filter));
        } else {
            return $.getJSON(this.baseUrl + "/content.json");
        }
    }

    private static filter(source: ApiResult<IStatPrenom>, filter: IApiFilter): ApiResult<IStatPrenom> {
        source.data = source.data.filter((entry) => {
            if(filter.sexe && entry.sexe !== filter.sexe) {
                return false;
            }
            if(filter.prenom && entry.prenom.toLowerCase().indexOf(filter.prenom.toLowerCase()) < 0) {
                return false;
            }
            if(filter.annee && entry.annee_naissance !== filter.annee) {
                return false;
            }
            return true;
        });
        source.nb_resultats = source.data.length;
        return source;
    }
}