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
import { RightOutlined } from '@ant-design/icons';
import { LeftOutlined } from '@ant-design/icons';
import NotfoundIcon from "../../Images/NotFound.svg"
import Swiper from 'react-id-swiper';


const params = {
  slidesPerView: 3,
  spaceBetween: 90,
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
  
}


export default class Uploadform extends Component {
  state = {
    history_data_store: [],
  };
  componentWillReceiveProps() {
    this.setState({
      history_data_store: this.props.history_data_store
    })
  }

  render() {
    const { history_data_store } = this.state
    // var val=this.props.history_data_store
    console.log(this.props.history_data_store, "props_chkkk")
    return (
      <>
        <div>
          <Grid container style={{ width: "100%" }}>
            <Grid container spacing={2} xs={12}>
              {this.props.history_data_store.map((val) => {
                console.log(val, "valchecking")
                return (
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
                        <div style={{ fontSize: "15px" }}>
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


        </div>
        <Swiper {...params}>
          <div>Slide #1</div>
          <div>Slide #2</div>
          <div>Slide #3</div>
          <div>Slide #4</div>
          <div>Slide #5</div>
        </Swiper>
      </>
    );
  }
}
