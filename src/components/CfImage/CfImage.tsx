import { FC } from 'react'
import Image, { ImageLoaderProps, ImageProps } from 'next/image'

const normalizeSrc = (src: string): string => {
  return src.startsWith('/') ? src.slice(1) : src
}

const cloudflareLoader = ({ src, width, quality }: ImageLoaderProps) => {
  const params = [`width=${width}`]
  if (quality) {
    params.push(`quality=${quality}`)
  }
  const paramsString = params.join(',')
  return `/cdn-cgi/image/${paramsString}/${normalizeSrc(src)}`
}

interface EnforcedAlt extends ImageProps {
  alt: string
}

const CfImage: FC<EnforcedAlt> = ({ alt, ...rest }) => {
  const isProduction = process.env.NODE_ENV === 'production'
  const loader = isProduction ? cloudflareLoader : undefined

  return (
    // setting img style to undefined to fix csp violation due to next/image inline styles
    <Image loader={loader} {...rest} alt={alt} style={{ color: undefined }} />
  )
}

export default CfImage
