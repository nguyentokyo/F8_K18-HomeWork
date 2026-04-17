// import {useEffect, useState} from "react";
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, MenuItem} from "@mui/material";
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

    const RANK_OPTIONS = [
        { value: 'BRONZE', label: 'Bronze' },
        { value: 'SILVER', label: 'Silver' },
        { value: 'GOLD', label: 'Gold' },
    ];

    const handleSave = () => {
        if (customer) {
            onSave(customer);
        }
    };

    // const renderDialogContent = () => {
    //     return fields.map((column) => (
    //         <TextField
    //             select // Kích hoạt chế độ chọn
    //             key={column.id}
    //             fullWidth
    //             variant="standard"
    //             margin="dense"
    //             label={column.label}
    //             name={column.name}
    //             value={customer ? (customer[column.name as keyof Customer] ?? '') : ''}
    //             onChange={(e) => onChange(column.name, e.target.value)}
    //         />
    //     ));
    // };

    const renderDialogContent = () => {
    return fields.map((column) => {
        const isRankField = column.name === 'rank';

        return (
            <TextField
                key={column.id}
                fullWidth
                variant="standard"
                margin="dense"
                label={column.label}
                name={column.name}
                select={isRankField}
                value={customer ? (customer[column.name as keyof Customer] ?? '') : ''}
                onChange={(e) => onChange(column.name, e.target.value)}
            >
                {
                isRankField && RANK_OPTIONS.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                        {option.label}
                    </MenuItem>
                ))}
            </TextField>
        );
    });
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