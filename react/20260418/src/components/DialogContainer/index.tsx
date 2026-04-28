// import {useEffect, useState} from "react";
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, MenuItem} from "@mui/material";
import type { DialogField } from "../../utils";


interface Props<T> {
    title: string
    fields: DialogField[]
    isOpen: boolean
    onClose: () => void
    data: T
    onChange: (name: string, value: number | string) => void
    onSave: (data: T) => void
}

const CommonDialog = <T extends Record<string, any>>({ title, fields, isOpen, onClose, data, onChange, onSave }: Props<T>) => {

    const handleSave = () => {
        if (data) {
            onSave(data);
        }
    };

    const renderDialogContent = () => {
        return fields.map((column) => {
            const isSelect = column.type === 'select';

            console.log(column.options)
            return (
                <TextField key={column.id}
                    fullWidth
                    variant="standard"
                    margin="dense"
                    label={column.label}
                    name={column.name}
                    select={isSelect} value={data?.[column.name] ?? ''}
                    onChange={(e) =>
                       onChange(column.name, e.target.value)} >
                    { isSelect && column.options?.map(
                        (option) => (
                        <MenuItem key={option.value}
                                  value={option.value}> {option.label}
                        </MenuItem> ))
                    }
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

export default CommonDialog