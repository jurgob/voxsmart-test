import pino from 'pino'

const logOnFile = process.env.LOG_ON_FILE === 'true'
const fileConfig = pino.transport({
    target: "pino/file",
    options: {
        destination: `/tmp/voxtest.log`
    }
})

const logConfig = logOnFile ? fileConfig : {}

export const logger = pino(logConfig)
