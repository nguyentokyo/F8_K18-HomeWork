import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import TicketCard from "./TicketCard.tsx";
import { INITIAL_TICKETS } from "./data";
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

const App: React.FC = () => {



    const [tickets, setTickets] = useState<Ticket[]>(INITIAL_TICKETS);

    const handleUpdateHours = (
        ticketId: number,
        subtaskId: string,
        newHours: number
    ): void => {
        setTickets((prev) =>
            prev.map((ticket) =>
                ticket.id === ticketId
                    ? {
                        ...ticket,
                        subtasks: ticket.subtasks.map((sub) =>
                            sub.id === subtaskId
                                ? { ...sub, hours: Math.max(0, newHours) }
                                : sub
                        ),
                    }
                    : ticket
            )
        );
    };

    return (
        <Box sx={{ maxWidth: 700, mx: "auto", px: 2, py: 3 }}>
            <Typography variant="h5" sx={{ fontWeight: 700, mb: 0.5 }}>
                工数入力（チケット内訳管理）
            </Typography>
            <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mb: 3 }}
            >
                ※ チケットをクリックして内訳を展開し、作業ごとの時間を入力してください。
            </Typography>

            {tickets.map((ticket) => (
                <TicketCard
                    key={ticket.id}
                    ticket={ticket}
                    onUpdateHours={handleUpdateHours}
                />
            ))}
        </Box>
    );
};

export default App;