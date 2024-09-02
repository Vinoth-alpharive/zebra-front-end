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
import HowToVoteIcon from '@mui/icons-material/HowToVote';

import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import AssessmentIcon from '@mui/icons-material/Assessment';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';

import erc20Abi from '../../Web3/Abi/erc20.json'
import votingAbi from '../../Web3/Abi/governanceAbi.json'
import governanceAddress from '../../Web3/ContractAddress/governanceAddress'
import Web3 from 'web3';

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

import { Link, useLocation } from 'react-router-dom';
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

const CoreClosed = () => {

  const classes = useStyles();
  const location = useLocation()
  var WEB = new Web3(window.ethereum);
  const [data, setdata] = useState()
  const [count, setCount] = useState()

  const [owner, setowner] = useState()
  const [snapshot, setSnapshot] = useState()

  const [winper, setWinPer] = useState(0)
  const [lossper, setLossPer] = useState(0)

  const [wincount, setWincount] = useState(0)
  const [losscount, setlosscount] = useState(0)

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


  useEffect(() => {
    if (location?.state?.data) {
      getData(location?.state?.data)
    }
  }, [location])

  return (
    <div className='community-page'>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={0}>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} className='fixed-header'>
            <Item className={classes.headercls}>
              <Header />
            </Item>
          </Grid>

          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>

            <Grid container spacing={0} className={classes.coinfourblock} id="main-top-container">

              <div className='vsc-tab-cmn-left community-detail-page'>
                <Link className='Back-to-Vote-Overview' to="/voting"><ArrowBackIcon /> Back to Vote Overview</Link>
                <Stack direction="row" spacing={2}>
                  <Button variant="contained" disabled startIcon={<NotInterestedIcon />}>
                    Closed
                  </Button>
                  <div class="community-btn-style">
                    <Button variant="outlined" href="#contained-buttons" startIcon={<PeopleIcon />}>
                      Core
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
                    {/* <div className='core-content'>
                      <h4 className='core-content-head'>PancakeSwap Welcomes unshETH ($USH) to Syrup Pool!</h4>
                      <p>Dear CAKE holders, we’re proud to announce a new Syrup Pool with unshETH!</p>
                      <p>unshETH is a DeFi protocol that allows users to deposit their Liquid Staking Tokens (LSTs) to mint unshETH, a “basket” of ETH LSTs.</p>
                      <p>The protocol aims to improve validator decentralization among the different Liquid Staking Protocols via incentives. When the deposit ratio of the different LSTs is closer to the “optimal ratio” set by governance, unshETH holders will collectively earn higher yields as a result.</p>
                      <h4 className='core-content-head'>The Syrup Pool:</h4>
                      <p>Stake CAKE tokens to earn USH tokens!</p>
                      <ul className='core-content-list'>
                        <li><strong>Total Tokens:</strong> 300,000 USH</li>
                        <li><strong>Distribution duration:</strong> 90 days</li>
                        <li><strong>Start time:</strong> Approx. 1500 UTC on 9 Aug 2023</li>
                        <li><strong>Finish time:</strong> Approx. 1500 UTC on 7 Nov 2023</li>
                        <li><strong>Token rewards per block:</strong> 0.1157 USH</li>
                      </ul>
                      <h4 className='core-content-head'>Max Stake per Wallet:</h4>
                      <p>100 CAKE for the first 48 hours of the Syrup Pool.</p>
                      <p>The cap is to give everyone an equal opportunity to farm rewards at a high APY at the start of the farm.</p>
                      <h4 className='core-content-head'>The Farm:</h4>
                      <p>In conjunction with the USH Syrup Pool, we’ll be providing an <strong>unshETH-ETH (0.05% fee tier)</strong> and a <strong>USH-BNB (1% fee tier)</strong> v3 farm on BNB Chain.</p>
                      <p>The <strong>unshETH-ETH (0.05% fee tier)</strong> v3 farm will have 1.5x CAKE rewards, while the <strong>USH-BNB (1% fee tier)</strong> v3 farm will have 5x CAKE rewards for 90 days. During and at the end of the 90-day period, the farms will be re-adjusted to a lower or zero multiplier unless the following metrics are comparable with other farms of a similar multiplier: average daily volume, 14-day volume, unique token holders on BNB Chain, and there are no fundamental token issues or concerns related to users’ safety and security.</p>
                      <p>We request for further flexibility in the multiplier, fee tier, and duration of the farms. The aggregate CAKE emission to all unshETH farms will remain the same, but we may adjust the multiplier, fee tier, and duration of the farms to ensure high utilization rates, ultimately maximizing CAKE burn from trading volume.</p>
                      <h4 className='core-content-head'>What is $unshETH?</h4>
                      <p>The unshETH Ether token represents a diversified liquid staked ETH basket that earns both Ethereum staking rewards and swap fees generated by the unshETH Validator Decentralization Automated Market Maker (vdAMM), all wrapped in a single ERC-20 token. unshETH Ether is also an omnichain token that can be transferred seamlessly across ETH Mainnet, BNB Chain, and Arbitrum.</p>
                      <p>Within the unshETH ecosystem, users can:</p>
                      <ul className='core-content-list'>
                        <li>Mint unshETH by depositing a supported ETH LST</li>
                        <li>Redeem a mix of the underlying LSTs proportional to the current deposit ratio for each unshETH</li>
                        <li>Earn ETH staking yield by simply holding unshETH</li>
                        <li>Swap between supported LSTs and ETH up to their maximum weight as determined by the “optimal ratio” set by governance</li>
                        <li>Earn swap fees by simply holding unshETH</li>
                      </ul>
                      <p>For more information on how to interact with unshETH, visit <strong><Link to='https://docs.unsheth.xyz/' className='sc-c9a5991e-4 hBHXrC'>here</Link></strong></p>
                      <h4 className='core-content-head'> How do I get $unshETH on BNB Chain? </h4>
                      <p>There are two ways to get unshETH on BNB Chain</p>
                      <ul className='core-content-list'>
                        <li>Deposit BNB or USDT on BNB Chain <strong><Link to='https://unsheth.xyz/deposit' className='sc-c9a5991e-4 hBHXrC'>here</Link></strong> and receive unshETH. The protocol handles all the back-end work for users, read more <strong><Link to='https://mirror.xyz/0x749Dc728A68265e74754Ad8e6cc2649BD42a8f8a/t7vYrWdiqPycEhm956mqEDbPa8F6tNxeKCcxFP11_AQ' className='core-content-link'>here</Link></strong></li>
                        <li>Mint unshETH on Ethereum <strong><Link to='https://unsheth.xyz/deposit' className='sc-c9a5991e-4 hBHXrC'>here</Link></strong> and bridge it over to BNB Chain <strong><Link to='https://unsheth.xyz/bridge' className='core-content-link'>here</Link></strong></li>
                      </ul>
                      <h4 className='core-content-head'>What is $USH?</h4>
                      <p>USH is the governance and incentive token to accelerate the growth of unshETH’s TVL and liquidity, and to foster competition among liquid staking protocols through a convex-style ve-locked USH system.</p>
                      <p>Staked USH (vdUSH) governs:</p>
                      <ul className='core-content-list'>
                        <li>Index composition of unshETH, such as the types of supported LSTs and their respective weights within the index</li>
                        <li>Allocation of USH incentives and partner protocol incentives</li>
                        <li>Fee curve parameters and fee switch</li>
                      </ul>
                      <h4 className='core-content-head'>To learn more, visit the project’s official channels:</h4>
                      <ul className='core-content-list'>
                        <li><strong>Website:</strong> <Link to='http://unsheth.xyz/' className='core-content-link'>http://unsheth.xyz/</Link></li>
                        <li><strong>Twitter:</strong> <Link to='https://twitter.com/unsheth_xyz' className='core-content-link'>https://twitter.com/unsheth_xyz</Link></li>
                        <li><strong>Discord:</strong> <Link to='https://discord.gg/5tZXASh5P3' className='core-content-link'>https://discord.gg/5tZXASh5P3</Link></li>
                        <li><strong>Blog:</strong> <Link to='https://mirror.xyz/0x749Dc728A68265e74754Ad8e6cc2649BD42a8f8a' className='core-content-link'>https://mirror.xyz/0x749Dc728A68265e74754Ad8e6cc2649BD42a8f8a</Link></li>
                        <li><strong>Dune:</strong> <Link to='https://dune.com/unsheth/unshethxyz' className='sc-c9a5991e-4 hBHXrC'>https://dune.com/unsheth/unshethxyz</Link></li>
                        <li><strong>Bridge:</strong> <Link to='https://unsheth.xyz/bridge' className='sc-c9a5991e-4 hBHXrC'>https://unsheth.xyz/bridge</Link></li>
                      </ul>
                      <h4 className='core-content-head'>How do you stake CAKE to earn $USH rewards?</h4>
                      <p>Follow this guide to staking in Syrup Pools:</p>
                      <p><strong><Link to='https://docs.pancakeswap.finance/products/syrup-pool' className='sc-c9a5991e-4 hBHXrC'>https://docs.pancakeswap.finance/products/syrup-pool</Link></strong></p>
                      <h4 className='core-content-head'>BEWARE OF FOOD POISONING</h4>
                      <p>The official unshETH token contract address on BNB Chain is:
                        <strong><Link to='https://bscscan.com/token/0x0Ae38f7E10A43B5b2fB064B42a2f4514cbA909ef'>https://bscscan.com/token/0x0Ae38f7E10A43B5b2fB064B42a2f4514cbA909ef</Link></strong></p>
                      <p>The official USH token contract address on BNB Chain is:
                        <strong><Link to='https://bscscan.com/token/0x91d6d6aF7635B7b23A8CED9508117965180e2362' className='core-content-link'>https://bscscan.com/token/0x91d6d6aF7635B7b23A8CED9508117965180e2362</Link></strong></p>
                      <p>&ZeroWidthSpace;Any other unshETH and USH tokens will be a scam. Always verify the token address before buying tokens. If you receive an unshETH or USH token airdrop from another address, it’s probably a scam, and we advise you to ignore it.</p></div> */}

                    <div dangerouslySetInnerHTML={{ __html: data?.Content }} style={{ color: "white" }}>

                    </div>
                    <div class="Choices Cast-your-vote voting-list-block community-closed-block">
                      <strong>Votes <span>(0)</span></strong>

                      <div className='outer-vote-list-all  community-closed-block-all'>

                      </div>

                    </div>

                  </div>

                </Item>
              </Grid>

              <Grid item xs={12} sm={12} md={12} lg={4} xl={4} id="voting-list-id-right" className='voting-list-id-right-cls-core-closed'>
                <Item className={classes.bgtrans}>

                  <div class="Choices Cast-your-vote voting-list-block details-list">
                    <strong>Details</strong>

                    <div className='flex-box-ics-outer'>


                      <div className='flex-box-ics'><label>Identifier</label><div className='vote-list-single-count'>65,141.414 <Link><OpenInNewIcon /></Link></div></div>
                      <div className='flex-box-ics'><label>Creator</label><div className='vote-list-single-addrss'><Link>{`${owner?.slice(0, 7)}...${owner?.slice(36, 42)}`} <AssessmentIcon /></Link></div></div>
                      <div className='flex-box-ics'><label>Snapshot</label><div className='vote-list-single-addrss'><Link>{snapshot}<AssessmentIcon /></Link></div></div>

                      <div className='vote-now-box'>
                        <div className='vsc-tab-cmn-left community-detail-page'>
                          <Button variant="contained" disabled startIcon={<NotInterestedIcon />}>
                            Closed
                          </Button>
                        </div>
                        <div className='start-end-date-flex'>
                          <span>Start Date</span> {data?.Start_Date} {data?.Start_Time}
                        </div>
                        <div className='start-end-date-flex'>
                          <span>End Date</span>  {data?.End_Date} {data?.End_Time}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="Choices Cast-your-vote voting-list-block Current-Results">
                    <strong>Current Results</strong>

                    <div className='yes-no-votes-outer'>

                      <div className='yes-no-votes'>
                        <label>{data?.Choice1}</label>
                        <div><BorderLinearProgress variant="determinate" value="0" /></div>
                        <div className='vote-count-percentage'><label><span>0</span> Votes</label><span className='vote-percent'>0%</span></div>
                      </div>

                      <div className='yes-no-votes'>
                        <label>{data?.Choice2}</label>
                        <div><BorderLinearProgress variant="determinate" value="0" /></div>
                        <div className='vote-count-percentage'><label><span>0</span> Votes</label><span className='vote-percent'>0%</span></div>
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
    </div>
  )
}

export default CoreClosed
