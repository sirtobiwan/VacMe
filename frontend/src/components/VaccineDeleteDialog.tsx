import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

type Props = {
    deleteDialogOpen: boolean;
    handleDeleteDialogClose: () => void;
    handleDeleteVaccine: () => void;
};

export default function VaccineDeleteDialog({ deleteDialogOpen, handleDeleteDialogClose, handleDeleteVaccine }: Props) {
    return (
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
    );
}
