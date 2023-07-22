import {config} from 'dotenv'
import webpush from 'web-push'
import {redisTopicClient} from '../utils/redisSetup'
import {Supscription} from '../types/Supscription'

config()

webpush.setVapidDetails('mailto:' + process.env?.WEBPUSH_MAIL,
    process.env?.PUBLIC_VAPID_KEY || '',
    process.env?.PRIVATE_VAPID_KEY || '')

const subscriptions: Supscription[] = []
export const createSubscription = async (subscription: Supscription) => {
    if(!subscriptions.includes(subscription)) {
        subscriptions.push(subscription)
    }

    return await webpush.sendNotification(subscription, 'Hello from server!')
}

export const sendNotification = async (message: string) => {
    for (const subscription of subscriptions) {
        webpush.sendNotification(subscription, message).catch((err) => {
            console.log('Sending notification via webpush failed.', err)
        })
    }
}

redisTopicClient.on('message', (channel: string, message: string) => {
    console.log('Message received:', message)
    sendNotification(message)
        .then(() => console.log('Notification sent.'))
        .catch((err) => console.log('Sending notification failed.',err))
})