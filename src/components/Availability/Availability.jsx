import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Labelbox from "../../helpers/labelbox/labelbox";

import "./Availability.css";

import Calender from "./Calendar";
import {Select} from 'antd';

import Axios from 'axios';

import {apiurl} from '../../App';


const {Option} = Select;

export default class Availability extends Component {


  constructor(props){
    super(props)
    this.state = {
      nurseNames:[],
      fromdate:"",
      todate:"",
      nurseId:""
    }
  }



  nurseNames = () => {
    Axios({
      method:"POST",
      url:apiurl + "Nurse/getnurse",
      data:{nursevendorId:"5"}
    }).then((response) => {
  
       this.setState({nurseNames:response.data.data})
    }).catch((err) => {

    })
  }

  componentWillMount() {
    this.nurseNames()
  }

  getNurseNames = () => {
    let nurses = [];
    for(let i=0;i<this.state.nurseNames.length;i++) {
      nurses.push(<Option key={i+1} value={this.state.nurseNames[i].NurseId}>{this.state.nurseNames[i].name}</Option>)
    }

    return nurses;
  }


  storeDate = (data,key) =>  {
    if(key === "fromdate") {
      this.setState({fromdate:data})
    }

    if(key === "todate") {
      this.setState({todate:data})
    }
  }


  LeaveorBlock = (endPoint) => {

    var data = {
      "nurseId": this.state.nurseId,
      "from_date":this.state.fromdate,
      "to_date": this.state.todate
    }

    console.log("sadfkjsdhfkjshdfkj",data)
    Axios({
      method:"POST",
      url:apiurl + `Nurse/${endPoint}`,
      data:data
    }).then((response) => {
           alert(response.data.msg)
    }).catch((err) => {

    })
  }



  storeNurse = (data) => {
    this.setState({nurseId:data})
  }
  render() {
    return (
      <div>
        <Grid container>
          <Grid item sm={12} md={6}>
            <Calender />
          </Grid>
          <Grid item sm={12} md={6}>
            <div style={{padding:"20px"}} className ="opacity_letter_availability">
             
              <Select style={{width:"100%"}} onChange={(data) => this.storeNurse(data)}>
                {/* <div className="availability_nursename_edit"> */}
                    {this.getNurseNames()}
                {/* </div> */}
              </Select>
              <div
                className="avail_date_picker"
                style={{ display: "flex", justifyContent: "space-between",paddingTop:"10px" }}
              >
                <Labelbox type="datepicker" labelname="From Date" value={this.state.fromdate} changeData={(data) => this.storeDate(data,"fromdate")} />
                <Labelbox type="datepicker" labelname="To Date" value={this.state.todate} changeData={(data) => this.storeDate(data,"todate")} />
              </div>
              <div className="avail_button">
                <div>
                <button type="button" class="btn btn-primary btn-lg leave_btn" onClick={() => this.LeaveorBlock("insertnurseleavedate")}>Leave</button>
                </div>
                <div>
                <button type="button" class="btn btn-primary btn-lg block_btn" onClick={() => this.LeaveorBlock("Blocknursedate")}>Block</button> 
                </div>
              </div>
            </div>
          </Grid>
        </Grid>
      </div>
    );
  }
}
