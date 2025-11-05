export default function manifest() {
    return {
      name: 'WPAP',
      short_name: 'WPAP',
      description: 'WPAP',
      start_url: '/capture-vibe',
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