import React from "react";
import { useState, useEffect } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import FavoriteBorderSharpIcon from '@mui/icons-material/FavoriteBorderSharp';
import { useLocation } from "react-router-dom";
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from "axios";

export default function Wishlist() {
  const [products, setProducts] = useState([]);
  const location = useLocation();


  useEffect(async (e) => {
    console.log(localStorage.Name);
    if (localStorage.Name) { //login condition
      const data = await axios.post("/getWishList", { email: localStorage.Name })
      console.log(data.data);
      setProducts(data.data);
    }
  }, [])
  
  async function deleteWish(product) {
    console.log(product);
    const delQuery = await axios.post("/delWish", { prod: product })
    console.log(delQuery.data);
    alert(delQuery.data.success)
    window.location.reload();
  }

  return (
    <List
      sx={{
        width: "98%",
        margin: "10px",
        padding: "50px",
        paddingBottom: "150px"
      }}
    >
      <Typography
        sx={{ display: "inline" }}
        component="h5"
        variant="body"
        color="grey"
        fontWeight="bold"
      >
        Wishlist
        <FavoriteBorderSharpIcon className= 'icon1' style={{marginLeft: '10px'}}/>
      </Typography>
      {products.map((productsItem, index) => {
        return (
          <Stack direction="row" spacing={1} key={index}>
            <ListItem alignItems="flex-start" >
              <ListItemAvatar style={{height:100, width:100}}>
                <Avatar alt="Remy Sharp" src={productsItem.data.prod.image} style={{height:100, width:100}}/>
              </ListItemAvatar>
              <ListItemText
                secondary={
                  <React.Fragment>
                    <h3>
                      {productsItem.data.prod.name}
                    </h3>
                    <h3 style={{ color: 'green', marginLeft: 50 }}>
                      <p style={{fontSize:25, display:'contents'}}>Price Rs: </p>
                      {productsItem.data.prod.price}
                    </h3>
                  </React.Fragment>
                }
              />
            </ListItem>
            <IconButton aria-label="delete" size="large" style={{padding: 50}} onClick={()=>{deleteWish(productsItem)}}>
              <DeleteIcon fontSize="inherit"/>
            </IconButton>
          </Stack>
        )
      })}
    </List>
  );
}
