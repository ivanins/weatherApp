import { useEffect, useState } from "react"
import WeatherForm from "./weatherForm";
import WeatherMainInfo from "./watherMainInfo";

import styles from "./weatherApp.module.css";

export default function WeatherApp(){
    const [weather, setWeather] = useState(null);

    useEffect(() => {
        loadinfo();
    }, []);

    useEffect(() => {
        document.title = `weather | ${weather?.location.name}`
    }, [weather]);

    async function loadinfo(city = "london"){
        try {
            
            const request = await fetch(`${import.meta.env.VITE_REACT_APP_URL}&key=${import.meta.env.VITE_REACT_APP_KEY}&q=${city}`);
            console.log("holaaa")

            const json = await request.json();
            setWeather(json);
            
            

            console.log(json);
            
        } catch (error) {
            console.error(error);
            
        }

    }

    function handleChangeCity(city){
        setWeather(null);
        loadinfo(city);

    }



    return <div className={styles.weatherContainer} >
        <WeatherForm onChangeCity={handleChangeCity} />
        
        <WeatherMainInfo weather={weather} />
        
    </div>
}