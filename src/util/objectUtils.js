export function deepCopyObject(obj) {
    return JSON.parse(JSON.stringify(obj));
}