import { GiCash } from "react-icons/gi";
export const SelectTravelsList = [
    {
        id: 1,
        name: "Flight Adventure",
        description: "Experience the world from above with seamless air travel.",
        icon: "✈️",
        people: 2
    },
    {
        id: 2,
        name: "Road Trip",
        description: "Hit the road and explore scenic routes at your own pace.",
        icon: "🚗",
        people: 4
    },
    {
        id: 3,
        name: "Cruise Voyage",
        description: "Set sail on a luxurious cruise and explore breathtaking destinations.",
        icon: "🚢",
        people: 6
    },
    {
        id: 4,
        name: "Solo Backpacking",
        description: "Travel light and discover hidden gems on your own terms.",
        icon: "🎒",
        people: 1
    }
];


export const SelectBudgetOptions = [
    {
        id: 1,
        title: "Budget Explorer (Under ₹5K)",
        description: "Affordable and smart travel choices without breaking the bank.",
        icon: <GiCash className="text-yellow-500 " />
    },
    {
        id: 2,
        title: "Smart Traveler (Under ₹10K)",
        description: "Great experiences at an optimal budget for value-conscious travelers.",
        icon: <GiCash className="text-yellow-500 " />
    },
    {
        id: 3,
        
        title: "Premium Getaway (Under ₹15K)",
        description: "Enjoy comfort and quality within a reasonable budget.",
        icon: <GiCash className="text-yellow-500 " />
    },
];


export const AI_PROMPT ="Generate Travel Plan for Location: {location}, for  {totalDays} days for {traveler} with {budget} budget. Give me a Hotels options list with HotelName, Hotel address, Price, hotel image url, geo coordinates, rating, descriptions and suggest itinerary with placeName, Place Details, Place Image Url, Geo Coordinates, ticket Pricing, rating, Time travel each of the location for {totalDays} days with each day plan with best time to visit in JSON format."