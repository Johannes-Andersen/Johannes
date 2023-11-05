import ProfileHeader from '@/components/ProfileHeader'
import fetchDiscordStatus from '@/utils/fetchDiscordStatus'
import { env } from '@/env.mjs'

const Home = async () => {
  const userId = env.DISCORD_ID as `${bigint}`
  const lanyardData = await fetchDiscordStatus(userId)

  return (
    <main className="grid min-h-screen place-items-center bg-white dark:bg-gray-800 px-6 py-24 sm:py-32 lg:px-8">
      <section className="m-auto flex items-center flex-col">
        <ProfileHeader initLanyardData={lanyardData.data} discordId={userId} />
      </section>
    </main>
  )
}

export const dynamic = 'force-dynamic'

export default Home
