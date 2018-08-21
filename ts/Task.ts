export interface Task {
    id?: number;
    title: string;
    content: string;
    pinned: 0 | 1;
    completed: 0 | 1;
    reminder: number | -1; // epoch time in minutes, -1 means null
}

export interface ConvertedTask {
    id?: number;
    title: string;
    content: string;
    pinned: 0 | 1;
    completed: 0 | 1;
    reminder: Date | -1; // epoch time in minutes, -1 means null
}
