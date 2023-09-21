import React from 'react'
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { makeStyles } from '@mui/styles';
import { styled, alpha } from '@mui/material/styles';
import './MarketBody.css'
import tokenone from '../images/token-1.png'
import tokentwo from '../images/token-2.png'
import tokenthree from '../images/token-3.png'
import tokenfour from '../images/token-4.png'
import MarketBodyTabOuter from './MarketBodyTabOuter';


const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

const useStyles = makeStyles({

    marketpart: {
        background: 'transparent !important',
        boxShadow: 'none !important',

        '& h3': {
            color: '#ababab',
            fontSize: '14px',
            textAlign: 'left',
            marginBottom: '30px',
            marginTop: '0px'
        }
    },
    tabpartmarketitem: {
        background: 'transparent !important',
        boxShadow: 'none !important',
        marginRight: '0px !important',
        marginLeft: '0px !important',

        '& button': {
            fontSize: '16px',
            paddingTop: '10px !important',
            paddingBottom: '10px !important',
            marginRight: '10px'
        }
    },

    tabpartmarketgrid: {
        marginRight: '0px !important',
        marginLeft: '0px !important',
        marginTop: '50px !important',
        paddingLeft: '0px !important'
    },


});


const apione = [

    { 'id': 1, 'img': tokenone, 'price': 1.72, 'percentage': 7.18, 'tknname': 'sna' },
    { 'id': 2, 'img': tokentwo, 'price': 392.2, 'percentage': 3.18, 'tknname': 'bna' },
    { 'id': 3, 'img': tokenthree, 'price': 136.72, 'percentage': 5.18, 'tknname': 'sta' },
    { 'id': 4, 'img': tokenfour, 'price': 116.72, 'percentage': 0.18, 'tknname': 'stc' }

]

const apitwo = [

    { 'id': 1, 'img': tokenone, 'price': 1.72, 'percentage': 7.18, 'tknname': 'sna' },
    { 'id': 2, 'img': tokentwo, 'price': 392.2, 'percentage': 3.18, 'tknname': 'bna' },
    { 'id': 3, 'img': tokenthree, 'price': 136.72, 'percentage': 5.18, 'tknname': 'sta' },
    { 'id': 4, 'img': tokenfour, 'price': 116.72, 'percentage': 0.18, 'tknname': 'stc' }

]

const apithree = [

    { 'id': 1, 'img': tokenone, 'price': 1.72, 'percentage': 7.18, 'tknname': 'sna' },
    { 'id': 2, 'img': tokentwo, 'price': 392.2, 'percentage': 3.18, 'tknname': 'bna' },
    { 'id': 3, 'img': tokenthree, 'price': 136.72, 'percentage': 5.18, 'tknname': 'sta' },
    { 'id': 4, 'img': tokenfour, 'price': 116.72, 'percentage': 0.18, 'tknname': 'stc' }

]

const apifour = [

    { 'id': 1, 'img': tokenone, 'price': 1.72, 'percentage': 7.18, 'tknname': 'sna' },
    { 'id': 2, 'img': tokentwo, 'price': 392.2, 'percentage': 3.18, 'tknname': 'bna' },
    { 'id': 3, 'img': tokenthree, 'price': 136.72, 'percentage': 5.18, 'tknname': 'sta' },
    { 'id': 4, 'img': tokenfour, 'price': 116.72, 'percentage': 0.18, 'tknname': 'stc' }

]


const MarketBody = () => {

    const classes = useStyles();

    return (
        <div>

            <Box sx={{ flexGrow: 1 }}>

                <Grid container spacing={2}>

                    <Grid item xs={12} sm={12} md={12} lg={1} xl={1}>
                        <Item>
                        </Item>
                    </Grid>

                    <Grid item xs={12} sm={12} md={12} lg={10} xl={10}>
                        <Item className={classes.marketpart}>

                            <h1 className='heading-market'>Markets</h1>

                            <Box sx={{ flexGrow: 1 }}>
                                <Grid container spacing={2}>

                                    <Grid item xs={12} sm={12} md={12} lg={3} xl={3} className='hover-padding'>
                                        <h3>Highlight Coin</h3>

                                        {apione?.map((value, i) => (
                                            <div className='api-cls' key={i.id}>
                                                <div className='token-img-name'><div className='tkn-img'><img src={value.img} alt='token-coin-img' /></div>{value.tknname}</div>
                                                <div className='price-token'>{value.price}</div>
                                                <div className='percentage-token'>{value.percentage}</div>
                                            </div>
                                        ))}

                                    </Grid>

                                    <Grid item xs={12} sm={12} md={12} lg={3} xl={3} className='hover-padding'>
                                        <h3>New Listing</h3>


                                        {apitwo?.map((value, i) => (
                                            <div className='api-cls' key={i.id}>
                                                <div className='token-img-name'><div className='tkn-img'><img src={value.img} alt='token-coin-img' /></div>{value.tknname}</div>
                                                <div className='price-token'>{value.price}</div>
                                                <div className='percentage-token'>{value.percentage}</div>
                                            </div>
                                        ))}


                                    </Grid>

                                    <Grid item xs={12} sm={12} md={12} lg={3} xl={3} className='hover-padding'>
                                        <h3>Top Gainer Coin</h3>


                                        {apithree?.map((value, i) => (
                                            <div className='api-cls' key={i.id}>
                                                <div className='token-img-name'><div className='tkn-img'><img src={value.img} alt='token-coin-img' /></div>{value.tknname}</div>
                                                <div className='price-token'>{value.price}</div>
                                                <div className='percentage-token'>{value.percentage}</div>
                                            </div>
                                        ))}


                                    </Grid>

                                    <Grid item xs={12} sm={12} md={12} lg={3} xl={3} className='hover-padding'>
                                        <h3>Top Volume Coin</h3>


                                        {apifour?.map((value, i) => (
                                            <div className='api-cls' key={i.id}>
                                                <div className='token-img-name'><div className='tkn-img'><img src={value.img} alt='token-coin-img' /></div>{value.tknname}</div>
                                                <div className='price-token'>{value.price}</div>
                                                <div className='percentage-token'>{value.percentage}</div>
                                            </div>
                                        ))}


                                    </Grid>

                                </Grid>
                            </Box>

                        </Item>
                    </Grid>

                    <Grid item xs={12} sm={12} md={12} lg={1} xl={1}>
                        <Item>
                        </Item>
                    </Grid>

                </Grid>


            </Box>


            <Box sx={{ flexGrow: 1 }} className={classes.tabpartmarketout}>

                <Grid container spacing={2} className={classes.tabpartmarket}>

                    <Grid item xs={12} sm={12} md={12} lg={1} xl={1}>
                        <Item>
                        </Item>
                    </Grid>

                    <Grid item xs={12} sm={12} md={12} lg={10} xl={10} className={classes.tabpartmarketgrid}>
                        <Item className={classes.tabpartmarketitem}>
                            <MarketBodyTabOuter />
                        </Item>
                    </Grid>

                    <Grid item xs={12} sm={12} md={12} lg={1} xl={1}>
                        <Item>
                        </Item>
                    </Grid>

                </Grid>

            </Box>

        </div>
    )
}

export default MarketBody
