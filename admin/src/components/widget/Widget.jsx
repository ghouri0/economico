import React from 'react'
import './widget.css'
import { Link } from 'react-router-dom';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import StorefrontOutlinedIcon from '@mui/icons-material/StorefrontOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import ReceiptOutlinedIcon from '@mui/icons-material/ReceiptOutlined';
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

export default function Widget({ array }) {
    const data = { title: '', number: '', link: '', icon: '', percent: 0 }
    var link = ''
    switch (array[0]) {
        case 'Customer':
            data.title = 'Customers';
            data.number =  array[3];
            data.link = 'See All Customers';
            data.icon = <PeopleAltOutlinedIcon className='icon' style={{ color: '#191070', width: '50px', height: '50px', margin: 'auto' }} />
            data.percent = array[3]
            break;
        case 'Sellers':
            data.title = 'Sellers';
            data.number = array[3];
            data.link = 'See All Sellers';
            data.icon = <StorefrontOutlinedIcon className='icon' style={{ color: '#004180', width: '50px', height: '50px', margin: 'auto' }} />
            data.percent = array[3]
            break;
        case 'Orders':
            data.title = 'Orders';
            data.number = array[3];
            data.link = 'See All Orders';
            data.icon = <ShoppingCartOutlinedIcon className='icon' style={{ color: '#ae7904', width: '50px', height: '50px', margin: 'auto' }} />
            data.percent = array[3]
            break;
        case 'Sales':
            data.title = 'Total Sales';
            data.number = parseInt(array[3]);
            data.link = 'See Sales Details';
            data.icon = <ReceiptOutlinedIcon className='icon' style={{ color: '#9b1817', width: '50px', height: '50px', margin: 'auto' }} />
            data.percent = parseInt(array[3])
            break;
        default:
            break;
    }
    if (data.title === 'Customers') {
        link = '/customers'
    }
    else if (data.title === 'Sellers') {
        link = '/sellers'
    }
    else if (data.title === 'Orders') {
        link = '/orders'
    }
    return (
        <div className="widget" style={{
            backdropFilter: 'blur(19px) saturate(177 %)',
            webkitBackdropFilter: 'blur(44px) saturate(177 %)',
            backgroundColor: array[1],
            borderRadius: '5px',
            border: '1px solid rgba(209, 213, 219, 0.3)'
        }}>
            <div className="left">
                <span className="name">{data.title}</span>
                <span className="" >Current :{data.number}</span>
                <span className="" >Target :{10000}</span>

                <Link to={link} style={{}}>
                    <span className="link" >{data.link}</span>
                </Link>
            </div>
            <div className="right">
                <div className="percentage" >
                    <CircularProgressbar value={(data.percent*100)/10000} maxValue={10000} text={(data.percent*100)/10000 + '%'} strokeWidth={7} styles={buildStyles({
                        pathColor: array[2],
                        textColor: 'white'
                    })} />
                </div>
                {data.icon}
            </div>
        </div >
    )
}
