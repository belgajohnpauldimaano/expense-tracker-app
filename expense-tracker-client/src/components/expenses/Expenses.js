import React, { Component } from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import TableContainer from './../uicomponents/tableContainer/TableContainer'
import { Container, Button, Modal, ModalBody, ModalHeader, ModalFooter } from 'mdbreact';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import DatePicker from 'material-ui/DatePicker';

import { fetch_expenses, fetch_categories, save_expense, delete_expense } from './../../actions/index'

class Expenses extends Component {
    constructor(props) {
        super(props)

        this.state = {
            modal: false,
            isAdding: true,
            selectedId: 1,
            selectedCatId: 1,
            formElements: {
                title: {
                    type: `text`,
                    value: ``,
                    label: `Enter`,
                    touched: false,
                    hasError: true,
                    error: ``,
                    required: true
                },
                category: {
                    type: `select`,
                    values: [],
                    value: ``,
                    label: `Enter`,
                    touched: false,
                    hasError: true,
                    error: ``,
                    required: true
                },
                value: {
                    type: `text`,
                    value: ``,
                    label: `Enter`,
                    touched: false,
                    hasError: true,
                    error: ``,
                    required: true
                },
                date: {
                    type: `date`,
                    value: ``,
                    label: `Enter`,
                    touched: false,
                    hasError: true,
                    error: ``,
                    required: true
                },
            }
        };
    }
    componentDidMount() {
        this.props.fetch_categories((cat) => {

            const formElements = {
                ...this.state.formElements
            }
            const updatedFormElement = {
                ...formElements[`category`]
            }
            updatedFormElement.values = cat
            formElements[`category`] = updatedFormElement
            this.setState({ formElements: formElements })

        })
        this.props.fetch_expenses()
    }


    toggle = () => {
        this.setState({
            modal: !this.state.modal
        });
    }
    handleModalEditButton = (category) => {
        const formElements = {
            ...this.state.formElements
        }
        Object.keys(category).forEach((key) => {
            if (key !== `id`) {
                const updatedFormElement = {
                    ...formElements[key]
                }

                const val = category[key]
                updatedFormElement.value = val
                updatedFormElement.touched = true
                if (updatedFormElement.required && val.length < 1) {
                    updatedFormElement.error = `${key} is required`
                    updatedFormElement.hasError = true
                } else {
                    updatedFormElement.error = ``
                    updatedFormElement.hasError = false
                }
                formElements[key] = updatedFormElement
            }
        })
        this.setState({
            modal: !this.state.modal,
            formElements: formElements,
            isAdding: false,
            selectedId: category.id
        });
    }
    handleFormElementChange = (e) => {
        const i = e.target
        const formElements = {
            ...this.state.formElements
        }
        const updatedFormElement = {
            ...formElements[i.name]
        }

        const val = i.value
        updatedFormElement.value = val
        updatedFormElement.touched = true
        if (updatedFormElement.required && val.length < 1) {
            updatedFormElement.error = `${i.name} is required`
            updatedFormElement.hasError = true
        } else {
            updatedFormElement.error = ``
            updatedFormElement.hasError = false
        }
        formElements[i.name] = updatedFormElement
        this.setState({
            formElements: formElements
        });
    }
    handleFormSubmit = (e) => {
        e.preventDefault()
        const formElements = {
            ...this.state.formElements
        }
        let formValid = false
        for (let key in formElements) {
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
            this.setState({ formElements: formElements })

        }
        if (formValid) {
            const dataParams = {
                isAdding: this.state.isAdding,
                expense: {
                    id: this.state.selectedId,
                    title: this.state.formElements.title.value,
                    category: this.state.formElements.category.value,
                    value: this.state.formElements.value.value,
                    date: this.state.formElements.date.value,

                }
            }

            const self = this
            this.props.save_expense(dataParams, () => {
                self.props.fetch_expenses()

                const formElements = {
                    ...self.state.formElements
                }
                let formValid = false
                for (let key in formElements) {
                    const updatedFormElement = {
                        ...formElements[key]
                    }
                    updatedFormElement.touched = false
                    updatedFormElement.error = ``
                    updatedFormElement.hasError = false
                    updatedFormElement.value = ``
                    formElements[key] = updatedFormElement
                }
                self.setState({ modal: !this.state.modal, formElements: formElements })
            })
        }
    }
    handleDeleteButton = (id) => {
        this.props.delete_expense(id, () => {
            this.props.fetch_expenses()
        })
    }
    handleModalAddButton = () => {
        this.setState({ modal: !this.state.modal, })
    }
    render() {

        const { expenses } = this.props
        const { formElements, selectedCatId } = this.state

        const formElementsArray = []
        for (let key in formElements) {
            formElementsArray.push({
                id: key,
                config: formElements[key]
            })
        }
        const formElementContainer = formElementsArray.map((elem, key) => {
            if (elem.config.type === `select`) {
                const selectValues = elem.config.values.map((s, i) => {
                    return <option key={i} value={s.id} defaultValue={selectedCatId == s.id ? `selected` : ``}>{s.title}</option>
                })
                return (
                    <div key={key} style={{ marginTop: 10 }}>
                        <label htmlFor="">{elem.config.label} {elem.id}</label>
                        <select type={elem.config.type} name={elem.id} value={elem.config.value} onChange={this.handleFormElementChange} placeholder={`${elem.config.label} ${elem.id}`} className="form-control">
                            <option value={0} >Select Category</option>
                            {selectValues}
                        </select>
                        {elem.config.required && elem.config.touched && elem.config.hasError ? <span>
                            {elem.config.error}
                        </span> : ``}
                    </div>)
            }
            return (
                <div key={key} style={{ marginTop: 10 }}>
                    <label htmlFor="">{elem.config.label} {elem.id}</label>
                    <input type={elem.config.type} name={elem.id} value={elem.config.value} onChange={this.handleFormElementChange} placeholder={`${elem.config.label} ${elem.id}`} className="form-control" />
                    {elem.config.required && elem.config.touched && elem.config.hasError ? <span>
                        {elem.config.error}
                    </span> : ``}
                </div>
            )
        })

        const expensesList = expenses.expenses.map((c, k) => {
            return (
                <tr key={k}>
                    <td>{c.expense_title}</td>
                    <td>{c.category_title}</td>
                    <td>{c.date}</td>
                    <td>{c.value}</td>
                    <td>
                        {/* <Button onClick={() => this.handleModalEditButton(c)} size="sm" color="primary">Edit</Button> */}
                        <Button onClick={() => this.handleDeleteButton(c.id)} size="sm" color="danger">Delete</Button>
                    </td>
                </tr>
            )
        })

        return (
            <div>

                <h1>Expenses</h1>
                <Button size="sm" onClick={this.handleModalAddButton} color="primary">Add</Button>
                <TableContainer headers={[`Title`, `Description`, `Date`, `Value`, `Actions`]} data={expensesList} />
                <Modal isOpen={this.state.modal} toggle={this.toggle}>
                    <form onSubmit={this.handleFormSubmit}>
                        <ModalHeader toggle={this.toggle}>Expenses</ModalHeader>
                        <ModalBody>
                            {formElementContainer}
                        </ModalBody>
                        <ModalFooter>
                            <Button color="secondary" type="submit">Save</Button>{' '}
                            <Button color="primary" onClick={this.toggle}>Cancel</Button>
                        </ModalFooter>
                    </form>
                </Modal>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        expenses: state.expenses,
        category: state.category
    }
}
export default withRouter(connect(mapStateToProps, { fetch_expenses, fetch_categories, save_expense, delete_expense })(Expenses));