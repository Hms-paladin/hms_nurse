import React from "react";
import Tablecomponent from "../../helpers/TableComponent/TableComp";
import Modalcomp from "../../helpers/ModalComp/Modalcomp";
import "./CustomerHistoryTable.css";
import HistoryForm from "./HistoryForm";
import Axios from "axios";
import { apiurl } from "../../App";
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Moment from "react-moment";
import print from "../../Images/print.svg";
import pdf from "../../Images/pdf.svg";
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import excel from "../../Images/excel.svg";
import ReactExport from 'react-data-export';
import ReactToPrint from "react-to-print";
import PrintData from "./printdata";
import  ReactSVG  from 'react-svg';
import { Input } from "antd"; 
import dateformat from 'dateformat';
import DateRangeSelect from "../../helpers/DateRange/DateRange";
const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;


var dateFormat = require('dateformat');
var now = new Date();
var current_day = dateFormat(now, "yyyy-mm-dd")

class CustomerHistoryTable extends React.Component {
  state = {
    openview: false,
    tabledata:[],
    OpenViewData:[],
    getTableData:[],
    search:null,
    totalValue:"",
    props_loading:true,
    spinner: false,
  };

  createData = parameter => {
    var keys = Object.keys(parameter);
    var values = Object.values(parameter);
    var returnobj = {};

    for (var i = 0; i < keys.length; i++) {
      returnobj[keys[i]] = values[i];
    }
    return returnobj;
  };

  modelopen = (data,id) => {
    // alert(id,"id_chk")
    if (data === "view") {
      var OpenViewData = this.state.totalValue.filter((OpenViewData)=>{
        console.log(OpenViewData,"store_data_check")
         return OpenViewData.PatientId===id
      })
      this.setState({ 
        openview: true,
        OpenViewData:OpenViewData
       });
      console.log(OpenViewData,"openviewdata_checking")
    }
    // else if (data === "edit") {
    //   this.setState({ editopen: true });
    // }
  };
  searchChange = (e) =>{
    this.setState({
      search : e.target.value
    })
    this.setState({})
      }
  closemodal = () => {
    this.setState({ openview: false, });
  };

  componentDidMount(){
    this.getTableData()
    // this.ViewTableData()
  }

  getTableData =(rangeday) =>{
    var self = this
    Axios({
      method: 'post',
      url: apiurl + 'Nurse/getvendornurseCustomerhistory',
      data: {
        nursevendorId:5,
        // week: rangeday==="week"?true:false,
        // month: rangeday==="month"?true:false,
        // year: rangeday==="year"?true:false,
        searchContent:"true",
        date: dateformat(new Date(), "yyyy-mm-dd"),
        date_to:dateformat(new Date(), "yyyy-mm-dd"),
        name:"",
        // date:current_day,
        limit:10,
        pageno:1,
      }
  })
    .then((response) => {
      console.log(response,"response_check_cancel_table")
      var tabledata = [];
      console.log(response.data.data[0].details,"nursename_check")
      response.data.data[0].details.map((val) =>{
        console.log(val,"text_valdata")
        tabledata.push({customer:val.PatientName,nursename:val.Nursename,gender:val.gender,age:val.age,
                      id:val.PatientId})
                      //  console.log(val.nursevendorId,"nursevendor_id")
        })
        this.setState({
          tabledata:tabledata,
          props_loading:false,
          totalValue:response.data.data[0].details,
      })
      console.log(this.state.tabledata,"table_data_nurse")
  }).catch((error) => {
      // alert(JSON.stringify(error))
  })
  // console.log("deletedetails", details)
  }

  // DATE RANGE PICKER FUNCTIONALITY

  dayReport=(data)=>{
  //   function formatTimeShow(h_24) {
      
  //     var h = Number(h_24.substring(0, 2)) % 12;
  //     if (h === 0) h = 12;
  //     return (h < 10 ? '0' : '') + h + ':'+h_24.substring(3, 5) + (Number(h_24.substring(0, 2)) < 12 ? ' AM' : ' PM');
  // }
    console.log(data,"itemdaterange")
      var startdate = dateformat(data[0].startDate, "yyyy-mm-dd")
      var enddate = dateformat(data[0].endDate,"yyyy-mm-dd")
    this.setState({ spinner: true })
    var self = this
    Axios({
            method: 'post',
            url: apiurl + 'Nurse/getvendornurseCustomerhistory',
            data: {
              "nursevendorId":"5",
              "week":false,
              "month":false,
              "year":true,
              "searchContent":"false",
              "name":"",
              "date":startdate,
              "date_to":enddate,
              "limit":10,
              "pageno":1
      }
    })
    .then((response) => {
      var tabledata = [];
      var tableDatafull = [];
      response.data.data[0].details.map((val,index) =>{
        console.log(val,"text_valdata")
        tabledata.push({customer:val.PatientName,nursename:val.Nursename,gender:val.gender,age:val.age,
                              id:val.PatientId
            })
             tableDatafull.push(val)
        })
        this.setState({
          tabledata:tabledata,
          wk_Mn_Yr_Full_Data: tableDatafull,
          props_loading:false,
          spinner:false
      })
      console.log(this.state.wk_Mn_Yr_Full_Data,"datattat")
  })
  }
  // PDF FUNCTION
  generatepdf=()=>{
    if(this.state.tabledata.length === 0){
      alert("Table data is empty")
    }
    else{
      // alert("ee")
    const doc = new jsPDF("a3")
    var bodydata  = []
    this.state.tabledata.map((data,index)=>{
      bodydata.push([index+1,data.customer,data.nursename,data.gender,data.age])
    })
    doc.autoTable({
      beforePageContent: function(data) {
        doc.text("Uploaded Details", 15, 23); // 15,13 for css
        },
      margin: { top: 30 },
      showHead:"everyPage",
      theme:"grid",
      head: [['S.No', 'Customer','Nurse Name','Gender','Age',]],
      body:bodydata,
    })
     
    doc.save('UploadDeatails.pdf')
    
  }
}
  // PRINT FUNCTION
  generateprint=()=>{
    this.setState({
      printComOpen:true
    })
  }

  render() {
    const { Search } = Input;
    const Tabledatas = this.state.tabledata.filter((data)=>{
      console.log(data,"Search_data")
      if(this.state.search === null)
        return data
        else if (data.customer!== null && data.customer.toLowerCase().includes(this.state.search.toLowerCase())
        || (data.nursename!= null && data.nursename.toLowerCase().includes(this.state.search.toLowerCase()))
        || (data.gender!= null && data.gender.toLowerCase().includes(this.state.search.toLowerCase()))
        || (data.age!= null && data.age.toString().includes(this.state.search.toString()))
        ) {
          return data
      }   
    })
    // EXCEL FUNCTION
    var multiDataSetbody = []
    this.state.tabledata.map((xldata,index)=>{
      if(index%2!==0){
        multiDataSetbody.push([{value:index+1,style:{alignment:{horizontal:"center"}}},
        {value:xldata.customer},
        {value:xldata.nursename},
        {value:xldata.gender},
        {value:xldata.age},])
      }else{
      multiDataSetbody.push([
        {value:index+1,style: {alignment:{horizontal:"center"},fill: {patternType: "solid", fgColor: {rgb: "e2e0e0"}}}},
        {value:xldata.customer,style: {fill: {patternType: "solid", fgColor: {rgb: "e2e0e0"}}}},
        {value:xldata.nursename,style: {fill: {patternType: "solid", fgColor: {rgb: "e2e0e0"}}}},
        {value:xldata.gender,style: {fill: {patternType: "solid", fgColor: {rgb: "e2e0e0"}}}},
        {value:xldata.age,style: {fill: {patternType: "solid", fgColor: {rgb: "e2e0e0"}}}},])
      }
    })
    const multiDataSet = [
      {
          columns: [
        {title: "S.No", width: {wpx: 35},style: {fill: {patternType: "solid", fgColor: {rgb: "86b149"}}}},
        {title: "Customer", width: {wch: 20},style: {fill: {patternType: "solid", fgColor: {rgb: "86b149"}}}},
        {title: "Nurse Name", width: {wch: 20},style: {fill: {patternType: "solid", fgColor: {rgb: "86b149"}}}},  
        {title: "Gender", width: {wpx: 90},style: {fill: {patternType: "solid", fgColor: {rgb: "86b149"}}}},
        {title: "Age",width:{wpx: 100},style:{fill:{patternType: "solid", fgColor: {rgb: "86b149"}}}},
          ],
          data: multiDataSetbody      
      }
  ];
    return (
      <>
      <div className="title_dashboard">
      <p className="title_header">CUSTOMER HISTORY </p>
      <div style={{ fontSize: "16px" ,display:"flex",alignItems:"center"}}>
      <DateRangeSelect dynalign={"dynalign"} rangeDate={(item)=>this.dayReport(item)} />
      {/* <ButtonGroup className="clinic_group_details" size="small" aria-label="small outlined button group">
              <Button className="clinic_details" onClick={()=>this.getTableData("week")}>This Week</Button>
              <Button className="clinic_details" onClick={()=>this.getTableData("month")}>This Month</Button>
              <Button className="clinic_details" onClick={()=>this.getTableData("year")}>This Year</Button>
        </ButtonGroup>
        <Moment format="DD-MMM-YYYY" className="mr-2"></Moment> */}
        <Search
          placeholder="search"
          onSearch={value => console.log(value)}
          style={{ width: 150 }}
          onChange={(e)=>this.searchChange(e)}
        />
          <div className="icon_head">
          <ReactSVG src={pdf}
            onClick={this.generatepdf}
            style={{marginRight:"15px",marginLeft:"15px"}}/>
             {this.state.tabledata.length===0 ? <ReactSVG src={excel} style={{ marginRight: "15px" }} /> :
        <ExcelFile element={<ReactSVG src={excel} style={{ marginRight: "15px" }} />}>
          <ExcelSheet dataSet={multiDataSet} name="Uploaded Details"/>
        </ExcelFile>
        }
        <ReactToPrint
                trigger={() => <ReactSVG src={print} />}
                content={() => this.componentRef}
              />
              <div style={{ display: "none" }}>
                <PrintData printTableData={this.state.tabledata}
                 ref={el => (this.componentRef = el)}/>
              </div>
      </div>
      </div>
    </div>
      <div>
        <Tablecomponent
          heading={[
            { id: "", label: "S.No" },
            { id: "customer", label: "Customer" },
            { id: "nursename", label: "Nurse Name" },
            { id: "gender", label: "Gender" },
            { id: "age", label: "Age" },
            { id: "", label: "Action" }
          ]}
          
          // tableicon_align={"cell_eye"}
          rowdata={Tabledatas.length ===  0 ? []: Tabledatas}
          props_loading={this.state.props_loading}
          DeleteIcon="close"
          EditIcon="close"
          modelopen={(e,id) => this.modelopen(e,id)}
          HistoryIcon="close"
          LocationOnIcon="close"
        />

        <Modalcomp className="clr_class"
          visible={this.state.openview}
          title={"CUSTOMER HISTORY"}
          closemodal={e => this.closemodal(e)}
          clrchange="textclr"
          // xswidth={"xs"}
>
        <HistoryForm  OpenViewData={this.state.OpenViewData}/>
        </Modalcomp>
        {/* <Modalcomp
          visible={this.state.editopen}
          title={"Edit details"}
          closemodal={e => this.closemodal(e)}
          // xswidth={"xs"}
        ></Modalcomp> */}
      </div>
      </>
    );
  }
}
export default CustomerHistoryTable;



