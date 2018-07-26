import React, { Component } from 'react';

class TableContainer extends Component {
    render() {
        const { headers , data} = this.props
        console.log(headers, `headers`)
        const theadCol = headers.map((h, key) => {
            return <th key={key}>{h}</th>
        })
        return (
            <table className={`table`}>
                <thead className={`thead-dark`}>
                    <tr>{theadCol}</tr>
                </thead>
                <tbody>
                    {data}
                </tbody>
            </table>
        );
    }
}

export default TableContainer;