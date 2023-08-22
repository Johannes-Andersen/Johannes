import ProfileHeader from '@/components/ProfileHeader'
import fetchDiscordStatus from '@/utils/fetchDiscordStatus'
import { env } from '@/env.mjs'

const Home = async () => {
  const lanyardData = await fetchDiscordStatus(env.DISCORD_ID)

  return (
    <main
      className="grid min-h-full place-items-center bg-white dark:bg-gray-800 px-6 py-24 sm:py-32 lg:px-8"
      style={{ height: '100dvh' }}
    >
      <section className="m-auto flex items-center flex-col">
        <ProfileHeader
          initLanyardData={lanyardData.data}
          discordId={env.DISCORD_ID}
        />
      </section>
    </main>
  )
}

export const dynamic = 'force-dynamic'

export default Home
