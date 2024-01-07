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
import { useRouter } from "next/router";

const drawerWidth = 240;

function LeftBar() {
  const router = useRouter();

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

  const handleListMenuItemClick = (text: string) => {
    switch (text) {
      case "Home":
        router.push("/mypage");
        break;
      case "Verify VC":
        router.push("/verifyVC");
        break;
      case "Issue VC":
        router.push("/mypage/issueVC");
        break;
      case "Manage SBT":
        router.push("/mypage/manage");
        break;
      default:
        break;
    }
  };

  const handleListSettingItemClick = (text: string) => {
    switch (text) {
      case "Help Center":
        //router.push("/mypage/helpcenter");
        break;
      case "Settings":
        //router.push("/mypage/settings");
        break;
      default:
        break;
    }
  };

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
              <ListItemButton
                onClick={() => handleListMenuItemClick(item.text)}
              >
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
              <ListItemButton
                onClick={() => handleListSettingItemClick(item.text)}
              >
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
