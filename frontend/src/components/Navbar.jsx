
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import VideoCallOutlinedIcon from "@mui/icons-material/VideoCallOutlined";
import { Container, Wrapper, Search, Input, User, Avatar, Button } from "./Styles/NavbarStyledComponent"
import { useState } from "react";
import { Upload } from "@mui/icons-material";

const Navbar = () => {
  const navigate = useNavigate()
  const { currentUser } = useSelector((state) => state.user);
  const [query, setQuery] = useState("")
  const [open, setOpen] = useState(false)
  return (
    <>
      <Container>
        <Wrapper>
          <Search>
            <Input placeholder="Search" onChange={e => setQuery(e.target.value)} />
            <SearchOutlinedIcon onClick={() => navigate(`/search?q=${query}`)} />

          </Search>
          {currentUser ? (
            <User>
              <VideoCallOutlinedIcon style={{ color: "white" }} onclick={() => setOpen(true)} />
              <Avatar src={currentUser.img} />
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
    </>
  );
};

export default Navbar;
