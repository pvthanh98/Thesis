import React from 'react';
import {Grid, TextField, Button} from '@material-ui/core';
import Select from '@material-ui/core/Select';
import axios from 'axios';
import MenuItem from '@material-ui/core/MenuItem';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import LinearProgress from '@material-ui/core/LinearProgress';
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
function App() {
  const [token,setToken] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [customerID, setCustomerID] = React.useState(null);
  const [name, setName] = React.useState("");
  const [rating, setRating] = React.useState(1);
  const [comment, setComment] = React.useState("");
  const [stores, setStores] = React.useState([]);
  const [selectedStore, setSelectedStore] = React.useState(null);
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [cmtIndex, setCmtIndex] = React.useState(0);
  const [commentsByUser, setCommentByUser] = React.useState([]);
  const [commentLoading, setCommentLoading] = React.useState(false);
  const login = () => {
    setLoading(true);
    axios.post("http://34.72.53.26:8080/api/user/login",{
      email,password
    })
    .then(res=>{
      setLoading(false)
      setName(res.data.name);
      setToken(res.data.user_token);
      setCustomerID(res.data.id);
    })
    .catch(err=>{
      console.log(err)
      setLoading(false)
    })

  }

  React.useEffect(()=>{
    loadStore()
  },[])

  React.useEffect(()=>{
    if(customerID){
      console.log("loading coments");
      loadComments(customerID)
    }
  },[customerID]);

  const loadComments = (customer_id)=> {
    setCommentLoading(true);
    axios.get("http://34.72.53.26:8080/api/data/comment_by/"+customer_id,{
      email,password
    })
    .then(res=>{
      setCommentByUser(res.data.reverse());
      setCommentLoading(false);
    })
    .catch(err=>{
      console.log(err)
      setLoading(false);
      setCommentLoading(false);
    })
  } 

  const getIndex = (max) => {
    setCmtIndex(Math.floor(Math.random() * Math.floor(max)));
  }
  const randomRatingValue = (max=3) => { // bo so 0
    let value = Math.floor(Math.random() * Math.floor(max));
    value += 3;
    setRating(value)
  }

  const loadStore = () => {
    setLoading(true);
    axios.get("http://34.72.53.26:8080/api/data/store_id")
    .then(res=>{
      setStores(res.data);
      setLoading(false)
    })
    .catch(err=>{
      console.log(err);
      setLoading(false)
    })
    
  }

  const handleChange = (e) => {
    setRating(e.target.value)
  }

  const submit = () =>{
      setLoading(true)
			let data = {
				content: commentSampe[cmtIndex],
				rating: rating,
				store_id: selectedStore._id
			}
      axios.post("http://34.72.53.26:8080/api/rating",data,{
        headers: {
          "authorization":`Bearer ${token}`
        }
      })
      .then(res=>{
        setIsSuccess(true);
        setLoading(false);
        loadComments(customerID)
        const timeout = setTimeout(()=>{
          setIsSuccess(false);
          clearTimeout(timeout);
        }, 2000)
      })
      .catch(err=>{
        alert("Thêm không thành công");
        setIsSuccess(false);
        setLoading(false)
      })
  }

  return (
    <div className="App">
       {loading && <LinearProgress color="secondary" />}
      <Grid container>
          <Grid item md={3}>
            <div style={{height:"900px", overflow:"scroll"}}>
              <h3>Danh sách cửa hàng</h3>
              <List component="nav" aria-label="main mailbox folders">
                {stores.map(e=>{
                  return (
                    <ListItem style={{backgroundColor:(selectedStore && selectedStore._id === e._id)? "green":"#ddd", marginTop:"4px"}}  key={e._id} button onClick={()=>setSelectedStore({...e})}>
                      <ListItemText style={{color:(selectedStore && selectedStore._id === e._id)? "white":"black"}} primary={e.name} secondary={e.address} />
                    </ListItem>
                  )
                })}
              </List>
            </div>
          </Grid>
          <Grid item xs={6} style={{display:"flex"}}>
            <div style={{display:"flex",flexDirection:"column", alignItems:"flex-start", marginTop:"8px", marginLeft:"16px"}}>
               <div>
                  <TextField value={email} onChange={e=>setEmail(e.target.value)} label="Email" />
                  <TextField value={password} onChange={e=>setPassword(e.target.value)} style={{marginLeft:"8px"}} label="Password" />
                  <Button variant="contained" color="primary" onClick={login}>Đăng nhập</Button>
               </div>
               <div style={{marginTop:"8px"}}>
                 <h3>Thông tin khách hàng</h3>
                  Tên: {name && name}
               </div>
               <div style={{marginTop:"8px"}}>
                 <h3>Thông tin cửa hàng</h3>
                  Tên: {selectedStore && selectedStore.name}
               </div>
                <div style={{marginTop:"8px"}}>
                <h3>Đánh Giá</h3>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={rating}
                  onChange={handleChange}
                  style={{width:"100px"}}
                >
                  <MenuItem value={1}>1</MenuItem>
                  <MenuItem value={2}>2</MenuItem>
                  <MenuItem value={3}>3</MenuItem>
                  <MenuItem value={4}>4</MenuItem>
                  <MenuItem value={5}>5</MenuItem>
                </Select>
                {rating}
               </div>
               <div style={{marginTop:"8px",height:"200px"}}>
               <h3>Nội dung</h3>
                <TextField
                  id="standard-multiline-flexible"
                  label="Multiline"
                  multiline
                  rowsMax={10}
                  value={commentSampe[cmtIndex]}
                  style={{width:"600px"}}
                  onChange={e=>setComment(e.target.value)}
                />
               </div>
               <div style={{marginTop:"8px"}}>
               <Button onClick={()=>randomRatingValue()} variant="contained">Đánh giá ngẫu nhiên</Button>
                  <Button style={{marginLeft:"8px"}} color="secondary"  onClick={()=>getIndex(commentSampe.length - 1)} variant="contained">Bình luận ngẫu nhiên</Button>
                  <Button style={{marginLeft:"8px"}} variant="contained" color="primary" onClick={submit}>POST</Button>
                  {isSuccess && <img style={{marginLeft:"8px"}} src="/check.svg" height="40px"/>}
               </div>
            </div>
          </Grid>
          <Grid item md={3}>
            <div style={{height:"900px", overflow:"scroll"}}>
              <h3>Danh sách COMMENT</h3>
              {commentLoading && "loading..."}
              <List component="nav" aria-label="main mailbox folders">
                {commentsByUser.map(e=>{
                  return (
                    <ListItem >
                      <ListItemText primary={e.content} secondary={e.store_id.name} />
                    </ListItem>
                  )
                })}
              </List>
            </div>
          </Grid>
      </Grid>
    </div>
  );
}

export default App;
