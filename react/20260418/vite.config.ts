import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        allowedHosts: [
            '0083-126-117-192-211.ngrok-free.app' // Chỉ cho phép duy nhất host này
        ]
    }
})