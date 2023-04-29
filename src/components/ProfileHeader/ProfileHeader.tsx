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

  const data = loading || !wsData ? initLanyardData : wsData
  const { discord_user } = data

  return (
    <section>
      <Avatar
        priority
        username={discord_user.username}
        img={`https://cdn.discordapp.com/avatars/${discordId}/${discord_user.avatar}.png?size=4096`}
        status={data.discord_status}
      />

      <p aria-hidden="true" className="text-2xl font-bold">
        {discord_user.username}#{discord_user.discriminator}
      </p>
      <p className="sr-only">
        Username: {discord_user.username} hashtag {discord_user.discriminator}
      </p>

      <ActiveDeviceRow {...data} />
      <ActivityCards activities={data.activities} />
    </section>
  )
}

export default ProfileHeader
