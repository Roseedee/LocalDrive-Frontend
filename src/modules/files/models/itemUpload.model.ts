export type uploadState = "pending" | "uploading" | "completed" | "error";

export interface FileUploadModel {
    id: string;
    path: string;
    name?: string;
    type?: string;
    size?: number;
    progress: number;
    status: uploadState;
}