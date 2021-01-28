import React, { useEffect } from 'react';
import axios from '../../service/axios_user';
import Navbar from '../../components/user_ui/navbar';
import Footer from '../../components/user_ui/footer';
import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import { Link, Redirect } from 'react-router-dom';
import { Container, Row, Col, Form, FormGroup, Label, Input } from 'reactstrap';
import { Badge, Alert } from 'reactstrap';
import Media from '../../components/user_ui/media_service';
import Rating from 'material-ui-rating';
import ReactStars from "react-rating-stars-component";
import Button from "@material-ui/core/Button";
import PhoneIcon from '@material-ui/icons/AddIcCall';
import MessageIcon from '@material-ui/icons/Message';
import ContactsIcon from '@material-ui/icons/Contacts';
import { server } from '../../constant';
import Box from "@material-ui/core/Box";
import {Grid} from '@material-ui/core';
import Comment from '../../components/user_ui/comment';
import Chat from '../../components/user_ui/chat/container';
import {connect} from 'react-redux';
const labels = ["", "Poor", "Ok", "Good", "Good+", "Excellent"];
function ServiceDetail (props) {
    const [name, setName] = React.useState("");
    const [description, setDescription] = React.useState("");
    const [detail, setDetail] = React.useState("");
    const [image, setImage] = React.useState("");
    const [price, setPrice] = React.useState(-1);
    const [quantity, setQuantity] = React.useState(-1);
    const [timestamp, setTimestamp] = React.useState("");
    const [rating, setRating] = React.useState({});
    const [store, setStore] = React.useState({});
    const [relatedService, setRelatedService] = React.useState([]);
    const [isRating, setIsRating] = React.useState(false);
    const [category, setCategory] = React.useState("");
    const [commentContent, setCommentContent] = React.useState("");
    const [ratingValue, setRatingValue] = React.useState(2);
    const [comments , setComments] = React.useState(null);
    const [redirectLink, setRedirectLink] = React.useState(null);
    useEffect(() => {
        loadService();
        loadComments()
    }, [props.match.params.id]);

    const loadRelatedService = async (category_id) => {
        try {
            const { data } = await axios().get(`/api/service/category/${category_id}`);
            if (data) setRelatedService(data);
            else throw new Error("Cannot fetch data from server")
        } catch (err) { alert(err) };
    }
    const loadComments = () => {
        axios().get(`/api/service/rating/service_id/${props.match.params.id}`)
        .then(({data})=> {
            setComments(data);
            console.log(data);
        })
        .catch(ee=>console.log(ee))
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
        } catch (err) {
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
    const onSubmitRating = () => {
		if(commentContent!="") {
			let data = {
				content: commentContent,
				rating: ratingValue,    
				service_id: props.match.params.id
			}
			axios().post("/api/service/rating",data)
			.then(()=>alert("Đánh giá của bạn đã được gửi đi"))
			.catch(err=>alert(err))
			setCommentContent("");
		}
    }
    const renderComments = () => (
        comments && comments.map(e=> <Comment key={e._id} {...e} />)
    )
    if(redirectLink) return <Redirect push to={`/store/id/${store._id}`} />
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
                                <img src={server + "/images/" + store.image} height="20px" />
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
                        <div className="mt-2">
                            <Rating value={rating.total} />
                        </div>
                        <div className="info_detail mt-3" style={{ fontStyle: "italic" }}>
                            Giá tham khảo:  $ <b style={{ color: "red" }}>{price}</b>
                        </div>
                        <div className="store-toolbar">
                            <Button variant="contained" color="primary" onClick={()=>setRedirectLink(true)}>
                                <ContactsIcon />
                                    Khám phá cửa hàng
                                </Button>
                            <Button variant="contained" className="ml-2">
                                <MessageIcon />
                                    Nhắn tin
                                </Button>
                        </div>
                        <div
                            className="service_detail mt-3 text-justify"
                            dangerouslySetInnerHTML={{ __html: detail }}
                        />
                        <div className="rating mt-2">
                        </div>
                        <div className="comment-container mt-5">
                            <h4>Bình Luận</h4>
                            <Input type="textarea" onChange={e=>setCommentContent(e.target.value)} value={commentContent} name="text" />
                        </div>
                        <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                            <Rating
                                name="hover-feedback"
                                value={ratingValue}
                                size="large"
                                onChange={(newValue) => {
                                    setRatingValue(newValue);
                                }}
                            />
                            {ratingValue !== null && <Box ml={2}>{labels[ratingValue]}</Box>}
                        </div>
                        <Button
                            variant="contained"
                            color="secondary"
                            onClick={onSubmitRating}
                        >
                            Gửi đánh giá của bạn
                        </Button>
                        <Grid container className="mt-3">
                            {renderComments()}
                        </Grid>
                    </Col>
                    <Col md="4">
                        <h3 className="mb-4">{"Dịch vụ liên quan"}</h3>
                        {renderRelatedService()}
                    </Col>
                    {props.chat_toggle && <Chat where="customer" />}
                </Row>
            </Container>
            <Footer />
        </div>
    )
}

const mapProp = state => ({
    stores: state.stores,
    chat_toggle: state.chat_toggle
})

const mapDispatch = dispatch => ({
    updateStore: (stores) => {
        dispatch({
            type:"GET_STORES",
            stores
        })
    },
    updateMessages : (messages) => {
      dispatch({type:"UPDATE_MESSAGES", messages})
    }
})

export default connect(mapProp, mapDispatch)(ServiceDetail);