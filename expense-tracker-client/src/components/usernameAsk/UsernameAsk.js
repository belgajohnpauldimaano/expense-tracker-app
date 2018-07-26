import React, { Component } from 'react';

import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { register_user } from './../../actions/index'

import { withRouter } from 'react-router-dom'
class UsernameAsk extends Component {
    constructor (props) {
        super(props)
        this.state = {
            formElement: {
                username: {
                    type: `text`,
                    value: ``,
                    label: `Enter username`,
                    touched: false,
                    hasError: true,
                    error: ``,
                    required: true
                }
            }
        }
    }
    handleFormElementChange = (e) => {
        const input = e.target
        const formElements = {
            ...this.state.formElement
        }
        const updatedFormElement = {
            ...formElements[input.name]
        }

        const val = input.value.trim()
        updatedFormElement.value = val
        updatedFormElement.touched = true
        if (updatedFormElement.required && val.length < 1) {
            updatedFormElement.error = `${input.name} is required`
            updatedFormElement.hasError = true
        } else {
            updatedFormElement.error = ``
            updatedFormElement.hasError = false
        }
        formElements[input.name] = updatedFormElement
        this.setState({formElement : formElements})
    }
    handleUsernameSubmit = (e) => {
        e.preventDefault()
        const { formElement } = this.state
        const formElements = {
            ...this.state.formElement
        }
        let formValid = false
        for (let key in formElement) {
            const updatedFormElement = {
                ...formElements[key]
            }
            updatedFormElement.touched = true
            if (updatedFormElement.required && updatedFormElement.value.length < 1) {
                updatedFormElement.error = `${key} is required`
                updatedFormElement.hasError = true
                formValid = false
            } else {
                updatedFormElement.error = ``
                updatedFormElement.hasError = false
                formValid = true
            }
            formElements[key] = updatedFormElement
            this.setState({formElement : formElements})
        }
        if (formValid) {
            this.props.register_user({un : formElement.username.text})        
        }
    }
    render() {
        const { formElement } = this.state
        const { userData } = this.props
        const formElementsArray = []
        for (let key in formElement) {
            formElementsArray.push({
                id: key,
                config: formElement[key]
            })
        }
        const formElementContainer = formElementsArray.map((elem, key) => {
            return (
                <div key={key}>
                    <label htmlFor="">{elem.config.label}</label>
                    <input type={elem.config.type} name={elem.id} value={elem.config.value} onChange={this.handleFormElementChange} placeholder={elem.config.label} className="form-control" />
                    {elem.config.required && elem.config.touched && elem.config.hasError ? <span>
                        {elem.config.error}
                    </span> : ``}
                </div>
            )
        })
        if (userData.user.id !== `` && userData.user.username !== ``) {
            return (<Redirect to="/dashboard" />)
        }
        return (
            <div className="container">
                <h1>Expense Tracker</h1>  
                {userData.status}
                <form onSubmit={this.handleUsernameSubmit}>
                    <div>
                        {formElementContainer}
                    </div>
                    <button type="submit" className="btn btn-primary ">Submit</button>
                </form>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        userData: state.user
    }
}

export default withRouter(connect(mapStateToProps, { register_user })(UsernameAsk))