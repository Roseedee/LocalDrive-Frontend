export function validateFolderName(name: string): string | null {
    const trimmed = name.trim();

    if (!trimmed) {
        return "กรุณาใส่ชื่อโฟลเดอร์";
    }

    if (trimmed.length > 255) {
        return "ชื่อยาวเกินไป (สูงสุด 255 ตัวอักษร)";
    }

    if (trimmed === "." || trimmed === "..") {
        return "ชื่อโฟลเดอร์ไม่ถูกต้อง";
    }

    if (/[\\/]/.test(trimmed)) {
        return "ห้ามใช้ / หรือ \\";
    }

    if (/[<>:"|?*]/.test(trimmed)) {
        return "มีอักขระที่ไม่อนุญาต";
    }

    return null;
}