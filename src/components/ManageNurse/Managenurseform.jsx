import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import "./Managenurseform.css";
import { Paper } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import one from "../../Images/11.jpg";
import Divider from "@material-ui/core/Divider";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { FaAngleRight } from "react-icons/fa";
import Axios from "axios";
import { apiurl } from "../../App";
import {RightOutlined} from '@ant-design/icons';
import {LeftOutlined} from '@ant-design/icons';
import NotfoundIcon from "../../Images/NotFound.svg"

export default class Uploadform extends Component {
  state = {
    history_data_store:[],
  };

  render() {
    const {history_data_store}=this.props
    // var val=this.props.history_data_store
    console.log(history_data_store,"props_chkkk")
    return (
      <div>
        <Grid container style={{ width: "100%" }}>
          <Grid container spacing={2} xs={12}>
            {this.props.history_data_store.map((val)=>{
              console.log(val,"valchecking")
              return(
                <>
          {/* {val === undefined ?
        <div>
          <img src={NotfoundIcon}/><div>No Data Found</div>
        </div>
        :  */}
        {/* <> */}
              <Grid item spacing={2} xs={6} md={3}>
              <img src={val.profileImage} className="card-profile" />
            </Grid>
            <Grid item spacing={2} xs={6} md={9}>
              <div>
                <h2>
                  <b>
                    {/* ABIDA */}
                    {val.nurseName}
                  </b>
                </h2>
                <div style={{fontSize:"15px"}}>
              <p >{val.age}years/{val.gender}</p>
                <p>
                  {/* Jabriya... */}
                  {val.address}
                </p>
                <p>
                {val.experience} Years Experience
                </p>
                <p>
                  {/* +965 22000001 */}
                  {val.mobileNo}
                </p>
                </div>
              </div>
            </Grid>
            {/* </> */}
            {/* } */}
            </>
              )
            })}
          </Grid>
        </Grid>

        <Paper className="paper-bck" style={{ bgcolor: "grey" }}>
        {/* <div className="left_arrow_edits"> 
                <LeftOutlined  className="icon_click"/>
              </div> */}
          
        <Grid container spacing={2} xs={12}>
            <Grid item spacing={2} xs={12} md={12}>
        <div className="paper-bck" style={{ bgcolor: "grey" }}>
              {/* {this.props.viewData === undefined ?
        <div>
          <img src={NotfoundIcon}/><div>No Data Found</div>
        </div>
        : */}
        <div>
            {this.props.history_data_store[0].patientHistory.map((cust_history)=>{
            console.log(this.props.history_data_store[0].patientHistory,"cust_history_chk")
            return(
        //       <>
        //             {this.props.history_data_store[0].patientHistory === undefined ?
        // <div>
        //   <img src={NotfoundIcon}/><div>No Data Found</div>
        // </div>
        // : 
          <div className="Card-par col-sm-3">
            <Card>
              <div className="container">
                <div className="avatar">
                  <img src={cust_history.profileImage} className="card-img" alt="not avail" />
                </div>
              </div>
            <button className="btn btn-success">{cust_history.workingHours} Hrs</button>

              <div className="modal-text">
                <h5>
                  <b>
                    {/* Mrs.Dina */}
                    {cust_history.name}
                  </b>
                </h5>
                <p>{cust_history.age} Years/{cust_history.gender}</p>
                <p>
                  {/* Jabriya... */}
                  {cust_history.address}
                </p>
                <p>
                  {/* +965 22000001 */}
                  {cust_history.phone_no}
                </p>
              </div>
              <div className="modal-date">
                <div>
                  <p>Start Date</p>
                 <p>{cust_history.startDate}</p>
                </div>

                <div>
                  <p>End Date</p>
                  <p>{cust_history.endDate}</p>
                </div>
              </div>
              <Divider />
              <p className="mt-3 ml-3">
                {/* Sponge Bath,Evening Walk */}
                {cust_history.duties}
              </p>
            </Card>
          </div>
        // }
        // </>
            )
                   
          })}

        </div>
        
          {/* } */}
          {/* <div className="right_arrow_edits"> 
                <RightOutlined />
              </div> */}
        </div>
        </Grid>
        </Grid>
        </Paper>
      </div>
    );
  }
}
