import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { server } from '../../constant';
import Icon from '@material-ui/core/Icon';
import { connect} from 'react-redux';
import {socket} from '../../views/users_ui/index';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText
} from 'reactstrap';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

function SimpleMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
        <img
          src={server + "images/" + localStorage.getItem('user_avt')}
          width="30px"
          style={{ borderRadius: "50%" }}
        />
        {localStorage.getItem('user_name')}
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}><Icon>people</Icon><p className="ml-2">Thông tin</p></MenuItem>
        <MenuItem onClick={handleClose}><Icon>history</Icon><p className="ml-2">Lịch sử cứu hộ</p></MenuItem>
        <MenuItem style={{borderBottom:"1px solid #e0e0e0"}} onClick={handleClose}><Icon>payment</Icon> <p className="ml-2">Hóa đơn thanh toán </p></MenuItem>
        <MenuItem onClick={handleClose}><Icon>exit_to_app</Icon>  <p className="ml-2">Đăng xuất</p></MenuItem>
      </Menu>
    </div>
  );
}
function MyNavbar (props) {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const [isOpenToggleInfo, setIsOpenToggleInfo] = useState(false);
  const toggleInfo = () => setIsOpenToggleInfo(!isOpenToggleInfo);

  const renderMenuCategories = () =>{
    return props.categories && props.categories.map(cat=>{
      return <DropdownItem>
      <Link to={"/service/type/"+cat.name} className="custom-link nav-link">{cat.name}</Link>
    </DropdownItem> 
    })
  }

  const logout = () => {
    localStorage.removeItem('user_token');
    localStorage.removeItem('user_avt');
    localStorage.removeItem('user_name');
    localStorage.removeItem('user_id');
    socket.disconnect(true);
  }

  return (
    <Navbar className="mynav" light expand="md">
      <Link to="/">
        <img src="/images/logo.png" height={"60px"} />
      </Link>
      <NavbarToggler onClick={toggle} />
      <Collapse isOpen={isOpen} navbar>
        <Nav className="mr-auto" navbar>
        <UncontrolledDropdown nav inNavbar>
            <DropdownToggle nav caret>
              Dịch vụ
              </DropdownToggle>
            <DropdownMenu right>
            {renderMenuCategories()}
            </DropdownMenu>
          </UncontrolledDropdown>
          <NavItem>
            <Link className="custom-link nav-link" to="/cuuho">Cứu hộ</Link>
          </NavItem>
          <NavItem>
            <Link className="custom-link nav-link" to="/service">Cửa hàng</Link>
          </NavItem>
          <UncontrolledDropdown nav inNavbar>
            <DropdownToggle nav caret>
              Đăng Ký
              </DropdownToggle>
            <DropdownMenu right>
              <DropdownItem>
                <Link to="/store/register" className="custom-link nav-link">Đăng ký cửa hàng</Link>
              </DropdownItem>
              <DropdownItem>
                <Link to="/user/register" className="custom-link nav-link" >Đăng ký tài khoảng cứu hộ</Link>
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </Nav>
        <div className="search-custom">
          <img src="/images/searching.svg" height="25px" />
          <input
            type="text"
            style={{ marginRight: "12px" }}
            placeholder="Search..."
          />
        </div>
        {!localStorage.getItem("user_token") ? <NavbarText>
          <Link to="/login">Đăng nhập</Link>
        </NavbarText>

          :
        <div>
          <SimpleMenu />
        </div>
          // <div className="user-info-bar" onClick={toggleInfo}>
          //   <img
          //     src={server + "images/" + localStorage.getItem('user_avt')}
          //     width="30px"
          //     style={{ borderRadius: "50%" }}
          //   />
          //   {localStorage.getItem('user_name')}
          //   {
          //     isOpenToggleInfo &&
          //     <ul className="user-info-dropdown">
          //       <li><Icon>people</Icon> Thông tin</li>
          //       <li><Icon>history</Icon> Lịch sử cứu hộ</li>
          //       <li><Icon>payment</Icon> Hóa đơn thanh toán</li>
          //       <li onClick={logout}><Icon>exit_to_app</Icon> Đăng xuất</li>
          //     </ul>
          //   }

          // </div>
        }
      </Collapse>
    </Navbar>
  );
}

export default connect((state)=>({
    categories: state.categories
}),null)(MyNavbar);