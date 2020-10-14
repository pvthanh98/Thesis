import React, {useEffect} from 'react';
import axios from '../../service/axios';
import Navbar from '../../components/user_ui/navbar';
import Footer from '../../components/user_ui/footer';
import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import {Link} from 'react-router-dom';
import {Container, Row, Col, Form, FormGroup,Label, Input} from 'reactstrap';
import { Badge, Alert } from 'reactstrap';
import Media from '../../components/user_ui/media_service';
import Rating from '../../components/user_ui/rating';
import ReactStars from "react-rating-stars-component";
import Button from "@material-ui/core/Button";
import PhoneIcon from '@material-ui/icons/AddIcCall';
import MessageIcon from '@material-ui/icons/Message';
import ContactsIcon from '@material-ui/icons/Contacts';

export default (props) => {    
    const [name,setName] = React.useState("");
    const [description, setDescription] = React.useState("");
    const [detail, setDetail] = React.useState("");
    const [image, setImage] = React.useState("");
    const [price,setPrice] = React.useState(-1);
    const [quantity, setQuantity] = React.useState(-1);
    const [timestamp, setTimestamp] = React.useState("");
    const [rating, setRating] = React.useState({});
    const [store, setStore] = React.useState({});
    const [relatedService, setRelatedService] = React.useState([]);
    const [isRating, setIsRating ] = React.useState(false);
    const [category, setCategory] = React.useState("");
    useEffect (()=>{
        loadService();
    },[props.match.params.id]);

    const loadRelatedService = async (category_id) => {
        try {
            const { data } = await axios().get(`/api/service/category/${category_id}`);
            if(data) setRelatedService(data);
            else throw new Error("Cannot fetch data from server")
            console.log(data)
        } catch(err) { alert(err) };
    }

    const loadService = async () => { 
        try {
            const { data } = await axios().get(`/api/service/id/${props.match.params.id}`);
            setName(data.name)
            setDescription(data.description)
            setDetail(data.detail)
            setImage(data.image)
            setPrice(data.price)
            setQuantity(data.quantity)
            setRating(data.rating)
            setStore(data.store_id)
            setTimestamp(data.timestamp);
            setCategory(data.category)
            loadRelatedService(data.category._id);
        } catch(err){
            console.log(err);
        }
    }

    const renderRelatedService = () => {
        return relatedService && relatedService.map(service => 
            <Media
                key={service._id}
                id={service._id}
                name={service.name}
                price={service.price}
                store_name={service.store_id.name}
                description={service.description}
                image={service.image}
                imageSize={"60px"}
            />
        )
    }

    const ratingChanged = (newRating) => {
        console.log(newRating);
        alert("Đánh giá của bạn đã được gửi đi. Xin cám ơn")
        setIsRating(false);
    };
    return (
        <div>
            <Navbar />
                <Container>
                    <Row>
                        <Col md="12">
                            <Breadcrumbs aria-label="breadcrumb" className="mt-3 mb-3">
                                <Link to="/" >
                                    Home
                                </Link>
                                <Link to="/service">
                                    Service
                                </Link>
                                <Typography color="textPrimary">{"Thay nhớt"}</Typography>
                            </Breadcrumbs>
                        </Col>
                    </Row>
                    <Row>
                        <Col md="8">
                            <div className="service_title">
                                <h3>{name}</h3>
                                <span>
                                <img src={"http://localhost:8080/images/"+store.image} height="20px" /> 
                                    {" "}
                                    <Badge color="primary">
                                        {store.name}
                                    </Badge> 
                                    {" "} |{" "}
                                    <Badge color="danger">
                                        {timestamp}
                                    </Badge> 
                                </span>
                            </div>
                            <div className="info_detail mt-3" style={{fontStyle:"italic"}}>
                                Giá tham khảo: <b style={{color:"red"}}>{price}</b> VND
                            </div>
                            <div className="store-toolbar">
                                <Button variant="contained" color="primary">
                                    <ContactsIcon />
                                    Khám phá cửa hàng
                                </Button>
                                <Button variant="contained" className="ml-2">
                                    <MessageIcon />
                                    Nhắn tin
                                </Button>
                                <Button variant="contained" className="ml-2">
                                    <PhoneIcon />
                                    Gọi
                                </Button>
                            </div>
                            <div 
                                className="service_detail mt-3 text-justify"
                                dangerouslySetInnerHTML={{__html:detail}}
                            />
                            <div className="rating mt-2">
                                Đánh giá:                               
                                {!isRating ?
                                    <div className="mt-2">
                                        <Rating star={rating.total} />
                                        <Button 
                                            color="primary" 
                                            className="mt-4"
                                            onClick={()=>setIsRating(true)}
                                       >
                                            Gửi đánh giá của bạn
                                        </Button>
                                    </div>
                                :
                                <ReactStars
                                    count={5}
                                    onChange={ratingChanged}
                                    size={24}
                                    activeColor="#ffd700"
                                />
                                }
                                
                                
                            </div>
                            <div className="comment-container mt-5">
                                <h4>Bình Luận</h4>
                                <Form>
                                    <FormGroup>
                                        <Input type="textarea" name="text" />
                                    </FormGroup>
                                </Form>
                            </div>
                            
                        </Col>
                        <Col md="4">
                            <h3 className="mb-4">{"Dịch vụ liên quan"}</h3>
                            {renderRelatedService()}
                        </Col>
                    </Row>
                </Container>
            <Footer />
        </div>
    )
}
