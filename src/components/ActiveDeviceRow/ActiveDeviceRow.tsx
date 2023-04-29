import { FC } from 'react'
import {
  ComputerDesktopIcon,
  DevicePhoneMobileIcon,
  GlobeAltIcon,
} from '@heroicons/react/24/outline'

interface Props {
  active_on_discord_web: boolean
  active_on_discord_mobile: boolean
  active_on_discord_desktop: boolean
}

const statusMapping: Record<string, string> = {
  online: 'text-green-400',
  offline: 'text-gray-400',
}

const ActiveDeviceRow: FC<Props> = ({
  active_on_discord_web,
  active_on_discord_mobile,
  active_on_discord_desktop,
}) => {
  return (
    <span className="flex flex-row items-center">
      <ComputerDesktopIcon
        className={`h-8 w-8 ${
          active_on_discord_desktop
            ? statusMapping.online
            : statusMapping.offline
        }`}
      />
      <DevicePhoneMobileIcon
        className={`h-8 w-8 ${
          active_on_discord_mobile
            ? statusMapping.online
            : statusMapping.offline
        }`}
      />
      <GlobeAltIcon
        className={`h-8 w-8 ${
          active_on_discord_web ? statusMapping.online : statusMapping.offline
        }`}
      />
    </span>
  )
}

export default ActiveDeviceRow
