import DiscordStatus from '@/components/DiscordStatus'
import fetchDiscordStatus from '@/utils/fetchDiscordStatus'
import Image from 'next/image'

const Home = async () => {
  const discordId = process.env.DISCORD_ID!
  const lanyardData = await fetchDiscordStatus(discordId)

  return (
    <main>
      <Image
        src={`https://cdn.discordapp.com/avatars/${discordId}/${lanyardData.data.discord_user.avatar}.png?size=4096`}
        alt=""
        width={200}
        height={200}
      />
      <DiscordStatus initLanyardData={lanyardData.data} />
    </main>
  )
}

export default Home
