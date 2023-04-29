import Image from 'next/image'
import { FC } from 'react'

interface Props {
  img: string
  status: string
  priority?: boolean
}

// TODO: Use accessible icons
const statusMapping: Record<string, string> = {
  online: 'bg-green-400',
  offline: 'bg-gray-400',
  idle: 'bg-yellow-400',
  dnd: 'bg-red-400',
  streaming: 'bg-purple-400',
}

const DiscordStatus: FC<Props> = ({ img, status, priority }) => {
  return (
    <span className="relative inline-block">
      <Image
        width={64}
        height={64}
        className="h-16 w-16 rounded-full"
        src={img}
        alt=""
        priority={priority}
      />
      <span
        className={`absolute bottom-0 right-0 block h-4 w-4 rounded-full ring-2 ring-white ${statusMapping[status]}
      `}
      />
    </span>
  )
}

export default DiscordStatus
