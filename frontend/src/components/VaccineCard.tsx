import { Vaccines } from '../models/Vaccine';
import { Card, CardContent, Typography } from '@mui/material';
import '../App.css';

type Props = {
    vaccine: Vaccines;
};

export default function VaccineCard({ vaccine }: Props) {
    return (
        <Card className="vaccine-card">
            <CardContent>
                <Typography variant="h6" className="vaccine-card-properties">
                    {vaccine.disease}
                </Typography>
                <Typography variant="subtitle1" className="vaccine-card-properties">
                    Vaccine Date: {vaccine.vaccineDate}
                </Typography>
                <Typography variant="body2" className="vaccine-card-properties">
                    Due: {vaccine.due ? 'Yes' : 'No'}
                </Typography>
                {vaccine.due && (
                    <Typography variant="body2" className="vaccine-card-properties">
                        Due Date: {vaccine.dueDate}
                    </Typography>
                )}
            </CardContent>
        </Card>
    );
}
