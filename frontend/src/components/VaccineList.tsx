import { Vaccines} from '../models/Vaccine';
import VaccineCard from './VaccineCard';

type Props = {
    vaccines: Vaccines[];
};

export default function VaccineList({ vaccines }: Props) {
    return (
        <div>
            <h2>My Vaccines</h2>
            {vaccines.map((vaccine) => (
                <VaccineCard
                    key={`${vaccine.disease}-${vaccine.vaccineDate}`}
                    vaccine={{
                        disease: vaccine.disease,
                        vaccineDate: vaccine.vaccineDate,
                        due: vaccine.due,
                        dueDate: vaccine.dueDate,
                    }}
                />
            ))}
        </div>
    );
}
