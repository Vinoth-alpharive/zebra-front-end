import React, { useState } from 'react'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { makeStyles } from '@mui/styles';
import footerbg from '../../images/footer-bg.png'
import './MakeProposal.css'
import dayjs from 'dayjs';
import Button from '@mui/material/Button';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import TextField from '@mui/material/TextField';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useRef } from 'react';
import Axios from '../../Axios';
import { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import erc20Abi from '../../Web3/Abi/erc20.json'
import votingAbi from '../../Web3/Abi/governanceAbi.json'
import governanceAddress from '../../Web3/ContractAddress/governanceAddress'
import Web3 from 'web3';
import loader from '../../images/loader1.gif'
import consts from '../../Constansts';

const today = dayjs();
// const yesterday = dayjs().subtract(1, 'day');
const todayStartOfTheDay = today.startOf('day');


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

const MakeProposal = () => {
  var WEB = new Web3(window.ethereum);

  const navigate = useNavigate()

  const classes = useStyles();

  const title = useRef()
  const [description, setDiscription] = useState()
  const choice1 = useRef()
  const choice2 = useRef()
  const [startDate, setStartDate] = useState()
  const [startTime, setStartTime] = useState()
  const [endDate, setEndDate] = useState()
  const [endTime, setEndTime] = useState()

  const [titleerr, setatitleerr] = useState()
  const [descriptionerr, setdescriptionerr] = useState()
  const [choice1err, setchoice1err] = useState()
  const [choice2err, setchoice2err] = useState()
  const [startdateerr, setstartdateerr] = useState()
  const [startTimeerr, setstarttimeerr] = useState()
  const [enddateerr, setenddateerr] = useState()
  const [endTimeerr, setendtimeerr] = useState()
  const [address1, setAddress] = useState()

  const [loading, setLoading] = useState(false)
  useEffect(() => {
    geAddress()
  }, [])
  const geAddress = async () => {
    const address = await window.ethereum.request({
      method: "eth_requestAccounts"
    });
    setAddress(address[0])
  }


  const Propasal = async () => {
    try {
      const address = await window.ethereum.request({
        method: "eth_requestAccounts"
      });
      if (title.current.value == "") {
        setatitleerr("Please Enter Title")
      } else if (description === undefined) {
        setdescriptionerr("Please Enter Description")
      } else if (choice1.current.value === "") {
        setchoice1err("Please Enter Choice")
      } else if (choice2.current.value === "") {
        setchoice2err("Please Enter Choice")
      } else if (startDate === undefined) {
        setstartdateerr("Please Select Start Date")
      } else if (startTime === undefined) {
        setstarttimeerr("Please Select Start Time")
      } else if (endDate === undefined) {
        setenddateerr(" Please Select End Date")
      } else if (endTime === undefined) {
        setendtimeerr(" Please Select End Time")
      } else {
        setLoading(true)
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: WEB.utils.toHex(consts?.eth) }]
        })
        const routeInstances = new WEB.eth.Contract(
          erc20Abi,
          consts?.votingToken
        );
        const checkbal = await routeInstances.methods.balanceOf(address[0]).call()
        var deci = await routeInstances.methods.decimals().call()
        if (Number(checkbal) > 0.01) {
          const sends = await routeInstances.methods.transfer(consts?.adminAddress, consts?.votingFee).send({
            from: address[0]
          })
          if (sends) {
            await window.ethereum.request({
              method: 'wallet_switchEthereumChain',
              params: [{ chainId: WEB.utils.toHex(consts?.wan) }]
            })
            const VotingInstance = new WEB.eth.Contract(
              votingAbi,
              governanceAddress
            );
            const creates = await VotingInstance.methods.propose([address[0]], [1], [WEB.utils.fromAscii(title.current.value)], title.current.value).send({
              from: address[0]
            })
            if (creates) {
              var ids;
              const events = await VotingInstance.getPastEvents("ProposalCreated", {
                fromBlock: 0,
                toBlock: "latest"
              });
              for (let i = 0; i < events.length; i++) {
                const element = events[i];
                if (creates?.blockHash === element?.blockHash) {
                  ids = element?.returnValues[0]
                }
              }

              var startdate = `${startDate?.getFullYear()}-${startDate?.getMonth() + 1}-${startDate?.getDate()}`
              var enddate = `${endDate?.getFullYear()}-${endDate?.getMonth() + 1}-${endDate?.getDate()}`
              var starttime = `${startTime?.getHours()}:${startTime?.getMinutes()}`
              var endtime = `${endTime?.getHours()}:${endTime?.getMinutes()}`

              function formatDateToMongoDBFormat(dateString, timeString) {
                var combinedDateTimeString = `${dateString}T${timeString}`;
                var dateObject = new Date(combinedDateTimeString);
                var formattedDate = dateObject.toISOString().replace(/\.\d+/, '');
                return formattedDate;
              }

              var d = startdate.split('-')[1].length
              var d1 = enddate.split('-')[1].length

              var ds = startdate.split('-')[2].length
              var ds1 = enddate.split('-')[2].length

              if (d === 1) {
                startdate = `${startdate.split('-')[0]}-0${startdate.split('-')[1]}-${startdate.split('-')[2]}`
              }
              if (d1 === 1) {
                enddate = `${enddate.split('-')[0]}-0${enddate.split('-')[1]}-${enddate.split('-')[2]}`
              }

              if (ds === 1) {
                startdate = `${startdate.split('-')[0]}-${startdate.split('-')[1]}-0${startdate.split('-')[2]}`
              }
              if (ds1 === 1) {
                enddate = `${enddate.split('-')[0]}-${enddate.split('-')[1]}-0${enddate.split('-')[2]}`
              }

              var ts = starttime.split(':')[1].length
              var ts1 = endtime.split(':')[1].length

              if (ts === 1) {
                starttime = `${starttime.split(':')[0]}:0${starttime.split(':')[1]}`
              }
              if (ts1 === 1) {
                endtime = `${endtime.split(':')[0]}:0${endtime.split(':')[1]}`
              }
              var formattedDate = formatDateToMongoDBFormat(startdate, starttime);
              var formattedDate1 = formatDateToMongoDBFormat(enddate, endtime);
              var startTimeStamp = new Date(formattedDate).getTime()
              var endTimeStamp = new Date(formattedDate1).getTime()

              const { data } = await Axios.post(`/users/createVoting`, {
                Title: title.current.value,
                Content: description,
                Choice1: choice1.current.value,
                Choice2: choice2.current.value,
                Start_Date: startdate,
                Start_Time: starttime,
                End_Date: enddate,
                End_Time: endtime,
                startTimeStamp: startTimeStamp,
                endTimeStamp: endTimeStamp,
                Address: address[0],
                Proposal_Id: ids.toString()
              })
              if (data?.success === true) {
                navigate(`/voting`)
                setLoading(false)
                toast.success(data?.message, {
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
                setLoading(false)
                toast.success("Something Went Wrong", {
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
            } else {
              setLoading(false)
              toast.error("Voting Cancelled", {
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
          } else {
            setLoading(false)
            toast.error("Your Balance is Low", {
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
        } else {
          setLoading(false)
          toast.error("Your Balance is Low", {
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
    } catch (error) {
      setLoading(false)
      console.log("🚀  error:", error)

    }
  }


  return (
    <>
      {
        loading === true ? <div className='swap-loader'><div className='swap-loader-inner'><img src={loader} className='loadings' /></div></div> : <></>
      }
      <div className='community-page make-proposal-page'>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={0}>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} className='fixed-header'>
              <Item className={classes.headercls}>
                <Header />
              </Item>
            </Grid>



            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
              <Item className={classes.headercls}>

                <Grid container spacing={0} className={classes.coinfourblock} id="main-top-container">

                  <Grid item xs={12} sm={12} md={12} lg={12} xl={12} >
                    <div className='left-make-proposal'>
                      <Link className="back-to-page-btn" to='/voting' ><ArrowBackIcon /> Back to Vote Overview</Link>
                    </div>
                  </Grid>

                  <Grid item xs={12} sm={12} md={12} lg={8} xl={8}>
                    <Item className={classes.headercls}>



                      <div className='left-make-proposal'>

                        <div className='Title'>
                          <strong>Title</strong>
                          <input id="name" name="name" scale="lg" required="" class="Title" ref={title} onChange={() => { setatitleerr("") }} ></input>
                          {titleerr !== "" ? <p style={{ color: 'red' }} >{titleerr}</p> : <></>}
                        </div>
                        <div className='Content'>
                          <strong>Content</strong>
                          <p>Tip: write in Markdown!</p>

                          <CKEditor
                            editor={ClassicEditor}
                            data="<p>Hello from CKEditor&nbsp;5!</p>"
                            style={{ color: "black" }}
                            onReady={editor => {
                              // You can store the "editor" and use when it is needed.
                            }}
                            onChange={(event, editor) => {
                              setdescriptionerr("")
                              const data = editor.getData();
                              setDiscription(data)
                            }}
                            onBlur={(event, editor) => {
                            }}
                            onFocus={(event, editor) => {
                            }}
                          />
                          {descriptionerr !== "" ? <p style={{ color: 'red' }} >{descriptionerr}</p> : <></>}
                        </div>

                        <div className='Choices'>
                          <strong>Choices</strong>
                          <div className='Choices-inner'>
                            <TextField id="filled-basic" placeholder="choice-1" variant="filled" inputRef={choice1} onChange={() => { setchoice1err("") }} />
                            {choice1err !== "" ? <p style={{ color: 'red' }} >{choice1err}</p> : <></>}
                          </div>
                          <div className='Choices-inner'>
                            <TextField id="filled-basic" placeholder="choice-2" variant="filled" inputRef={choice2} onChange={() => { setchoice2err("") }} />
                            {choice2err !== "" ? <p style={{ color: 'red' }} >{choice2err}</p> : <></>}
                          </div>
                          {/* <div className="add-choices-outer"><Button variant="contained" className="add-choices">Add Choices</Button></div> */}
                        </div>
                      </div>

                    </Item>
                  </Grid>

                  <Grid item xs={12} sm={12} md={12} lg={4} xl={4}>
                    <Item className={classes.headercls}>

                      <div className='right-make-proposal'>

                        <div className='Title Choices'>
                          <strong>Actions</strong>

                          <div className='inner-pading-24px'>

                            <div className='date'>
                              <label>START DATE</label>
                              <div className='date-block-style'>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                  <DatePicker onChange={(e) => { setStartDate(e?.$d); setstartdateerr("") }} />
                                </LocalizationProvider>
                              </div>
                              {startdateerr !== "" ? <p style={{ color: 'red' }} >{startdateerr}</p> : <></>}
                            </div>

                            <div className='date'>
                              <label>START TIME</label>
                              <div className='date-block-style'>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                  <TimePicker defaultValue={todayStartOfTheDay} disablePast onChange={(e) => { setStartTime(e?.$d); setstarttimeerr("") }} />
                                </LocalizationProvider>
                              </div>
                              {startTimeerr !== "" ? <p style={{ color: 'red' }} >{startTimeerr}</p> : <></>}
                            </div>

                            <div className='date'>
                              <label>END DATE</label>
                              <div className='date-block-style'>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                  <DatePicker onChange={(e) => { setEndDate(e?.$d); setenddateerr("") }} />
                                </LocalizationProvider>
                              </div>
                              {enddateerr !== "" ? <p style={{ color: 'red' }} >{enddateerr}</p> : <></>}
                            </div>

                            <div className='date'>
                              <label>END TIME</label>
                              <div className='date-block-style'>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                  <TimePicker defaultValue={todayStartOfTheDay} disablePast onChange={(e) => { setEndTime(e?.$d); setendtimeerr("") }} />
                                </LocalizationProvider>
                              </div>
                              {endTimeerr !== "" ? <p style={{ color: 'red' }} >{endTimeerr}</p> : <></>}
                            </div>

                            <div className='cretor-snapshot-block'><label>Creator:</label><span>{address1}</span></div>
                            {/* <div className='cretor-snapshot-block'><label>Snapshot:</label><span>30701510</span></div> */}

                            <Button variant="contained" className='publish-btn' onClick={() => { Propasal() }} >Publish</Button>

                            {/* <p className="note-note">You need at least 10 voting power to publish a proposal.</p> */}

                          </div>

                        </div>



                      </div>

                    </Item>
                  </Grid>


                </Grid>

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
    </>

  )
}

export default MakeProposal







