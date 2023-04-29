import { FC } from 'react'
import { LanyardResponse } from '@/utils/fetchDiscordStatus/types'

interface Props {
  activities: LanyardResponse['data']['activities']
}

const ActivityCards: FC<Props> = ({ activities }) => {
  return (
    <section className="flex gap-2">
      {activities.map((activity) => {
        return (
          <div key={activity.id} className="bg-gray-50 sm:rounded-lg max-w-sm">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-base font-semibold leading-6 text-gray-900">
                {activity.name}
              </h3>
              <div className="mt-2 max-w-xl text-sm text-gray-500">
                {activity.details && <p>{activity.details}</p>}
                {activity.state && <p>{activity.state}</p>}
              </div>
            </div>
          </div>
        )
      })}
    </section>
  )
}

export default ActivityCards
