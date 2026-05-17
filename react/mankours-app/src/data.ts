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

export const INITIAL_TICKETS: Ticket[] = [
    {
        id: 1,
        name: "システム保守対応",
        ticketNo: "#24329",
        subtasks: [
            { id: "1-1", name: "原因調査・ログ解析", hours: 0 },
            { id: "1-2", name: "修正プログラム作成", hours: 0 },
            { id: "1-3", name: "動作確認・テスト", hours: 0 },
        ],
    },
    {
        id: 2,
        name: "【社内】各種MTG",
        ticketNo: "#18870",
        subtasks: [
            { id: "2-1", name: "朝礼・進捗報告", hours: 0 },
            { id: "2-2", name: "設計レビュー", hours: 0 },
        ],
    },
];