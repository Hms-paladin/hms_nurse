import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import "./HistoryForm.css";
import { Paper } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import one from "../../Images/11.jpg";
import Divider from "@material-ui/core/Divider";
import Axios from "axios";
import { apiurl } from "../../App";
import { BsThreeDots } from 'react-icons/bs';
import {RightOutlined} from '@ant-design/icons';
import {LeftOutlined} from '@ant-design/icons';
export default class Uploadform extends Component {
    state = {
      viewData:[],
      see:true,
    };
    
  viewAddress =()=>{
      console.log(this.state.see,"seeee")
      // alert("dot_open")
      // alert(this.state.see)
      this.setState({
        see:!this.state.see,
      })
      console.log(this.setState.see,"see_check")
      // alert(this.state.see)
    }
  render() {
      const {OpenViewData}=this.props
      console.log(this.props.OpenViewData,"props_open_viewdata")
    return (
        <div>
          <Grid container style={{ width: "100%" }}>
            <Grid container spacing={2} xs={12}>
              <Grid item spacing={2} xs={6} md={3}>
                {/* <div className="img_parent"> */}
                  <img src={ OpenViewData[0].patientImage} className="hisory_image" />
                {/* </div> */}
              </Grid>
              <Grid item spacing={2} xs={6} md={9}> 
                <div>
                    <h2> <b>{OpenViewData[0].PatientName}</b> </h2>
                    <h5>{OpenViewData[0].age} Years / {OpenViewData[0].gender}</h5>
                  <div className="name_dot_par">
                    <h5>Jabriya</h5>
                    <span>
                    <BsThreeDots onClick={this.viewAddress} className="dot_icon"></BsThreeDots>
                      {this.state.see === false ?
                        <div className="address_edit">
                          {OpenViewData[0].address}
                          {/* <p>2-79</p>
                          <p>ABC Street</p>
                          <p>D NAGAR</p> */}
                        </div> :null }
                    </span>
                  </div>
                  {/* <p>5 Years Experience </p> */}
                  <h5>{OpenViewData[0].phone_no}</h5>
                </div>
              </Grid>
            </Grid>
          </Grid>
      <div>
        <Paper className="paper-bck" style={{ bgcolor: "grey" }}>
        <div className="left_arrow_edit"> 
                <LeftOutlined  className="icon_click"/>
              </div>
          <Grid container spacing={2} xs={12}>
            <Grid item spacing={2} xs={12} md={12}>
                  {this.props.OpenViewData[0].nurseDetails.map((val,index)=>{
                  console.log(val,"map_val_check")
                return(
                  <div className="nurse_view_card">
                    <div className="Card-par col-sm-3">
                      <Card>
                        <div className="container">
                          <div className="avatar">
                            <img src={OpenViewData[0].nurseDetails[0].profile_name} className="profile_image" />
                          </div>
                        </div>
                        {val.cost_eight_hours > val.cost_twelve_hours ? 
                        <button className="btn btn-success">8 Hrs</button>:
                        <button className="btn btn-success">12 Hrs</button>
                      }
                        <div className="modal-text">
                            <h5><b>{val.Nursename}</b></h5>
                            <p>{val.age} years/ {val.gender}</p>
                            <p>Jabriya...</p>
                            <p> {val.mobileno}</p>
                        </div>
                        <div className="modal-date">
                            <div>
                            <p>Start Date</p>
                            <p>{val.from_date}</p>
                        </div>
                        <div>
                            <p>End Date</p>
                            <p>{val.to_date}</p>
                        </div>
                        </div>
                        <Divider/>
                          <p className="mt-3 ml-3">{val.skills}</p>
                      </Card>
                    </div>
                </div>  
                )
              })}
              <div className="right_arrow_edit"> 
                <RightOutlined />
              </div>
          </Grid>
            </Grid>
            {/* </CarouselItem>
            </Carousel> */}
          </Paper>
        </div>
      </div>
    );
  }
}