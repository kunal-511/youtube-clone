import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { loginSuccess, loginStart, loginFailure } from "../redux/userSlice";
import { auth, provider } from "../firebase";
import { signInWithPopup } from "firebase/auth";
import api from "../axios";
import { Container, Wrapper, Title, SubTitle, Input, Button, More, Links, Link } from "./Styles/SignInStyledComponent";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [registerName, setRegisterName] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch(loginStart());

    try {
      const res = await axios.post(`${api}/api/auth/signin`, { name, password });
      console.log(res.data);
      dispatch(loginSuccess(res.data));
      // Add logic for successful login, such as redirecting the user
      navigate('/')
    } catch (error) {
      console.error(error);
      dispatch(loginFailure());
      // Handle error, such as displaying an error message to the user
    }
  };
  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${api}/api/auth/signup`, { name: registerName, email: registerEmail, password: registerPassword })
      console.log(response.data)
      dispatch(loginSuccess(response.data));
      navigate('/');
    }
    catch (error) {
      console.error(error)
      dispatch(loginFailure());
    }
  }

  const signInwithGoogle = async () => {
    dispatch(loginStart());
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log(result);
        axios.post(`${api}/api/auth/googleauth`, {
          name: result.user.displayName,
          email: result.user.email,
          image: result.user.photoURL,
        })
          .then((res) => {
            dispatch(loginSuccess(res.data));
            navigate('/')
          })
          .catch((error) => {
            console.error(error);
            dispatch(loginFailure());
          });
      })
      .catch((error) => {
        console.error(error);
        dispatch(loginFailure());
      });
  };

  return (
    <Container>
      <Wrapper>
        <Title>Sign in</Title>
        <SubTitle>to continue to TvYotube</SubTitle>
        <form onSubmit={handleLogin}>
          <Input placeholder="username" onChange={(e) => setName(e.target.value)} />
          <Input type="password" placeholder="password" onChange={(e) => setPassword(e.target.value)} />
          <Button type="submit">Sign in</Button>
        </form>
        <Title>or</Title>
        <Button onClick={signInwithGoogle} variant="text" color="default">
          Sign in with Google
        </Button>
        <Title>or</Title>
        <form onSubmit={handleRegister}>
          <Input placeholder="username" value={registerName} onChange={(e) => setRegisterName(e.target.value)} />
          <Input placeholder="email" value={registerEmail} onChange={(e) => setRegisterEmail(e.target.value)} />
          <Input type="password" placeholder="password" value={registerPassword} onChange={(e) => setRegisterPassword(e.target.value)} />
          <Button>Sign up</Button>
        </form>
      </Wrapper>
      <More>
        English(USA)
        <Links>
          <Link>Help</Link>
          <Link>Privacy</Link>
          <Link>Terms</Link>
        </Links>
      </More>
    </Container>
  );
};

export default SignIn;
