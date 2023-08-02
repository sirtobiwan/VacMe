export type Vaccine = {
      id: string,
    disease: string,
    vaccination: string,
    batch: string,
    vaccineDate: string; // Beispiel: "2023-25-07"
    doctor: string;
    due: boolean;
    dueDate: string| null;
}

export type VaccineWithoutId = {
    disease: string,
    vaccination: string,
    batch: string,
    vaccineDate: string; // Beispiel: "2023-25-07"
    doctor: string;
    due: boolean;
    dueDate: string| null;
}


