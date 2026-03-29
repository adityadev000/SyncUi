import { useState, useEffect } from "react";
import { CiLocationOn } from "react-icons/ci";
import { LuCake } from "react-icons/lu";
import { MdOutlineMailOutline } from "react-icons/md";
import { RiTimerLine } from "react-icons/ri";

const API_URL = import.meta.env.VITE_API_URL;
const RESET_TIME = Number(import.meta.env.VITE_RESET_TIME) ;

export const Homepage = () => {

    const [users, setUser] = useState([]);
    const [time , setTime] = useState(RESET_TIME) ;
    const progress = (time / RESET_TIME) * 100;
    
    const fetchUser = async () => {
        const res = await fetch(API_URL);
        const data = await res.json();
        setUser(data.results);
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
    
    if (!users) {
        return (
        <div className="h-screen flex items-center justify-center bg-gray-900 text-white">
            Loading...
        </div>
        );
    }
    return (
        <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-4 gap-6">



            {/*  Timer */}
            <div className="w-full max-w-md bg-gray-600 rounded-lg relative overflow-hidden h-10">

                <div
                    className="absolute inset-0  bg-green-600 transition-all duration-1000"
                    style={{ width: `${progress}%` }}
                ></div>

                <p className="absolute inset-0 flex items-center justify-center text-white font-medium">
                    Refreshing in {time}s {<RiTimerLine />}
                </p>
            </div>



            {/* Users Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {users.map((user, index) => (

                <div
                    key={index}
                    className="bg-white/10 backdrop-blur-lg border border-white/20 shadow-xl rounded-2xl p-6 w-full max-w-sm text-white"
                >


                    {/* Profile pic */}
                    <div className="flex justify-center">
                        <img
                            src={user.picture.large}
                            alt="profile"
                            className="w-20 h-20 rounded-full border-4 border-green-500 shadow-lg"
                        />
                    </div>



                    {/* Name */}
                    <h2 className="text-xl font-bold text-center mt-3">
                        {user.name.first} {user.name.last}
                    </h2>



                    {/* Gender */}
                    <p className="text-center mt-1">
                        <span className="px-3 py-1 text-xs bg-green-600 rounded-full">
                            {user.gender}
                        </span>
                    </p>



                    {/* Info */}
                    <div className="mt-4 space-y-2 text-sm">
                        {/* email */}
                        <div className="flex justify-between">
                            <span className="flex gap-2 items-center text-gray-300">
                                <MdOutlineMailOutline />
                                Email
                            </span>
                            <span className="truncate">{user.email}</span>
                        </div>
                        {/* location */}
                        <div className="flex justify-between">
                            <span className="flex gap-2 items-center text-gray-300">
                                <CiLocationOn />
                                Location
                            </span>
                            <span>
                                {user.location.city}, {user.location.country}
                            </span>
                        </div>
                        {/* age */}
                        <div className="flex justify-between">
                            <span className="flex gap-2 items-center text-gray-300">
                                <LuCake />
                                Age
                            </span>
                            <span>{user.dob.age}</span>
                        </div>

                    </div>
                </div>
                ))}


            </div>
    </div>
    );

}



