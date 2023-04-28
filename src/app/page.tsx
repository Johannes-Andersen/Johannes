import DiscordStatus from '@/components/DiscordStatus'
import fetchDiscordStatus from '@/utils/fetchDiscordStatus'
import Image from 'next/image'

const Home = async () => {
  const lanyardData = await fetchDiscordStatus()

  return (
    <main>
      <Image
        src={`https://cdn.discordapp.com/avatars/98172944773029888/${lanyardData.data.discord_user.avatar}.png?size=4096`}
        alt=""
        width={200}
        height={200}
      />
      <DiscordStatus initLanyardData={lanyardData.data} />
    </main>
  )
}

export default Home
