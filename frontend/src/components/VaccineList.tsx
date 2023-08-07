import { Vaccine} from '../models/Vaccine';
import VaccineCard from './VaccineCard';
import { Button } from '@mui/material';
import { useState } from 'react';

type Props = {
    vaccines: Vaccine[];
    onUpdate: (updatedVaccine: Vaccine) => void;
    onDelete: (deletedVaccine: Vaccine) => void;
};

export default function VaccineList(props: Props) {
    const [filter, setFilter] = useState('all');

    if (!props.vaccines)
        return <h1> ...loading </h1>

    let filteredVaccines = props.vaccines;
    if (filter === 'booster') {
        filteredVaccines = props.vaccines.filter(vaccine => vaccine.due);
    }

    return (
        <div>
            <h2>My Vaccines</h2>
            <Button
                variant="contained"
                onClick={() => setFilter('all')}
                sx={{
                    width: '150px',
                    backgroundColor: filter === 'all' ? '#3f51b5' : 'rgba(63, 81, 181, 0.3)',
                    color: 'white',
                    fontSize: '0.6rem',
                    margin: '0.3rem 0.3rem 1rem 0.3rem'
                }}
            >
                All Vaccines
            </Button>
            <Button
                variant="contained"
                onClick={() => setFilter('booster')}
                sx={{
                    width: '150px',
                    backgroundColor: filter === 'booster' ? '#3f51b5' : 'rgba(63, 81, 181, 0.3)',
                    color: 'white',
                    fontSize: '0.6rem',
                    margin: '0.3rem 0.3rem 1rem 0.3rem'
                }}
            >
                Booster required
            </Button>

            {filteredVaccines.map((vaccine) => (
                <VaccineCard
                    key={`${vaccine.disease}-${vaccine.vaccineDate}`}
                    vaccine={vaccine} onUpdate={props.onUpdate} onDelete={props.onDelete}
                />
            ))}
        </div>
    );
}