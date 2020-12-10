import React from "react";
import {
  Grid,
  Typography,
  Button,
  makeStyles,
  CircularProgress,
} from "@material-ui/core";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import AssignmentIndIcon from "@material-ui/icons/AssignmentInd";
import axios from "../../service/axios_sys";
import ListComment from "../../components/systemadmin/listcomment";
import { Badge } from "reactstrap";
import Pagination from "@material-ui/lab/Pagination";
import {Redirect} from 'react-router-dom';
import { red } from "@material-ui/core/colors";
const useStyle = makeStyles({
  card: {
    backgroundColor: "#ffffff5c",
    padding: "8px",
  },
  listItem: {
    paddingBottom: "16px",
    paddingTop: "16px",
  },
  listItemActive: {
    border: "2px solid #fff",
    paddingBottom: "16px",
    paddingTop: "16px",
    backgroundColor: "#ffffffbd",
    borderRadius: "12px",
    fontWeight: "bold",
  },
});

export default function (props) {
  const classes = useStyle();
  const [loading, setLoading] = React.useState(false);
  const [stores, setStores] = React.useState(null);
  const [total_page, setTotal_Page] = React.useState(1);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [storeSelected, setStoreSelected] = React.useState(null);
  const [comments, setComments] = React.useState(null);
  const [isCommentLoading, setisCommentLoading] = React.useState(false);
  const [redirect,setRedirect] = React.useState(null);
  React.useEffect(() => {
    loadStores(currentPage);
  }, [currentPage]);
  React.useEffect(() => {
    if (storeSelected) loadComment(storeSelected._id);
  }, [storeSelected]);

  const loadComment = (store_id) => {
    setisCommentLoading(true);
    axios()
      .get(`/api/sys/comment/${store_id}`)
      .then((resp) => {
        setComments(resp.data);
        setisCommentLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setisCommentLoading(false);
      });
  };
  const loadStores = (page, active = 0, rating = 0) => {
    setLoading(true);
    axios()
      .get(`/api/sys/stores/page/${page}/${active}/${rating}`)
      .then(({ data }) => {
        setStores(data.stores);
        setTotal_Page(data.total_page);
        setLoading(false);
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  const handleItemClick = (store) => {
    setStoreSelected(store);
  };

  const deleteComment = (id) => {
    axios()
      .post(`/api/sys/comment/del`, {
        comment_id: id,
      })
      .then(() => {
        loadComment(storeSelected._id);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={12} md={12} style={{ marginBottom: "8px" }}>
        <Typography variant="h5">QUẢN LÍ BÌNH LUẬN</Typography>
      </Grid>
      <Grid item xs={12} sm={12} md={4}>
        <div className={classes.card}>
          <Typography variant="h5">CỦA HÀNG</Typography>
          <Badge color="success">danh sách</Badge>
          {loading && (
            <div style={{ textAlign: "center", marginTop: "4px" }}>
              <CircularProgress size={24} />
            </div>
          )}
          <div>
            <List component="nav" aria-label="main mailbox folders">
              {stores &&
                stores.map((e) => (
                  <ListItem
                    onClick={() => handleItemClick({ ...e })}
                    key={e._id}
                    button
                    className={
                      storeSelected && storeSelected._id === e._id
                        ? classes.listItemActive
                        : classes.listItem
                    }
                  >
                    <ListItemIcon>
                      <AssignmentIndIcon
                        style={{
                          color:
                            storeSelected && storeSelected._id === e._id
                              ? "black"
                              : "black",
                        }}
                      />
                    </ListItemIcon>
                    <ListItemText
                      style={{
                        color:
                          storeSelected && storeSelected._id === e._id
                            ? "black"
                            : "black",
                      }}
                      primary={e.name}
                    />
                  </ListItem>
                ))}
            </List>
            <Pagination page={currentPage} onChange={(e,page)=>{
              setCurrentPage(page);
            }} count={total_page} color="primary" />
          </div>
        </div>
      </Grid>
      <Grid item xs={12} sm={12} md={8}>
        <div className={classes.card}>
          <Typography variant="h5" style={{ marginBottom: "4px" }}>
            BÌNH LUẬN
          </Typography>
          <Badge color="success">danh sách</Badge>
          <ListComment
            isCommentLoading={isCommentLoading}
            comments={comments}
            deleteComment={deleteComment}
            setRedirect={setRedirect}
          />
        </div>
      </Grid>
    </Grid>
  );
}
