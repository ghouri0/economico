import React from 'react'
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import '../delivery/delivery.css'
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import { useState, useEffect } from 'react';
import CustomerTable from '../../components/userTable/customerTable';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

export default function Customer() {
    const [cust, setCust] = useState(0);
    async function getData() {
        await fetch('/getAllCustomers', { mode: 'cors' })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setCust(data.count);
            }
        );
    }
    useEffect(() => {
        getData();
    }, []);
    return (
        <div>
            <div className="container">
                <div className="titleContainer" style={{ width: '100%', backgroundColor: 'white' }}>
                    <Stack
                        direction="row"
                        divider={<Divider orientation="vertical" flexItem />}
                        spacing={8}
                    >
                        <Item>
                            <PeopleAltOutlinedIcon style={{ padding: '10px', color: '#1c8067', fontSize: '150px' }} />
                        </Item>
                        <div style={{ display: 'flex' }}>
                            <h1 style={{ alignItems: 'center', fontSize: '35px', fontWeight: 'bold', color: 'grey', justifyContent: 'center', margin: 'auto' }}>Customers Cataloge</h1>
                        </div>
                        <div className="percentage" style={{ fontSize: '50px', width: '175px', height: '150px', padding: '15px' }}>
                            <CircularProgressbar value={(cust*100)/1000} maxValue={1000} text={(cust*100)/1000 + '%'} strokeWidth={5} styles={buildStyles({
                                pathColor: '#1c8067',
                                textColor: '#1c8067'
                            })} />
                        </div>
                    </Stack>
                </div>
            </div>
            <div className="titleContainer" style={{ width: '98%', height: 'max-content', margin: '15px' }}>
                <div className="title" style={{color: 'grey'}}>
                    Registered Customers
                </div>
                <CustomerTable />
            </div>
        </div>
    )
}
