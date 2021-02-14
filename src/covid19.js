import axios from 'axios';

const covidKey = process.env.COVID_KEY;

export const covid19 = async (location) => { 
    let region = location;
    const korean = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;
    if (korean.test(location)) { 
    switch (region) {
            case "인천광역시":
        region = "incheon"
        break;
            case "서울특별시":
        region = "seoul"
        break;
            case "부산광역시":
        region = "busan"
        break;
            case "대구광역시":
        region = "daegu"
        break;
            case "광주광역시":
        region = "gwangju"
        break;
            case "대전광역시":
        region = "daejeon"
        break;
            case "울산광역시":
        region = "ulsan"
        break;
            case "세종특별자치시":
        region = "sejong"
            break;
            case "경기도":
        region = "gyeonggi"
            break;
            case "경상남도":
        region = "gyeongnam"
            break;
            case "경상북도":
        region = "gyeongbuk"
            break;
            case "강원도":
        region = "gangwon"
            break;
            case "충청북도":
        region = "chungbuk"
            break;
            case "충청남도":
        region = "chungnam"
            break;
            case "제주시":
        region = "jeju"
            break;
            case "전라남도":
        region = "jeonnam"
            break;
            case "전라북도":
        region = "jeonbuk"
            break;
            default :
        region = "korea"
            break;      
        
        }
    }
    try {
        const { data } = await axios.get(`https://api.corona-19.kr/korea/country/new/?serviceKey=${covidKey}`);
        return data[region];
    } catch (e) { 
        console.log(e)
    }
    return;
}