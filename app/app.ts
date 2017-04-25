import { ApiClient, ApiResult, IApiFilter } from "./apiClient"
import { IStatPrenom } from "./statPrenom";

class MyApp {
    private apiClient = new ApiClient("data");

    public bootstrap() {
        $("#resultsTable > thead").on("change", "select, input", () => this.updateFilters())

        this.apiClient.list()
            .then((result) => {
                this.showResults(result);
            })
    }

    private showResults(results: ApiResult<IStatPrenom>) {
        let table = $("#resultsTable > tbody").empty();

        results.data.forEach((result) => {
            let row = $("<tr></tr>");
            row.append(`<td>${result.sexe === "FILLE" ? "Fille" : "Garçon"}</td>`);
            row.append(`<td>${result.prenom}</td>`);
            row.append(`<td>${result.occurrence}</td>`);
            row.append(`<td>${result.annee_naissance}</td>`);
            table.append(row);
        });
    }

    private updateFilters() {
        let filter: IApiFilter = {};
        let sexe: string = $("#filterSexe").val();
        if(sexe) {
            filter.sexe = sexe === "FILLE" ? "FILLE" : "GARCON";
        }

        filter.prenom = $("#filterPrenom").val();

        let annee = parseInt($("#filterAnnee").val());
        if(!isNaN(annee)) {
            filter.annee = annee;
        }

        this.apiClient.list(filter)
            .then((result) => {
                this.showResults(result);
            });
    }
}

var app = new MyApp();
app.bootstrap();