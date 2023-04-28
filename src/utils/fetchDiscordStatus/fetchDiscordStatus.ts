import { LanyardResponse } from './types'

const fetchDiscordStatus = async (
  discordId: string
): Promise<LanyardResponse> => {
  const res = await fetch(`https://api.lanyard.rest/v1/users/${discordId}`, {
    next: {
      revalidate: 60,
    },
  })

  if (!res.ok) {
    throw new Error('Failed to fetch Discord status')
  }

  const data: LanyardResponse = await res.json()

  if (!data.success) {
    throw new Error('Failed to fetch Discord status')
  }

  return data
}

export default fetchDiscordStatus
