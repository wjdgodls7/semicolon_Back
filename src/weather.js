import axios from 'axios';

const weatherKey = process.env.WEATHER_KEY;

export const getWeather = async (latitude,longitude) => { 
    if (latitude !== undefined && longitude !== undefined) {
        try {
            const { data: { main: { temp }, weather:[{ main }]}} = await axios.get(`http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${weatherKey}&units=metric`);
            const data = { temp: temp, weather: main };
            return data;
        } catch (e) { 
            console.log("위치 정보가 없어요");
        }
    } else{ 
        throw error("날씨 정보를 얻을수 없습니다.");
    }

    return {};
}