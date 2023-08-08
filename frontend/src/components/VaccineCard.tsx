import {useState} from 'react';
import { Card, CardContent, Typography, IconButton, TextField, Button, Checkbox, FormControlLabel } from '@mui/material';
import '../App.css';
import {Vaccine} from "../models/Vaccine.tsx";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import {toast, ToastContainer} from "react-toastify";
import DeleteIcon from '@mui/icons-material/Delete';
import VaccineEditForm from './VaccineEditForm';
import VaccineDeleteDialog from './VaccineDeleteDialog';

type Props = {
    vaccine: Vaccine;
    onUpdate: (updatedVaccine: Vaccine) => void;
    onDelete: (deletedVaccine: Vaccine) => void;
};

export default function VaccineCard({ vaccine, onUpdate, onDelete }: Props) {
    const [expanded, setExpanded] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [updatedVaccine, setUpdatedVaccine] = useState(vaccine);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

    const handleDeleteDialogOpen = () => {
        setDeleteDialogOpen(true);
    };

    const handleDeleteDialogClose = () => {
        setDeleteDialogOpen(false);
    };

    const handleDeleteVaccine = () => {
        onDelete(vaccine);
        handleDeleteDialogClose();
        toast.success("Vaccine deleted!", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
        });
    };

    const handleEditMode = () => {
        setEditMode(!editMode)
    };

    const handleCancel = () => {
        setUpdatedVaccine(vaccine);
        setEditMode(false);
    };

    const handleUpdateVaccine = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        onUpdate(updatedVaccine);
        handleEditMode();
        toast.success("Vaccine updated!", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
        });
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
        setUpdatedVaccine({ ...updatedVaccine, [event.target.name]: value });
    };

    const toggleExpanded = () => {
        setExpanded((prevState) => !prevState);
    };

    return (
        <Card className="vaccine-card">
            <CardContent>
                <Typography variant="h6" className="disease">
                    {editMode ? (
                        <TextField required label={"Vaccine"} name="disease" value={updatedVaccine.disease} onChange={handleInputChange} />
                    ) : (
                        vaccine.disease
                    )}
                </Typography>
                <IconButton className="icon-button" onClick={toggleExpanded}>
                    {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                </IconButton>
                <div>
                    {editMode ? (
                        <FormControlLabel
                            control={
                                <Checkbox name="due" checked={updatedVaccine.due} onChange={handleInputChange} />
                            }
                            label="Booster required"
                        />
                    ) : (
                        <div className="vaccine-card-properties">
                            <div className="property-name">Booster required:</div>
                            <div className="property-value">{vaccine.due ? 'Yes' : 'No'}</div>
                        </div>
                    )}
                </div>
                {expanded && (
                    <div>
                        {editMode ? (
                            <VaccineEditForm
                                updatedVaccine={updatedVaccine}
                                handleInputChange={handleInputChange}
                                handleUpdateVaccine={handleUpdateVaccine}
                                handleCancel={handleCancel}
                            />
                        ) : (
                            <div className={"expanded-container"}>
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
                                <div className={"edit-button-expanded"}>
                                    <Button style={{width: '100px',marginRight: '15px'}} variant="contained" color="primary" onClick={handleEditMode}>
                                        Edit
                                    </Button>
                                    <Button style={{width: '100px'}} variant="contained" color="secondary" startIcon={<DeleteIcon />} onClick={handleDeleteDialogOpen}>
                                        Delete
                                    </Button>
                                    <VaccineDeleteDialog
                                        deleteDialogOpen={deleteDialogOpen}
                                        handleDeleteDialogClose={handleDeleteDialogClose}
                                        handleDeleteVaccine={handleDeleteVaccine}
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </CardContent>
            <ToastContainer/>
        </Card>
    );
}
