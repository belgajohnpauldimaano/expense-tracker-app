import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch, Link }  from 'react-router-dom'

import { connect } from 'react-redux'

import Dashboard from '../dashboard/Dashboard'
import UsernameAsk from '../usernameAsk/UsernameAsk'
import Category from './../category/Category'
import Expenses from './../expenses/Expenses'

import 'font-awesome/css/font-awesome.min.css';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import 'mdbreact/dist/css/mdb.css';

import {  fetch_user_local } from './../../actions/index'

import styles from './styles.css'

class Main extends Component {

    componentDidMount () {
        this.props.fetch_user_local()
    }

    render() {
        const { sample_data, generalLoader } = this.props
        console.log(generalLoader, 'generalLoader')
        let overlayLoader = ``
        if (generalLoader.loadingState) {
            overlayLoader = (<div style={{ position: `fixed`, top: 0, right: 0, bottom: 0, left: 0, width: `100%`, zIndex: 999, height: `100%`, background: `rgba(0,0,0,.50)` }}>
            <div className={`text__loading`}>{generalLoader.msg}</div>
            </div>)
        }
        return (
            <div>
                {generalLoader.loadingState && overlayLoader}
                <Router>
                    <div>
                    <Switch>
                        <Route exact path="/" component={UsernameAsk} />
                        <Route path="/dashboard" component={Dashboard} />
                    </Switch>
                    </div>
                </Router>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return ({
        sample_data : state.sample_data,
        userRegister: state.userRegister,
        generalLoader: state.generalLoader
    })
}


export default connect(mapStateToProps, {fetch_user_local})(Main)