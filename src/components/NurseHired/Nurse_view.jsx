import React, { Component } from "react";
import Dialog from "@material-ui/core/Dialog";
import { withStyles } from "@material-ui/core/styles";
import { Grid, Button } from "@material-ui/core";
import doctor from "../../Images/nurse.jpg";
import "./Nurse_view.css";
import CloseIcon from '@material-ui/icons/Close';
import dateformat from 'dateformat';
import Divider from "@material-ui/core/Divider";
const styles = {};

export default class Nurse_view extends Component {
  state = {
    OpenViewData:[],
    see:true,
  };
  
  handleClose = () => {
    this.props.onClose(this.props.selectedValue);
  };
  onclose=()=>
  {
    this.setState({view:false})
  }

  UNSAFE_componentWillReceiveProps(newprops){
    this.setState({
      viewdata:newprops.OpenViewData
    })
  }

  render() {
    const { classes, onClose, selectedValue, ...other } = this.props;
    // const {propsval}=this.props
    //   const {val} = propsval ? propsval.OpenViewData : ""
    //   console.log(val,"props_open_viewdata_checking")

    const val=this.props.OpenViewData
    console.log(val,"val_checkkk")
      console.log(val.CostofMonth&&val.CostofMonth[0],"props_open_viewdata_checking")
      console.log(val.Dutiesofnurse&&val.Dutiesofnurse,"dutied_array")


 
    return (
      <Dialog className="dialog_nurse_eyeview" onClose={this.handleClose} aria-labelledby="simple-dialog-title" {...other}>
                <div className="close_icon">
                <CloseIcon  onClick={this.props.onClose}/>
                </div>
      <div>
        <Grid container className="nurse_view_grid_container">
          <>
        {/* {this.props.OpenViewData.map((val)=>{
          console.log(val,"val_chkk")
              return(  */}
                {/* <>  */}
          <Grid item className="nurse_view_image_grid" xs={12} md={3}>
            <div className="nurse_view_image_wrap">
              <div className="nurse_view_image_childdiv">
                <img
                  className="nurse_view_image"
                  src={val&&val.profile_name}
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
                    {val&&val.Nursename}
                  </text>
                </div>
                <div className="nurse_view_name_wrap">
                  <text className="nurse_view_age">
              {/* 29years */}
              {val&&val.age} Years/{val&&val.nurseGender}
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
                    {val&&val.nurseExperience} Years experience
                  </text>
                </div>
                <div className="nurse_view_name_wrap">
                  <text className="nurse_view_experience">
                    {/* +965 22000001 */}
                    {val&&val.mobileno}
                  </text>
                </div>
              </div>
              <div className="dutytime_container">
                <p className="time-inhours">
                  {/* 8 Hrs */}
                  {val&&val.working_hours} Hrs
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
                {val&&val.PatientName}
              </text>
            </div>
            <div className="nurse_view_name_wrap">
              <text className="nurse_view_address">
                {/* 6623 Western Ring Rd, */}
                {val&&val.address}
                <label className="road_dot">...</label>
              </text>
            </div>
            {/* <div className="nurse_view_subheader">
              {" "}
              <label className="nurse_view_qualitiy">Skills</label>
              <label className="nurse_view_colon">:</label>
              <label className="nurse_view_values">
                Elderly care,Child care
              </label>{" "}
            </div> */}
            <div className="nurse_view_subheader">
              {" "}
              <label className="nurse_view_qualitiy">Start Date</label>
              <label className="nurse_view_colon">:</label>
              <label className="nurse_view_values">
                {/* 20 Dec 2019 */}
                {dateformat(val&&val.from_date,"dd mmm yyyy")}
                </label>{" "}
            </div>
            <div className="nurse_view_subheader">
              {" "}
              <label className="nurse_view_qualitiy">End Date</label>
              <label className="nurse_view_colon">:</label>
              <label className="nurse_view_values">
                {/* 20 Feb 2020 */}
                {dateformat(val&&val.to_date,"dd mmm yyyy")}
              </label>{" "}
            </div>
            <div className="nurse_view_subheader">
              {" "}
              <label className="nurse_view_qualitiy">No.Of Months</label>
              <label className="nurse_view_colon">:</label>
              <label className="nurse_view_values">
                {/* 1 */}
                {val&&val.Noofmonth}
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
                {val.CostofMonth && val.CostofMonth[0].CostofMonth}
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
                {val&&val.amount}
              </label>{" "}
            </div>
          </Grid>

          <Grid item xs={12} md={6} className="generalduties_details_container">
            <div className="generalduties_details">
              <h4 className="general_head">General Duties</h4>  
              {val&&val.Dutiesofnurse&&val.Dutiesofnurse.map((duty)=>{
                return(
              <text className="genaeral_details">
                {/* Caring,Baby sitting */}
                {duty && duty.duties}
                <br />
                {/* In-Home Care,Coordinate */}
                <br />
                {/* with Physician */}
              </text>
               )})} 
              <h4 className="general_head">Designed Duties</h4>
              <text className="genaeral_details">
                {/* Sponge bath,Evening Walking */}
                {val&&val.skills}
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
          {/* </> */}
          {/* // )} */}
          {/* // )} */}
          </>
        </Grid>
      </div>
      </Dialog>
    );
  }
}

const Nurse_viewWrapped = withStyles(styles)(Nurse_view);
