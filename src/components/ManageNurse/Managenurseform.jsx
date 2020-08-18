import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import "./Managenurseform.css";
import Card from "@material-ui/core/Card";
import Divider from "@material-ui/core/Divider";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import NotfoundIcon from "../../Images/NotFound.svg"
import Swiper from 'react-id-swiper';
import dateFormat from 'dateformat';

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
    const params = {
      slidesPerView: 3,
      spaceBetween: 30,
      pagination: {
        el: '.swiper-pagination',
      },
      // navigation: {
      //   nextEl: '.swiper-button-next',
      //   prevEl: '.swiper-button-prev'
      // },
      // renderPrevButton: () => <button className="swiper-button-prev">Prev</button>,
      // renderNextButton: () => <button className="swiper-button-next">Next</button>,
    }

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
                          <p >{val.age} Years/{val.gender === 1 ? "Male" : "Female"}</p>
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
          {this.props.history_data_store[0] && this.props.history_data_store[0].patientHistory.map((cust_history) => {
            console.log(this.props.history_data_store[0].patientHistory, "cust_history_chk")
            return (
              <div>
                <div className="Card-par">
                  <Card>
                    <div className="container">
                      <div className="avatar">
                        <img src={cust_history.profileImage} className="card-img" alt="not avail" />
                      </div>
                    </div>
                    <button className="btn btn-success hrsbtn">{cust_history.workingHours} Hrs</button>

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
                        <p>{dateFormat(cust_history.startDate, "dd mmm yyyy")}</p>
                      </div>

                      <div>
                        <p>End Date</p>
                        <p>{dateFormat(cust_history.endDate, "dd mmm yyyy")}</p>
                      </div>
                    </div>
                    <Divider />
                    <p className="mt-3 ml-3">
                      {/* Sponge Bath,Evening Walk */}
                      {cust_history.duties}
                    </p>
                  </Card>
                </div>
              </div>
            )

          })}


        </Swiper>
      </>
    );
  }
}
