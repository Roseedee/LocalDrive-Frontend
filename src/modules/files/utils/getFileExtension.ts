export const getFileExtension = (name: string) => {
    const lastDot = name.lastIndexOf('.');

    if (lastDot <= 0) return '';

    return name.slice(lastDot + 1);
}