import Image from 'next/image'
import { MoonIcon } from '@heroicons/react/24/solid'
import { FC } from 'react'

interface Props {
  img: string
  status: string
  username: string
  priority?: boolean
}

const statusMapping: Record<
  string,
  { color: string; humanizedName: string; icon?: JSX.Element }
> = {
  online: {
    color: 'bg-green-400',
    humanizedName: 'Online',
  },
  offline: { color: 'bg-gray-400', humanizedName: 'Offline' },
  idle: {
    color: 'bg-yellow-400',
    humanizedName: 'Idle',
    icon: (
      <MoonIcon
        aria-hidden="true"
        className="h-4 w-4 -rotate-90 bg-white dark:bg-gray-800 text-yellow-400 absolute bottom-0 right-0 block rounded-full ring-2 ring-white dark:ring-gray-800"
      />
    ),
  },
  dnd: {
    color: 'bg-red-400',
    humanizedName: 'Do Not Disturb',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlSpace="preserve"
        className="h-4 w-4 bg-red-500 text-yellow-400 absolute bottom-0 right-0 block rounded-full ring-2 ring-white dark:ring-gray-800"
        viewBox="0 0 304.22 304.22"
      >
        <path
          d="M226.92 138.26H77.31a13.85 13.85 0 1 0 0 27.7h149.61a13.85 13.85 0 1 0 0-27.7z"
          style={{ fill: 'black' }}
        />
      </svg>
    ),
  },
  streaming: { color: 'bg-purple-400', humanizedName: 'Streaming' },
}

const IconToUse = ({ status }: { status: string }) => {
  const statusInfo = statusMapping[status]
  if (statusInfo.icon) {
    return statusInfo.icon
  }

  if (status === 'offline') return null

  return (
    <span
      aria-hidden="true"
      className={`absolute bottom-0 right-0 block h-4 w-4 rounded-full ring-2 ring-white dark:ring-gray-800 ${statusMapping[status].color}
      `}
    />
  )
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
      <IconToUse status={status} />
    </span>
  )
}

export default DiscordStatus
