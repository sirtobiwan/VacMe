import { Vaccine} from '../models/Vaccine';
import VaccineCard from './VaccineCard';

type Props = {
    vaccines: Vaccine[];
    onUpdate: (updatedVaccine: Vaccine) => void;
};

export default function VaccineList(props: Props) {
    if (!props.vaccines)
        return <h1> ...loading </h1>
    return (
        <div>
            <h2>My Vaccines</h2>
            {props.vaccines.map((vaccine) => (
                <VaccineCard
                    key={`${vaccine.disease}-${vaccine.vaccineDate}`}
                    vaccine={vaccine} onUpdate={props.onUpdate}
                />
            ))}
        </div>
    );
}
