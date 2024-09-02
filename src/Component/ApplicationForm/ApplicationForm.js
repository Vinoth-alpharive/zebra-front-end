import React, { useEffect, useRef, useState } from 'react'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { makeStyles } from '@mui/styles';
import cryptobannerbg from '../../images/cryptobannerbg.png';
import footerbg from '../../images/footer-bg.png';
import './ApplicationForm.css';
import TextField from '@mui/material/TextField';
import { Link } from 'react-router-dom';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Button } from '@mui/material';
import Axios from '../../Axios';
import { ToastContainer, toast } from 'react-toastify';


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const useStyles = makeStyles({
  sidebarcls: {
    background: '#010712 !important',
    borderRadius: '0px !important',
    boxShadow: 'none !important',
    overflow: 'hidden',
    position: 'relative'
  },
  headercls: {
    borderRadius: '0px !important',
    boxShadow: 'none !important',
    padding: '20px 55px !important',
    '@media (max-width: 991.98px)': {
      padding: '20px 10px !important',
    }
  },
  cryptobannercls: {
    borderRadius: '0px !important',
    boxShadow: 'none !important',
    padding: '20px 55px !important',
    backgroundImage: `url(${cryptobannerbg})`,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    position: 'relative',
    // '&:before': {
    //   content: '""',
    //   position: 'absolute',
    //   width:'100%',
    //   height:'100%',
    //   background: '#fffffff2',
    //   left:0,
    //   top: 0,
    // },
    '@media (max-width: 991.98px)': {
      padding: '20px !important',
    }
  },
  coinsblock: {
    borderRadius: '0px !important',
    boxShadow: 'none !important',
    padding: '20px 55px !important',
    '@media (max-width: 991.98px)': {
      padding: '5px 10px !important;',
    }
  },
  footercls: {
    borderRadius: '0px !important',
    boxShadow: 'none !important',
    padding: '30px 55px !important',
    backgroundImage: `url(${footerbg})`,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    marginTop: '20px',
    '& nav': {
      '& li': {
        '& a': {
          color: '#C0C9D0 !important'
        }
      }
    },
    '@media (max-width: 991.98px)': {
      padding: '20px !important',
    }
  }
});




const ApplicationForm = () => {

  const classes = useStyles();

  const ProjName = useRef()
  const TokenTicker = useRef()
  const OffWebsite = useRef()
  const OtherCex = useRef()
  const Timeline = useRef()
  const Reffer = useRef()
  const ThirdPartyLiss = useRef()
  const ThirdPartyLiq = useRef()

  const [check, setCheck] = useState([])

  const [checkErr, setCheckErr] = useState()

  const [firstErr, setFirstErr] = useState()
  const [secondErr, setSecondErr] = useState()
  const [thirdErr, setThirdErr] = useState()
  const [fourthErr, setFourthErr] = useState()
  const [fifthErr, setFifthErr] = useState()
  const [sixthErr, setSixthErr] = useState()
  const [seventhErr, setSeventhErr] = useState()
  const [eighthErr, setEighthErr] = useState()

  const updateArray = (data) => {
    setCheck([...check, data])
  }

  const formSubmit = async () => {
    try {
      if (ProjName?.current?.value == "") {
        setFirstErr("Please Fill The Data")
      } else if (TokenTicker?.current?.value == "") {
        setSecondErr("Please Fill The Data")
      } else if (OffWebsite?.current?.value == "") {
        setThirdErr("Please Fill The Data")
      } else if (check?.length == 0) {
        setCheckErr("Please Select Any One")
      } else if (OtherCex?.current?.value == "") {
        setFourthErr("Please Fill The Data")
      } else if (Timeline?.current?.value == "") {
        setFifthErr("Please Fill The Data")
      } else if (Reffer?.current?.value == "") {
        setSixthErr("Please Fill The Data")
      } else if (ThirdPartyLiss?.current?.value == "") {
        setSeventhErr("Please Fill The Data")
      } else if (ThirdPartyLiq?.current?.value == "") {
        setEighthErr("Please Fill The Data")
      } else {
        const payload = {
          Project_Name: ProjName?.current?.value,
          Token_Ticker: TokenTicker?.current?.value,
          Website: OffWebsite?.current?.value,
          Nature_Of_Product: check,
          Other_Cex: OtherCex?.current?.value,
          TimeLine: Timeline?.current?.value,
          Referred: Reffer?.current?.value,
          ThirdParty_Listing: ThirdPartyLiss?.current?.value,
          Working_Liquidity: ThirdPartyLiq?.current?.value
        }
        const { data } = await Axios.post(`/users/formSubmit`, payload)
        if (data?.success == true) {
          toast.success(data?.message)
          setTimeout(() => {
            window.location.reload()
          }, 1000)
        } else {
          toast.error(data?.message)
        }
      }
    } catch (error) {
      console.log("🚀 ~ formSubmit ~ error:", error)
    }
  }

  return (
    <div className='application-form'>
      <ToastContainer />
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={0}>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} className='fixed-header'>
            <Item className={classes.headercls}>
              <Header />
            </Item>
          </Grid>

          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <Item className={classes.coinsblock}>
              <div className='back-form'>
                <Link to="/application">  <ArrowBackIcon /> Back</Link>
              </div>
              <div className='general-info'>
                <div className='general-info-box'>
                  <div className='general-info-green-head'>
                    <p>General info</p>
                  </div>
                  <div className='info-field'>
                    <p>1. Project Name<span>*</span></p>

                    <TextField id="standard-size-normal" variant="standard" inputRef={ProjName} onChange={() => { setFirstErr('') }} />
                    {firstErr != '' ? <div style={{ color: 'red', marginTop: '5px' }}>{firstErr}</div> : <></>}
                  </div>

                </div>
                <div className='general-info-box'>

                  <div className='info-field additional-field'>
                    <p>2. Token/Coin Ticker<span>*</span></p>

                    <TextField id="standard-size-normal" variant="standard" inputRef={TokenTicker} onChange={() => { setSecondErr('') }} />
                    {secondErr != '' ? <div style={{ color: 'red', marginTop: '5px' }}>{secondErr}</div> : <></>}
                  </div>

                </div>

                <div className='general-info-box'>

                  <div className='info-field additional-field'>
                    <p>3. Project Offical Website<span>*</span></p>

                    <TextField id="standard-size-normal" variant="standard" inputRef={OffWebsite} onChange={() => { setThirdErr('') }} />
                    {thirdErr != '' ? <div style={{ color: 'red', marginTop: '5px' }}>{thirdErr}</div> : <></>}
                  </div>

                </div>

                <div className='general-info-box'>

                  <div className='info-field additional-field'>
                    <p>4. What is the Nature of the product?<span>*</span></p>
                    <div className='checkbox-tick'>
                      <FormControlLabel control={<Checkbox onClick={() => {
                        setCheckErr('')
                        if (check?.length > 0 && check?.includes('Defi')) {
                          setCheck((current) =>
                            current.filter((fruit) => fruit !== 'Defi')
                          );
                        } else {
                          updateArray('Defi')
                        }
                      }} />} label="DeFi" />
                    </div>
                    <div className='checkbox-tick'>
                      <FormControlLabel control={<Checkbox onClick={() => {
                        setCheckErr('')
                        if (check?.length > 0 && check?.includes('NFT')) {
                          setCheck((current) =>
                            current.filter((fruit) => fruit !== 'NFT')
                          );
                        } else {
                          updateArray('NFT')
                        }
                      }} />} label="NFT" />
                    </div>
                    <div className='checkbox-tick'>
                      <FormControlLabel control={<Checkbox onClick={() => {
                        setCheckErr('')
                        if (check?.length > 0 && check?.includes('Stable Coin')) {
                          setCheck((current) =>
                            current.filter((fruit) => fruit !== 'Stable Coin')
                          );
                        } else {
                          updateArray('Stable Coin')
                        }
                      }} />} label="Stable Coin" />
                    </div>
                    <div className='checkbox-tick'>
                      <FormControlLabel control={<Checkbox onClick={() => {
                        setCheckErr('')
                        if (check?.length > 0 && check?.includes('L1/L2 Protocols')) {
                          setCheck((current) =>
                            current.filter((fruit) => fruit !== 'L1/L2 Protocols')
                          );
                        } else {
                          updateArray('L1/L2 Protocols')
                        }
                      }} />} label="L1/L2 Protocols" />
                    </div>
                    <div className='checkbox-tick'>
                      <FormControlLabel control={<Checkbox onClick={() => {
                        setCheckErr('')
                        if (check?.length > 0 && check?.includes('Dapp')) {
                          setCheck((current) =>
                            current.filter((fruit) => fruit !== 'Dapp')
                          );
                        } else {
                          updateArray('Dapp')
                        }
                      }} />} label="Dapp" />
                    </div>
                    <div className='checkbox-tick'>
                      <FormControlLabel control={<Checkbox onClick={() => {
                        setCheckErr('')
                        if (check?.length > 0 && check?.includes('Currency')) {
                          setCheck((current) =>
                            current.filter((fruit) => fruit !== 'Currency')
                          );
                        } else {
                          updateArray('Currency')
                        }
                      }} />} label="Currency" />
                    </div>
                    <div className='checkbox-tick'>
                      <FormControlLabel control={<Checkbox onClick={() => {
                        setCheckErr('')
                        if (check?.length > 0 && check?.includes('poW Coines')) {
                          setCheck((current) =>
                            current.filter((fruit) => fruit !== 'poW Coines')
                          );
                        } else {
                          updateArray('poW Coines')
                        }
                      }} />} label="poW Coines" />
                    </div>
                    <div className='checkbox-tick'>
                      <FormControlLabel control={<Checkbox onClick={() => {
                        setCheckErr('')
                        if (check?.length > 0 && check?.includes('GameFi/Metaverse')) {
                          setCheck((current) =>
                            current.filter((fruit) => fruit !== 'GameFi/Metaverse')
                          );
                        } else {
                          updateArray('GameFi/Metaverse')
                        }
                      }} />} label="GameFi/Metaverse" />
                    </div>
                    <div className='checkbox-tick'>
                      <FormControlLabel control={<Checkbox onClick={() => {
                        setCheckErr('')
                        if (check?.length > 0 && check?.includes('Others')) {
                          setCheck((current) =>
                            current.filter((fruit) => fruit !== 'Others')
                          );
                        } else {
                          updateArray('Others')
                        }
                      }} />} label="Infrastructure (Bridge, Oracle, EVM, etc)" />
                    </div>
                    {checkErr != "" ? <div style={{ color: 'red', marginTop: '5px' }} >{checkErr}</div> : <></>}

                  </div>

                </div>

                <div className='general-info-box'>

                  <div className='info-field additional-field'>
                    <p>5. Have you been in discussion with other CEXs regarding listings, Please specify:<span>*</span></p>

                    <TextField id="standard-size-normal" variant="standard" inputRef={OtherCex} onChange={() => { setFourthErr('') }} />
                    {fourthErr != '' ? <div style={{ color: 'red', marginTop: '5px' }}>{fourthErr}</div> : <></>}
                  </div>

                </div>

                <div className='general-info-box'>

                  <div className='info-field additional-field'>
                    <p>6.Target timeline for listing:<span>*</span></p>

                    <TextField id="standard-size-normal" variant="standard" inputRef={Timeline} onChange={() => { setFifthErr('') }} />
                    {fifthErr != '' ? <div style={{ color: 'red', marginTop: '5px' }}>{fifthErr}</div> : <></>}
                  </div>

                </div>

                <div className='general-info-box'>

                  <div className='info-field additional-field'>
                    <p>7. Referred by (KuCoin officials, if no please input "N/A"):<span>*</span></p>

                    <TextField id="standard-size-normal" variant="standard" inputRef={Reffer} onChange={() => { setSixthErr('') }} />
                    {sixthErr != '' ? <div style={{ color: 'red', marginTop: '5px' }}>{sixthErr}</div> : <></>}
                  </div>

                </div>

                <div className='general-info-box'>

                  <div className='info-field additional-field'>
                    <p>8. If you are working with any third-party listing agent, please specify:</p>

                    <TextField id="standard-size-normal" variant="standard" inputRef={ThirdPartyLiss} onChange={() => { setSeventhErr('') }} />
                    {seventhErr != '' ? <div style={{ color: 'red', marginTop: '5px' }}>{seventhErr}</div> : <></>}
                  </div>

                </div>

                <div className='general-info-box'>

                  <div className='info-field additional-field'>
                    <p>9. If you are working with any liquidity service providers (market makers), please specify:<span>*</span></p>
                    <p>Recommended MM list please find here:</p>
                    <div className='upload-link'>
                      <Link to="">http/gxuAGDuy.ihhhh</Link>
                    </div>

                    <TextField id="standard-size-normal" variant="standard" inputRef={ThirdPartyLiq} onChange={() => { setEighthErr('') }} />
                    {eighthErr != '' ? <div style={{ color: 'red', marginTop: '5px' }}>{eighthErr}</div> : <></>}
                  </div>

                </div>

                <div className='nxt-btn'>
                  {/* <Link to="/documentupload" variant="contained" className='Start-Application-btn'>Next</Link> */}
                  <Button onClick={() => { formSubmit() }} variant="contained" className='Start-Application-btn'>Next</Button>
                </div>

              </div>
            </Item>

          </Grid>


          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <Item className={classes.footercls}>
              <Footer />
            </Item>
          </Grid>
        </Grid>
      </Box>
    </div>
  )
}

export default ApplicationForm
