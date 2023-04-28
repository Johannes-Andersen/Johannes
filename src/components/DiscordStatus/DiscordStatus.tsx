'use client'
import { LanyardResponse } from '@/utils/fetchDiscordStatus/types'
import { FC } from 'react'
import { useLanyard } from 'react-use-lanyard'

interface Props {
  initLanyardData: LanyardResponse['data']
}

const DiscordStatus: FC<Props> = ({ initLanyardData }) => {
  const { loading, status: wsData } = useLanyard({
    userId: initLanyardData.discord_user.id,
    socket: true,
  })

  const data = loading ? initLanyardData : wsData

  return <pre>{JSON.stringify(data, null, 2)}</pre>
}

export default DiscordStatus
