import fetchDiscordStatus from '@/utils/fetchDiscordStatus'
import { ImageResponse } from 'next/og'
import { env } from '@/env.mjs'

export const runtime = 'edge'

export const size = {
  width: 32,
  height: 32,
}
export const contentType = 'image/png'

export default async function Icon() {
  const userId = env.DISCORD_ID as `${bigint}`
  const { data } = await fetchDiscordStatus(userId)

  const imageUrl = `https://cdn.discordapp.com/avatars/${data.discord_user.id}/${data.discord_user.avatar}.png?size=32`

  return new ImageResponse(
    (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={imageUrl}
        alt="Discord Avatar"
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          borderRadius: '50%',
        }}
      />
    ),
    {
      ...size,
    }
  )
}
