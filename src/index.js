import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { MetaMaskProvider } from '@metamask/sdk-react';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <MetaMaskProvider debug={false} sdkOptions={{
        logging: {
            developerMode: false,
        },
        communicationServerUrl: 'https://metamask-sdk-socket.metafi.codefi.network/',
        checkInstallationImmediately: false, // This will automatically connect to MetaMask on page load
        i18nOptions: {
            enabled: true,
        },
        dappMetadata: {
            name: "Demo React App",
            url: window.location.protocol + '//' + window.location.host,
        }
    }}>
        <App />
    </MetaMaskProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
