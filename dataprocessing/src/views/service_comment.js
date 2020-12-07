import React from 'react';
import {Button, Grid} from '@material-ui/core';
import axios from 'axios';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
const commentSampe = [
    "Giá cả hợp lý và rất thân thiện với khách hàng",
    "Các bạn làm việc rất chuyên nghiệp và thân thiện với khách hàng. Cám ơn vì sự hỗ trợ.",
    "Bảng gía dịch vụ mà cửa hàng đưa ra rất phù hợp với khách hàng. Có nhiều phân khúc để lựa chọn, Thái độ nhân viên cũng rất thân thiện với khách hàng. Cám ơn các bạn rất nhiều",
    "Tôi từng kêu gọi cứu hộ ở cửa hàng này khi lốp xe của tôi bị hỏng. Anh nhân viên làm việc rất là chuyên nghiệp thái độ phục vụ cũng rất thân thiện. Cám ơn",
    "Giá cả thì hợp lý vì tôi có biết về linh kiện phụ tùng. Nhưng tiếc cái là nhân viên chưa thật sự tôn trọng khách hàng. Các bạn nên điều chỉnh để có nhiều khách hơn trong tương lai",
    "Cách ứng dụng này hoạt động và cách cửa hàng kinh doanh thật sự tôi rất ưa chuộng. Bạn có thể lên wwebsite và kêu gọi cứu hộ. Nhưng dụng ứng dụng có vẻ tiện hơn và nơi đây chúng ta có thể tìm hiểu kỹ về từng cửa hàng trước khi kêu họ tới.",
    "Vâng. Bạn có thể lên google và tìm kiếm thông tin cứu hộ. Nhưng có lẻ dữ liệu không được nhiều, và không được chuyên nghiệp. Điều này góp phần làm khó người dùng. Nhưng khi có ứng chúng tôi có thể liên kết với nhiều của hàng hơn. Cám ơn cửa hàng và ứng dụng.",
    "Cửa hàng làm việc hơi thiếu chuyên nghiệp là tính nhầm quảng đường vận chuyển xe tôi về cửa hàng. Còn lại mọi thứ điều tốt. Hơn nữa cửa hàng có liên hệ trực tiếp cho tôi và gửi tiền trở lại. Các bạn rất uy tín.",
    "Cám ơn ứng dụng đã tạo ra hệ sinh thái cho việc kết nối giữa những người có xe và những cửa hàng. Rất tuyệt vời",
    "Cửa hàng này thật sự rất tuyệt vời. Nhân viên rất thân thiện và tôn trọng khách hàng. Khi anh ấy đang xử lý kỹ thuật thì tôi có thể hỏi rất thoải mái mà không gặp vấn đề gì. 4 sao nhé.",
    "Cửa hàng rất tuyệt vời. Giá cả hợp lí khi so sánh với các cửa hàng khác. Tôi rất hài lòng với nhân viên ở đây. Nhưng có một số vấn đề cần góp ý. Các bạn nên nâng cấp ở phần giao dịch cho mọi người sử dụng tiền Việt chẳng hạn.",
    "Nhân viên rất lễ phép ạ. Mọi người rất vui vẻ làm việc mặc dù trời nắng rất là gắt. Cám ơn các bạn.",
    "Tôi thích cách phục vụ khách hàng của các bạn, rất chuyên nghiệp. Ứng dụng này rất hay. Nếu tìm thông tin trên mạng  thì thật sự không có nhiều lựa chọn cho khách hàng. Cám ơn ứng dụng",
    "Các bạn đã làm rất tốt công việc của mình. Chúc cửa hàng các bạn mau chóng thành công hơn trong tương lai. Cám ơn các bạn",
    "Hôm đó trời nắng gắt, nhìn các bạn làm thấy rất nhiệt tình. Làm mình thấy sự chuyên nghiệp từ các nhân viên của cửa hàng. Họ phục vụ khách hàng rất  tốt. Điều này làm mình có rất nhiều thiện cảm. Cám ơn các bạn",
    "Cửa hàng làm việc rất chuyên nghiệp. Giá cả công khai với khách hàng. Mọi người rất thân thiện khi làm việc. Mình rất thích, xin đánh giá các bạn 5 sao",
    "Tôi nghĩ có nhiều người như tôi lên website để tìm kiếm cứu hộ khí xe họ gặp sự cố trên đường. Nhưng chúng tôi thường không có nhiều lựa chọn. Bạn đã tạo ra một hệ sinh thái rất tuyệt vời. Kết nối chúng tôi với các cửa hàng. Cám ơn các bạn.. Cám ơn cửa hàng.",
    "Hôm đó chúng tôi đến một đoạn đường rất vắng, nhưng xe lại không khởi động được. Mai mắn thay, tìm được của hàng. cửa hàng, rất thân thiện và hỗ trợ khách hàng rất tốt.",
    "Cửa hàng này nói chung cũng ổn, nhân viên thân thiện với khách hàng và làm việc rất chuyên nghiệp. Cám ơn các bạn.",
    "Tôi thích cách phục vụ của các bạn. rất chuyên nghiệp và thoải mái cho người dùng. Giá cả hợp lí và nhân viên rất thân thiện.",
    "Cửa hàng làm việc rất chuyên nghiệp thân thiện và phục vụ khách hàng rất tốt. Giá cả hợp lí lắm, vì tôi có so sánh với các cửa hàng khách gần đó. Nói chung là các bạn làm việc rât tốt. 5ssao",
    "Hôm đó, địa hình đến chúng tôi có vẻ khó khăn cơ mà các bạn vẫn tạo điều kiện và khuyền mãi chúng tôi chi phí vận chuyển, Cửa hàng này rất có tâm với khách hàng. Thanks a lot",
    "Cửa hàng làm việc 24/24 các ngày trong tuần không nghỉ. Rất cám ơn các bạn.",
    "Xe tôi bị hỏng lốp, hôm đó tôi không dùng app nhưng vô tình gặp các bạn trên đường, rất ư may mắn. cửa hàng các bạn làm việc rất chuyên nhiệp. Cám ơn cửa hàng. ",
    "Cám ơn cửa hàng rất nhiều. Các bạn rất lễ phép với khách hàng. Chi phí dịch vụ cũng rất hợp lý.",
    "Nhờ có ứng dụng này mà chúng tôi thường không phải sợ khi đi xa. Riêng về cửa hàng này thì rất tuyệt vời. Tuần trước tôi có đi lên Châu Đốc du lịch cùng gia đình thì lúc về xe bị thủng lốp. Rất may có ứng dụng, và sự giúp đỡ của cửa hàng. Cám ơn các bạn",
    "Nhân viên phục vụ khách hàng rất nhiệt tình. Sẳn sàng giải đáp mọi thắc mắc, gía cả có hơi đắt một tí, nhưng đổi lại chất lượng dịch vụ là rất tốt. Xin cám ơn các bạn.",
    "Ấn tượng của tôi về các bạn là sự tôn trọng khách hàng. Đường chi chuyển khá xa  nhưng các bạn đã rất nhiệt tình hỗ trợ chúng tôi. Cám ơn với 5 sao",
    "Tôi thích cách hoạt động của các bạn, nó rất tuyệt vời, quy trình rõ ràng, giá cả hợp lý, Tiện cho chúng tôi so sánh gía cả và chất lượng dịch vụ với các cửa hàng khác, Cám ơn các bạn",
    "Giá cả rất hợp lí do tôi có tìm hiểu về đồ phụ tùng. OK các bạn rất tuyệt vời, có thanh toán qua thẻ khi chúng tôi không có tiền mặt. Cám ơn các bạn.",
    "Cửa hàng giá cả hợp lí. Có nhiều lựa chọn cho khách hàng, thái độ nhân viên rất nhiệt tình và tôn trọng khách hàng. Chúc cửa hàng kinh doanh càng ngày càng thuận lời.",
    "Rất tuyệt vời, xe chúng tôi đã được các bạn giúp đỡ rất nhiệt tình. Ok một lần nữa cám ơn và đánh giá cao nhé.",
    "Cửa hàng rất tuyệt vời, nhân viên thái độ rất tốt mặc dù thời tiết hôm đó nắng gắt và các bạn đã làm tròn nhiệm vụ của mình. Cám ơn  các bạn rất nhiều.",
    "các bạn làm việc rất okay. Nhân viên tư vấn vấn đề kỷ thuật rất nhiệt tình cho tôi. để sau này tôi có thể tự sửa những vấn đề nhỏ nhặt. Nói chung là các bạn rât tuyệt vời, thái độ làm việc rất tốt và chuyên nghiệp.",
    "Cửa hàng này phục vụ rất nhiệt tình cho khách hàng. Giá cả rất hợp lí, nhân viên lại vui vẻ rất nhiều. Cám ơn cửa hàng.",
    "Cửa hàng này phục vụ rất nhiệt tình cho khách hàng. Giá cả rất hợp lí, nhân viên lại vui vẻ rất nhiều. Cám ơn cửa hàng.",
    "Nhiệt tình và chuyên nghiệp là những gì tôi muốn nói. cám ơn các bạn vì có mặt đúng lúc khi chúng tôi gặp khó khăn.",
]
let interval;
const ServiceComment = () => {
    const [comment, setComment] = React.useState("");
    const [error, setError] = React.useState(null);
    const [success, setSuccess] = React.useState(null);
    const [customers, setCustomers] = React.useState([]);
    const [services, setServices] = React.useState([]);
    const [serviceSelected, setServiceSelected] = React.useState(null);
    const [customerSelected, setCustomerSelected] = React.useState(null);

    const randomComments = () => {
        setComment(commentSampe[Math.floor(Math.random() * Math.floor(commentSampe.length-1))])
    }
    const setUpInterval = () => {
        interval = setInterval(()=>{
            randomComments();
        },1000)
    }

    React.useEffect(()=>{
        getUsers();
        getServices();
    },[])

    const getUsers = () => {
        axios.get("http://34.72.53.26:8080/api/data/users")
        .then(({data})=>{
            setCustomers(data);
        })
    }
    const getServices = () => {
        axios.get("http://34.72.53.26:8080/api/data/services")
        .then(({data})=>{
            setServices(data);
        })
    }

    const sleep = (times) => (
        new Promise(resolve => setTimeout(resolve,times))
    )

    const runningData = async () => {
        for (let customer of customers) {
            setCustomerSelected({...customer})
            let {data} = await axios.post("http://34.72.53.26:8080/api/user/login",{
                email:customer.email,password:"123456789"
            })
            let token = data.user_token;
            for (let service of services) {
                setServiceSelected({...service});
                const commentrandom = commentSampe[Math.floor(Math.random() * Math.floor(commentSampe.length-1))];
                let rating = Math.floor(Math.random() * Math.floor(3)) + 2;
                setComment(commentrandom);
                try {
                    const resp = await axios.post("http://34.72.53.26:8080/api/service/rating",{
                        service_id: service._id,
                        content:commentrandom,
                        rating
                    },{
                        headers: {
                            "authorization":`Bearer ${token}`
                        }
                    });
                    setError(null);
                    setSuccess("Đăng thành công - "+service.name)
                } catch(er) {
                    setError("Thất bại")
                }

                await sleep(2000)
            }
            
        }
    }
    return (
        <Grid container spacing={2}>
            <Grid item md={3}>
                <div style={{height: "800px", overflow:"scroll"}}> 
                <List component="nav" aria-label="main mailbox folders">
                    {
                        customers.map(e=>(
                            <ListItem key={e._id} onClick={()=>setCustomerSelected({...e})} 
                                style={{
                                    backgroundColor:(customerSelected && customerSelected._id===e._id) ? "green" : "#ddd", 
                                    margin:"4px"
                                }} button
                            >
                            
                                <ListItemText 
                                    style={{
                                        padding:"4px",
                                        color:( customerSelected && customerSelected._id===e._id) ? "#fff" : "black", 
                                    }} 
                                    primary={e.name} 
                                />
                            </ListItem>
                        ))
                    }
                </List>
                </div>
            </Grid>
            <Grid item md={3}>
                <div style={{height: "800px", overflow:"scroll"}}> 
                    <List component="nav" aria-label="main mailbox folders">
                        {
                            services.map(e=>(
                                <ListItem 
                                key={e._id}
                                    onClick={()=>setServiceSelected({...e})} 
                                    style={{
                                        backgroundColor:(serviceSelected && serviceSelected._id===e._id) ? "green" : "#ddd", 
                                        margin:"4px",

                                    }} 
                                    button
                                >
                                    <ListItemText 
                                        style={{
                                            padding:"4px",
                                            color:(serviceSelected && serviceSelected._id===e._id) ? "#fff" : "black", 
                                        }} 
                                        primary={e.name} 

                                    />
                                </ListItem>
                            ))
                        }
                    </List>
                </div>
            </Grid>
            <Grid item xs={6}>
                <h4>THÔNG TIN KHÁCH HÀNG</h4>
                <div>Tên: {customerSelected && customerSelected.name}</div>
                <h4>THÔNG TIN DỊCH VỤ</h4>
                <div>Tên: {serviceSelected && serviceSelected.name}</div>
                <div style={{marginTop:"8px"}}>Giá: <b style={{color:"red"}}>{serviceSelected && serviceSelected.price}</b></div>
                <h4>THÔNG TIN BÌNH LOẠN</h4>
                <div style={{height:"300px"}}>
                    {comment}
                </div>
                <div>
                    {error && error}
                </div>
                <div>
                    {success && success}
                </div>
                <Button variant="contained" style={{marginRight:"8px"}}>HỦY</Button>
                <Button onClick={runningData} variant="contained" color="primary">KÍCH HOẠT</Button>
            </Grid>
        </Grid>
    )   
}
export default ServiceComment;

// axios.post("/api/service/rating",{
//     service_id,
//     content:comment,
//     rating
//   })
//   .then(()=>{
//     alert("Cám ơn bạn đã đóng góp ý kiến");
//     navigation.goBack();
//   })
//   .catch(err=>console.log(err));