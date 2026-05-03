export function formatFileSize(bytes: number): string {
    if (!Number.isFinite(bytes) || bytes < 0) {
        return "0B";
    }

    const units = ["B", "KB", "MB", "GB", "TB", "PB"];
    const threshold = 1024;

    if (bytes < threshold) {
        return `${bytes}B`;
    }

    let i = 0;
    let size = bytes;

    while (size >= threshold && i < units.length - 1) {
        size /= threshold;
        i++;
    }

    const formatted =
        size >= 100 ? size.toFixed(0) :
        size >= 10 ? size.toFixed(1) :
        size.toFixed(2);

    return `${formatted}${units[i]}`;
}