import React from "react";
import { Grid, Typography, Button } from "@material-ui/core";
import CKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { server } from "../../constant";
import axios from "../../service/axios_sys";
import SaveIcon from '@material-ui/icons/Save';
import CancelIcon from '@material-ui/icons/Cancel';
import TextField from '@material-ui/core/TextField';
export default function (props) {
  const [detail, setDetail] = React.useState("");
  const [name,setName] = React.useState("");
  const [id, setId] = React.useState("");
  React.useEffect(() => {
    loadAbout();
  }, []);

  const loadAbout = () => {
    axios()
      .get("/api/sys/about")
      .then((resp) => {
        setName(resp.data.name);
        setId(resp.data._id);
        setDetail(resp.data.about);
      })
      .catch((err) => console.log(err));
  };

  const postAbout = () => {
    axios().post("/api/sys/about",{
      id:id,
      name:name,
      about: detail
    })
    .then(()=> {
      alert("ok")
    })
    .catch(err=>console.log(err));
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={12} md={12} style={{ marginBottom: "8px" }}>
        <Typography variant="h5">GIỚI THIỆU CỬA HÀNG</Typography>
      </Grid>
      <Grid item xs={12} sm={12} md={12}>
        <TextField value={name} onChange={e=>setName(e.target.value)}  label="Tên bài viết" variant="outlined" fullWidth />
        <Typography variant="h6" style={{marginTop:"4px"}}>
          Chi tiết
        </Typography>
        <CKEditor
          style={{ backgroundColor: "#ddd" }}
          editor={ClassicEditor}
          data={detail}
          onChange={(event, editor) => {
            const data = editor.getData();
            setDetail(data);
          }}
          config={{
            ckfinder: {
              uploadUrl: `${server}uploads`,
            },
          }}
        />
        <div style={{ textAlign: "right", marginTop: "4px" }}>
          <Button style={{marginRight:"4px"}} variant="contained">
            <CancelIcon />{" "}
            HỦY
          </Button>
          <Button variant="contained" color="primary" onClick={postAbout}>
            <SaveIcon />{" "}
            LƯU
          </Button>
        </div>
      </Grid>
    </Grid>
  );
}
