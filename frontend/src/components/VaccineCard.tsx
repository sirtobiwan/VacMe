import {FormEvent, useState} from 'react';
import { Card, CardContent, Typography, IconButton, Checkbox, FormControlLabel, TextField, Button,Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle  } from '@mui/material';
import '../App.css';
import {Vaccine} from "../models/Vaccine.tsx";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import {toast, ToastContainer} from "react-toastify";
import DeleteIcon from '@mui/icons-material/Delete';

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
        })
    };

    function handleEditMode(){
        setEditMode(!editMode)
    }

    function handleCancel() {
        setUpdatedVaccine(vaccine);
        setEditMode(false);
    }

    function handleUpdateVaccine(event: FormEvent<HTMLFormElement>) {
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
        })
    }

    function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
        const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
        setUpdatedVaccine({ ...updatedVaccine, [event.target.name]: value });
    }

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
                                    <Dialog
                                        open={deleteDialogOpen}
                                        onClose={handleDeleteDialogClose}
                                        aria-labelledby="alert-dialog-title"
                                        aria-describedby="alert-dialog-description"
                                    >
                                        <DialogTitle id="alert-dialog-title">
                                            {"Delete this Vaccine?"}
                                        </DialogTitle>
                                        <DialogContent>
                                            <DialogContentText id="alert-dialog-description">
                                                Are you sure you want to delete this vaccine? This action cannot be undone.
                                            </DialogContentText>
                                        </DialogContent>
                                        <DialogActions>
                                            <Button onClick={handleDeleteDialogClose} color="primary">
                                                Cancel
                                            </Button>
                                            <Button onClick={handleDeleteVaccine} color="primary" autoFocus>
                                                Delete
                                            </Button>
                                        </DialogActions>
                                    </Dialog>
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


