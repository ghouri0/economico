import React, {useEffect, useState} from 'react'
import StorefrontOutlinedIcon from '@mui/icons-material/StorefrontOutlined';
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import SellerTable from '../../components/userTable/sellerTable';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

export default function Seller() {
    const [sell, setSell] = useState(0);
    async function getData() {
        await fetch('/getAllSellers', { mode: 'cors' })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setSell(data.count);
            }
        );
    }
    useEffect(() => {
        getData();
    }, []);
    return (
        <div >
            <div className="container">
                <div className="titleContainer" style={{ width: '100%' }}>
                    <Stack
                        direction="row"
                        divider={<Divider orientation="vertical" flexItem />}
                        spacing={8}
                    >
                        <Item>
                            <StorefrontOutlinedIcon style={{ padding: '10px', color: '#993297', fontSize: '150px' }} />
                        </Item>
                        <div style={{ display: 'flex'}}>
                            <h1 style={{ display: 'flex', alignItems: 'center', fontSize: '35px', fontWeight: 'bold', color: 'grey', justifyContent: 'center', margin: 'auto' }}>Sellers Cataloge</h1>
                        </div>
                        <div className="percentage" style={{ fontSize: '50px', width: '175px', height: '150px', padding: '15px' }}>
                            <CircularProgressbar value={(sell*100)/1000} maxValue={1000} text={(sell*100)/1000 + '%'} strokeWidth={5} styles={buildStyles({
                                pathColor: '#993297',
                                textColor: '#993297'
                            })} />
                        </div>
                    </Stack>
                </div>
            </div>
            <div className="titleContainer" style={{ width: '98%', height: 'max-content', margin: '15px' }}>
                <div className="title" style={{color: 'grey'}}>
                    Registered Sellers
                </div>
                <SellerTable />
            </div>
        </div>
    )
}
