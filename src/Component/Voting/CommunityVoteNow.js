import React, { useState } from 'react'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { makeStyles } from '@mui/styles';
import footerbg from '../../images/footer-bg.png'
import './Voting.css'
import Button from '@mui/material/Button';

import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';

import Stack from '@mui/material/Stack';
import NotInterestedIcon from '@mui/icons-material/NotInterested';
import VerifiedIcon from '@mui/icons-material/Verified';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import PeopleIcon from '@mui/icons-material/People';
import HowToVoteIcon from '@mui/icons-material/HowToVote';

import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Checkbox from '@mui/material/Checkbox';
import AssessmentIcon from '@mui/icons-material/Assessment';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Axios from '../../Axios';

import erc20Abi from '../../Web3/Abi/erc20.json'
import votingAbi from '../../Web3/Abi/governanceAbi.json'
import governanceAddress from '../../Web3/ContractAddress/governanceAddress'
import Web3 from 'web3';

import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.mode === 'light' ? '#1a90ff' : '#308fe8',
  },
}));



function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

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
  bgtrans: {
    borderRadius: '0px !important',
    boxShadow: 'none !important',
    background: 'transparent !important',
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

const CommunityVoteNow = () => {

  const classes = useStyles();
  var WEB = new Web3(window.ethereum);
  const location = useLocation()

  const [value, setValue] = useState(0);
  const [core, setCore] = useState(0);
  const [community, setCommunity] = useState(0);
  const [allTabs, setAllTabs] = useState(0);
  const [data, setdata] = useState()
  const [dts, setdt] = useState()
  const [vot, setvot] = useState()
  const [count, setCount] = useState(0)

  const [owner, setowner] = useState()
  const [snapshot, setSnapshot] = useState()

  const [winper, setWinPer] = useState(0)
  const [lossper, setLossPer] = useState(0)

  const [wincount, setWincount] = useState(0)
  const [losscount, setlosscount] = useState(0)


  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleCoreChange = (event, newValue) => {
    setCore(newValue);
  };

  const handleCommunityChange = (event, newValue) => {
    setCommunity(newValue);
  };

  const handleAllTabsChange = (event, newValue) => {
    setAllTabs(newValue);
  };
  const getData = async (id) => {
    try {
      const address = await window.ethereum.request({
        method: "eth_requestAccounts"
      });
      const datasss = await Axios.post(`users/VoteById`, { id: id })
      if (datasss?.data?.success === true) {
        setdata(datasss?.data?.result)
        setCount(datasss?.data?.result?.voteList?.length)
        const VotingInstance = new WEB.eth.Contract(
          votingAbi,
          governanceAddress
        );
        const own = await VotingInstance.methods.proposalProposer(id).call({ from: address[0] })
        const snap = await VotingInstance.methods.proposalSnapshot(id).call({ from: address[0] })
        setSnapshot(snap.toString())
        setowner(own)
        const win = datasss?.data?.result?.count1
        const loss = datasss?.data?.result?.count2
        if (win > 0) {
          const perw = (win / (win + loss)) * 100
          setWinPer(perw)
        }
        if (loss > 0) {
          const pwel = (loss / (win + loss)) * 100
          setLossPer(pwel)
        }
        setWincount(win)
        setlosscount(loss)
      }
    } catch (error) {
      console.log("error:", error)
    }
  }
  const Vote = async () => {
    try {
      const address = await window.ethereum.request({
        method: "eth_requestAccounts"
      });
      if (vot === undefined) {
        toast.error("Please Select Any One Choice", {
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

        const VotingInstance = new WEB.eth.Contract(
          votingAbi,
          governanceAddress
        );
        console.log(vot, "asfd")
        var voteid;
        if (vot === "0") {
          voteid = 1
        } else {
          voteid = 0
        }
        const vote = await VotingInstance.methods.castVote(dts, voteid).send({ from: address[0] })
        if (vote) {
          const dt = await Axios.post(`users/Vote`,
            {
              vote_id: data?.Proposal_Id,
              vote_for: vot,
              Address: address[0]
            })

          if (dt?.data?.success === true) {
            toast.success("Vote Submitted Successfully", {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
            getData(dts)
          } else {
            toast.error(dt?.data?.message, {
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
        else {
          toast.error("User Cancelled Voting", {
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
      console.log("🚀  error:", error)
    }

  }
  useEffect(() => {
    setdt(location?.state?.data)
    getData(location?.state?.data)
    console.log("🚀 ~ file: CommunityVoteNow.js:171 ~ useEffect ~ location?.state?.data:", location?.state?.data)

  }, [location])

  return (
    <div className='community-page'>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={0}>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <Item className={classes.headercls}>
              <Header />
            </Item>
          </Grid>

          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>

            <Grid container spacing={0} className={classes.coinfourblock} id="main-top-container">

              <div className='vsc-tab-cmn-left community-detail-page'>
                <Stack direction="row" spacing={2}>
                  <Button variant="contained" startIcon={<HowToVoteIcon />}>Vote Now</Button>
                  <div class="community-btn-style">
                    <Button variant="outlined" href="#contained-buttons" startIcon={<PeopleIcon />}>
                      Community
                    </Button>
                  </div>
                </Stack>
                <h2>{data?.Title}</h2>
              </div>

            </Grid>

          </Grid>

          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>

            <Grid container spacing={0} className={classes.coinfourblock} id="voting-list-id">

              <Grid item xs={12} sm={12} md={12} lg={8} xl={8} id="voting-list-id-left">
                <Item className={classes.bgtrans}>

                  <div className='vsc-tab-cmn-left community-detail-page'>

                    <div class="Choices Cast-your-vote">
                      <strong>Cast your vote</strong>
                      <div class="Choices-inner Cast-your-vote-inner">
                        <FormControl>
                          <RadioGroup
                            aria-labelledby="demo-radio-buttons-group-label"
                            defaultValue="female"
                            name="radio-buttons-group"
                            onChange={(e) => { setvot(e.target.value) }}
                          >
                            <FormControlLabel value={0} control={<Radio />} label={data?.Choice1} />
                            <FormControlLabel value={1} control={<Radio />} label={data?.Choice2} />
                          </RadioGroup>
                        </FormControl>
                      </div>

                      <Button variant="contained" className='cast-vote' onClick={() => { Vote() }} >
                        Cast Vote
                      </Button>
                    </div>

                  </div>

                  <div class="Choices Cast-your-vote voting-list-block">
                    <strong>Votes <span>({count})</span></strong>
                    <div className='outer-vote-list-all' >
                      {data?.voteList?.map((item, index) => {
                        return (
                          < div className='vote-list-single' key={index} >
                            {/* <div className='vote-list-single-addrss'><Link>{item?.Address} <AssessmentIcon /></Link></div> */}
                            <div className='vote-list-single-addrss'>{item?.Address} <AssessmentIcon /></div>
                            <div className='vote-list-single-status'>{item?.vote}</div>
                            <div className='vote-list-single-count'>65,141.414 <Link><OpenInNewIcon /></Link></div>
                          </div>
                        )
                      })}

                    </div>
                  </div>
                </Item>
              </Grid>

              <Grid item xs={12} sm={12} md={12} lg={4} xl={4} id="voting-list-id-right" className='voting-list-id-right-cls-votenow'>
                <Item className={classes.bgtrans}>

                  <div class="Choices Cast-your-vote voting-list-block details-list">
                    <strong>Details</strong>
                    <div className='flex-box-ics-outer'>
                      <div className='flex-box-ics'><label>Identifier</label><div className='vote-list-single-count'>65,141.414 <Link><OpenInNewIcon /></Link></div></div>
                      <div className='flex-box-ics'><label>Creator</label><div className='vote-list-single-addrss'><Link>{`${owner?.slice(0, 7)}...${owner?.slice(36, 42)}`} <AssessmentIcon /></Link></div></div>
                      <div className='flex-box-ics'><label>Snapshot</label><div className='vote-list-single-addrss'><Link>{snapshot} <AssessmentIcon /></Link></div></div>

                      <div className='vote-now-box'>
                        <div className='vsc-tab-cmn-left community-detail-page'>
                          <Button variant="contained" startIcon={<HowToVoteIcon />}>Vote Now</Button>
                        </div>
                        <div className='start-end-date-flex'>
                          <span>Start Date</span> {data?.Start_Date} {data?.Start_Time}
                        </div>
                        <div className='start-end-date-flex'>
                          <span>End Date</span>{data?.End_Date} {data?.End_Time}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="Choices Cast-your-vote voting-list-block Current-Results">
                    <strong>Current Results</strong>

                    <div className='yes-no-votes-outer'>

                      <div className='yes-no-votes'>
                        <label>{data?.Choice1}</label>
                        <div><BorderLinearProgress variant="determinate" value={winper} /></div>
                        <div className='vote-count-percentage'><label><span>{wincount}</span> Votes</label><span className='vote-percent'>{parseInt(winper) !== NaN ? parseInt(winper) : 0}%</span></div>
                      </div>

                      <div className='yes-no-votes'>
                        <label>{data?.Choice2}</label>
                        <div><BorderLinearProgress variant="determinate" value={lossper} /></div>
                        <div className='vote-count-percentage'><label><span>{losscount}</span> Votes</label><span className='vote-percent'>{parseInt(lossper) !== NaN ? parseInt(lossper) : 0}%</span></div>
                      </div>
                    </div>
                  </div>
                </Item>
              </Grid>
            </Grid>
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

export default CommunityVoteNow
