import React from "react";
import Tablecomponent from "../../helpers/TableComponent/TableComp";
import Modalcomp from "../../helpers/ModalComp/Modalcomp";
import "./TotalleaveTable.css";
import dateformat from 'dateformat';
import {apiurl} from "../../App";
import axios from "axios";
import print from "../../Images/print.svg";
import pdf from "../../Images/pdf.svg";
import excel from "../../Images/excel.svg";
import  ReactSVG  from 'react-svg';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Moment from "react-moment";
import { Input } from "antd";
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import ReactToPrint from "react-to-print";
import PrintData from "./printdata";
import ReactExport from 'react-data-export';
import DateRangeSelect from "../../helpers/DateRange/DateRange";
const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;

var dateFormat = require('dateformat');
var now = new Date();
var current_day = dateFormat(now, "yyyy-mm-dd")

class TotalleaveTable extends React.Component {
  state = {
    openview: false,
    leaveData:[],
    searchdatas:[],
    search:null,
    props_loading:true,
    wk_Mn_Yr_Full_Data: [],
    spinner: false,
  };


  modelopen = data => {
    if (data === "view") {
      this.setState({ openview: true });
    } else if (data === "edit") {
      this.setState({ editopen: true });
    }
  };

  closemodal = () => {
    this.setState({ openview: false, editopen: false });
  };
  searchChange = (e) =>{
    this.setState({
      search : e.target.value
    })
    this.setState({})
      }
       // PDF FUNCTION
  generatepdf=()=>{
    if(this.state.leaveData.length === 0){
      alert("Table data is empty")
    }
    else{
    const doc = new jsPDF("a3")
    var bodydata  = []
    this.state.leaveData.map((data,index)=>{
      bodydata.push([index+1,data.nursename,data.gender,data.experience,data.Nationality,data.fromdate,data.todate,data.noofdays])
    })
    doc.autoTable({
      beforePageContent: function(data) {
        doc.text("Uploaded Details", 15, 23); // 15,13 for css
        },
      margin: { top: 30 },
      showHead:"everyPage",
      theme:"grid",
      head: [['S.No', 'Nurse Name', 'Gender','Experience','Nationality','From Date','To Date','No of days']],
      body:bodydata,
    })
     
    doc.save('UploadDeatails.pdf')
    
  }
}

componentDidMount(){
 this.getmethod()
}

getmethod(rangeday){
  this.setState({
    props_loading:true,
  })
  axios({
    method:"POST",
    url: apiurl + "patient/getnurseleaveinfo",
    data:{
      nursevendorId:"5",
      // week: rangeday==="week"?true:false,
      // month: rangeday==="month"?true:false,
      // year: rangeday==="year"?true:false,
      week:"false",
      month:"true",
      year:"false",
      searchContent:"false",
      date: dateformat(new Date(), "yyyy-mm-dd"),
      date_to:dateformat(new Date(), "yyyy-mm-dd"),
      name:"",
      // date:current_day,
      // date:"2020-07-01",
	    // date_to:"2020-07-16",
      limit:10,
      pageno:1,
    }
  })
  .then((response)=>{
    console.log(response,"res")
    var leaveData = [];
    response.data.data[0] && response.data.data[0].details.map((val)=>{
      console.log(val,"val_leave")
      leaveData.push({nursename:val.Nursename,gender:val.gender,experience:val.experience,
        Nationality:val.nationality_id,fromdate:dateFormat(val.from_date, "dd-mmm-yyyy"),
        todate:dateFormat(val.to_date, "dd-mmm-yyyy"),noofdays:val.Noofdays,id:val.id
      })
    
    })
    this.setState({
      leaveData:leaveData,
      props_loading:false,
    })
  })
}

// DATE RANGE PICKER FUNCTION
dayReport=(data)=>{
  function formatTimeShow(h_24) {
    
    var h = Number(h_24.substring(0, 2)) % 12;
    if (h === 0) h = 12;
    return (h < 10 ? '0' : '') + h + ':'+h_24.substring(3, 5) + (Number(h_24.substring(0, 2)) < 12 ? ' AM' : ' PM');
}
  console.log(data,"itemdaterange")
    var startdate = dateformat(data[0].startDate, "yyyy-mm-dd")
    var enddate = dateformat(data[0].endDate,"yyyy-mm-dd")
  this.setState({ spinner: true })
  var self = this
  axios({
          method: 'post',
          url: apiurl + 'patient/getnurseleaveinfo',
          data: {
            "nursevendorId":"5",
            "week":false,
            "month":true,
            "year":false,
            "searchContent":"false",
            "name":"",
            "date":startdate,
            "date_to":enddate,
            "limit":10,
            "pageno":1
    }
  })
  .then((response) => {
    var leaveData = [];
    var tableDatafull = [];
    response.data.data[0] && response.data.data[0].details.map((val,index) =>{
      console.log(val,"text_valdata")
      leaveData.push({nursename:val.Nursename,gender:val.gender,experience:val.experience,
        Nationality:val.nationality_id,fromdate:dateFormat(val.from_date, "dd-mmm-yyyy"),
        todate:dateFormat(val.to_date, "dd-mmm-yyyy"),noofdays:val.Noofdays,id:val.id
          })
           tableDatafull.push(val)
      })
      this.setState({
        leaveData:leaveData,
        wk_Mn_Yr_Full_Data: tableDatafull,
        props_loading:false,
        spinner:false
    })
    console.log(this.state.wk_Mn_Yr_Full_Data,"datattat")
})
}

 // PRINT FUNCTION
 generateprint=()=>{
  this.setState({
    printComOpen:true
  })
}

  render() {
    const { Search } = Input;
    const searchdatas = this.state.leaveData.filter((data)=>{
      console.log(data,"Search_data")
      if(this.state.search === null)
        return data
        else if (data.nursename!== null && data.nursename.toLowerCase().includes(this.state.search.toLowerCase())
        || (data.gender!= null && data.gender.toLowerCase().includes(this.state.search.toLowerCase()))
        || (data.experience!= null && data.experience.toString().includes(this.state.search.toString()))
        || (data.Nationality!= null && data.Nationality.toString().includes(this.state.search.toString()))
        || (data.fromdate!= null && data.fromdate.toLowerCase().includes(this.state.search.toLowerCase()))
        || (data.todate!= null && data.todate.toLowerCase().includes(this.state.search.toLowerCase()))
        || (data.noofdays!= null && data.noofdays.toString().includes(this.state.search.toString()))
        ) {
          return data
      }   
    }) 
    // EXCEL FUNCTION
  var multiDataSetbody = []
  this.state.leaveData.map((xldata,index)=>{
    if(index%2!==0){
      multiDataSetbody.push([{value:index+1,style:{alignment:{horizontal:"center"}}},
      {value:xldata.nursename},
      {value:xldata.gender},
      {value:xldata.experience},
      {value:xldata.Nationality},
      {value:xldata.fromdate},
      {value:xldata.todate},
      {value:xldata.noofdays}])
    }else{
    multiDataSetbody.push([
      {value:index+1,style: {alignment:{horizontal:"center"},fill: {patternType: "solid", fgColor: {rgb: "e2e0e0"}}}},
      {value:xldata.nursename,style: {fill: {patternType: "solid", fgColor: {rgb: "e2e0e0"}}}},
      {value:xldata.gender,style: {fill: {patternType: "solid", fgColor: {rgb: "e2e0e0"}}}},
      {value:xldata.experience,style: {fill: {patternType: "solid", fgColor: {rgb: "e2e0e0"}}}},
      {value:xldata.Nationality,style: {fill: {patternType: "solid", fgColor: {rgb: "e2e0e0"}}}},
      {value:xldata.fromdate,style: {fill: {patternType: "solid", fgColor: {rgb: "e2e0e0"}}}},
      {value:xldata.todate,style: {fill: {patternType: "solid", fgColor: {rgb: "e2e0e0"}}}},
      {value:xldata.noofdays,style: {fill: {patternType: "solid", fgColor: {rgb: "e2e0e0"}}}}])
    }
  })
  const multiDataSet = [
    {
        columns: [
      {title: "S.No", width: {wpx: 35},style: {fill: {patternType: "solid", fgColor: {rgb: "86b149"}}}},
      {title: "Nurse Name", width: {wch: 20},style: {fill: {patternType: "solid", fgColor: {rgb: "86b149"}}}},
      {title: "Gender", width: {wch: 20},style: {fill: {patternType: "solid", fgColor: {rgb: "86b149"}}}},  
      {title: "Experience", width: {wpx: 90},style: {fill: {patternType: "solid", fgColor: {rgb: "86b149"}}}},
      {title: "Nationality",width:{wpx: 100},style:{fill:{patternType: "solid", fgColor: {rgb: "86b149"}}}},
      {title: "From Date", width: {wpx: 90},style: {fill: {patternType: "solid", fgColor: {rgb: "86b149"}}}},
      {title: "To Date", width: {wpx: 90},style: {fill: {patternType: "solid", fgColor: {rgb: "86b149"}}}},
      {title: "No of days", width: {wpx: 90},style: {fill: {patternType: "solid", fgColor: {rgb: "86b149"}}}},
        ],
        data: multiDataSetbody      
    }
];
    return (
      <>
      <div className="title_dashboard">
      <p className="title_header">NURSES ON LEAVE </p>
      <div style={{ fontSize: "16px" ,display:"flex",alignItems:"center"}}>
      <DateRangeSelect dynalign={"dynalign"} rangeDate={(item)=>this.dayReport(item)} />
      {/* <ButtonGroup className="clinic_group_details" size="small" aria-label="small outlined button group">
              <Button className="clinic_details" onClick={()=>this.getmethod("week")}>This Week</Button>
              <Button className="clinic_details" onClick={()=>this.getmethod("month")}>This Month</Button>
              <Button className="clinic_details" onClick={()=>this.getmethod("year")}>This Year</Button>
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
        style={{marginRight:"15px",
        marginLeft:"15px"}}/>
         {this.state.leaveData.length===0 ? <ReactSVG src={excel} style={{ marginRight: "15px" }} /> :
        <ExcelFile element={<ReactSVG src={excel} style={{ marginRight: "15px" }} />}>
          <ExcelSheet dataSet={multiDataSet} name="Uploaded Details"/>
        </ExcelFile>
        }
              <ReactToPrint
                trigger={() => <ReactSVG src={print} />}
                content={() => this.componentRef}
              />
               <div style={{ display: "none" }}>
                <PrintData printTableData={this.state.leaveData}
                 ref={el => (this.componentRef = el)}/>
              </div>
      </div>
      </div>
    </div>
      <div>
        <Tablecomponent
          heading={[
            { id: "", label: "S.No" },
            { id: "nursename", label: "Nurse Name" },
            { id: "gender", label: "Gender" },
            { id: "experience", label: "Experience" },
            { id: "Nationality", label: "Nationality" },
            { id: "fromdate", label: "From Date" },
            { id: "todate", label: "To Date" },
            { id: "noofdays", label: "No of days" }
            // { id: "", label: "Action" }
          ]}
          rowdata={searchdatas.length ===  0 ? []: searchdatas}
          modelopen={e => this.modelopen(e)}
          props_loading={this.state.props_loading}
          EditIcon="close"
          DeleteIcon="close"
          VisibilityIcon="close"
          LocationOnIcon="close"
          HistoryIcon="close"
        />
        <Modalcomp
          visible={this.state.openview}
          title={"View details"}
          closemodal={e => this.closemodal(e)}
          xswidth={"xs"}
        ></Modalcomp>
        <Modalcomp
          visible={this.state.editopen}
          title={"Edit details"}
          closemodal={e => this.closemodal(e)}
          xswidth={"xs"}
        ></Modalcomp>
      </div>
      </>
    );
  }
}

export default TotalleaveTable;
