import React from "react";
export default function (props) {
  let star = Math.round(props.star);
  let styles = {}
  if(props.quantity) {
    styles.justifyContent= "space-between";
    styles.justifyContent="space-between";
  };
  switch (star) {
    case 0: {
        return (
          <div style={styles}>
            <div style={{textAlign:"center"}}>
              <img src="/images/star.svg" width="20px" />
              <img src="/images/star.svg" width="20px" />
              <img src="/images/star.svg" width="20px" />
              <img src="/images/star.svg" width="20px" />
              <img src="/images/star.svg" width="20px" />
            </div>
            <div>{props.quantity}</div>
          </div>
        );
      }
    case 1: {
      return (
        <div
        style={styles}
        >
          <div style={{textAlign:"center"}}>
            <img src="/images/yellow_star.svg" width="20px" />
            <img src="/images/star.svg" width="20px" />
            <img src="/images/star.svg" width="20px" />
            <img src="/images/star.svg" width="20px" />
            <img src="/images/star.svg" width="20px" />
          </div>
          <div>{props.quantity}</div>
        </div>
      );
    }
    case 2: {
      return (
        <div
        style={styles}
      >
        <div style={{textAlign:"center"}}>
          <img src="/images/yellow_star.svg" width="20px" />
          <img src="/images/yellow_star.svg" width="20px" />
          <img src="/images/star.svg" width="20px" />
          <img src="/images/star.svg" width="20px" />
          <img src="/images/star.svg" width="20px" />
        </div>
        <div>{props.quantity}</div>
      </div>
      )
    }
    case 3: {
     return( <div
      style={styles}
      >
        <div style={{textAlign:"center"}}>
          <img src="/images/yellow_star.svg" width="20px" />
          <img src="/images/yellow_star.svg" width="20px" />
          <img src="/images/yellow_star.svg" width="20px" />
          <img src="/images/star.svg" width="20px" />
          <img src="/images/star.svg" width="20px" />
        </div>
        <div>{props.quantity}</div>
      </div>);
    }
    case 4: {
      return(
        <div
        style={styles}
      >
        <div style={{textAlign:"center"}}>
          <img src="/images/yellow_star.svg" width="20px" />
          <img src="/images/yellow_star.svg" width="20px" />
          <img src="/images/yellow_star.svg" width="20px" />
          <img src="/images/yellow_star.svg" width="20px" />
          <img src="/images/star.svg" width="20px" />
        </div>
        <div>{props.quantity}</div>
      </div>
      )
    }
    case 5: {
      return(<div
        style={styles}
      >
        <div style={{textAlign:"center"}}>
          <img src="/images/yellow_star.svg" width="20px" />
          <img src="/images/yellow_star.svg" width="20px" />
          <img src="/images/yellow_star.svg" width="20px" />
          <img src="/images/yellow_star.svg" width="20px" />
          <img src="/images/yellow_star.svg" width="20px" />
        </div>
        <div>{props.quantity}</div>
      </div>);
    }
    default: {
      return(<div
        style={styles}
      >
        <div>
          <img src="/images/yellow_star.svg" width="20px" />
          <img src="/images/star.svg" width="20px" />
          <img src="/images/star.svg" width="20px" />
          <img src="/images/star.svg" width="20px" />
          <img src="/images/star.svg" width="20px" />
        </div>
        <div>{props.quantity}</div>
      </div>);
    }
  }
}
