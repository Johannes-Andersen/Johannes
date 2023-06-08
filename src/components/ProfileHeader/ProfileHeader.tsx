'use client'
import { LanyardResponse } from '@/utils/fetchDiscordStatus/types'
import { FC } from 'react'
import { useLanyard } from 'react-use-lanyard'
import Avatar from '../Avatar'
import ActiveDeviceRow from '../ActiveDeviceRow'
import ActivityCards from '../ActivityCards'

interface Props {
  initLanyardData: LanyardResponse['data']
  discordId: string
}

const ProfileHeader: FC<Props> = ({ initLanyardData, discordId }) => {
  const { loading, status: wsData } = useLanyard({
    userId: initLanyardData.discord_user.id,
    socket: true,
  })

  const data =
    loading || !wsData ? initLanyardData : (wsData as LanyardResponse['data'])

  const {
    discord_user,
    discord_user: { discriminator, global_name, username, avatar },
  } = data

  console.log(discord_user)

  const isPomeloUser = discriminator === '0'

  return (
    <section>
      <Avatar
        priority
        username={username}
        img={`https://cdn.discordapp.com/avatars/${discordId}/${avatar}.png?size=4096`}
        status={data.discord_status}
      />

      <p aria-hidden="true" className="text-2xl font-bold">
        {isPomeloUser
          ? `${global_name} (@${username})`
          : `${username}#${discriminator}`}
      </p>
      <p className="sr-only">
        {isPomeloUser
          ? `Username: ${username}`
          : `Username: ${username} hashtag ${discriminator}`}
      </p>

      <ActiveDeviceRow {...data} />
      <ActivityCards activities={data.activities} />
    </section>
  )
}

export default ProfileHeader
