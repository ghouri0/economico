import React from 'react'
import './featured.css'
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';

export default function Featured() {
    return (
        <div className='featured'>
            <div className="top">
                <h1 className="title">
                    Revenue
                </h1>
                <MoreVertOutlinedIcon fontSize='small' />
            </div>
            <div className="bottom1">
                <div className="percent">
                    <CircularProgressbar value={88} text={'88%'} strokeWidth={2} styles={buildStyles({
                        pathColor:'green'
                    })}/>
                </div>
                <div className="heading">
                    Last Month Sales
                </div>
                <div className="count">
                    456 Rs
                </div>
                <div className="des">
                    Total Revenue almost Reached Targeted Amount
                </div>
            </div>
        </div>
    )
}
