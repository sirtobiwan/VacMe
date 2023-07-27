export type Vaccine = {
      id: string,
    disease: string,
    vaccination: string,
    batch: string,
    vaccineDate: string; // Beispiel: "2023-25-07"
    doctor: string;
    due: boolean;
    dueDate: string;
}

export type Vaccines = {
    disease: string,
    vaccineDate: string;
    due: boolean;
    dueDate: string;}