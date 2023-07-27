import { Vaccine} from '../models/Vaccine';
import VaccineCard from './VaccineCard';

type Props = {
    vaccines: Vaccine[];
};

export default function VaccineList({ vaccines }: Props) {
    return (
        <div>
            <h2>My Vaccines</h2>
            {vaccines.map((vaccine) => (
                <VaccineCard
                    key={`${vaccine.disease}-${vaccine.vaccineDate}`}
                    vaccine={vaccine}
                />
            ))}
        </div>
    );
}
