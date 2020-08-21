import React from 'react';
import CustomerHistoryTable from './CustomerHistoryTable';
import NurseCustomerHistoryTable from './NurseCustomerHistoryTable';

export default class CustomerHistoryMaster extends React.Component {
    state = {
        nurseHistory: false
    }

    // call back func to CustomerHistoryTable
    goToDetailedCustomerHistory = (id) => {
        this.setState({
            nurseId: id,
            nurseHistory: true
        })
    }
    backToFirstTable = () => {
        this.setState({
            nurseHistory: false
        })
    }
    render() {
        return (
            <>
                {

                    this.state.nurseHistory === false ?
                        <CustomerHistoryTable
                            goToDetailedCustomerHistory={(id) => this.goToDetailedCustomerHistory(id)}
                        />
                        :
                        <NurseCustomerHistoryTable nurseId={this.state.nurseId} backToFirstTable={() => this.backToFirstTable()} />
                }
            </>
        )
    }
}