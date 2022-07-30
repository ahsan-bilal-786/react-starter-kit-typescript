import { FC } from "react";
import { makeStyles } from "@mui/styles";
import { Link } from "react-router-dom";
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import React from "react";

export const useStyles = makeStyles((theme: any) => ({
  link: {
    textDecoration: "none",
    color: theme.palette.primary.dark
  }
}));

const SidebarLinkItem: FC<any> = ({ to, Icon, text }) => {
  const classes = useStyles();
  return (
    <Link to={to} className={classes.link}>
      <ListItem button>
        <ListItemIcon>
          <Icon />
        </ListItemIcon>
        <ListItemText sx={{ textDecoration: "none" }} primary={text} />
      </ListItem>
    </Link>
  );
};

export default SidebarLinkItem;
