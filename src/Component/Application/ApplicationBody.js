import React from 'react'
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

const ApplicationBody = () => {
  return (
    <div className='application-body'>
      <h3>Zebra Listing Application Form 2023 </h3>
      <p>Thank you for your interest in the Zebra Exchange, please fill out the application form with valid information, we will review your project based on the information you provided, if anything is found to be invalid or false, your project will not be considered for listing on Zebra. </p>
      <p>Please submit this application and your project will be sent for review by the Research Department. After you pass the initial review, we will share with you the listing workflow and tips, additionally, an account manager will be assigned and reach out to you, to walk you through the listing process.</p>
      <p>LISTING TERMS FOR APPLYING:</p>
      <div className='application-body-list'>
        <ul>

<li>Please do not push us on giving the status of your project during the review process, the review for each project will take time for comprehensive research, there won’t be a date guaranteed for reviewing, integrating or testing your project, we will follow our workflow and rules strictly. The best thing to do is to provide clear concise information on your application and do not leave any missing information, no matter how small you think it may be.</li>

<li>Zebra will never disclose any of your submitted information to any other third-parties, and there will be an NDA that needs to signed mutually in this application to ensure the confidentiality of your project information.</li>

<li>Please follow our listing workflow and contact your account manager if you have anything urgent, but this won’t be considered to accelerate our review process.</li>

<li>Please do not pre-transfer any funds or tokens to us or any third parties, we won’t confirm any transfer beyond the requirements from our official listing contract. And our staff shall never ever ask you for any transfer via SNS, emails or chats before the listing process is closed.</li>

<li>All project reviews will be carried out in order, we do not give privilege to any project for an easier review.</li>

<li>Speaking directly with the decision-maker of your team is required, this will be considered as part of the project review. A minimum of 3 contacts at the executive level must be included in your application. No project shall use the Zebra name in any publication whether online or in print without the express written consent of Zebra and any such announcements may only be made after the Zebra official announcement if your token is listed. All prospective projects will have a Non-Disclosure Agreement to review, sign and return before any details about the project listing will be discussed.</li>
        </ul>
      </div>
      <Link to="/applicationform" variant="contained" className='Start-Application-btn'>Start Application</Link>
    </div>
  )
}

export default ApplicationBody



