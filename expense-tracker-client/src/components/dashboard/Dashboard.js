import React, { Component } from 'react';
import { Navbar, NavbarBrand, NavbarNav, NavbarToggler, Collapse, NavItem, } from 'mdbreact';
import { BrowserRouter as Router, Route, Switch, Link, withRouter, Redirect } from 'react-router-dom';

import Category from './../category/Category'
import Expenses from './../expenses/Expenses'

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

    onClick(){
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
        const { match, userData } = this.props
        
        if (userData.user.id == `` && userData.user.username == ``) {
            return (<Redirect to="/" />)
        }
        return (
            <div>
                <Navbar color="indigo" dark expand="md" scrolling>
                    <NavbarBrand href="/">
                        <strong>Expense Tracker</strong>
                    </NavbarBrand>
                    { !this.state.isWideEnough && <NavbarToggler onClick = { this.onClick } />}
                    <Collapse isOpen = { this.state.collapse } navbar>
                        <NavbarNav left>
                        <NavItem>
                            <Link className={`nav-link Ripple-parent `} to={`/dashboard`}>Home</Link>
                            {/* <NavLink to={`${match.url}`}>Home</NavLink> */}
                        </NavItem>
                        <NavItem>
                            <Link className={`nav-link Ripple-parent `} to={`/dashboard/category`}>Category</Link>
                            {/* <NavLink to={`${match.url}/category`}>Category</NavLink> */}
                        </NavItem>
                        </NavbarNav>
                    </Collapse>
                </Navbar>
                <div className={`container`}>
                        <Route exact path={`${match.url}`} component={Expenses} />
                        <Route  path={`${match.url}/category`} component={Category} />
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

export default withRouter(connect(mapStateToProps)(Dashboard));