import React from 'react'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { makeStyles } from '@mui/styles';
import cryptobannerbg from '../../images/cryptobannerbg.png';
import footerbg from '../../images/footer-bg.png';
import TextField from '@mui/material/TextField';
import { Link } from 'react-router-dom';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import './DocumentUpload.css'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

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
  

  const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
  });




const DocumentUpload = () => {

    const classes = useStyles();

    
  return (
    <div>
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
             <Link to ="/applicationform">  <ArrowBackIcon /> Back</Link>
            </div>
          <div className='general-info'>
            
                <div className='general-info-box'>
                    <div className='general-info-green-head'>
                        <p>Necessary Documents Upload</p>
                    </div>
                    <div className='info-field'>
                        <p>Please be aware that all documents below are necessary for your listing, for saving time and keep the high efficiency, please try to prepare the documents in advance if you miss any one of them.</p>
         
                     
                    </div>

                </div>
                <div className='general-info-box'>
                  
                    <div className='info-field additional-field'>
                        <p>1. Due Diligence Info Collection Form<span>*</span></p>
                        <p>Download the full DD Info Collection form at</p>
                        <div className='upload-link'>
                    <Link to="">http/gxuAGDuy.ihhhh</Link>
                    </div>
                        <p>Please fill in as much information as you can using the original spreadsheet and upload your submission here </p>
         
                        <Button component="label" variant="" startIcon={<FileUploadIcon />} className='upload-file'>Upload  <VisuallyHiddenInput type="file" />  </Button>

                    </div>

                </div>

                <div className='general-info-box'>
                  
                  <div className='info-field additional-field'>
                      <p>2.  The incorporation registration documents of your project's major legal entity <span>*</span></p>
       
                      <Button component="label" variant="" startIcon={<FileUploadIcon />} className='upload-file'>Upload  <VisuallyHiddenInput type="file" />  </Button>
                  </div>

             </div>

             <div className='general-info-box'>
                  
                  <div className='info-field additional-field'>
                      <p>3. Legal opinion recognizing your project tokens as utility tokens (Formal legal a opinion issued by established law firms in the following jurisdictions: US, UK EU, HK and Singapore)</p>
                       <p>If the legal opinion is not in English then the original and a certified translation from the original language. English will also be required. alt ifs pending, please be sure. make ready before the signing date of the final listing agreement Guidelines on the Legal Opinion Required for Projects to Launch on KuCoin can be found here:</p>
                      
                       <div className='upload-link'>
                          <Link to="">http/gxuAGDuy.ihhhh</Link>
                       </div>

                    <p>Recommended law firms can be found here:</p>
                    <div className='upload-link'>
                    <Link to="">http/gxuAGDuy.ihhhh</Link>
                    </div>
                    
                    <Button component="label" variant="" startIcon={<FileUploadIcon />} className='upload-file'>Upload  <VisuallyHiddenInput type="file" />  </Button>
                     
                  </div>

             </div>

             <div className='general-info-box'>
                  
                  <div className='info-field additional-field'>
                      <p>4.  Project White Paper (PDF):<span>*</span></p>
       
                      <Button component="label" variant="" startIcon={<FileUploadIcon />} className='upload-file'>Upload  <VisuallyHiddenInput type="file" />  </Button>
                  </div>

             </div>

             <div className='general-info-box'>
                  
                  <div className='info-field additional-field'>
                      <p>5.Please download the NDA from below, and upload with a signed version:<span>*</span></p>

                      <div className='upload-link'>
                    <Link to="">http/gxuAGDuy.ihhhh</Link>
                    </div>
       
                      <Button component="label" variant="" startIcon={<FileUploadIcon />} className='upload-file'>Upload  <VisuallyHiddenInput type="file" />  </Button>
                  </div>

             </div>

             <div className='general-info-box'>
                  
                  <div className='info-field additional-field'>
                      <p>6. The third-party code security review/auditing report issued by established security firms for your token and product/protocol:<span>*</span></p>
                      <p>If you don't have -the code audit report now, please be sure to make it ready before -the signing data of the final listing agreement. </p>
                     <p>Recommended security firms</p>
                     <div className='upload-link'>
                    <Link to="">http/gxuAGDuy.ihhhh</Link>
                    </div>
                    <Button component="label" variant="" startIcon={<FileUploadIcon />} className='upload-file'>Upload  <VisuallyHiddenInput type="file" />  </Button>
                  </div>

             </div>

             <div className='general-info-box'>
                  
                  <div className='info-field additional-field'>
                      <p>7. Please provide the KYC information for at least 3 key project members (national ID or passport copies):<span>*</span></p>
       
                      <Button component="label" variant="" startIcon={<FileUploadIcon />} className='upload-file'>Upload  <VisuallyHiddenInput type="file" />  </Button>
                  </div>

             </div>

             <div className='general-info-box'>
                  
                  <div className='info-field additional-field'>
                      <p>9.Thank you for choosing KuCoin! If there is anything else you would like to add, please feel free to leave below.:<span>*</span></p>
                  
       
                     <TextField id="standard-size-normal" defaultValue="" variant="standard"/>
                  </div>

             </div>

             <div className='nxt-btn'>
             <Link to="/" variant="contained" className='Start-Application-btn'>Submit</Link>
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

export default DocumentUpload
