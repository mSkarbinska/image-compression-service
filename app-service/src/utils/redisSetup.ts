import {config} from 'dotenv'
config()

const Redis = require('ioredis')

export const redis = new Redis({
  host: process.env.REDIS_HOST || 'localhost',
  port: process.env.REDIS_PORT || 6379,
  })
  .on('connect',
      () => console.log('Connected to Redis'))
  .on('error',
      (err: any) => console.log('Failed to connect to Redis', err))