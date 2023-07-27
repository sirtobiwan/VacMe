import { useState } from 'react';
import { Card, CardContent, Typography, IconButton } from '@mui/material';
import '../App.css';
import {Vaccine} from "../models/Vaccine.tsx";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

type Props = {
    vaccine: Vaccine;
};
export default function VaccineCard({ vaccine }: Props) {
    const [expanded, setExpanded] = useState(false);

    const toggleExpanded = () => {
        setExpanded((prevState) => !prevState);
    };

    return (
        <Card className="vaccine-card">
            <CardContent>
                <Typography variant="h6" className="disease">
                    {vaccine.disease}
                </Typography>
                <IconButton onClick={toggleExpanded}>
                    {expanded ? (
                        <ExpandLessIcon />
                    ) : (
                        <ExpandMoreIcon />
                    )}
                </IconButton>
                <div className="vaccine-card-properties">
                    <div className="property-name">Booster required:</div>
                    <div className="property-value">{vaccine.due ? 'Yes' : 'No'}</div>
                </div>
                {expanded && (
                    <>
                        {vaccine.due && (
                            <div className="vaccine-card-properties">
                                <div className="property-name">Next Vaccine:</div>
                                <div className="property-value">{vaccine.dueDate}</div>
                            </div>
                        )}
                        <div className="vaccine-card-properties">
                            <div className="property-name">Last Vaccine:</div>
                            <div className="property-value">{vaccine.vaccineDate}</div>
                        </div>
                        <div className="vaccine-card-properties">
                            <div className="property-name">ID:</div>
                            <div className="property-value">{vaccine.id}</div>
                        </div>
                        <div className="vaccine-card-properties">
                            <div className="property-name">Vaccination:</div>
                            <div className="property-value">{vaccine.vaccination}</div>
                        </div>
                        <div className="vaccine-card-properties">
                            <div className="property-name">Batch:</div>
                            <div className="property-value">{vaccine.batch}</div>
                        </div>
                        <div className="vaccine-card-properties">
                            <div className="property-name">Doctor:</div>
                            <div className="property-value">{vaccine.doctor}</div>
                        </div>
                    </>
                )}

            </CardContent>
        </Card>
    );
}

