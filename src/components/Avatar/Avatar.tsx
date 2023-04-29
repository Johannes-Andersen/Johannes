import Image from 'next/image'
import { FC } from 'react'

interface Props {
  img: string
  status: string
  username: string
  priority?: boolean
}

// TODO: Use accessible icons
const statusMapping: Record<string, { color: string; humanizedName: string }> =
  {
    online: { color: 'bg-green-400', humanizedName: 'Online' },
    offline: { color: 'bg-gray-400', humanizedName: 'Offline' },
    idle: { color: 'bg-yellow-400', humanizedName: 'Idle' },
    dnd: { color: 'bg-red-400', humanizedName: 'Do Not Disturb' },
    streaming: { color: 'bg-purple-400', humanizedName: 'Streaming' },
  }

const DiscordStatus: FC<Props> = ({ img, status, priority, username }) => {
  return (
    <span className="relative inline-block">
      <Image
        width={64}
        height={64}
        className="h-16 w-16 rounded-full"
        src={img}
        alt={`${username}, ${statusMapping[status].humanizedName}`}
        priority={priority}
      />
      <span
        className={`absolute bottom-0 right-0 block h-4 w-4 rounded-full ring-2 ring-white ${statusMapping[status].color}
      `}
      />
    </span>
  )
}

export default DiscordStatus
