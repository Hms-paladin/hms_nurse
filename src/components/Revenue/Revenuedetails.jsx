import React from "react";
import Tablecomponent from "../../helpers/TableComponent/TableComp";
import Modalcomp from "../../helpers/ModalComp/Modalcomp";
import "./Revenuedetails.css";
class Revenuedetails extends React.Component {
  state = {
    openview: false
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

  render() {
    return (
      <div>
        <Tablecomponent
          heading={[
            { id: "", label: "S.No" },
            { id: "customer", label: "Customer" },
            { id: "nursename", label: "Nurse Name" },
            { id: "dutyhours", label: "Duty Hours" },
            { id: "totalmonths", label: "Total Months" },
            { id: "date", label: "Date" },
            { id: "costpermonth", label: "Cost/Month" },
            { id: "cash", label: "Cash" },
            { id: "card", label: "Card" },
            { id: "wallet", label: "Wallet" },
            { id: "totalcharge", label: "Total Charge(KWD)" }

            // { id: "", label: "Action" }
          ]}
          rowdata={[
            this.createData({
              customer: "AAMINA",
              nursename: "AMMINA",
              dutyhours: "12",
              totalmonths: "2",
              date: "27 Oct 2019",
              costpermonth: "500",
              cash: "0",
              card: "100",
              wallet: "0",
              totalcharge: "1000"
            }),
            this.createData({
              customer: "AAMINA",
              nursename: "AMMINA",
              dutyhours: "12",
              totalmonths: "2",
              date: "27 Jan 2019",
              costpermonth: "500",
              cash: "0",
              card: "100",
              wallet: "0",
              totalcharge: "1000"
            }),
            this.createData({
              customer: "AAMINA",
              nursename: "AMMINA",
              dutyhours: "12",
              totalmonths: "2",
              date: "18 Oct 2019",
              costpermonth: "500",
              cash: "0",
              card: "100",
              wallet: "0",
              totalcharge: "1000"
            }),
            this.createData({
              customer: "AAMINA",
              nursename: "AMMINA",
              dutyhours: "12",
              totalmonths: "2",
              date: "27 Feb 2019",
              costpermonth: "500",
              cash: "0",
              card: "100",
              wallet: "0",
              totalcharge: "1000"
            }),
            this.createData({
              customer: "AAMINA",
              nursename: "AMMINA",
              dutyhours: "12",
              totalmonths: "2",
              date: "12 Dec 2019",
              costpermonth: "500",
              cash: "0",
              card: "100",
              wallet: "0",
              totalcharge: "1000"
            }),
            this.createData({
              customer: "AAMINA",
              nursename: "AMMINA",
              dutyhours: "12",
              totalmonths: "2",
              date: "27 Oct 2019",
              costpermonth: "500",
              cash: "0",
              card: "100",
              wallet: "0",
              totalcharge: "1000"
            }),
            this.createData({
              customer: "AAMINA",
              nursename: "AMMINA",
              dutyhours: "12",
              totalmonths: "2",
              date: "09 Sep 2019",
              costpermonth: "500",
              cash: "0",
              card: "100",
              wallet: "0",
              totalcharge: "1000"
            })
          ]}
          //   tableicon_align={"cell_eye"}
          modelopen={e => this.modelopen(e)}
          EditIcon="close"
          DeleteIcon="close"
          VisibilityIcon="close"
          HistoryIcon="close"
          LocationOnIcon="close"
        />

        {/* <div className="docrevenue_total">
          <div className="totalkwd">
            <p className="grand_total">Grand Total</p>
            <span className="grand_total">:</span>
            <p className="revtotal_amt">4800 KWD</p>
          </div>
        </div> */}

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
    );
  }
}

export default Revenuedetails;
