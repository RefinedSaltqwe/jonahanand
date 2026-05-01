import { ExclamationTriangleIcon, UserPlusIcon, XCircleIcon, XMarkIcon } from '@heroicons/react/24/outline';
import React, { useEffect, useState } from 'react';
import { Button } from './Button';
import ComboBox, { People } from './ComboBox';
import { addDoc, collection, doc, setDoc } from 'firebase/firestore';
import { firestore } from '@/firebase/clientApp';
import RsvpSuccessful from './RsvpSuccessful';
import RsvpError from './RsvpError';
import people from '../data/people';

type RsvpProps = {
    
};

interface Guest{
    id: string;
    name: string;
}

interface RSVP {
    name: string;
    seatNumber: number;
    numberOfGuests: number;
    numberOfActualGuests: number;
    guests?: Guest[];
    answer: "Yes" | "No";
}

const Rsvp:React.FC<RsvpProps> = () => {
    
    const [selectedPerson, setSelectedPerson] = useState<People>();
    const [guests, setGuests] = useState<Guest[]>([]);
    const [addGuest, setAddGuest] = useState("");
    const [isComingAnswer, setIsComingAnswer] = useState<boolean | undefined>(undefined);
    const [code, setCode] = useState("");
    const [codeMatch, setIsCodeMatch] = useState(false);
    const [buttonToggle, setButtonToggle] = useState(false);
    const [isCheckDisabled, setIsCheckDisabled] = useState(true);
    const [isSubmitDisbaled, setIsSubmitDisbaled] = useState(true);
    const [error, setError] = useState("");
    const [rsvpSuccess, setRsvpSuccess] = useState(false);
    const [rsvpError, setRsvpError] = useState(false);

    const isComing = (answer: string) => {
        if(answer === "Yes"){
            setIsComingAnswer(true);
            setButtonToggle(false);
            setIsCheckDisabled(true);
            setCode("");
        } else if(answer === "No") {
            setIsComingAnswer(false);
            setIsCodeMatch(false);
            setIsSubmitDisbaled(true);
            setIsCheckDisabled(true);
            setButtonToggle(false);
            setError("");
            setCode("");
            setAddGuest("");
            setGuests([]);
        } else {
            setIsComingAnswer(undefined);
            setIsCodeMatch(false);
            setIsSubmitDisbaled(true);
            setIsCheckDisabled(true);
            setButtonToggle(false);
            setError("");
            setCode("");
            setAddGuest("");
            setGuests([]);
        }
    }

    const checkCode = () => {
        if(code === selectedPerson?.code){
            setIsCodeMatch(true);
            setIsSubmitDisbaled(true); // ! false
            setButtonToggle(true)
            setError("");
            setGuests((prev) => [...prev, {
                id: "0",
                name: selectedPerson?.name
            }] as Guest[]);
        } else {
            setCode("");
            setError("Code does not match.");
            setButtonToggle(false)
        }
    }

    const submit = async () =>{
        try{
            if(code === selectedPerson?.code && isComingAnswer !== undefined){
                const selectedId= selectedPerson!.id.toString();
                const answer = isComingAnswer ? "Yes" : "No";
                const addGuests = guests.map((item) => item.name);
                
                const rsvp: RSVP = {
                    name: selectedPerson!.name,
                    seatNumber: selectedPerson!.seatNumber,
                    numberOfGuests: selectedPerson!.numberOfGuests,
                    numberOfActualGuests: addGuests.length,
                    guests: addGuests as [],
                    answer: answer
                }
        
                await setDoc(doc(firestore, "rsvp", selectedId), rsvp);
                setRsvpSuccess(true);
            } else if (code !== selectedPerson?.code ){
                setCode("");
                setError("Code does not match.");
            } else if (isComingAnswer === undefined){
                setCode("");
                setError("Select option if you are coming");
            }
            
        } catch (error){
            setRsvpError(true);
            console.log("Error: ", error)
        }
    }

    const handleRead = (e: React.ChangeEvent<HTMLInputElement>) => {
        if(e.target.checked){
            setIsSubmitDisbaled(false);
        } else {
            setIsSubmitDisbaled(true);
        }
    }

    useEffect(()=>{
        if(selectedPerson){
            setIsCodeMatch(false);
            setCode("")
            setButtonToggle(false);
            setIsCheckDisabled(true);
            setError("")
            setAddGuest("");
            setGuests([]);
        }
    }, [selectedPerson]);

    useEffect(()=>{
        if(code.length > 1 && isComingAnswer && isComingAnswer !== undefined) {
            setIsCheckDisabled(false);
            setButtonToggle(false);
            // setIsSubmitDisbaled(true);
        } else if(code.length > 1 && !isComingAnswer && isComingAnswer !== undefined) {
            setIsSubmitDisbaled(false);
            setButtonToggle(true);
        } else {
            setIsSubmitDisbaled(true);
            setIsCheckDisabled(true);
        }
    },[code, isComingAnswer])
    
    return (
        <div className="container mx-auto sm:px-6 lg:px-8 flex justify-center h-[auto] py-[50px]">
            <div className="w-full flex justify-center items-center">
                <div className='w-11/12 md:w-3/12 h-[fit-content]' >
                    {rsvpSuccess ? (
                        <RsvpSuccessful answer={isComingAnswer}/>
                    ):(
                        <>
                            <p className="text-center text-1xl leading-8 text-gray-500 mb-5">
                                Let us know if you will be able to make it.
                            </p>
                            <ComboBox setSelectedPerson={setSelectedPerson} selectedPerson={selectedPerson} people={people} />
                            {selectedPerson && 
                                <>
                                    <select
                                        id="location"
                                        name="location"
                                        className="mt-4 mb-4 block w-full rounded-md border-0 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        defaultValue="Are you coming?"
                                        onChange={(event)=>{isComing(event.target.value)}}
                                        disabled={codeMatch}
                                    >
                                        <option value="Are you coming?" selected>Are you coming?</option>
                                        <option value="Yes" >Yes</option>
                                        <option value="No" >No</option>
                                    </select>
                                    <div className={`rounded-md mt-2 mb-2 px-3 pb-1.5 pt-2.5 shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-indigo-600 ${false && ' ring-red-300 ring-2 '}`}>
                                        <label htmlFor="name" className="block text-xs font-medium text-gray-900">
                                        Code
                                        </label>
                                        <input
                                            onChange={(event) => {setCode(event.target.value)}}
                                            value={code}
                                            type="text"
                                            name="name"
                                            id="name"
                                            className={`block w-full border-0 p-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 disabled:opacity-75`}
                                            placeholder="123"
                                            disabled={codeMatch}
                                        />
                                    </div>
                                </>
                            }
                            {/* {codeMatch &&  */}
                            {codeMatch &&
                                <div>
                                    <h3 className="text-base font-semibold leading-6 text-gray-900 mt-5">{`${selectedPerson!.numberOfGuests > 1 ? "Seats" : "Seat"} reserved for you.`}</h3>
                                    <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-1">
                                        <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
                                            <dt className="truncate text-sm font-medium text-gray-500 text-center">{`# of ${selectedPerson!.numberOfGuests > 1 ? "Seats" : "Seat"} Reserved`}</dt>
                                            <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900 text-center">
                                                {selectedPerson?.numberOfGuests === 901 
                                                    ? "Seats are reserved for you." 
                                                    : selectedPerson?.numberOfGuests === 902 
                                                        ? "Seats are reserved for you and your family." 
                                                        :  selectedPerson?.numberOfGuests === 903 
                                                            ? "A seat is reserved for you." 
                                                            : selectedPerson?.numberOfGuests}
                                            </dd>
                                        </div>
                                        <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
                                            <dt className="truncate text-sm font-medium text-gray-500 text-center">{`Guest Status`}</dt>
                                            <dd className="mt-1 text-xl font-semibold tracking-tight text-gray-900 text-center">{selectedPerson?.status === "" ? "General" : selectedPerson?.status}</dd>
                                        </div>
                                    </dl>
                                    {/* GUESTS ------------------------------------------------------------------- */}
                                    {(selectedPerson!.numberOfGuests > 1) && (selectedPerson!.numberOfGuests !== 901) && (selectedPerson!.numberOfGuests !== 902) && (selectedPerson!.numberOfGuests !== 903) && 
                                        <div>
                                            <label htmlFor="email" className={`block text-sm font-medium leading-6 text-gray-900 mt-6`}>
                                                {`Name of guest(s) you're bringing [${guests?.length}/${selectedPerson?.numberOfGuests}]`}
                                            </label>
                                            <div className="mt-2 flex rounded-md shadow-sm">
                                                <div className="relative flex flex-grow items-stretch focus-within:z-10">
                                                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                                    <UserPlusIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                                </div>
                                                <input
                                                    type="text"
                                                    name="text"
                                                    id="text"
                                                    // aria-invalid="true"
                                                    value={addGuest}
                                                    className={`${error ? 'text-red-500 ring-red-300' : 'text-gray-900 ring-gray-300'} ring-1 ring-inset block w-full rounded-none rounded-l-md border-0 py-1.5 pl-10 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
                                                    placeholder="Guest's Full Name"
                                                    onChange={(event) => {
                                                        setAddGuest(event.target.value);
                                                        if(event.target.value.length === 0){
                                                            setError("");
                                                        }
                                                    }}
                                                />
                                                </div>
                                                <button
                                                    onClick={()=> {
                                                        if(selectedPerson?.numberOfGuests){
                                                            let guestLen = guests?.length;
                                                            if(guestLen < selectedPerson?.numberOfGuests){
                                                                setGuests((prev) => [...prev, {
                                                                    id: guestLen,
                                                                    name: addGuest
                                                                }] as Guest[]);
                                                                setAddGuest("");
                                                            } else {
                                                                setError("You have reached the maximun number of guests.");
                                                                setTimeout(() => {
                                                                    setError("");
                                                                }, 10000)
                                                            }
                                                        }
                                                    }}
                                                    type="button"
                                                    className={`relative -ml-px inline-flex items-center gap-x-1.5 rounded-r-md px-3 py-2 text-sm font-semibold ${error ? 'text-red-500 ring-red-300' : 'text-gray-900 ring-gray-300'} ring-1 ring-inset hover:bg-gray-50`}
                                                >
                                                    Add
                                                </button>
                                            </div>
                                            {(error && error === "You have reached the maximun number of guests.") &&
                                                <div className="rounded-md bg-red-50 p-4 mt-2">
                                                    <div className="flex">
                                                        <div className="flex-shrink-0">
                                                            <XCircleIcon className="h-5 w-5 text-red-400" aria-hidden="true" />
                                                        </div>
                                                        <div className="ml-3">
                                                            <p className="text-sm font-medium text-red-800">{error}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            }
                                            { guests && 
                                                <div className="mt-3" >
                                                    <ul role="list" className="divide-y divide-gray-100">
                                                        {guests.map((person) => (
                                                        <li key={person.id} className="flex items-center justify-between gap-x-6 py-5">
                                                            <div className="flex gap-x-4">
                                                                <div className="min-w-0 flex-auto">
                                                                    <p className="text-sm font-semibold leading-6 text-gray-900">{person.name}</p>
                                                                </div>
                                                            </div>
                                                            {person.id !== "0" ?
                                                                (<button
                                                                    onClick={()=>{
                                                                        setGuests((prev) => [...prev.filter(item => item.id !== person.id)]);
                                                                    }}
                                                                    className="rounded-full bg-white px-2.5 py-1 text-xs font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                                                                >
                                                                    <XMarkIcon className="h-4 w-4" aria-hidden="true"/>
                                                                </button>)
                                                                :
                                                                (<button
                                                                    className="rounded-full bg-white px-2.5 py-1 text-xs font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 cursor-default"
                                                                >
                                                                    You
                                                                </button>)
                                                            }
                                                            
                                                        </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            }
                                        </div>
                                    }
                                    <div className="rounded-md bg-yellow-50 p-4 mt-6 mb-2">
                                        <div className="flex">
                                            <div className="flex-shrink-0">
                                                <ExclamationTriangleIcon className="h-5 w-5 text-yellow-400" aria-hidden="true" />
                                            </div>
                                            <div className="ml-3">
                                                <h3 className="text-md font-medium text-yellow-800">Attention: Please read.</h3>
                                                
                                                <h3 className="text-sm font-medium text-yellow-800 pt-3">Who are seat holders</h3>
                                                <div className="mt-2 text-sm text-yellow-700">
                                                    <p>
                                                        - Adults
                                                        <br/>
                                                        - Children who are fully capable of eating on their own.
                                                    </p>
                                                </div>
                                                <h3 className="text-sm font-medium text-yellow-800 pt-3">Venue Restrictions</h3>
                                                <div className="mt-2 text-sm text-yellow-700">
                                                    <p>
                                                    As much as we would love to celebrate with all of our loved ones, our venue can only accomodate a limited number of people. Thus, we have taken a lot of care in choosing our guest list and organizing the seating arrangement. We hope for your kind understanding and we would greatly appreciate it if you adhere to the number of seats reserved for you.
                                                    </p>
                                                </div>
                                                {/* <h3 className="text-sm font-medium text-yellow-800 pt-3">Response</h3>
                                                <div className="mt-2 text-sm text-yellow-700">
                                                    <p>
                                                    Should the number of guests attending be lesser than the number of seats reserved for you, please leave the guest name in the RSVP blank, so that we can accomodate other guests who are in our waiting list. 
                                                    </p>
                                                </div> */}
                                                <h3 className="text-sm font-medium text-yellow-800 pt-3">Thank you very much!</h3>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            }
                            {(error && error != "You have reached the maximun number of guests.") &&
                                <div className="rounded-md bg-red-50 p-4">
                                    <div className="flex">
                                        <div className="flex-shrink-0">
                                            <XCircleIcon className="h-5 w-5 text-red-400" aria-hidden="true" />
                                        </div>
                                        <div className="ml-3">
                                            <p className="text-sm font-medium text-red-800">{error}</p>
                                        </div>
                                    </div>
                                </div>
                            }
                            {buttonToggle ? (
                                <>
                                    {isComingAnswer && 
                                        (
                                            <fieldset>
                                                <legend className="sr-only">Notifications</legend>
                                                <div className="space-y-5">
                                                    <div className="relative flex items-start">
                                                        <div className="flex h-6 items-center">
                                                            <input
                                                                id="comments"
                                                                aria-describedby="I-have-read"
                                                                name="comments"
                                                                type="checkbox"
                                                                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                                                onChange={handleRead}
                                                            />
                                                        </div>
                                                        <div className="ml-3 text-sm leading-6">
                                                            <label htmlFor="comments" className="font-medium text-gray-900">
                                                                I have read and I agree to the above statement.
                                                            </label>{' '}
                                                            <span id="comments-description" className="text-gray-500">
                                                            <span className="sr-only">I have read and I agree to the above statement.</span>
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </fieldset>
                                        )
                                    }
                                    <Button onClick={()=>{submit()}} color="primary" className="disabled:opacity-75" disabled={isSubmitDisbaled}>CONFIRM</Button>
                                </>
                            ):(
                                <Button onClick={()=>{checkCode()}} color="primary" className="disabled:opacity-75" disabled={isCheckDisabled}>SUBMIT</Button>
                            )}
                            {rsvpError && <RsvpError/>}
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}
export default Rsvp;