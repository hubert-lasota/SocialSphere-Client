export default function base64ToImgSrc(base64: string) {
    return `data:image/png;base64,${base64}`
}