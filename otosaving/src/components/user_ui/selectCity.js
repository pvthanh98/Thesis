import React, { useEffect } from 'react';
import { Typography, Grid, Button } from '@material-ui/core';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
export default function (props) {
    const [value, setValue] = React.useState(1);
    const handleChange = (e) => {
        setValue(e.target.value);
    }
    const options = () => (props.city.map(e=>(
        <option key={e._id} value={e._id}>{e.name}</option>
    )))

    const submit = () => {
        props.getCitySelected(value);
    }

    useEffect(()=>{
        if(props.city.length > 0) setValue(props.city[0]._id)
    },[props.city])
    
    return (
        <Grid container>
            <Grid item xs={4} sm={4} md={4}></Grid>
            <Grid item xs={4} sm={4} md={4}>
                <Typography style={{ marginTop: 4 }} variant="h5">
                    Bạn đang ở thành phố nào?
                </Typography>
                <Select
                    native
                    value={value}
                    onChange={handleChange}
                    style={{padding: "4px"}} 
                    fullWidth
                >
                    {options()}
                </Select>
                <div style={{textAlign:"right", marginTop:"4px"}}>
                  <Button variant="contained" color="primary" onClick={submit}>Đồng ý</Button>
                </div>
            </Grid>
            <Grid item xs={4} sm={4} md={4}></Grid>
        </Grid>
    )
}