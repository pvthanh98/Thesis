import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import DeleteIcon from "@material-ui/icons/Delete";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import { IconButton, CircularProgress } from "@material-ui/core";
import { Badge } from "reactstrap";
import { server } from "../../constant";
import formatDate from "../../service/formatDate";
import Rating from "material-ui-rating";
import LinkIcon from "@material-ui/icons/Link";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    height: window.innerHeight - 120,
    overflow: "auto",
  },
  inline: {
    display: "inline",
  },
}));

export default function AlignItemsList(props) {
  const classes = useStyles();
  const { reports } = props;
  return (
    <List className={classes.root}>
      {props.isCommentLoading && (
        <div style={{ textAlign: "center", marginTop: "4px" }}>
          <CircularProgress size={24} />
        </div>
      )}
      {reports &&
        reports.map((e) => (
          <ListItem key={e._id} alignItems="flex-start">
            <ListItemAvatar>
              <Avatar
                alt={e.customer_id.name}
                src={`${server}/images/${e.customer_id.image}`}
              />
            </ListItemAvatar>
            <ListItemText
              primary={
                <React.Fragment>
                  {e.customer_id.name}
                  <ArrowForwardIcon />
                  <Badge color="danger">{e.store_id.name}</Badge>
                </React.Fragment>
              }
              secondary={
                <React.Fragment>
                  <div
                    style={{
                      backgroundColor: "#ffffffbd",
                      padding: "8px",
                      borderRadius: "12px",
                      border: "2px solid white",
                      fontWeight: "bold",
                    }}
                  >
                    <div style={{ textAlign: "left" }}>
                      <Badge color="danger">{formatDate(e.timestamp)}</Badge>
                    </div>
                    {e.content}
                  </div>
                </React.Fragment>
              }
            />
            <ListItemIcon>
              <IconButton onClick={() => props.deleteComment(e._id)}>
                <DeleteIcon style={{ color: "#de4e46" }} />
              </IconButton>
            </ListItemIcon>
          </ListItem>
        ))}
    </List>
  );
}
