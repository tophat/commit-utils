export const debug = (...messages: any[]) => {
    if (process.env.DEBUG?.includes('commit-watch')) {
        // eslint-disable-next-line no-console
        console.log(...messages)
    }
}

export const error = (...messages: any[]) => {
    // eslint-disable-next-line no-console
    console.error(...messages)
}
