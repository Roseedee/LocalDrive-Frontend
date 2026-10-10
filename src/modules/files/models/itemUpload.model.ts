export type uploadState = "pending" | "uploading" | "completed" | "error";

export interface FileUploadModel {
    id: string;
    file: File;
    path: string;
    name?: string;
    type?: string;
    size?: number;
    progress: number;
    status: uploadState;
}

//daily upload history on local store 

interface uploadTask {
    id: string;
    createAt: string;
    items: FileUploadModel[];
}

export interface DailyUploadHistory {
    date: string;
    tasks: uploadTask[];
}