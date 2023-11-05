'use client'
import { FC } from 'react'
import { useLanyardWS, Data } from 'use-lanyard'
import Avatar from '../Avatar'
import ActiveDeviceRow from '../ActiveDeviceRow'
import ActivityCards from '../ActivityCards'

interface Props {
  initLanyardData: Data
  discordId: `${bigint}`
}

const generateUsernameString = (
  username: string,
  global_name: string | null,
  discriminator?: string
) => {
  const isPomeloUser = discriminator === '0'

  // If the user is a Pomelo user, use their global name instead of their username
  if (isPomeloUser) {
    if (global_name) {
      return `${global_name} (@${username})`
    }

    return `@${username}`
  }

  // If the user has a global name, use that instead of the username
  if (global_name) {
    return `${global_name} (${username}#${discriminator})`
  }

  // Otherwise, just use the username
  return `${username}#${discriminator}`
}

const ProfileHeader: FC<Props> = ({ initLanyardData, discordId }) => {
  const data = useLanyardWS(discordId, {
    initialData: initLanyardData,
  })!

  const {
    discord_user: { discriminator, global_name, username, avatar },
  } = data

  return (
    <>
      <Avatar
        priority
        username={username}
        img={`https://cdn.discordapp.com/avatars/${discordId}/${avatar}.png?size=4096`}
        status={data.discord_status}
      />

      <p className="text-2xl py-4 font-bold text-center text-black dark:text-white">
        {generateUsernameString(username, global_name, discriminator)}
      </p>

      <ActiveDeviceRow {...data} />
      <ActivityCards activities={data.activities} />
    </>
  )
}

export default ProfileHeader
