import { FC } from 'react'
import { Data } from 'use-lanyard'

interface Props {
  activities: Data['activities']
}

const ActivityCards: FC<Props> = ({ activities }) => {
  return (
    <section className="flex py-4 gap-2">
      {activities.map((activity) => {
        return (
          <div
            key={activity.id}
            className="bg-gray-100 shadow-md dark:shadow-2xl dark:bg-gray-500 sm:rounded-lg max-w-sm"
          >
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-base font-semibold leading-6 text-gray-900 dark:text-white">
                {activity.name}
              </h3>
              <div className="mt-2 max-w-xl text-sm text-gray-500 dark:text-gray-50">
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
