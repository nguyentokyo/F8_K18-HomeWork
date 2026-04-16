// import {useEffect, useState} from "react";
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField} from "@mui/material";
import type { Customer, DialogField} from "../../utils";


interface Props {
    title: string
    fields: DialogField[]
    isOpen: boolean
    onClose: () => void
    customer: Customer | undefined
    form: Customer | undefined
    onChange: (name: string, value: string) => void
    onSave: (data: Customer) => void
}

const CustomerDialog = ({ title, fields, isOpen, onClose, customer, onChange, onSave }: Props) => {

    const handleSave = () => {
        if (customer) {
            onSave(customer);
        }
    };

    const renderDialogContent = () => {
        return fields.map((column) => (
            <TextField
                key={column.id}
                fullWidth
                variant="standard"
                margin="dense"
                label={column.label}
                name={column.name}
                value={customer ? (customer[column.name as keyof Customer] ?? '') : ''}
                onChange={(e) => onChange(column.name, e.target.value)}
            />
        ));
    };

    return (
        <Dialog open={isOpen} onClose={onClose} maxWidth="xs" fullWidth>
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
                {renderDialogContent()}
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={handleSave} variant="contained" color="primary">OK</Button>
            </DialogActions>
        </Dialog>
    );
};

export default CustomerDialog