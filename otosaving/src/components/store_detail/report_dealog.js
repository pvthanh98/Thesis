import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { TextField } from "@material-ui/core";
export default function AlertDialog(props) {
  const [content, setContent] = React.useState("");
  return (
    <div>
      <Dialog
        open={props.open}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth
      >
        <DialogTitle id="alert-dialog-title">{"Báo cáo vi phạm"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Hãy cho chúng tôi biết bạn có phàn nàn gì về cửa hàng này?
          </DialogContentText>
          <TextField
            required
            id="outlined-required"
            label="Nội dung"
            variant="outlined"
            placeholder="Gửi yêu cầu đến quản trị hệ thống..."
            multiline
            rows={4}
            rowsMax={6}
            fullWidth
            value={content}
            onChange={e=>setContent(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button color="primary" onClick={()=>props.setOpen(false)}>
            Hủy
          </Button>
          <Button onClick={()=>props.onSubmitReport(content)} color="primary" variant="contained">
            Gửi
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
