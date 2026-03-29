import { useState, useEffect } from "react";
import { CiLocationOn } from "react-icons/ci";
import { LuCake } from "react-icons/lu";
import { MdOutlineMailOutline } from "react-icons/md";

const API_URL = import.meta.env.VITE_API_URL;
const RESET_TIME = Number(import.meta.env.VITE_RESET_TIME) ;

export const Homepage = () => {

    const [user, setUser] = useState(null);
    const [time , setTime] = useState(RESET_TIME) ;
    const progress = (time / RESET_TIME) * 100;
    
    const fetchUser = async () => {
        const res = await fetch(API_URL);
        const data = await res.json();
        setUser(data.results[0]);
        setTime(RESET_TIME) ;

    };
    useEffect(() => {
        fetchUser();
    }, []);

    useEffect(() => {
        if(time === 0 ){
            fetchUser() ; 
            return ; 
        }
        const interval = setInterval(() => {
            setTime((prev) => prev -1 ) ;
        } , 1000)

        return ()=> clearInterval(interval) ;  

    }, [time]);
    
    if (!user) {
        return (
        <div className="h-screen flex items-center justify-center bg-gray-900 text-white">
            Loading...
        </div>
        );
    }
    return (
        <div className="min-h-screen bg-gray-900  flex items-center justify-center p-4">
            <div className="bg-white/10 backdrop-blur-lg border border-white/20 shadow-xl rounded-2xl p-6 w-full max-w-sm text-white">
        
                {/* Profile pic */}
                <div className="flex justify-center">
                    <img
                        src={user.picture.large}
                        alt="profile"
                        className="w-24 h-24 rounded-full border-4 border-green-500 shadow-lg"
                    />
                </div>
        
                {/* Name */}
                <h2 className="text-2xl font-bold text-center mt-4">
                    {user.name.first} {user.name.last}
                </h2>
        
                {/* Gender */}
                <p className="text-center mt-1">
                    <span className="px-3 py-1 text-sm bg-green-600 rounded-full">
                        {user.gender}
                    </span>
                </p>
        
                {/* Info */}
                <div className="mt-6 space-y-3 text-sm flex flex-col items-center sm:items-stretch">
        
                    <div className="flex justify-between">
                        <span className=" sm:flex gap-2 items-center hidden ">
                            <MdOutlineMailOutline />
                            <p className="text-gray-300">Email</p>

                        </span>
                        <span>{user.email}</span>
                    </div>
        
                <div className="flex justify-between">
                    <span className="hidden sm:flex gap-2 items-center">
                        <CiLocationOn />
                        <p className="text-gray-300">Location</p>

                    </span>
                    <span>
                        {user.location.city}, {user.location.country}
                    </span>
                </div>
        
                <div className="flex justify-between">
                    <span className="hidden sm:flex gap-2 items-center">
                        <LuCake />
                        <p className="text-gray-300">Age</p>
                    </span>
                    <span>{user.dob.age}</span>
                </div>
        
                </div>

                {/* timer */}
                <div className="mt-6 w-full bg-gray-600 rounded-lg relative overflow-hidden h-10">

                    {/* Progress Bar */}
                    <div
                        className="absolute inset-0 h-full bg-green-500 transition-all duration-1000"
                        style={{ width: `${progress}%` }}
                    ></div>

                    {/* Text on top */}
                    <p className="absolute inset-0 flex items-center justify-center text-white font-medium">
                        New User in {time}s
                    </p>
                </div>
        
            </div>
        </div>
    );

}



