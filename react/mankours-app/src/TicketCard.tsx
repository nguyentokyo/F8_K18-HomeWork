import { useState } from "react";
import {
    Box,
    Typography,
    Card,
    Collapse,
    Button,
    Chip,
    Divider,
    TextField,
} from "@mui/material";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SaveIcon from "@mui/icons-material/Save";
import CheckIcon from "@mui/icons-material/Check";

interface SubTask {
    id: string;
    name: string;
    hours: number;
}

interface Ticket {
    id: number;
    name: string;
    ticketNo: string;
    subtasks: SubTask[];
}

interface Props {
    ticket: Ticket;
    onUpdateHours: (ticketId: number, subtaskId: string, hours: number) => void;
}

export default function TicketCard({ ticket, onUpdateHours }: Props) {
    const [open, setOpen] = useState(false);
    const [saved, setSaved] = useState(false);

    const total = ticket.subtasks.reduce((sum, s) => sum + s.hours, 0);

    const handleSave = () => {
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
    };

    // @ts-ignore
    return (
        <Card sx={{ mb: 2 }}>
            <Box
                onClick={() => setOpen(!open)}
                sx={{
                    display: "flex",
                    alignItems: "center",
                    p: 2,
                    cursor: "pointer",
                }}
            >
                <ExpandMoreIcon
                    sx={{
                        transform: open ? "rotate(180deg)" : "rotate(0deg)",
                        mr: 1,
                    }}
                />

                <Box sx={{ flex: 1 }}>
                    <p>{ticket.name}</p>
                    <Typography variant="caption">{ticket.ticketNo}</Typography>
                </Box>

                <Chip label={`${total.toFixed(1)}h`} color="primary" />
            </Box>

            <Collapse in={open}>
                <Divider />

                <Box sx={{ p: 2 }}>
                    {ticket.subtasks.map((sub) => (
                        <Box
                            key={sub.id}
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                mb: 1,
                                gap: 1,
                            }}
                        >
                            <Typography sx={{ flex: 1 }}>{sub.name}</Typography>

                            <Button
                                size="small"
                                onClick={() =>
                                    onUpdateHours(ticket.id, sub.id, sub.hours + 0.5)
                                }
                            >
                                +0.5
                            </Button>

                            <TextField
                                type="number"
                                value={sub.hours}
                                onChange={(e) =>
                                    onUpdateHours(
                                        ticket.id,
                                        sub.id,
                                        parseFloat(e.target.value) || 0
                                    )
                                }
                                slotProps={{
                                    htmlInput: {
                                        step: 0.5,
                                        min: 0,
                                    },
                                }}
                                sx={{ width: 80 }}
                            />
                        </Box>
                    ))}


                        <Button
                            variant="contained"
                            onClick={handleSave}
                            startIcon={saved ? <CheckIcon /> : <SaveIcon />}
                            color={saved ? "success" : "primary"}
                        >
                            {saved ? "保存完了" : "保存"}
                        </Button>

                </Box>
            </Collapse>
        </Card>
    );
}