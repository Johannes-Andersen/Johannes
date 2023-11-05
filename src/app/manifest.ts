import { MetadataRoute } from 'next'

const manifest = (): MetadataRoute.Manifest => {
  return {
    name: 'Johannes Andersen',
    short_name: 'Johannes A',
    description: "Johannes Andersen's personal website",
    start_url: '/',
    display: 'browser',
    orientation: 'any',
    lang: 'en',
    categories: ['social', 'lifestyle'],
    theme_color: '#1e293b',
    background_color: '#1e293b',
  }
}

export default manifest
