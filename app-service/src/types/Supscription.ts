export interface Supscription {
    endpoint: string,
    expirationTime: number | null,
    keys: {
        p256dh: string,
        auth: string
    }
}