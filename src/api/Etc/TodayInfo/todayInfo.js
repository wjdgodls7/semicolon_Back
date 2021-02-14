import { getWeather } from "../../../weather";
import { covid19 } from "../../../covid19";

export default {
    Query: { 
        todayInfo: async (_, args) => { 
            const { location, latitude, longitude } = args;
            const covidData = await covid19(location);
            const { temp, weather } = await getWeather(latitude, longitude);
            const { newCase, countryName } =  covidData;
            
            return { newCase, countryName, temp, weather };
        }
    }

}
