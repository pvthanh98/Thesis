import React, { useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import Loading from '../../components/user_ui/loading';
export default function (props) {
    const { open, setOpen } = props;
    const handleChange = (e) => {
        props.setValue(e.target.value);
    }
    const options = () => (props.city.map(e => (
        <option key={e._id} value={e._id}>{e.name}</option>
    )))

    const submit = () => {
        if(props.value!==""){
            props.setOpen(props.value);
        } else {
            alert("Bạn phải chọn thành phố bạn đang ở")
        }
    }

    return (
        <div>
            <Dialog
                open={open}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Bạn đang ở thành phố nào?"}</DialogTitle>
                <DialogContent>
                    {
                        (props.city.length <= 0)
                            ? <Loading />
                            :
                            <Select
                                native
                                value={props.value}
                                onChange={handleChange}
                                style={{ padding: "4px" }}
                                fullWidth
                            >
                                <option value={""}>{"Chọn thành phố..."}</option>
                                {options()}
                            </Select>
                    }
                </DialogContent>
                <DialogActions>
                    <Button onClick={submit} color="primary" autoFocus>
                        Đồng ý
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}