import React, { Component } from 'react';
import { Navbar, NavbarBrand, NavbarNav, NavbarToggler, Collapse, NavItem, } from 'mdbreact';
import { BrowserRouter as Router, Route, Switch, Link, withRouter, Redirect } from 'react-router-dom';

import Category from './../category/Category'
import Expenses from './../expenses/Expenses'
import ExpenseReport from './../expenseReport/ExpenseReport'

import { logout_user } from './../../actions/index'

import { connect } from 'react-redux'

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            collapse: false,
            isWideEnough: false,
            dropdownOpen: false
        };
        this.onClick = this.onClick.bind(this);
        this.toggle = this.toggle.bind(this);
    }

    onClick() {
        this.setState({
            collapse: !this.state.collapse,
        });
    }

    toggle() {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen
        });
    }
    render() {
        const { match, userData, logout_user } = this.props

        if (userData.user.id == `` && userData.user.username == ``) {
            return (<Redirect to="/" />)
        }
        return (
            <div>
                <Navbar color="indigo" dark expand="md" scrolling>
                    <NavbarBrand href="/">
                        <strong>Expense Tracker</strong>
                    </NavbarBrand>
                    {!this.state.isWideEnough && <NavbarToggler onClick={this.onClick} />}
                    <Collapse isOpen={this.state.collapse} navbar>
                        <NavbarNav left>
                            <NavItem>
                                <Link className={`nav-link Ripple-parent `} to={`/dashboard`}>Expenses</Link>
                            </NavItem>
                            <NavItem>
                                <Link className={`nav-link Ripple-parent `} to={`/dashboard/category`}>Category</Link>
                            </NavItem>
                            <NavItem>
                                <Link className={`nav-link Ripple-parent `} to={`/dashboard/report`}>Expense Report</Link>
                            </NavItem>
                            <NavItem>
                                <a className={`nav-link Ripple-parent `} onClick={() => { logout_user() }}>Logout</a>
                            </NavItem>

                        </NavbarNav>
                    </Collapse>
                </Navbar>
                <div className={`container`}>
                    <Route exact path={`${match.url}`} component={Expenses} />
                    <Route path={`${match.url}/category`} component={Category} />
                    <Route path={`${match.url}/report`} component={ExpenseReport} />
                </div>
            </div>
        );
    }
}


const mapStateToProps = (state) => {
    return {
        userData: state.user
    }
}

export default withRouter(connect(mapStateToProps, { logout_user })(Dashboard));