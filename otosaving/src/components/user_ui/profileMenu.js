import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { server } from '../../constant';
import Icon from '@material-ui/core/Icon';
import {socket} from '../../views/users_ui/index';
import Badge from '@material-ui/core/Badge';
import EmailIcon from '@material-ui/icons/Email';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import axios from '../../service/axios_user';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import {useSelector, useDispatch} from 'react-redux';
import { withStyles } from '@material-ui/core/styles';

function SimpleMenu(props) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [anchorEl_2, setAnchorEl_2] = React.useState(null);
    const [redirect, setRedirect] = React.useState(null);
    const message_list = useSelector(state => state.message_list)
    const dispatch = useDispatch()
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClick_2 = (event) => {
      setAnchorEl_2(event.currentTarget);
    };
    const setRedirectCustom = (link) => {
      setRedirect(link);
      handleClose();
    }
    const handleClose = () => {
      setAnchorEl(null);
    };
    const handleClose_2 = () => {
      setAnchorEl_2(null);
    };
  
    const openChat = (store_id, message_id) => {
      dispatch({type:"SET_CHAT_TOGGLE", state:true})
      loadMessages(store_id);
      socket.emit("read_message",{message_id, is_store:false})
      handleClose_2();
    }
  
    const loadMessages = (store_id) => {
      axios().get(`/api/messages/customer_to/${store_id}`)
      .then(({data})=> {
        dispatch({type:"UPDATE_MESSAGES", messages:data})
      })
      .catch(err=>console.log(err));
    }
    if(redirect) return <Redirect push to={`/customer/${redirect}`} />
    return (
      <div>
        <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
          <Avatar size={{height:"100px", width:"100px"}} src={server + "images/" + localStorage.getItem('user_avt')} />
          {localStorage.getItem('user_name')}
        </Button>
        <Menu
          id="simple-menu"  
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={()=> setRedirectCustom('info')}><Icon>people</Icon><p className="ml-2">Thông tin</p></MenuItem>
          <MenuItem onClick={()=> setRedirectCustom('history')}><Icon>history</Icon><p className="ml-2">Lịch sử cứu hộ</p></MenuItem>
          <MenuItem style={{borderBottom:"1px solid #e0e0e0"}} onClick={()=> setRedirectCustom('bill')}>
            <Icon>payment</Icon> <p className="ml-2">Hóa đơn thanh toán</p>
          </MenuItem>
          <MenuItem onClick={props.logout}><Icon>exit_to_app</Icon>  <p className="ml-2">Đăng xuất</p></MenuItem>
        </Menu>
  
        <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick_2}>
          <StyledBadge badgeContent={(message_list.unread!==null) ? message_list.unread : ""} color="secondary">
            <EmailIcon />
          </StyledBadge>
        </Button>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl_2}
          keepMounted
          open={Boolean(anchorEl_2)}
          onClose={handleClose_2}
          style={{minWidth:"400px"}}
        >
          {message_list.messages.map(message=>(
            <MenuItem 
              key={message._id}
              onClick={()=>openChat(message.store_id._id, message._id)}
            >
              <div style={{display:"flex"}}>
                <Avatar src={`${server}/images/${message.store_id.image}`} />
                <div style={{width:"300px", marginLeft:"8px"}}>
                  <Typography>{message.store_id.name}</Typography>
                  <Typography variant="body2" style={{fontWeight: !message.is_read ? "bold" : "200"}}>
                    {message.body}
                  </Typography>  
                </div>
              </div>
            </MenuItem>
          ))}
        </Menu>
      </div>
    );
  }

  const StyledBadge = withStyles((theme) => ({
    badge: {
      right: -3,
      top: 13,
      border: `2px solid ${theme.palette.background.paper}`,
      padding: '0 4px',
    },
  }))(Badge);

  export default SimpleMenu