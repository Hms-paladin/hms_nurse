import React, { Component } from "react";
import { Select } from "antd";
import "antd/dist/antd.css";
import TotalnurseTable from "./TotalnurseTable";
import Paper from "@material-ui/core/Paper";
import Plus from "../../Images/plus.png";
import Nurse_form from "./Nurse_form";
import { Input } from "antd";
import Modalcomp from "../../helpers/ModalComp/Modalcomp";
import { apiurl } from "../../App";
import Axios from 'axios';

class TotalnurseDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      tableData: [],
      search: null,
      props_loading: true,
    };
  }

  componentWillMount() {
    // alert("A")
    this.getTableData();
  }

  // get table data
  getTableData = () => {
    var self = this
    Axios({
      method: 'POST', //get api
      url: apiurl + '/getNurseDetails',
      data: {
        vendorId: 5
      }
    })
      .then((response) => {
        console.log(response, "res")
        // alert("get")
        var tableData = [];
        response.data.data.map((val) => {
          tableData.push({
            nurseName: val.name,
            gender: val.gender === "1" ? "Male" : "Female",
            age: val.age,
            experience: val.experience,
            nationality: val.nationality_id === 1 ? "Saudi" : "America",
            id: val.nurseId
          })
          console.log(val.id, "yyyyyyy")
        })
        self.setState({
          tableData: tableData,
          props_loading: false,
          totalData: response.data.data
        })
        self.setState({})
      })
      .catch((error) => {
        // alert(JSON.stringify(error))
      })
  }

  openmodal = () => {
    this.setState({ open: true });
  };
  onclosemodal = () => {
    this.setState({ open: false });
  };
  searchChange = (e) => {
    this.setState({
      search: e.target.value
    })
    this.setState({})
  }

  render() {
    const { Option } = Select;
    const { Search } = Input;
    const searchdata = []
    this.state.tableData.filter((data, index) => {
      console.log(data, "datadata")

      if (this.state.search === undefined || this.state.search === null) {
        searchdata.push({
          nurseName: data.nurseName,
          gender: data.gender,
          age: data.age,
          experience: data.experience,
          nationality: data.nationality,
          id: data.id,
        })
      }
      else if (data.nurseName !== null &&
        data.nurseName.toLowerCase().includes(this.state.search.toLowerCase())
        || data.gender !== null && data.gender.toLowerCase().includes(this.state.search.toLowerCase())
        || data.age !== null && data.age.toString().includes(this.state.search.toString())
        || data.experience !== null && data.experience.toString().includes(this.state.search.toString())
        || data.nationality !== null && data.nationality.toLowerCase().includes(this.state.search.toLowerCase())
      ) {
        console.log(data, "datadata")
        searchdata.push({
          nurseName: data.nurseName,
          gender: data.gender,
          age: data.age,
          experience: data.experience,
          nationality: data.nationality,
          id: data.id,
        })
      }
    })

    return (
      <div>
        <div className="title_dashboard">
          <div className="title_header">MANAGE NURSES</div>
          <div>
            <Search
              className="mr-5"
              placeholder="search"
              onSearch={value => console.log(value)}
              style={{ width: 150 }}
              onChange={(e)=>this.setState({search:e.target.value})}
            />
            <img src={Plus} onClick={this.openmodal} />
          </div>
        </div>
        <TotalnurseTable
          tableData={searchdata}
          getTableData={() => this.getTableData()}
          props_loading={this.state.props_loading}
          totalData={this.state.totalData}
        />
        <Modalcomp
          visible={this.state.open}
          closemodal={this.onclosemodal}
          title="Add Nurse"
          clrchange="textclr"
          xswidth={"lg"}
        >
          <Nurse_form visible={this.state.open} closemodal={this.onclosemodal} getTableData={() => this.getTableData()} />
        </Modalcomp>
      </div>
    );
  }
}
export default TotalnurseDashboard;
