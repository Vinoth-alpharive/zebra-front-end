import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Homepage from './Component/Homepage/Homepage';
import Application from './Component/Application/Application';
import Exchange from './Component/Exchange/Exchange';
import Swap from './Component/Swap/Swap';
import Staking from './Component/Staking/Staking';
import Account from './Component/Account/Account';
import Cryptocurrencies from './Component/Homepage/Cryptocurrencies';
import EarnCrypto from './Component/EarnCrypto/EarnCrypto';
import EarnCryptoDetail from './Component/EarnCrypto/EarnCryptoDetail';
import KYCForm from './Component/KYCForm/KYCForm';
import Notfound from './Component/Notfound';
import Farms from './Component/Farms/Farms';
import EarnCryptoBanner from './Component/EarnCrypto/EarnCryptoBanner'
import Liquidstaking from './Component/Liquidstaking/Liquidstaking';
import Voting from './Component/Voting/Voting';
import MakeProposal from './Component/Voting/MakeProposal';
import CommunityVoteNow from './Component/Voting/CommunityVoteNow';
import CommunityClosed from './Component/Voting/CommunityClosed';
import CoreClosed from './Component/Voting/CoreClosed';
import ApplicationForm from './Component/ApplicationForm/ApplicationForm';
import DocumentUpload from './Component/DocumentUpload/DocumentUpload';
import Launchpad from './Component/Launchpad/launchpad';
import Creates from './Component/Launchpad/Creates';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<Homepage />} />
          <Route path='/application' element={<Application />} />
          <Route path='/exchange' element={<Exchange />} />
          <Route path='/exchange/:token' element={<Exchange />} />
          <Route path='/swap' element={<Swap />} />
          <Route path='/staking' element={<Staking />} />
          <Route path='/account' element={<Account />} />
          <Route path='/cryptocurrencies' element={<Cryptocurrencies />} />
          <Route path='/earncrypto' element={<EarnCrypto />} />
          <Route path='/earncrypto-details' element={<EarnCryptoDetail />} />
          <Route path="/kyc-verification" element={<KYCForm />} />
          <Route path="*" element={<Notfound />} />
          <Route path="/farms" element={<Farms />} />
          <Route path="/EarnCryptoBanner" element={<EarnCryptoBanner />} />
          <Route path="/liquidstaking" element={<Liquidstaking />} />
          <Route path="/voting" element={<Voting />} />
          <Route path="/launchpad" element={<Launchpad />} />
          <Route path="/communityClosed" element={<CommunityClosed />} />
          <Route path="/core" element={<CoreClosed />} />
          <Route path="/communityvotenow" element={<CommunityVoteNow />} />
          <Route path="/makeproposal" element={<MakeProposal />} />
          <Route path="/applicationform" element={<ApplicationForm />} />
          <Route path="/documentupload" element={<DocumentUpload />} />
          <Route path="/creates" element={<Creates />} />

        </Routes>
      </Router>
    </div>
  );
}

export default App;
