import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
import { useLocation } from 'react-router-dom'

export default function viewProduct({ searchResult }) {

    const location = useLocation();
    const [data, setData] = useState([]);
    useEffect(async (e) => {
        console.log("Search Result", location.state.searchData);
        const recieveResult = await axios.post("/send/result", { searchResult: location.state.searchData });
        setData(recieveResult.data)
        console.log("recieved data........", recieveResult);
    }, [])
    console.log("Data: ", data);
    // function displayProducts(emo) {
    //     return (
    //         <Entry
    //             item={emo}
    //         />
    //     );
    // }

    return (
        <div style={{ height: '100%' }}>
            <h1>
                <span>Products Inventory</span>
            </h1>
            {/* <dl className="dictionary">{data.map(displayProducts)}</dl> */}
        </div>
    )
}
