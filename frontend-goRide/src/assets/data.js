import img1 from '../assets/autoimg.png'
import img2 from '../assets/motoimg.png'
import img3 from '../assets/carimg.png'

const currentTime = new Date();
const futureTime = new Date(currentTime.getTime() + 5 * 60000);

const getPeriod = () => {
    const hours = currentTime.getHours();
    if (hours >= 12 && hours < 18) {
        return "PM";
    } else {
        return "AM";
    }
};

const Data = [
    {
        s_no: "₹200",
        s_name: "3Km away",
        s_time: `${futureTime.getHours()}:${futureTime.getMinutes()} ${getPeriod()}`,
        s_head: "Auto",
        s_img: img1,
    },
    {
        s_no: "₹150",
        s_name: "4Km away",
        s_time: `${futureTime.getHours()}:${futureTime.getMinutes()} ${getPeriod()}`,
        s_head: "Moto",
        s_img: img2,
    },
    {
        s_no: "₹250",
        s_name: "2.5Km away",
        s_time: `${futureTime.getHours()}:${futureTime.getMinutes()} ${getPeriod()}`,
        s_head: "Car",
        s_img: img3,
    },
]

export default Data;
