export interface IStatPrenom {
    sexe: Sexe;
    prenom: string;
    occurrence: number;
    annee_naissance: number;
}

export enum Sexe {
    FILLE,
    GARCON
}