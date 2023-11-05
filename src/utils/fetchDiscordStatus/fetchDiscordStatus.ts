import { Data } from 'use-lanyard'

interface LanyardResponse {
  success: boolean
  data: Data
}

const fetchDiscordStatus = async (
  discordId: `${bigint}`
): Promise<LanyardResponse> => {
  const res = await fetch(`https://api.lanyard.rest/v1/users/${discordId}`, {
    next: {
      revalidate: 30,
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
