import React from 'react';
import { Row, Col } from "reactstrap";
export default function(){
    return (
        <Row className="footer">
          <Col md="4" style={{ textAlign: "center" }}>
          </Col>
          <Col md="4" style={{ textAlign: "center" }}>
            <p>Hệ thống hỗ trợ cứu hộ và sửa chữa xe ô tô</p>
            <p>Address : 3/2 Ninh Kiều, Cần Thơ </p>
            <p> Phone : +84986940591 </p>
            <p>Email : pvthanh98it@gmail.com</p>
          </Col>
          <Col md="4" style={{ textAlign: "center" }}>
          </Col>
        </Row>
    );
}