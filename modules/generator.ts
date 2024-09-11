import {defineNuxtModule} from "@nuxt/kit";

export default defineNuxtModule({
    setup(options, nuxt) {
        // Hook into 'ready' or any Nuxt lifecycle hook
        nuxt.hook('ready', async () => {
            console.log('Nuxt is ready. Starting background worker...')

            // Example: a simple interval worker
            setInterval(() => {
                console.log('Running background task...')
                // Add your background task logic here
            }, 10000) // Every 10 seconds
        })
    }
})
