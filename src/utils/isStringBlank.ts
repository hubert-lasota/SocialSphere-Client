export default function isStringBlank(string: string): boolean {
    const s = string.trim();

    return s.length < 1;
}