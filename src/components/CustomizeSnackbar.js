import { Alert, Snackbar } from '@mui/material';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { closeSnackbar } from '../features/SnackBar/snackbarSlice';

function CustomizeSnackbar() {
    const dispatch = useDispatch();
    const snackbarOpen = useSelector(state => state.snackbar.snackbarOpen);
    const snackbarType = useSelector(state => state.snackbar.snackbarType);
    const snackbarMessage = useSelector(state => state.snackbar.snackbarMessage);
    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        dispatch(closeSnackbar());
    };

    return (
        <div>
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={3000}
                onClose={handleClose}
                anchorOrigin={{ 'vertical':'top','horizontal': "right" }}
            >
                <Alert
                    elevation={6}
                    variant="filled"
                    onClose={handleClose}
                    severity={snackbarType}
                >
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </div>
    );
}

export default CustomizeSnackbar

