import { Vaccine} from '../models/Vaccine';
import VaccineCard from './VaccineCard';
import {IconButton} from "@mui/material";
import {AddCircle} from "@mui/icons-material";
import { Link } from "react-router-dom";

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
            <Link to={"/add"}>
                <IconButton className={"add-button"} color="primary" aria-label="add vaccine">
                    <AddCircle />
                </IconButton>
            </Link>
        </div>
    );
}
