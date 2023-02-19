import React, { useState } from "react";
import "./navbar.css";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Logout from "@mui/icons-material/Logout";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import ChatOutlinedIcon from "@mui/icons-material/ChatOutlined";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate()
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div className="navbar">
      <div className="wrapper">
        <div className="search">
          <input type="text" name="" id="" placeholder="Search.." />
          <SearchOutlinedIcon className="icon1" />
        </div>
        <div className="items">
          <div className="item">
            <NotificationsOutlinedIcon className="icon1" />
            <div className="counter">1</div>
          </div>
          <div className="item">
            <ChatOutlinedIcon className="icon1" />
            <div className="counter">1</div>
          </div>
          <div className="item">
            <Tooltip title="Account settings">
              <IconButton
                onClick={handleClick}
                size="small"
                sx={{ ml: 2 }}
                aria-controls={open ? "account-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
              >
                <img
                  src="https://png.pngtree.com/element_origin_min_pic/16/07/23/22579385076b15c.jpg"
                  alt=""
                  className="avatar"
                />{" "}
              </IconButton>
            </Tooltip>
            <Menu
              anchorEl={anchorEl}
              id="account-menu"
              open={open}
              onClose={handleClose}
              onClick={handleClose}
              PaperProps={{
                elevation: 0,
                sx: {
                  overflow: "visible",
                  filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                  mt: 1.5,
                  "& .MuiAvatar-root": {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                  },
                  "&:before": {
                    content: '""',
                    display: "block",
                    position: "absolute",
                    top: 0,
                    right: 14,
                    width: 15,
                    height: 15,
                    bgcolor: "background.paper",
                    transform: "translateY(-50%) rotate(45deg)",
                    zIndex: 0,
                  },
                },
              }}
              transformOrigin={{ horizontal: "right", vertical: "top" }}
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
              {/* <Link to="/profile" style={{color: 'black', textDecoration: 'none'}}> */}
              <MenuItem
                onClick={() => {
                  navigate("/profile", {
                    state: {
                      name: "Admin",
                      email: "admin12@gmail.com",
                      phone: "0334-0058007",
                      image: "https://png.pngtree.com/element_origin_min_pic/16/07/23/22579385076b15c.jpg"
                    },
                  });
                }}
              >
                <img
                  src="https://png.pngtree.com/element_origin_min_pic/16/07/23/22579385076b15c.jpg"
                  alt=""
                  className="avatar"
                />{" "}
                Profile
              </MenuItem>
              {/* </Link> */}
              <Divider />
              <Link
                to="/logout"
                style={{ color: "black", textDecoration: "none" }}
              >
                <MenuItem>
                  <ListItemIcon>
                    <Logout fontSize="small" />
                  </ListItemIcon>
                  Logout
                </MenuItem>
              </Link>
            </Menu>
          </div>
        </div>
      </div>
    </div>
  );
}
