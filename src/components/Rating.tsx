import { StarIcon } from '@heroicons/react/20/solid';
import React from 'react';

type RatingProps = {
    
};

const Rating:React.FC<RatingProps> = () => {
    
    return (
        <div className="text-center">
            <span className="flex flex-row-reverse">
                <StarIcon className="text-gray-600 cursor-pointer peer peer-hover:text-yellow-400 hover:text-yellow-400 duration-100 " width="23" height="23"/>
                <StarIcon className="text-gray-600 cursor-pointer peer peer-hover:text-yellow-400 hover:text-yellow-400 duration-100 " width="23" height="23"/>
                <StarIcon className="text-gray-600 cursor-pointer peer peer-hover:text-yellow-400 hover:text-yellow-400 duration-100 " width="23" height="23"/>
                <StarIcon className="text-gray-600 cursor-pointer peer peer-hover:text-yellow-400 hover:text-yellow-400 duration-100 " width="23" height="23"/>
                <StarIcon className="text-gray-600 cursor-pointer peer peer-hover:text-yellow-400 hover:text-yellow-400 duration-100 " width="23" height="23"/>
            </span>
        </div>
    )
}
export default Rating;