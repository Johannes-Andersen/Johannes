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
  const activePlatforms = []
  if (active_on_discord_web) {
    activePlatforms.push('Discord web')
  }
  if (active_on_discord_desktop) {
    activePlatforms.push('Discord desktop')
  }
  if (active_on_discord_mobile) {
    activePlatforms.push('Discord mobile')
  }

  const formatter = new Intl.ListFormat('en', {
    style: 'long',
    type: 'conjunction',
  })
  const accessibilityMessage = `Active on ${formatter.format(activePlatforms)}`

  return (
    <span className="flex flex-row items-center">
      <ComputerDesktopIcon
        aria-hidden="true"
        className={`h-8 w-8 ${
          active_on_discord_desktop
            ? statusMapping.online
            : statusMapping.offline
        }`}
      />
      <DevicePhoneMobileIcon
        aria-hidden="true"
        className={`h-8 w-8 ${
          active_on_discord_mobile
            ? statusMapping.online
            : statusMapping.offline
        }`}
      />
      <GlobeAltIcon
        aria-hidden="true"
        className={`h-8 w-8 ${
          active_on_discord_web ? statusMapping.online : statusMapping.offline
        }`}
      />
      {!!activePlatforms.length && (
        <span className="sr-only">{accessibilityMessage}</span>
      )}
      {!activePlatforms.length && (
        <span className="sr-only">Offline across all platforms</span>
      )}
    </span>
  )
}

export default ActiveDeviceRow
