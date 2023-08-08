import {FormEvent} from 'react';
import { TextField, Button} from '@mui/material';
import {Vaccine} from "../models/Vaccine.tsx";

type Props = {
    updatedVaccine: Vaccine;
    handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleUpdateVaccine: (event: FormEvent<HTMLFormElement>) => void;
    handleCancel: () => void;
};

export default function VaccineEditForm({ updatedVaccine, handleInputChange, handleUpdateVaccine, handleCancel }: Props) {
    return (
        <form className={"editmode-card-container"} onSubmit={handleUpdateVaccine}>
            {updatedVaccine.due && <TextField required label="Next Vaccine" name="dueDate" value={updatedVaccine.dueDate} onChange={handleInputChange} />}
            <TextField required label="Last Vaccine" name="vaccineDate" value={updatedVaccine.vaccineDate} onChange={handleInputChange} />
            <TextField required label="Vaccination" name="vaccination" value={updatedVaccine.vaccination} onChange={handleInputChange} />
            <TextField required label="Batch" name="batch" value={updatedVaccine.batch} onChange={handleInputChange} />
            <TextField required label="Doctor" name="doctor" value={updatedVaccine.doctor} onChange={handleInputChange} />
            <Button variant="contained" color="primary" type="submit">
                Save
            </Button>
            <Button variant="contained" color="secondary" onClick={handleCancel}>
                Cancel
            </Button>
        </form>
    );
}
