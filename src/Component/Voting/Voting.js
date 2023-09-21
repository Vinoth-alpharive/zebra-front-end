import React, { useEffect, useState } from 'react'
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
import { useNavigate } from 'react-router-dom';
import HowToVoteIcon from '@mui/icons-material/HowToVote';
import Axios from '../../Axios';

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

const Voting = () => {

  const classes = useStyles();
  const navigate = useNavigate()

  const [value, setValue] = useState(0);
  const [core, setCore] = useState(0);
  const [community, setCommunity] = useState(0);
  const [allTabs, setAllTabs] = useState(0);
  const [data, setdata] = useState([])

  const [val, setVal] = useState("all")

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleCoreChange = (event, newValue) => {
    setCore(newValue);
    if (newValue === 0) {
      setVal("all")
    } else if (newValue === 1) {
      setVal("soon")
    } else {
      setVal("closed")
    }
  };

  const handleCommunityChange = (event, newValue) => {
    setCommunity(newValue);
  };

  const handleAllTabsChange = (event, newValue) => {
    setAllTabs(newValue);
  };

  const getData = async () => {
    try {
      const { data } = await Axios.post(`users/getVotings`, { id: val })
      if (data?.success === true) {
        setdata(data?.result)
      }
    } catch (error) {
      console.log("error:", error)
    }
  }

  useEffect(() => {
    getData()
  }, [val])

  useEffect(() => {
    getData()
  }, [])

  return (
    <div className='voting-page'>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={0}>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <Item className={classes.headercls}>
              <Header />
            </Item>
          </Grid>

          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <Item className={classes.cryptobannercls} id="bd-img-breadcum">
              <Box sx={{ flexGrow: 1 }}>

                <Grid container spacing={0} className={classes.coinfourblock}>


                  <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                    <div className='crypto-banner-txt applctn-banner-txt Voting-block'>
                      <h2>Voting</h2>
                      <p>Have your say in the future of the Zebra Exchange Ecosystem</p>
                      <Button onClick={() => navigate('/makeproposal')} className='make-proposal-btn' variant="contained">Make a proposal</Button>
                    </div>
                  </Grid>

                  <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>

                  </Grid>

                </Grid>

              </Box>
            </Item>
          </Grid>

          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} id="voting-mid-body-outer">
            <Item id="voting-mid-body-inner">

              <Grid container spacing={0} className={classes.coinfourblock} id="voting-id-body">

                <Box sx={{ width: '100%' }} className="cca-outer-tab">
                  <Box sx={{ borderBottom: 1, borderColor: 'divider' }} className="cca-outer">
                    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                      <Tab label="Core" {...a11yProps(0)} />
                      <Tab label="Community" {...a11yProps(1)} />
                      <Tab label="All" {...a11yProps(2)} />
                    </Tabs>
                  </Box>


                  <CustomTabPanel value={value} index={0}>
                    <Box sx={{ width: '100%' }}>
                      <Box sx={{ borderBottom: 1, borderColor: 'divider' }} className='vsc-outer'>
                        <Tabs value={core} onChange={handleCoreChange} aria-label="basic tabs example">
                          <Tab label="Vote Now" {...a11yProps(0)} />
                          <Tab label="Soon" {...a11yProps(1)} />
                          <Tab label="Closed" {...a11yProps(2)} />
                        </Tabs>
                      </Box>

                      <CustomTabPanel value={core} index={0}>
                        {data && data?.map((item, index) => {
                          return (
                            <div className='vsc-tab-cmn vote-now-block' key={index} onClick={() => { navigate(`/communityvotenow`, { state: { data: item?.Proposal_Id } }) }} >
                              <div className='vsc-tab-cmn-left'>
                                <strong>{item?.Title}</strong>
                                <p className='vsc-tab-cmn-duration'>Ended {item?.End_Date}  {item?.End_Time}</p>
                                <Stack direction="row" spacing={2}>
                                  <Button variant="contained" startIcon={<HowToVoteIcon />}>Vote Now</Button>
                                  <Button variant="outlined" href="#contained-buttons" startIcon={<VerifiedIcon />}>
                                    Core
                                  </Button>
                                </Stack>
                              </div>

                              <div className='vsc-tab-cmn-right'>
                                <ArrowForwardIcon />
                              </div>
                            </div>
                          )
                        })}


                      </CustomTabPanel>

                      <CustomTabPanel value={core} index={1}>
                        {data && data?.map((item, index) => {
                          return (
                            <div className='vsc-tab-cmn vote-now-block' key={index} onClick={() => { navigate(`/core`, { state: { data: item?.Proposal_Id } }) }} >
                              <div className='vsc-tab-cmn-left'>
                                <strong>{item?.Title}</strong>
                                <p className='vsc-tab-cmn-duration'>Ended {item?.End_Date}  {item?.End_Time}</p>
                                <Stack direction="row" spacing={2}>
                                  <Button variant="contained" startIcon={<HowToVoteIcon />}>Vote Now</Button>
                                  <Button variant="outlined" href="#contained-buttons" startIcon={<VerifiedIcon />}>
                                    Core
                                  </Button>
                                </Stack>
                              </div>

                              <div className='vsc-tab-cmn-right'>
                                <ArrowForwardIcon />
                              </div>
                            </div>
                          )
                        })}
                      </CustomTabPanel>

                      <CustomTabPanel value={core} index={2}>
                        {data && data?.map((item, index) => {
                          return (
                            <div className='vsc-tab-cmn vote-now-block' key={index} onClick={() => { navigate(`/communityClosed`, { state: { data: item?.Proposal_Id } }) }} >
                              <div className='vsc-tab-cmn-left'>
                                <strong>{item?.Title}</strong>
                                <p className='vsc-tab-cmn-duration'>Ended {item?.End_Date}  {item?.End_Time}</p>
                                <Stack direction="row" spacing={2}>
                                  <Button variant="contained" startIcon={<HowToVoteIcon />}>Vote Now</Button>
                                  <Button variant="outlined" href="#contained-buttons" startIcon={<VerifiedIcon />}>
                                    Core
                                  </Button>
                                </Stack>
                              </div>

                              <div className='vsc-tab-cmn-right'>
                                <ArrowForwardIcon />
                              </div>
                            </div>
                          )
                        })}
                      </CustomTabPanel>

                    </Box>
                  </CustomTabPanel>



                  <CustomTabPanel value={value} index={1}  >
                    {/* <Box sx={{ width: '100%' }}>

                      <Box sx={{ borderBottom: 1, borderColor: 'divider' }} className='vsc-outer'>
                        <Tabs value={community} onChange={handleCommunityChange} aria-label="basic tabs example">
                          <Tab label="Vote Now" {...a11yProps(0)} />
                          <Tab label="Soon" {...a11yProps(1)} />
                          <Tab label="Closed" {...a11yProps(2)} />
                        </Tabs>

                      </Box>

                      <CustomTabPanel value={community} index={0}>

                        <div className='vsc-tab-cmn vote-now-block' onClick={() => navigate('/communityvotenow')}>
                          <div className='vsc-tab-cmn-left'>
                            <strong>Proposal for Adjustments to Farm Rewards - vote community</strong>
                            <p className='vsc-tab-cmn-duration'>Ended Aug 5th, 2023 14:00</p>
                            <Stack direction="row" spacing={2}>
                              <Button variant="contained" startIcon={<HowToVoteIcon />}>Vote Now</Button>
                              <div class="community-btn-style">
                                <Button variant="outlined" href="#contained-buttons" startIcon={<PeopleIcon />}>
                                  Community
                                </Button>
                              </div>
                            </Stack>
                          </div>

                          <div className='vsc-tab-cmn-right'>
                            <ArrowForwardIcon />
                          </div>
                        </div>

                        <div className='vsc-tab-cmn vote-now-block' onClick={() => navigate('/communityvotenow')}>
                          <div className='vsc-tab-cmn-left'>
                            <strong>Proposal for Adjustments to Farm Rewards - vote community</strong>
                            <p className='vsc-tab-cmn-duration'>Ended Aug 5th, 2023 14:00</p>
                            <Stack direction="row" spacing={2}>
                              <Button variant="contained" startIcon={<HowToVoteIcon />}>Vote Now</Button>
                              <div class="community-btn-style">
                                <Button variant="outlined" href="#contained-buttons" startIcon={<PeopleIcon />}>
                                  Community
                                </Button>
                              </div>
                            </Stack>
                          </div>

                          <div className='vsc-tab-cmn-right'>
                            <ArrowForwardIcon />
                          </div>
                        </div>

                      </CustomTabPanel>

                      <CustomTabPanel value={community} index={1}>
                        <div className='vsc-tab-cmn vote-now-block'>
                          <div className='vsc-tab-cmn-left'>
                            <strong>Proposal for Adjustments to Farm Rewards</strong>
                            <p className='vsc-tab-cmn-duration'>Ended Aug 5th, 2023 14:00</p>
                            <Stack direction="row" spacing={2}>
                              <Button variant="contained" disabled startIcon={<NotInterestedIcon />}>
                                Closed
                              </Button>
                              <div class="community-btn-style">
                                <Button variant="outlined" href="#contained-buttons" startIcon={<PeopleIcon />}>
                                  Community
                                </Button>
                              </div>
                            </Stack>
                          </div>

                          <div className='vsc-tab-cmn-right'>
                            <ArrowForwardIcon />
                          </div>
                        </div>
                        <div className='vsc-tab-cmn vote-now-block'>
                          <div className='vsc-tab-cmn-left'>
                            <strong>Proposal for Adjustments to Farm Rewards</strong>
                            <p className='vsc-tab-cmn-duration'>Ended Aug 5th, 2023 14:00</p>
                            <Stack direction="row" spacing={2}>
                              <Button variant="contained" disabled startIcon={<NotInterestedIcon />}>
                                Closed
                              </Button>
                              <div class="community-btn-style">
                                <Button variant="outlined" href="#contained-buttons" startIcon={<PeopleIcon />}>
                                  Community
                                </Button>
                              </div>
                            </Stack>
                          </div>

                          <div className='vsc-tab-cmn-right'>
                            <ArrowForwardIcon />
                          </div>
                        </div>
                      </CustomTabPanel>

                      <CustomTabPanel value={community} index={2}>
                        <div className='vsc-tab-cmn vote-now-block'>
                          <div className='vsc-tab-cmn-left'>
                            <strong>Proposal for Adjustments to Farm Rewards</strong>
                            <p className='vsc-tab-cmn-duration'>Ended Aug 5th, 2023 14:00</p>
                            <Stack direction="row" spacing={2}>
                              <Button variant="contained" disabled startIcon={<NotInterestedIcon />}>
                                Closed
                              </Button>
                              <div class="community-btn-style">
                                <Button variant="outlined" href="#contained-buttons" startIcon={<PeopleIcon />}>
                                  Community
                                </Button>
                              </div>
                            </Stack>
                          </div>

                          <div className='vsc-tab-cmn-right'>
                            <ArrowForwardIcon />
                          </div>
                        </div>
                        <div className='vsc-tab-cmn vote-now-block'>
                          <div className='vsc-tab-cmn-left'>
                            <strong>Proposal for Adjustments to Farm Rewards</strong>
                            <p className='vsc-tab-cmn-duration'>Ended Aug 5th, 2023 14:00</p>
                            <Stack direction="row" spacing={2}>
                              <Button variant="contained" disabled startIcon={<NotInterestedIcon />}>
                                Closed
                              </Button>
                              <div class="community-btn-style">
                                <Button variant="outlined" href="#contained-buttons" startIcon={<VerifiedIcon />}>
                                  Community
                                </Button>
                              </div>
                            </Stack>
                          </div>

                          <div className='vsc-tab-cmn-right'>
                            <ArrowForwardIcon />
                          </div>
                        </div>
                      </CustomTabPanel>

                    </Box> */}
                    <div className='coming-soon-style'><span>Comming Soon!!!</span></div>
                  </CustomTabPanel>


                  <CustomTabPanel value={value} index={2}>
                    <Box sx={{ width: '100%' }}>
                      <Box sx={{ borderBottom: 1, borderColor: 'divider' }} className='vsc-outer'>
                        <Tabs value={core} onChange={handleCoreChange} aria-label="basic tabs example">
                          <Tab label="Vote Now" {...a11yProps(0)} />
                          <Tab label="Soon" {...a11yProps(1)} />
                          <Tab label="Closed" {...a11yProps(2)} />
                        </Tabs>
                      </Box>

                      <CustomTabPanel value={core} index={0}>
                        {data && data?.map((item, index) => {
                          return (
                            <div className='vsc-tab-cmn vote-now-block' key={index} onClick={() => { navigate(`/communityvotenow`, { state: { data: item?.Proposal_Id } }) }} >
                              <div className='vsc-tab-cmn-left'>
                                <strong>{item?.Title}</strong>
                                <p className='vsc-tab-cmn-duration'>Ended {item?.End_Date}  {item?.End_Time}</p>
                                <Stack direction="row" spacing={2}>
                                  <Button variant="contained" startIcon={<HowToVoteIcon />}>Vote Now</Button>
                                  <Button variant="outlined" href="#contained-buttons" startIcon={<VerifiedIcon />}>
                                    Core
                                  </Button>
                                </Stack>
                              </div>

                              <div className='vsc-tab-cmn-right'>
                                <ArrowForwardIcon />
                              </div>
                            </div>
                          )
                        })}


                      </CustomTabPanel>

                      <CustomTabPanel value={core} index={1}>
                        {data && data?.map((item, index) => {
                          return (
                            <div className='vsc-tab-cmn vote-now-block' key={index} onClick={() => { navigate(`/core`, { state: { data: item?.Proposal_Id } }) }} >
                              <div className='vsc-tab-cmn-left'>
                                <strong>{item?.Title}</strong>
                                <p className='vsc-tab-cmn-duration'>Ended {item?.End_Date}  {item?.End_Time}</p>
                                <Stack direction="row" spacing={2}>
                                  <Button variant="contained" startIcon={<HowToVoteIcon />}>Vote Now</Button>
                                  <Button variant="outlined" href="#contained-buttons" startIcon={<VerifiedIcon />}>
                                    Core
                                  </Button>
                                </Stack>
                              </div>

                              <div className='vsc-tab-cmn-right'>
                                <ArrowForwardIcon />
                              </div>
                            </div>
                          )
                        })}
                      </CustomTabPanel>

                      <CustomTabPanel value={core} index={2}>
                        {data && data?.map((item, index) => {
                          return (
                            <div className='vsc-tab-cmn vote-now-block' key={index} onClick={() => { navigate(`/communityClosed`, { state: { data: item?.Proposal_Id } }) }} >
                              <div className='vsc-tab-cmn-left'>
                                <strong>{item?.Title}</strong>
                                <p className='vsc-tab-cmn-duration'>Ended {item?.End_Date}  {item?.End_Time}</p>
                                <Stack direction="row" spacing={2}>
                                  <Button variant="contained" startIcon={<HowToVoteIcon />}>Vote Now</Button>
                                  <Button variant="outlined" href="#contained-buttons" startIcon={<VerifiedIcon />}>
                                    Core
                                  </Button>
                                </Stack>
                              </div>

                              <div className='vsc-tab-cmn-right'>
                                <ArrowForwardIcon />
                              </div>
                            </div>
                          )
                        })}
                      </CustomTabPanel>

                    </Box>
                  </CustomTabPanel>
                </Box>

              </Grid>



            </Item>
          </Grid>

          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <Item className={classes.footercls}>
              <Footer />
            </Item>
          </Grid>
        </Grid>
      </Box >
    </div >
  )
}

export default Voting
