import { CheckCircleIcon } from '@heroicons/react/24/outline';
import React from 'react';

type RsvpErrorProps = {
    
};

const RsvpError:React.FC<RsvpErrorProps> = () => {
    
    return (
        <div className="rounded-md bg-red-50 p-4">
      <div className="flex">
        <div className="flex-shrink-0">
          <CheckCircleIcon className="h-5 w-5 text-red-400" aria-hidden="true" />
        </div>
        <div className="ml-3">
          <h3 className="text-xl font-medium text-red-800">RSVP Unsuccessful</h3>
          <div className="mt-2 text-md text-red-700">
            <p>Error. Please try again.</p>
          </div>
        </div>
      </div>
    </div>
    )
}
export default RsvpError;