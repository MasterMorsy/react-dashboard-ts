import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { Collapse, List } from "@material-ui/core";
import ListSubheader from "@material-ui/core/ListSubheader";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Icon from "@material-ui/core/Icon";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import { For } from "../For";
import sideBarItems from "../../helpers/sidebarItems";
import { If } from "../If";
import { admin } from "../../helpers/users";
import "./style.scss";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
    },
    nested: {
      paddingLeft: theme.spacing(4),
    },
  })
);

const AdminSidebar = (props: any) => {
  const classes = useStyles();
  // const [open, setOpen] = React.useState(true);

  // const handleClick = () => {
  //   setOpen(!open);
  // };

  function handleNavigate(url: string) {
    props.history.push(url);
  }

  function handleActive(label: string) {
    return props.history.location.pathname.includes(label);
  }

  function RenderIcon(props: any) {
    return <Icon>{props.name}</Icon>;
  }

  return (
    <div className="admin-sidebar">
      <Link to="/admin">
        <div className="logo-wrapper">
          <img src="/imgs/icon.png" width="50" alt="logo" />
        </div>
      </Link>

      <For
        data={sideBarItems}
        render={(list: any) => (
          <List
            component="nav"
            aria-labelledby="nested-list-subheader"
            subheader={
              <ListSubheader component="div" id="nested-list-subheader">
                {list.name}
              </ListSubheader>
            }
            className={classes.root}
          >
            <For
              data={list.items}
              render={(item: any) => (
                <ListItem
                  selected={handleActive(item.link)}
                  button
                  onClick={() => handleNavigate(`/admin${item.link}`)}
                >
                  <ListItemIcon>
                    <RenderIcon name={item.icon} />
                  </ListItemIcon>
                  <ListItemText primary={item.name} />
                </ListItem>
              )}
            />
          </List>
        )}
      />
    </div>
  );
};

export default withRouter(AdminSidebar);
