import moment from 'moment';
export default function(time) {
    let day = moment(time).fromNow();
    day = day.replace("seconds", "giây")
    day = day.replace("second", "giây")
    day = day.replace("minutes","phút")
    day = day.replace("minutes","phút")
    day = day.replace("hours","giờ")
    day = day.replace("hour","giờ")
    day = day.replace("ago","trước")
    day = day.replace("days","ngày")
    day = day.replace("day","ngày")
    day = day.replace("an","1")
    day = day.replace("a","1");
    day = day.replace("month","tháng")
    day = day.replace("months","tháng")
    day = day.replace("few", "vài")
    return day;
}