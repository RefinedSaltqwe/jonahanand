import React from 'react';

type AttentionProps = {
    
};

const Attention:React.FC<AttentionProps> = () => {

    const features = [
        {
            name: 'Lorem Ipsum',
            description:
            'Please know, while we would love to celebrate with you all on the day, we understand it can be difficult to schedule time away from work and other commitments. Please join us if you are able, but we will gladly accept your warm wishes from afar!',
            imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-feature-07-detail-01.jpg',
            imageAlt: 'White canvas laptop sleeve with gray felt interior, silver zipper, and tan leather zipper pull.',
        },
        {
            name: 'Venue Restrictions',
            description:
            'As much as we would love to celebrate with all of our loved ones, our venue can only accomodate a limited number of people. Thus, we have taken a lot of care in choosing our guest list and organizing the seating arrangement. We hope for your kind understanding in adhering to the allocation of seats.',
            imageSrc: '/assets/images/Venue-Restrictions.png',
            imageAlt: 'White canvas laptop sleeve with gray felt interior, silver zipper, and tan leather zipper pull.',
        },
        {
            name: 'Who are seat holders',
            description:
            'Adults and children who are fully capable of eating on their own.',
            imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-feature-07-detail-02.jpg',
            imageAlt: 'Detail of zipper pull with tan leather and silver rivet.',
        },
        {
            name: 'Response',
            description:
            'Should the number of guests attending be lesser than the number of seats reserved for you, please leave the guest name in the RSVP blank, so that we can accomodate other guests who are in our waiting list. ',
            imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-feature-07-detail-02.jpg',
            imageAlt: 'Detail of zipper pull with tan leather and silver rivet.',
        },
    ]
    
    function classNames(...classes: any) {
        return classes.filter(Boolean).join(' ')
    }
    
    return (
        <div className="bg-white">
            <div className="mx-auto max-w-2xl px-4 py-24 sm:px-6 sm:py-32 lg:max-w-7xl lg:px-8">
                <div className="mx-auto max-w-3xl text-center">
                <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Protect your device</h2>
                <p className="mt-4 text-gray-500">
                    As a digital creative, your laptop or tablet is at the center of your work. Keep your device safe with a
                    fabric sleeve that matches in quality and looks.
                </p>
                </div>

                <div className="mt-16 space-y-16">
                {features.map((feature, featureIdx) => (
                    <div
                    key={feature.name}
                    className="flex flex-col-reverse lg:grid lg:grid-cols-12 lg:items-center lg:gap-x-8"
                    >
                    <div
                        className={classNames(
                        featureIdx % 2 === 0 ? 'lg:col-start-1' : 'lg:col-start-8 xl:col-start-9',
                        'mt-6 lg:col-span-5 lg:row-start-1 lg:mt-0 xl:col-span-4'
                        )}
                    >
                        <h3 className="text-2xl font-medium text-gray-900">{feature.name}</h3>
                        <p className="mt-2 text-sm text-gray-500">{feature.description}</p>
                    </div>
                    <div
                        className={classNames(
                        featureIdx % 2 === 0 ? 'lg:col-start-6 xl:col-start-5' : 'lg:col-start-1',
                        'flex-auto lg:col-span-7 lg:row-start-1 xl:col-span-8'
                        )}
                    >
                        <div className="aspect-h-2 aspect-w-5 overflow-hidden rounded-lg">
                        <img src={feature.imageSrc} alt={feature.imageAlt} className="object-cover object-center" />
                        </div>
                    </div>
                    </div>
                ))}
                </div>
            </div>
            </div>
    )
}
export default Attention;