export interface SubTask {
    id: string;
    name: string;
    hours: number;
}

export interface Ticket {
    id: number;
    name: string;
    ticketNo: string;
    subtasks: SubTask[];
}

export type SaveState = "idle" | "saved";