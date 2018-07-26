import React, { Component } from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import TableContainer from './../uicomponents/tableContainer/TableContainer'
import { Container, Button, Modal, ModalBody, ModalHeader, ModalFooter } from 'mdbreact'; 
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import DatePicker from 'material-ui/DatePicker';       

import { fetch_expenses, fetch_categories, save_expense } from './../../actions/index'

class Expenses extends Component {
    constructor (props) {
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
                val: {
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
    componentDidMount () {
        // let datePickerHr = document.querySelector('.datepicker-wrapper').getElementsByTagName('hr')[0];
        // datePickerHr.style.border = "none";

        this.props.fetch_categories((cat) => {
            
            const formElements = {
                ...this.state.formElements
            }
            const updatedFormElement = {
                ...formElements[`category`]
            }
            updatedFormElement.values = cat
            formElements[`category`] = updatedFormElement
            console.log(updatedFormElement, 'updatedFormElement.value')
            this.setState({ formElements: formElements })

        })
        this.props.fetch_expenses()
        console.log(this.props.category, 'category')
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
          formElements : formElements,
          isAdding: false,
          selectedId: category.id
        });
    }
    handleFormElementChange = (e) => {
        console.log(e)
        const i = e.target
        console.log(i, 'handleFormElementChange')
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
          formElements : formElements
        });
    }
    handleUsernameSubmit = (e) => {
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
                this.setState({formElements : formElements})
            
        }
        if (formValid) {
            console.log(this.state.formElements.category, 'this.state.formElements.category')
            const dataParams = {
                isAdding : this.state.isAdding,
                category : {
                    id : this.state.selectedId,
                    title : this.state.formElements.title.value,
                    category : this.state.formElements.category.value,
                    value : this.state.formElements.val.value,
                    date : this.state.formElements.date.value,
                    
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
                self.setState({ modal: !this.state.modal, formElements : formElements})
            })        
        }
    }
    handleDeleteButton = (id) => {
        // this.props.delete_category(id, () => {
        //     this.props.fetch_categories()
        // })
    }
    handleModalAddButton = () => {
        this.setState({ modal: !this.state.modal, })
    }
    render() {
        
        const { expenses } = this.props
        const { formElements, selectedCatId } = this.state
        
        console.log(expenses.expenses, 'expenses')
        const formElementsArray = []
        for (let key in formElements) {
            formElementsArray.push({
                id: key,
                config: formElements[key]
            })
        }
        const formElementContainer = formElementsArray.map((elem, key) => {
            // if (elem.config.type === `date`) {
            //     return (
            //         <div style={{ marginTop: 10 }}>
            //         <label htmlFor="">{elem.config.label} {elem.id}</label>
            //             <MuiThemeProvider>
            //                 <div className="datepicker-wrapper">
            //                 <DatePicker onChange={(e) => {console.log(e)}} style={{borderBottom: '1px solid #bdbdbd', height: '3rem'}} name={elem.id} id="datepicker" textFieldStyle={{width: '100%'}} hintText="Selected date" ></DatePicker>
            //                 </div>
            //     </MuiThemeProvider>
            //     </div>
            //     )
            // }
            if (elem.config.type === `select`) {
                console.log(elem.config, 'elem.config')
                const selectValues = elem.config.values.map((s, i) => {
                    return <option value={s.id} defaultValue={selectedCatId == s.id ? `selected` : ``}>{s.title}</option>
                })
                return (
                    <div key={key} style={{ marginTop: 10 }}>
                        <label htmlFor="">{elem.config.label} {elem.id}</label>
                        <select type={elem.config.type} name={elem.id} value={elem.config.value} onChange={this.handleFormElementChange} placeholder={`${elem.config.label} ${elem.id}`} className="form-control">
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
                        <Button  onClick={() => this.handleModalEditButton(c)} size="sm" color="primary">Edit</Button>
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
                    <form onSubmit={this.handleUsernameSubmit}>
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
export default withRouter(connect(mapStateToProps, {fetch_expenses, fetch_categories, save_expense})(Expenses));