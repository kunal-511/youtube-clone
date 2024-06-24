import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import VideoCallOutlinedIcon from "@mui/icons-material/VideoCallOutlined";
import { Menu, MenuItem } from "@mui/material";
import { Container, Wrapper, Search, Input, User, Avatar, Button } from "./Styles/NavbarStyledComponent";
import { useState } from "react";
import Upload from "./Upload";
import axios from "axios";
import api from "../axios";
import { useDispatch } from "react-redux";
import { logout } from "../redux/userSlice";
const Navbar = () => {
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const dispatch = useDispatch();


  const handleAvatarClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (path) => {
    navigate(path);
    handleMenuClose();
  };

  const handleLogout = async () => {
    try {
      await axios.post(`${api}/api/auth/logout`);
      dispatch(logout())

      navigate("/signin");
    } catch (error) {
      console.error("Logout failed:", error);
    }
    handleMenuClose();
  };
  return (
    <>
      <Container>
        <Wrapper>
          <Search>
            <Input placeholder="Search" onChange={(e) => setQuery(e.target.value)} />
            <SearchOutlinedIcon onClick={() => navigate(`/search?q=${query}`)} />
          </Search>
          {currentUser ? (
            <User>
              <VideoCallOutlinedIcon style={{ color: "white" }} onClick={() => setOpen(true)} />
              <Avatar src={currentUser.img} onClick={handleAvatarClick} />
              {currentUser.name}
            </User>
          ) : (
            <Link to="/signin" style={{ textDecoration: "none" }}>
              <Button>
                <AccountCircleOutlinedIcon />
                SIGN IN
              </Button>
            </Link>
          )}
        </Wrapper>
      </Container>
      {open && <Upload setOpen={setOpen} />}
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
        <MenuItem onClick={() => handleMenuItemClick('/profile')}>Profile</MenuItem>
        <MenuItem onClick={() => handleMenuItemClick('/dashboard')}>Dashboard</MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
        <MenuItem onClick={() => handleMenuItemClick('/videos')}>Videos</MenuItem>
      </Menu>
    </>
  );
};

export default Navbar;
