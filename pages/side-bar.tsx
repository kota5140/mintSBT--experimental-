import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HomeIcon from "@mui/icons-material/Home";
import HelpCenterIcon from "@mui/icons-material/HelpCenter";
import SettingsIcon from "@mui/icons-material/Settings";
import HistoryEduIcon from "@mui/icons-material/HistoryEdu";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import TokenIcon from "@mui/icons-material/MonetizationOn";

const drawerWidth = 240;

function LeftBar() {
  const menuItems = [
    { text: "Home", icon: <HomeIcon /> },
    { text: "Issue VC", icon: <HistoryEduIcon /> },
    { text: "Verify VC", icon: <PersonSearchIcon /> },
    { text: "Manage SBT", icon: <TokenIcon /> },
  ];
  const settingItems = [
    { text: "Help Center", icon: <HelpCenterIcon /> },
    { text: "Settings", icon: <SettingsIcon /> },
  ];

  return (
    <Box>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar />
        <Divider />
        <List>
          {menuItems.map((item) => (
            <ListItem key={item.text} disablePadding>
              <ListItemButton>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {settingItems.map((item) => (
            <ListItem key={item.text} disablePadding>
              <ListItemButton>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </Box>
  );
}

export default LeftBar;
