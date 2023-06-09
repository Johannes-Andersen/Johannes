import ProfileHeader from '@/components/ProfileHeader'
import fetchDiscordStatus from '@/utils/fetchDiscordStatus'
import { env } from '@/env.mjs'

const Home = async () => {
  const lanyardData = await fetchDiscordStatus(env.DISCORD_ID)

  return (
    <main className="flex bg-white dark:bg-gray-800 h-screen">
      <section className="m-auto flex items-center flex-col">
        <ProfileHeader
          initLanyardData={lanyardData.data}
          discordId={env.DISCORD_ID}
        />
      </section>
    </main>
  )
}

export default Home
