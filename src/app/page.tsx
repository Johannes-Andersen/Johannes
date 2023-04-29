import ProfileHeader from '@/components/ProfileHeader'
import fetchDiscordStatus from '@/utils/fetchDiscordStatus'
import { env } from '@/env.mjs'

const Home = async () => {
  const lanyardData = await fetchDiscordStatus(env.DISCORD_ID)

  return (
    <main>
      <ProfileHeader
        initLanyardData={lanyardData.data}
        discordId={env.DISCORD_ID}
      />
    </main>
  )
}

export default Home
