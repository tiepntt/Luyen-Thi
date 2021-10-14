import React from "react";
import clsx from "clsx";
import {
  Avatar,
  Card,
  CardContent,
  Grid,
  Typography,
  colors,
  makeStyles,
} from "@material-ui/core";

interface Props {
  className?: string;
  title?: string;
  icon?: any;
  amount?: number;
  color?: string;
}

export const Budget = (props: Props) => {
  const { className, ...rest } = props;
  const classes = useStyles();
  const avatar = (icon: any, color?: string) => {
    return (
      <Avatar className={classes.avatar} style={{ backgroundColor: color }}>
        {icon}
      </Avatar>
    );
  };
  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <CardContent>
        <Grid container justify="space-between" spacing={2}>
          <Grid item className="mt-2">
            <Typography color="textPrimary" variant="h5">
              {props.amount}
            </Typography>
            <Typography color="textSecondary" gutterBottom variant="h6">
              {props.title}
            </Typography>
          </Grid>
          <Grid item>{avatar(props.icon, props.color)}</Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};
const useStyles = makeStyles((theme: any) => ({
  root: {
    height: "100%",
  },
  avatar: {
    height: 50,
    width: 50,
  },
  differenceIcon: {
    color: colors.red[900],
  },
  differenceValue: {
    color: colors.red[900],
    marginRight: theme.spacing(1),
  },
}));
