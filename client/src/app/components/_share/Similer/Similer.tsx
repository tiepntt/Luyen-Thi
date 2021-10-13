import {
  Card,
  CardContent,
  Divider,
  List,
  ListItem,
  ListItemText,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import React from "react";
import "./style.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDoubleRight } from "@fortawesome/free-solid-svg-icons";
interface Props {
  list?: { id: any; name: string; count: number }[];
  title: string;
  onClick?: (value: number) => void;
}

export const Similar = (props: Props) => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <div className={classes.headerTitle}>{props.title}</div>
      <Divider />
      <CardContent>
        <List
          component="nav"
          className={classes.root}
          aria-label="mailbox folders"
        >
          {props.list?.map((item) => (
            <div
              onClick={() => {
                props.onClick && props.onClick(item.id);
              }}
            >
              <ListItem button className={classes.itemList}>
                <div className={classes.iconArrow}>
                  <FontAwesomeIcon
                    icon={faAngleDoubleRight}
                    color={"#1b998a"}
                  />
                </div>
                <ListItemText
                  primary={
                    <div className={classes.itemText}>
                      {item.name} ({item.count})
                    </div>
                  }
                />
              </ListItem>
              <Divider />
            </div>
          ))}

          <Divider light />
        </List>
      </CardContent>
    </Card>
  );
};

const useStyles = makeStyles(() => ({
  root: {
    height: "auto",
    paddingTop: 0,
  },
  itemList: {
    padding: 0,
    paddingTop: 2.5,
    paddingBottom: 2.5,
    fontSize: "0.875rem",
  },
  itemText: { fontSize: "0.875rem" },
  iconArrow: {
    maxWidth: 30,
    paddingLeft: 0,
    paddingRight: 10,
  },
  headerTitle: {
    padding: "10px 10px 10px 15px",
    fontSize: 15,
    fontWeight: "bold",
  },
}));
