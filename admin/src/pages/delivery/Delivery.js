import React from "react";
import "./delivery.css";
import { Link } from "react-router-dom";
import { Button, Stack, Divider } from "@mui/material";
import Paper from "@mui/material/Paper";
import HowToRegOutlinedIcon from "@mui/icons-material/HowToRegOutlined";
import UserTable from "../../components/userTable/UserTable";
import { styled } from "@mui/material/styles";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function Delivery() {
  // const [file, setFile] = useState('');
  // console.log(file);

  return (
    <div>
      <div className="container">
        <div className="titleContainer">
          <Stack
            direction="row"
            divider={<Divider orientation="vertical" flexItem />}
            spacing={8}
          >
            <Item>
              <HowToRegOutlinedIcon
                style={{ padding: "10px", color: "crimson", fontSize: "150px" }}
              />
            </Item>
            <div>
              <div className="title">
                <h1 style={{ display: "flex" }}>Delivery Registration</h1>
              </div>
              <Link to="/addDelivery" style={{ textDecoration: "none" }}>
                <Button
                  variant="contained"
                  color="error"
                  style={{ marginLeft: "50px", width: "50%", height: "50px" }}
                >
                  Register
                </Button>
              </Link>
            </div>
          </Stack>
        </div>
      </div>
      <div className="titleContainer" style={{width: '98%', height: 'max-content'}}>
        <div className="title" style={{color: 'grey'}}>Registered Delivery Men</div>
        <UserTable />
      </div>
    </div>
  );
}
