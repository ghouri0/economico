import React, { useState, useEffect } from 'react'
import './chart.css'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';



export default function Chart1() {

  const [ranks, setRanks] = useState([]);

  function getRanks(){
    var sellerRanks = [{
      sellerName: 'Asad',
      rank: 2
    }]
    ranks.map(rank=>{
      sellerRanks.push(rank)
    })
    return sellerRanks
  }

  async function getSellersRank(){
    await fetch("/sellerRanks", { mode: "cors" })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setRanks(data)
      });
  }

  useEffect(()=>{
    getSellersRank()
  }, [])

  return (
    <div className='chart'>
      <h2 className="title" style={{textAlign: 'center', padding: '10px', color: 'grey'}}>
        Sellers Ranking
      </h2>
      <BarChart
          width={550}
          height={450}
          data={getRanks()}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="2 5" />
          <XAxis dataKey="sellerName" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="rank" fill="#2b5182" />
        </BarChart>
    </div>
  )
}
