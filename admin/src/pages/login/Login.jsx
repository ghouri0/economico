import React , {useState} from "react";
import "./login.css";
import { TextField, Button, Checkbox } from "@mui/material";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import Key from "@mui/icons-material/Key";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function Login({ login, setLogin }) {
  console.log(login);
  const [checked, setChecked] = useState(false);
  const [email, setEmail] = useState('');
  const navigate = useNavigate()

  useEffect(()=>{
    if(login){
      navigate('/')
    }
  }, [login])

  const handleCheck = (event) => {
    setChecked(event.target.checked);
  };

  const [values, setValues] = useState({
    amount: "",
    password: "",
    weight: "",
    weightRange: "",
    showPassword: false,
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });

  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleClick =  async () => {
    const object = {
      email: email,
      password: values.password,
    };
    console.log(object);
    await fetch("/loginAdmin", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      mode: 'cors',
      body: JSON.stringify({
        email: email,
        password: values.password,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.message) {
          alert(data.message)
          setLogin(true);
        }
        else if(data.IEmessage){
          alert(data.IEmessage)
        }
        else{
          alert(data.INmessage)
        }
      });
  }

  return (
    <div className="back">
      <div className="login">
        <div
          className="title"
          style={{
            fontWeight: "bolder",
            color: "grey",
            textAlign: "center",
            fontSize: "25px",
          }}
        >
          <h2>Admin Panel</h2>
          <h3>Sign-In</h3>
        </div>
        <form action="" style={{ padding: "15px" }}>
          <div className="delInp">
            <MailOutlineIcon className="icon1" />
            <TextField
              id="outlined-name fullwidth"
              label="Email"
              placeholder="Enter Email"
              type="email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              style={{
                textAlign: "center",
                justifyContent: "center",
                width: "350px",
              }}
            />
          </div>
          <div className="delInp">
            <Key className="icon1" />
            <FormControl sx={{ m: 0, width: "350px" }} variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">
                Password
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={values.showPassword ? "text" : "password"}
                value={values.password}
                onChange={
                  handleChange("password")
                }
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {values.showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
              />
            </FormControl>
          </div>
          <div style={{fontSize: '15px', marginLeft: '150px'}}>
            <Checkbox
              checked={checked}
              label= 'Remember me'
              onChange={handleCheck}
              inputProps={{ "aria-label": "controlled" }}
            />
            Remember me
          </div>
          <Button
            variant="contained"
            color="warning"
            style={{ marginLeft: "150px", width: "35%", height: "50px" }}
            onClick={handleClick}
          >
            Sign-In
          </Button>
        </form>
      </div>
    </div>
  );
}
