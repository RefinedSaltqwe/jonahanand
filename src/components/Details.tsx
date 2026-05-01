import { CalendarDaysIcon, CheckCircleIcon, ClockIcon, MapPinIcon } from '@heroicons/react/24/outline';
import React from 'react';

type DetailsProps = {
    
};

const features = [
    {
      name: 'When',
      description:
        'Friday, 4th of August 2023',
      icon: CalendarDaysIcon,
    },
    {
      name: 'Time',
      description:
        "1 o'clock in the afternoon.",
      icon: ClockIcon,
    },
    {
      name: 'Where',
      description:
        "Cove Garden Resort",
      icon: MapPinIcon,
    },
    {
      name: 'Dress code',
      description:
        'The dress code for our wedding is formal or smart-casual and in shades of blue and grey. Please do not wear navy/midnight blue and white. We would highly appreciate it if guests adhere to the dress code. Thank you.',
      icon: CheckCircleIcon,
    },
  ]

const Details:React.FC<DetailsProps> = () => {
    
    return (
        <div className="bg-white py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Details
              </h2>
              <dl className="col-span-2 grid grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2">
                {features.map((feature) => (
                  <div key={feature.name}>
                    <dt className="text-base font-semibold leading-7 text-gray-900 text-[21px]">
                      <div className="mb-6 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
                        <feature.icon className="h-6 w-6 text-white" aria-hidden="true" />
                      </div>
                      {feature.name}
                    </dt>
                    <dd className="mt-1 text-base leading-7 text-gray-600">
                        {feature.name === "Where" && (<><br/><p className='font-semibold'>Church: San Antonio de Padua Parish</p></>)}
                        {feature.name === "Where" && (
                            <>
                              {"12th St. Nazareth Cagayan de Oro City"}
                              <br/>
                            </>
                          )}
                        <br/>
                        {feature.name === "Where" ? (<p className='font-semibold'>{`Reception: ${feature.description}`}</p>) : feature.description }
                        {feature.name === "Where" && "Zone 3 Old Road, Cagayan de Oro, 9000 Misamis Oriental, Philippines"}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      )
}
export default Details;