import ProfileHeader from '@/components/ProfileHeader'
import fetchDiscordStatus from '@/utils/fetchDiscordStatus'

const Home = async () => {
  const discordId = process.env.DISCORD_ID!
  const lanyardData = await fetchDiscordStatus(discordId)

  return (
    <main>
      <ProfileHeader initLanyardData={lanyardData.data} discordId={discordId} />
    </main>
  )
}

export default Home
