export default function manifest() {
    return {
      name: 'AI PHOTO',
      short_name: 'AI PHOTO',
      description: 'AI PHOTO',
      start_url: '/',
      display: 'standalone',
      background_color: '#fff',
      theme_color: '#fff',
      icons: [
        {
          src: '/favicon.ico',
          sizes: 'any',
          type: 'image/x-icon',
        },
      ],
    }
}