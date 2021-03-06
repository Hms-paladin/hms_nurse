import React from "react";
import Tablecomponent from "../../helpers/TableComponent/TableComp";
import Modalcomp from "../../helpers/ModalComp/Modalcomp";
import "./TotalnurseTable.css";
import Managenursemodal from "./Managenursemodal";
import Managenurseform from "./Managenurseform";
import CloseIcon from "@material-ui/icons/Close";
import axios from "axios";
import { apiurl } from "../../App";
import DeleteNurse from '../../helpers/ModalComp/deleteModal';
import { message } from 'antd';
import Nurse_form from "./Nurse_form";

class DashboardTable extends React.Component {
  state = {
    openview: false,
    deleteopen: false,
    tableData: [],
    props_loading: true,
    history_data:[],
    history_data_store:[],
  };

  componentWillReceiveProps() {
    console.log(this.props.tableData, "sdfasdfa")
    this.setState({
      totalData: this.props.totalData
    })
    console.log(this.props.tabledata, "tabledata")
  }

  createData = (parameter) => {
    var keys = Object.keys(parameter);
    var values = Object.values(parameter);
    var returnobj = {};
    for (var i = 0; i < keys.length; i++) {
      returnobj[keys[i]] = values[i];
    }
    return returnobj;
  };


  modelopen = (data, id) => {
    console.log(id, data, this.state, "edit_id")
    if (data === "view") {
      console.log(data, "view_data")
      this.setState({ workflow: true })
      this.setState({
        viewData: this.state.totalData.find(val => val.nurseId === id)
      })

    }
    else if (data === "edit") {
      this.setState({ editopen: true })
      this.setState({
        editData: this.state.totalData.find(val => val.nurseId === id),
        props_loading: false
      },()=>console.log(this.state.editData, "dataaa_idd"))
      
    }
    else if (data === "history") {
      var history_data_store = this.state.history_data.filter((history_data_store)=>{
        return history_data_store.nurseId===id
     })
     console.log(this.state.history_data,"historydata_chk")
      this.setState({
        historyopen:true,
        history_data_store:history_data_store
      })
      console.log(this.state.history_data_store, "history") 
      // this.setState({
      //   HistoryTableData:this.state.totalData.find(val =>val.nurseId === id),
      // })
    }
    console.log(this.state.viewData, "viewwwww")
  }

  closemodal = () => {
    this.setState({ openview: false, editopen: false, deleteopen: false, historyopen: false, workflow: false })
  }

  componentDidMount(){
    this.HistoryTableData()
  }

  HistoryTableData =() =>{
    axios({
      method: 'post',
      url: apiurl + 'getNursePatientHistory/?results=2',
      data: {
        nurseId:3,
      }
  })
    .then((response) => {
      console.log(response,"response_history")
      var history_data =[];
      response.data.data.map((val)=>{
        history_data.push(val)
        console.log(val,"val_testttttt")
      })
      
        this.setState({
          history_data:history_data
        })
        console.log(history_data,"checkk")
  })
  .catch((error) => {
      // alert(JSON.stringify(error))
  })
  }
  
  deleteopen = (type, id) => {
    console.log(id, "iddd")
    this.setState({
      deleteopen: true,
      iddata: id
    })
    console.log(id, "type")
  }

  deleterow = () => {
    this.setState({ props_loading: true })
    var self = this;
    axios({
      method: 'delete',
      url: apiurl + '/deleteNurseInfo',
      data: {
        "id": this.state.iddata,
      }
    })
      .then(function (response) {
        // alert("Deleted")
        message.error('Nurse Deleted Successfully');
        self.props.getTableData();
      })
      .catch(function (error) {
      });

    this.setState({ props_loading: false })
  }

  render() {
    return (
      <div>
        <Tablecomponent
          heading={[
            { id: "", label: "S.No" },
            { id: "nurseName", label: "Nurse Name" },
            { id: "gender", label: "Gender" },
            { id: "age", label: "Age" },
            { id: "experience", label: "Experience" },
            { id: "nationality", label: "Nationality" },
            { id: "", label: "Action" }
          ]}
          rowdata={this.props.tableData}
          props_loading={this.props.props_loading}
          tableicon_align={"cell_eye"}
          deleteopen={this.deleteopen}
          modelopen={(e, id) => this.modelopen(e, id)}
          LocationOnIcon="close"
        />
        <Managenursemodal open={this.state.workflow} onClose={this.closemodal} viewData={this.state.viewData} />
        <Modalcomp
          visible={this.state.historyopen}
          title={"Nurse History"}
          closemodal={e => this.closemodal(e)}
          clrchange="textclr"
        // xswidth={"xs"}
        >
          <Managenurseform  history_data_store={this.state.history_data_store} closemodal={this.closemodal}/>
        </Modalcomp>


        <Modalcomp visible={this.state.editopen}
          editData={this.state.editData}
          title={"Edit Nurse Details"}
          clrchange="textclr"
          closemodal={(e) => this.closemodal(e)} >
          <Nurse_form getTableData={() => this.props.getTableData()}
            closemodal={this.closemodal}
            editData={this.state.editData}
            editopenModal={this.state.editopen && true} />
        </Modalcomp>

        <Modalcomp visible={this.state.deleteopen} title={"Delete"} closemodal={this.closemodal} xswidth={"xs"} clrchange="textclr">
          <DeleteNurse deleterow={this.deleterow} closemodal={this.closemodal} />
        </Modalcomp>
      </div>
    );
  }
}

export default DashboardTable;
