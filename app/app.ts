import { ApiClient, ApiResult } from "./apiClient"
import { IStatPrenom, Sexe } from "./statPrenom";

class MyApp {
    private apiClient = new ApiClient("data");

    public bootstrap() {
        this.apiClient.list()
            .then((result) => {
                this.showResults(result);
            })
    }

    private showResults(results: ApiResult<IStatPrenom>) {
        let table = $("#resultsTable > tbody").empty();
        results.data.forEach((result) => {
            let row = $("<tr></tr>");
            row.append(`<td>${result.sexe}</td>`);
            row.append(`<td>${result.prenom}</td>`);
            row.append(`<td>${result.occurrence}</td>`);
            row.append(`<td>${result.annee_naissance}</td>`);
            table.append(row);
        });
    }
}

var app = new MyApp();
app.bootstrap();