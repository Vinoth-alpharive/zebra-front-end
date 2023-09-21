import React, { useEffect, useState } from 'react'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { makeStyles } from '@mui/styles';
import footerbg from '../../images/footer-bg.png'
import './Liquidstaking.css'
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import TextField from '@mui/material/TextField';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ethimg from '../../images/coin-4-2.png'
import Axios from '../../Axios';
import Web3, { ConnectionCloseError } from 'web3';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import erc20ABI from '../../Web3/Abi/erc20.json'
import farmingAbi from '../../Web3/Abi/stakingAbi.json'
import { useRef } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import coinone from '../../images/coins-1.png'
import cointwo from '../../images/coins-2.png'
import 'react-toastify/dist/ReactToastify.css';
import $ from 'jquery';


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
    background: 'transparent !important',
    borderBottom: '1px solid #373c3e',
    '@media (max-width: 991.98px)': {
      padding: '20px 10px !important',
    }
  },
  coinsblock: {
    borderRadius: '0px !important',
    boxShadow: 'none !important',
    padding: '20px 55px !important',
    background: 'transparent !important',
    '@media (max-width: 991.98px)': {
      padding: '20px !important',
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

const Liquidstaking = () => {
  var WEB = new Web3(window.ethereum);
  const classes = useStyles();

  const [liquidity, setLiquidity] = useState('');
  const [proceed, setProceed] = useState(false);
  const [pairs, setpairs] = useState([])
  const [balance, setbalance] = useState()
  const [balance1, setbalance1] = useState()
  const [dis, setDis] = useState(true)

  const [his, sethis] = useState()

  const [selct, setSelct] = useState()

  const firstValue = useRef()
  const [newval, setNewVal] = useState()
  const [newval1, setNewVal1] = useState()


  const handleOpenProceed = () => {
    setProceed(true)
    getBalance()
  }

  const handleCloseProceed = () => {
    setNewVal()
    setProceed(false)
    stakingHistory()
  }

  const sortby = (event) => {
    setLiquidity(event.target.value);
  };

  const selc = async (item) => {
    setSelct(item)
    calc1(item)
  }

  const check = async (pairs1) => {
    try {
      const address = await window.ethereum.request({
        method: "eth_requestAccounts"
      });
      for (let i = 0; i < pairs1?.length; i++) {
        const routeInstance = new WEB.eth.Contract(
          farmingAbi,
          pairs1[i]?.Trade_id?.contractAddress
        );
        const userInfo = await routeInstance.methods.userInfo(Number(pairs1[i]?.Trade_id?.ID), address[0]).call()
        const al = await WEB.utils.fromWei(userInfo.amount, 'ether')
        if (Number(al) > 0) {
          const pendingrews = await routeInstance.methods.pendingReward(pairs1[i]?.Trade_id?.ID, address[0]).call()
          $('.item_' + i).html('<span >' + Number(await WEB.utils.fromWei(pendingrews, 'ether')).toFixed(8) + '</span>');
          setInterval(async () => {

            const pendingrew = await routeInstance.methods.pendingReward(pairs1[i]?.Trade_id?.ID, address[0]).call()
            $('.name_' + i).html('<span >' + Number(await WEB.utils.fromWei(pendingrew, 'ether')).toFixed(8) + '</span>');
          }, 300000);
        }
      }
    } catch (error) {
      console.log(error, "error")
    }


  }

  const getpairs = async () => {
    try {
      const { data } = await Axios.get(`/admin/stakingPairs`)
      if (data?.result?.length > 0) {
        setpairs(data?.result)
        setSelct(data?.result[0])
        calc1(data?.result[0])
        setLiquidity(`${data?.result[0]?.LP_Token_Symbol}/${data?.result[0]?.Reward_Token_Symbol}`)
      }
    } catch (error) {
      console.log("🚀 error:", error)
    }

  }

  const getBalance = async () => {
    try {
      const address = await window.ethereum.request({
        method: "eth_requestAccounts"
      });
      const routeInstance = new WEB.eth.Contract(
        erc20ABI,
        selct?.LP_Token
      );
      const routeInstance1 = new WEB.eth.Contract(
        erc20ABI,
        selct?.Reward_Token
      );
      const bal = await routeInstance.methods.balanceOf(address[0]).call()
      setbalance(parseFloat(await WEB.utils.fromWei(bal, 'ether')).toFixed(2))
      if (parseFloat(await WEB.utils.fromWei(bal, 'ether')).toFixed(2) > 0) {
        setDis(false)
      }
      const bal1 = await routeInstance1.methods.balanceOf(address[0]).call()
      setbalance1(parseFloat(await WEB.utils.fromWei(bal1, 'ether')).toFixed(2))
    } catch (error) {
      console.log(error)
    }

  }

  const stakingHistory = async () => {
    const address = await window.ethereum.request({
      method: "eth_requestAccounts"
    });
    const { data } = await Axios.post(`/auth/stakingHistory`, { address: address[0] })
    if (data?.success === true) {
      data?.result?.forEach(element => {
        const dat = new Date(element?.createdAt).getTime()
        element.lockPeriod = (Number(dat) + (Number(element?.Trade_id?.Lock_Period * 1000)))
        const date = new Date(element.lockPeriod)
        element.lock = date.toLocaleDateString('en-US')
        if (element.lockPeriod > Date.now()) {
          element.status = true
        } else {
          element.status = false
        }
      });
      check(data?.result)
      sethis(data?.result)
    }
  }
  useEffect(() => {
    getpairs()
    stakingHistory()
  }, [])

  const calc1 = async (val) => {
    const va = val?.Lock_Period * await WEB.utils.fromWei(val?.Reward_Per_Sec, "ether") * 1
    setNewVal1(va)
  }

  const calc = async (val) => {
    if (val > 0) {
      const va = selct?.Lock_Period * await WEB.utils.fromWei(selct?.Reward_Per_Sec, "ether") * val
      setNewVal(va)
    } else {
      setNewVal()
    }
  }

  const onSubmit = async () => {
    try {
      const address = await window.ethereum.request({
        method: "eth_requestAccounts"
      });

      const routeInstance = new WEB.eth.Contract(
        farmingAbi,
        selct?.contractAddress
      );
      const routeInstances = new WEB.eth.Contract(
        erc20ABI,
        selct?.LP_Token
      );
      const approve = routeInstances.methods.approve(selct?.contractAddress, firstValue.current.value).send({ from: address[0] })
      if (approve) {
        const deposite = await routeInstance.methods.deposit(0, await WEB.utils.toWei(firstValue.current.value, "ether")).send({
          from: address[0]
        })
        if (deposite) {
          const save = await Axios.post(`/users/createTrade`, {
            Pair: `${selct?.LP_Token_Symbol}_${selct?.Reward_Token_Symbol}`,
            Amount: firstValue.current.value,
            Price: "0",
            User_Address: address[0],
            Trade_type: "staked",
            Trade_At: "Staking",
            Coin_name: `${selct?.LP_Token_Symbol}`,
            Trade_id: selct._id
          })
          if (save?.data?.success === true) {
            setProceed(false)
            getpairs()
            stakingHistory()
            toast.success("Successfully Staked", {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
          } else {
            toast.error("SomeThing Went Wrong", {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
          }

        }
      } else {
        toast.error("Transaction Cancelled", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    } catch (error) {
      console.log(error)
    }
  }

  const unStakes = async (element) => {
    try {
      const address = await window.ethereum.request({
        method: "eth_requestAccounts"
      });
      const routeInstance = new WEB.eth.Contract(
        farmingAbi,
        element?.Trade_id?.contractAddress
      );
      const userInfo = await routeInstance.methods.userInfo(element?.Trade_id?.ID, address[0]).call()
      // const al = await WEB.utils.fromWei(userInfo.amount, 'ether')
      const withdraw = await routeInstance.methods.withdraw(element?.Trade_id?.ID, userInfo.amount).send({ from: address[0] })
      if (withdraw) {
        await Axios.post(`/users/createTrade`, {
          Pair: element?.Pair,
          Amount: await WEB.utils.toWei(userInfo.amount, 'ether'),
          Price: "0",
          User_Address: address[0],
          Trade_type: "unstaked",
          Trade_At: "Staking",
          Coin_name: element?.Coin_name
        })
        stakingHistory()
        toast.success("Un Staked SuccessFully", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='swaping-page liquid-staking-main-body'>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={0}>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <Item className={classes.headercls}>
              <Header />
            </Item>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} id="liquid-staking-id">
            <Item className={classes.coinsblock}>
              <div className='liquid-staking'>
                <div className='liquid-staking-first' id={proceed ? "arrowshow" : ""}>
                  {proceed ? <ArrowBackIcon onClick={handleCloseProceed} /> : ""}
                  <div className='heading-title'>
                    <h4>Liquid Staking</h4>
                    <p>Unlock liquidity while earning rewards</p>
                  </div>
                </div>

                {!proceed &&
                  <div className='liquid-stake'>
                    <div className='heading-title'>
                      <h6>CHOOSE A PAIR TO LIQUID STAKE</h6>
                      <div className='sortby'>
                        <Box sx={{ minWidth: 120 }}>
                          <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label" className='demo-input-label'>Select Pair</InputLabel>
                            <Select
                              labelId="demo-simple-select-label"
                              id="demo-simple-select" className='input-field' value={liquidity}
                              onChange={sortby}
                            >
                              {pairs && pairs?.map((item, index) => {
                                return (
                                  <MenuItem value={`${item?.LP_Token_Symbol}/${item?.Reward_Token_Symbol}`} key={index} onClick={() => selc(item)}>{item?.LP_Token_Symbol}/{item?.Reward_Token_Symbol}</MenuItem>
                                )
                              })}

                            </Select>
                          </FormControl>
                        </Box>
                      </div>
                      <div className='xchange-rate'>
                        <h4>Exchange Rate</h4>
                        <p>1 {`${liquidity?.split('/')[0]}`} = {`${newval1}`} {`${liquidity?.split('/')[1]}`}</p>
                      </div>

                      <div className='xchange-rate'>
                        <h4>Est. APR</h4>
                        <p>3.946%</p>
                      </div>

                    </div>

                    <div className='proceed-btn'>
                      <Button onClick={handleOpenProceed} variant="contained">Proceed</Button>
                    </div>
                  </div>
                }
                {proceed &&

                  < div className='liquid-stake'>
                    <div className='heading-title'>
                      <h6>DEPOSIT AMOUNT</h6>

                      <div className='deposit-amount'>
                        <div className='token-deposit-amount'><div className='token-deposit-amount-left'><label>{selct?.LP_Token_Symbol}</label><ContentCopyIcon /></div><div className='token-deposit-amount-right'><label>Balance:</label><span>{balance}</span></div></div>
                        <div className="deposit-amount-block">
                          <TextField id="outlined-basic" placeholder='0.0' variant="outlined" inputRef={firstValue} onChange={(e) => { calc(e.target.value) }} />
                          <div className="deposit-amount-block-approx"><label>~1,829.28 USD</label></div>
                        </div>
                      </div>

                      <div className='deposit-amount'>
                        <div className='token-deposit-amount'><div className='token-deposit-amount-left'><label>YOU WILL RECEIVE</label></div><div className='token-deposit-amount-right'><label>Balance:</label><span>{balance1}</span></div></div>
                        <div className='balance-receive'>
                          <span className='value-differ-block-identidy'>{newval}</span>
                          <div className='balance-receive-token'>
                            <div className='balance-receive-token-img'><img src={ethimg} alt="eth-img" /></div>
                            <div className='balance-receive-token-name'><label>{selct?.Reward_Token_Symbol}</label></div>
                          </div>
                        </div>
                      </div>

                      <div className='xchange-rate'>
                        <h4>Exchange Rate</h4>
                        <p>1 {selct?.LP_Token_Symbol} = {`${newval1}`}  {selct?.Reward_Token_Symbol}</p>
                      </div>

                      <div className='xchange-rate'>
                        <h4>Est. APR</h4>
                        <p>3.946%</p>
                      </div>

                    </div>

                    <div className='proceed-btn'>
                      <Button variant="contained" disabled={dis} onClick={() => { onSubmit() }} >Proceed</Button>
                    </div>
                  </div>
                }
              </div>



            </Item>
            {
              !proceed &&
              <Item className={classes.coinsblock}>

                <div className='live liquid-staking-table'>
                  <TableContainer component={Paper} className='table-contain'>
                    {/* <Table sx={{ minWidth: 650 }} aria-label="simple table">
                      {
                        his && his?.map((item, index) => {
                          return (
                            <TableBody className='accordion-tab-head' key={index}>
                              <TableCell>
                                <div className='titlename'>
                                  <div className='title-img'>
                                    <img src={coinone} />
                                  </div>
                                  <div className='title-img2'>
                                    <img src={cointwo} />
                                  </div>
                                  <h4>{item?.Pair} LP</h4>
                                </div>
                              </TableCell>

                              <TableCell align="left">
                                <div className='usdt-fifty-td'>
                                  <h4>Amount Deposite</h4>
                                  <div className="doller-value">{item?.Amount}</div>
                                </div>
                              </TableCell>

                              <TableCell align="left">
                                <div className='usdt-fifty-td'>
                                  <h4>Reward Amount</h4>
                                  <div className="doller-value"><span className={`item_${index}`}></span></div>
                                </div>
                              </TableCell>

                              <TableCell align="left">
                                <div className='usdt-fifty-td'>
                                  <h4>Lock Period</h4>
                                  <div className="doller-value">{item?.lock}</div>
                                </div>
                              </TableCell>

                              <TableCell align="left">
                                <div className="usdt-third-td disabled-btn-style">
                                  <Button variant="contained" disabled={item?.status} onClick={() => { unStakes(item) }} >UnStake</Button>
                                </div>
                              </TableCell>

                            </TableBody>
                          )
                        })
                      }


                    </Table> */}

                    <Table sx={{ minWidth: 650 }} aria-label="simple table">

                      {
                        his && his?.map((item, index) => {
                          return (
                            <TableBody className='accordion-tab-head' key={index}>
                              <TableCell>
                                <div className='titlename'>
                                  <div className='title-img'>
                                    <img src={coinone} />
                                  </div>
                                  <div className='title-img2'>
                                    <img src={cointwo} />
                                  </div>
                                  <h4>{item?.Pair} LP</h4>
                                </div>
                              </TableCell>

                              <TableCell align="left">
                                <div className='usdt-fifty-td'>
                                  <h4>Amount Deposite</h4>
                                  <div className="doller-value">{item?.Amount}</div>
                                </div>
                              </TableCell>

                              <TableCell align="left">
                                <div className='usdt-fifty-td'>
                                  <h4>Reward Amount</h4>
                                  <div className="doller-value"><span className={`item_${index}`}></span></div>
                                </div>
                              </TableCell>

                              <TableCell align="left">
                                <div className='usdt-fifty-td'>
                                  <h4>Lock Period</h4>
                                  <div className="doller-value">{item?.lock}</div>
                                </div>
                              </TableCell>

                              <TableCell align="left">
                                <div className="usdt-third-td disabled-btn-style">
                                  <Button variant="contained" disabled={item?.status} onClick={() => { unStakes(item) }}>UnStake</Button>
                                </div>
                              </TableCell>

                            </TableBody>
                          )
                        })
                      }



                    </Table>

                  </TableContainer>
                </div>

              </Item>
            }


          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <Item className={classes.footercls}>
              <Footer />
            </Item>
          </Grid>
        </Grid>
      </Box>
    </div >
  )
}

export default Liquidstaking
