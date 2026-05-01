import React from 'react';
import { Cookie } from 'next/font/google';

const AB = Cookie({
    subsets: ['latin'],
    weight: '400'
  })

type FamilyPresenceProps = {
    
};

const FamilyPresence:React.FC<FamilyPresenceProps> = () => {
    
    return (
        <div className="relative isolate overflow-hidden bg-gray-900">
          <div className="px-6 py-24 sm:px-6 sm:py-32 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className={`text-5xl font-bold tracking-tight text-white sm:text-6xl ${AB.className}`}>
                Your presence is a gift.
              </h2>
              <p className="mx-auto mt-6 max-w-xl text-xl sm:text-3xl leading-10 text-gray-300">
                Having our loving family and friends during our special day is the best gift of all.
              </p>
            </div>
          </div>
          <svg
            viewBox="0 0 1024 1024"
            className="absolute left-1/2 top-1/2 -z-10 h-[64rem] w-[64rem] -translate-x-1/2 [mask-image:radial-gradient(closest-side,white,transparent)]"
            aria-hidden="true"
          >
            <circle cx={512} cy={512} r={512} fill="url(#8d958450-c69f-4251-94bc-4e091a323369)" fillOpacity="0.7" />
            <defs>
              <radialGradient id="8d958450-c69f-4251-94bc-4e091a323369">
                <stop stopColor="#7775D6" />
                <stop offset={1} stopColor="#E935C1" />
              </radialGradient>
            </defs>
          </svg>
        </div>
      )
}
export default FamilyPresence;