import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { server } from '../../constant';
import Icon from '@material-ui/core/Icon';
import { connect} from 'react-redux';
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
    localStorage.removeItem('user_id')
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
          <div className="user-info-bar" onClick={toggleInfo}>
            <img
              src={server + "images/" + localStorage.getItem('user_avt')}
              width="30px"
              style={{ borderRadius: "50%" }}
            />
            {localStorage.getItem('user_name')}
            {
              isOpenToggleInfo &&
              <ul className="user-info-dropdown">
                <li><Icon color="primary">people</Icon> Thông tin</li>
                <li><Icon color="primary">history</Icon> Lịch sử cứu hộ</li>
                <li><Icon color="primary">payment</Icon> Hóa đơn thanh toán</li>
                <li onClick={logout}><Icon color="primary">exit_to_app</Icon> Đăng xuất</li>
              </ul>
            }

          </div>
        }
      </Collapse>
    </Navbar>
  );
}

export default connect((state)=>({
    categories: state.categories
}),null)(MyNavbar);