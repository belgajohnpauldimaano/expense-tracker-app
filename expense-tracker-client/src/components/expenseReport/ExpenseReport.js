import React, { Component } from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import TableContainer from './../uicomponents/tableContainer/TableContainer'
import { Container } from 'mdbreact';
import { Chart } from 'react-chartjs-2';
import _ from 'lodash'

import { report_expense } from './../../actions/index'
class ExpenseReport extends Component {
    componentDidMount() {
        this.props.report_expense((expenses = []) => {
            var ctxB = document.getElementById("barChart").getContext('2d');
            let labels = []
            let data = []
            _.forEach(expenses, (e, i) => {
                labels.push(e.title)
                data.push(e.rpt_data)
            })
            new Chart(ctxB, {
                type: 'bar',
                data: {
                    labels: labels,
                    datasets: [{
                        label: 'Expense Report',
                        data: data,
                        // backgroundColor: [
                        //     'rgba(255, 99, 132, 0.2)',
                        //     'rgba(54, 162, 235, 0.2)',
                        //     'rgba(255, 206, 86, 0.2)',
                        //     'rgba(75, 192, 192, 0.2)',
                        //     'rgba(153, 102, 255, 0.2)',
                        //     'rgba(255, 159, 64, 0.2)'
                        // ],
                        // borderColor: [
                        //     'rgba(255,99,132,1)',
                        //     'rgba(54, 162, 235, 1)',
                        //     'rgba(255, 206, 86, 1)',
                        //     'rgba(75, 192, 192, 1)',
                        //     'rgba(153, 102, 255, 1)',
                        //     'rgba(255, 159, 64, 1)'
                        // ],
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero: true
                            }
                        }]
                    }
                }
            });
        })

    }
    render() {
        const { expenseReport } = this.props
        return (
            <div>
                <Container>
                    <canvas id="barChart"></canvas>
                </Container>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        expenses: state.expenses,
        category: state.category,
        expenseReport: state.expenseReport
    }
}
export default withRouter(connect(mapStateToProps, { report_expense })(ExpenseReport));