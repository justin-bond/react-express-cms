import React from 'react'
import { NavLink } from "react-router-dom"

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Icon from "@material-ui/core/Icon";

const ns = 'sidebar'

const Sidebar = (props) => {
  const { routes } = props;

  var links = (
    <List>
      {
        routes.map((prop, key) => {
          return (
            <NavLink
              to={prop.layout + prop.path}
              activeClassName="active"
              key={key}
            >
              <ListItem button>
                <Icon>
                  <prop.icon/>
                </Icon>
                <ListItemText
                  primary={prop.name}
                  disableTypography={true}
                />
              </ListItem>
            </NavLink>
          )
        })
      }

    </List>
  );

  return (
    <div className={`${ns}`}>
      {links}
    </div>
  )
}

export default Sidebar;