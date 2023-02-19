import React, { useState, useEffect } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import {useLocation} from 'react-router-dom';

// // Can be a string as well. Need to ensure each key-value pair ends with ;

function Loading() {
  const location = useLocation();
  let [loading, setLoading] = useState(true);
  let [color, setColor] = useState("red");
    useEffect(async (e) => { 
        setLoading(location.state.load)
    }, []);

  return (
    
    <div style={{ height: "calc(100vh)", display: "flex", textAlign: "center", flex:1, alignItems: "center", justifyContent: "center"}}>
        <ClipLoader size={200} cssOverride={{'borderWidth': 8}} color={color} loading={loading}   />
    </div>
  );
}

export default Loading;