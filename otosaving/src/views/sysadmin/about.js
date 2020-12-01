import React from "react";
import { Grid, Typography } from "@material-ui/core";
import CKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import {server} from '../../constant';
export default function (props) {
  const [detail, setDetail] = React.useState("");
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={12} md={12} style={{ marginBottom: "8px" }}>
        <Typography variant="h5">GIỚI THIỆU CỬA HÀNG</Typography>
      </Grid>
      <Grid item xs={12} sm={12} md={12}>
        <CKEditor
          style={{backgroundColor:"#ddd"}}
          editor={ClassicEditor}
          data={detail}
          onChange={(event, editor) => {
            const data = editor.getData();
            setDetail(data);
          }}
          config={{
            ckfinder: {
                uploadUrl: `${server}uploads`
            }
          }}
        />
      </Grid>
    </Grid>
  );
}
