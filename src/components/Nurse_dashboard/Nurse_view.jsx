
// import React from "react";
// import CloseIcon from "@material-ui/icons/Close";
// import Divider from "@material-ui/core/Divider";
// import { withStyles } from "@material-ui/core/styles";
// import Dialog from "@material-ui/core/Dialog";
// import "./Nurse_view.css";
// import apiurl from '../../App'
// import Axios from 'axios'
// import Patient from "../../Images/11.jpg";
// import dateFormat from 'dateformat'
// const apiurl_N="http://52.200.251.222:8158/api/v1/Nurse/"
// const styles = {};
// export default class AppointmentView extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = { cancel: null,
//       ViewData:[]
//      };
//   }
//   handleClose = () => {
//     this.props.onClose(this.props.selectedValue);
//   };
//   open = () => {
//     this.setState({ view: true });
//   };
//   onclose = () => {
//     this.setState({ view: false });
//   };
//   componentDidMount(){
//   var self=this
//   Axios({
//     method:"post",
//     url:apiurl_N  + "viewnursetodaysappointment",
//     data:{
//       "nursevendorId":"8",
//       "nurseId":"8"
//     }
//   }).then((response)=>{
//     var ViewData=[]
    
//     // response.data.data[0].todaysappointment.map((val,index)=>{
//     //     TableData.push({customername:val.PatientName,nursename:val.Nursename,dutyhours:val.working_hours,months:val.Noofmonth,totalcost:val.amount,costofmonth:val.CostofMonth[0].CostofMonth,id:val.index})
//     // })
//     self.setState({
//       ViewData:response.data.data[0],
//       props_loading:false
//     })
//   })    
// }
//   render() {
//     const styles = "";
//     const { classes, onClose, cancel, selectedValue, ...other } = this.props;
//    var ViewData=this.state.ViewData
//    console.log(this.state.ViewData,"viewdata")
//     return (
//       // <div className="doctor_popup_details">

//       <Dialog
//         onClose={this.handleClose}
//         aria-labelledby="simple-dialog-title"
//         {...other}
//         className="profile_modal"
//       >
//         <CloseIcon className="on_close" onClick={this.props.onClose} />
//         <div className="img_outline">
//           <img src={ViewData.profile_name} className="appointment" />
//         </div>
//         <div className="doctor_dashboard_view">
//           <div className="doctor_details_container">
//             <div className="doctor_detailsdiv">
//     <h3 className="appointment_name">{ViewData.Nursename}</h3>
//               {/* <p className="appointment_age">45 Years</p> */}
//               <p className="appointment__details">Appointment Details</p>

//               <div className="appointment__detailsdiv">
//                 <p className="appointment__details">Customer Name</p>
//     <p className="appointment_date">{ViewData.PatientName}</p>
//               </div>
//               <div className="appointment__detailsdiv">
//                 <p className="appointment__details_info">From Date</p>
//     <p className="appointment_date">{dateFormat(ViewData.from_date,"yyyy mmm dd")}</p>
//               </div>
//               <div className="appointment__detailsdiv">
//                 <p className="appointment__details_info">To Date</p>
//                 <p className="appointment_date">{dateFormat(ViewData.to_date,"yyyy mmm dd")}</p>
//               </div>
//               <div className="appointment__detailsdiv">
//                 <p className="appointment__details_info">Mobile No</p>
//     <p className="appointment_date">{ViewData.mobileno}</p>
//               </div>
//               <div className="appointment__detailsdiv">
//                 <p className="appointment__details_info">Mobile No</p>
//     <p className="appointment_date">{ViewData.mobileno}</p>
//               </div>
//               <div className="appointment__detailsdiv">
//                 <p className="appointment__details_info">Mobile No</p>
//     <p className="appointment_date">{ViewData.mobileno}</p>
//               </div>
//               <div className="appointment__detailsdiv">
//                 <p className="appointment__details_info">Mobile No</p>
//     <p className="appointment_date">{ViewData.mobileno}</p>
//               </div>
//               {/* <div className="appointment__detailsdiv">
//                 <p className="appointment__details_info">Test</p>
//                 <p className="appointment_date">Blood Test</p>
//               </div> */}

//               <Divider className="dividerlist_root" />
//               <div style={{ fontSize: "16px", textAlign: "left" }}>
//                 <b>Test Details</b>
//               </div>
//               <div
//                 style={{ fontSize: "14px", textAlign: "left", padding: "5px" }}
//               >
//                 Good Health Premium Package
//               </div>
//             </div>
//           </div>
//         </div>
//       </Dialog>

//       // </div>
//     );
//   }
// }


import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import PersonIcon from "@material-ui/icons/Person";
import AddIcon from "@material-ui/icons/Add";
import Typography from "@material-ui/core/Typography";
import { blue } from "@material-ui/core/colors";
import Button from "@material-ui/core/Button";
import Trainee from "../../Images/11.jpg";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import { withStyles } from "@material-ui/core/styles";
import "./Nurse_view.css";
import { TiLocation, MdLocationOn, MdLocalPhone } from "react-icons/md";
import { IoIosGlobe } from "react-icons/io";
import EditIcon from "@material-ui/icons/Edit"
import CloseIcon from '@material-ui/icons/Close';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import VisibilityIcon from '@material-ui/icons/Visibility';
import Axios from 'axios';
import dateformat from 'dateformat';
const styles = {};
const apiurl_N="http://52.200.251.222:8158/api/v1/Nurse/";
export default class ProfileView extends React.Component {
  constructor(props) {
    super(props);
    this.state = { cancel: null,view:false,ViewData:"",Cost:"",Duties:""};
  }
  handleClose = () => {
    this.props.onClose(this.props.selectedValue);
  };
  open=()=>
  {
    this.setState({view:true})
 
  }
  onclose=()=>
  {
    this.setState({view:false})
  }
 
  render() {
    const styles = "";
    const { classes, onClose, cancel, selectedValue, ...other } = this.props;
    var ViewData=this.props.ViewData
    console.log(this.props.ViewData,"testingg")
    // console.log(this.props.ViewData.map((val)=>val),"viewdata")

    return (
      <div className="doctor_popup_details">
      
        {/* <Dialog
          onClose={this.handleClose}
          aria-labelledby="simple-dialog-title"
          {...other}
          minWidth={"lg"}
          className={'${this.props.change_profile} profile_modal'}
        >
         <div className="img_outline">
          <img src={ViewData.profile_name} className="appointment" />
        </div>

        <div className="doctor_dashboard_view">
           <div className="close_icon_modal_div"><CloseIcon className="close_icon_modal" onClick={this.props.onClose}/></div>
        
         <div className="doctor_details_container">
            <div className="doctor_detailsdiv">
    <div className="patientphar_head"><h3 className="patient_name">{ViewData.Nursename}</h3>
            <p className="patient_age"> {ViewData.age+"Years"}</p> 
           <p className="patientappointment_details-div">Appointment Details</p></div>
           
    <div className="patientappointment_details">
      <p className="patientappointment_details">Customer Name</p>
      <span className="patient_date">{ViewData.PatientName}</span></div>
    <div className="patientappointment_details">
      <p className="patientappointment_details">Duty Hours</p>
      <span className="patient_date">{ViewData.working_hours}</span></div>
    <div className="patientappointment_details">
      <p className="patientappointment_details">No Of Months</p>
      <span className="patient_date">{ViewData.Noofmonth}</span></div>
    <div className="patientappointment_details">
      <p className="patientappointment_details">Cost/Month(KWD)</p>
      <span className="patient_date">{ViewData.CostofMonth && ViewData.CostofMonth[0] && ViewData.CostofMonth[0].CostofMonth}</span></div>
    <div className="patientappointment_details">
      <p className="patientappointment_details">Total Cost</p>
      <span className="patient_date">{ViewData.amount}</span></div>
    <div className="patientappointment_details">
      <p className="patientappointment_details">Address</p>
      <span className="patient_date">{ViewData.address}</span></div>
    <div className="patientappointment_details">
      <p className="patientappointment_details">Duties of Nurse</p><span className="patient_date">{ViewData.Dutiesofnurse && ViewData.Dutiesofnurse[0] && ViewData.Dutiesofnurse[0].duties}</span></div>      
        
          
             
         </div>
         </div>
         </div>
        
        </Dialog> */}


        {/* appointment view code  */}


        <Dialog className="dialog_nurse_eyeview" onClose={this.handleClose} aria-labelledby="simple-dialog-title" {...other}>
                <div className="close_icon">
                <CloseIcon  onClick={this.props.onClose}/>
                </div>
      <div>
        <Grid container className="nurse_view_grid_container">
          <>
          <Grid item className="nurse_view_image_grid" xs={12} md={3}>
            <div className="nurse_view_image_wrap">
              <div className="nurse_view_image_childdiv">
                <img
                  className="nurse_view_image"
                  src={ViewData && ViewData.profile_name} 
                  alt="jklj"
                  style={{ height: "100" }}
                />{" "}
              </div>
            </div>
          </Grid>
          <Grid item xs={12} md={9}>
            <div className="nurse_view_wrap_container">
              <div className="nurse_view_name_timecontainer">
                <div className="nurse_view_name_wrap">
                  <text className="nurse_view_name">
                    {/* Mortal */}
                    {ViewData && ViewData.Nursename}
                  </text>
                </div>
                <div className="nurse_view_name_wrap">
                  <text className="nurse_view_age">
              {/* 29years */}
              {ViewData && ViewData.age} Years/{ViewData && ViewData.gender}
                  </text>
                </div>
                {/* <div className="nurse_view_name_wrap">
                  <text className="nurse_view_country">
                    Saudi
                  </text>
                </div> */}
                <div className="nurse_view_name_wrap">
                  <text className="nurse_view_experience">
                    {/* 3 Years experience */}
                    {ViewData && ViewData.experience} Years experience
                  </text>
                </div>
                <div className="nurse_view_name_wrap">
                  <text className="nurse_view_experience">
                    {/* +965 22000001 */}
                    {ViewData && ViewData.mobileno}
                  </text>
                </div>
              </div>
              <div className="dutytime_container">
                <p className="time-inhours">
                  {/* 8 Hrs */}
                  {ViewData && ViewData.working_hours} Hrs
                </p>
              </div>
            </div>
            <div className="nurse_divider_container">
              <div className="nurse_divider_1px"></div>
            </div>
          </Grid>
          <Grid item xs={12} md={6}>
            <div className="nurse_view_name_wrap">
              <text className="nurse_view_name">
                {/* Abdul Rahman */}
                {ViewData && ViewData.PatientName}
              </text>
            </div>
            <div className="nurse_view_name_wrap">
              <text className="nurse_view_address">
                {/* 6623 Western Ring Rd, */}
                {ViewData && ViewData.address}
                <label className="road_dot">...</label>
              </text>
            </div>
            <div className="nurse_view_subheader">
              {" "}
              <label className="nurse_view_qualitiy">Start Date</label>
              <label className="nurse_view_colon">:</label>
              <label className="nurse_view_values">
                {/* 20 Dec 2019 */}
                {dateformat(ViewData && ViewData.from_date,"dd mmm yyyy")}
                </label>{" "}
            </div>
            <div className="nurse_view_subheader">
              {" "}
              <label className="nurse_view_qualitiy">End Date</label>
              <label className="nurse_view_colon">:</label>
              <label className="nurse_view_values">
                {/* 20 Feb 2020 */}
                {dateformat(ViewData && ViewData.to_date,"dd mmm yyyy")}
              </label>{" "}
            </div>
            <div className="nurse_view_subheader">
              {" "}
              <label className="nurse_view_qualitiy">No.Of Months</label>
              <label className="nurse_view_colon">:</label>
              <label className="nurse_view_values">
                {/* 1 */}
                {ViewData && ViewData.Noofmonth}
              </label>{" "}
            </div>
            <>
            {/* {val && val[0].CostofMonth.map((cost_month)=>{
            return( */}
            <div className="nurse_view_subheader">
              {" "}
              <label className="nurse_view_qualitiy">Cost/Month</label>
              <label className="nurse_view_colon">:</label>
              <label className="nurse_view_values">
                {/* 400 KWD */}
                {ViewData.CostofMonth && ViewData.CostofMonth[0] && ViewData.CostofMonth[0].CostofMonth} KWD
              </label>{" "}
            </div>
             {/* )})} */}
             </>
            <div className="nurse_view_subheader">
              {" "}
              <label className="nurse_view_qualitiy">Total Cost</label>
              <label className="nurse_view_colon">:</label>
              <label className="nurse_view_values">
                {/* 400 KWD */}
                {ViewData && ViewData.amount} KWD
              </label>{" "}
            </div>
          </Grid>

          <Grid item xs={12} md={6} className="generalduties_details_container">
            <div className="generalduties_details">
              <h4 className="general_head">General Duties</h4>  
              {ViewData && ViewData.Dutiesofnurse&&ViewData.Dutiesofnurse.map((duty)=>{
                return(
              <text className="genaeral_details">
                {/* Caring,Baby sitting */}
                {duty.duties}
                <br />
                {/* In-Home Care,Coordinate */}
                <br />
                {/* with Physician */}
              </text>
               )})}  
              <h4 className="general_head">Designed Duties</h4>
              <text className="genaeral_details">
                {/* Sponge bath,Evening Walking */}
                {ViewData && ViewData.skills}
              </text>
              <div className="nurse_view_cancelbutton">
                <Button
                  variant="outlined"
                  className="nurse_modelcancel"
                  color="secondary"
                  onClick={this.props.onClose}
                >
                  Close
                </Button>
              </div>
            </div>
            
          </Grid>
          </>
        </Grid>
      </div>
      </Dialog>
           
      </div>
    );
  }
}

