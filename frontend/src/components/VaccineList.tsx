import { Vaccine} from '../models/Vaccine';
import VaccineCard from './VaccineCard';

type Props = {
    vaccines: Vaccine[];
};

export default function VaccineList(props: Props) {
    return (
        <div>
            <h2>My Vaccines</h2>
            {props.vaccines.map((vaccine) => (
                <VaccineCard
                    key={`${vaccine.disease}-${vaccine.vaccineDate}`}
                    vaccine={vaccine}
                />
            ))}
        </div>
    );
}
