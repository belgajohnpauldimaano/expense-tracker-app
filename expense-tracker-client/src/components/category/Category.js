import React, { Component } from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import { fetch_categories, save_category, delete_category } from './../../actions/index'
import TableContainer from './../uicomponents/tableContainer/TableContainer'
import { Container, Button, Modal, ModalBody, ModalHeader, ModalFooter } from 'mdbreact';

class Category extends Component {
    constructor (props) {
        super(props)
        
        this.state = {
            modal: false,
            isAdding: true,
            selectedId: 0,
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
                description: {
                    type: `text`,
                    value: ``,
                    label: `Enter`,
                    touched: false,
                    hasError: true,
                    error: ``,
                    required: true
                }
            }
        };
    }
    componentDidMount () {
        this.props.fetch_categories()
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
            const dataParams = {
                isAdding : this.state.isAdding,
                category : {
                    id : this.state.selectedId,
                    title : this.state.formElements.title.value,
                    description : this.state.formElements.description.value
                }
            }
            const self = this
            this.props.save_category(dataParams, () => {
                self.props.fetch_categories()
                
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
        this.props.delete_category(id, () => {
            this.props.fetch_categories()
        })
    }
    handleModalAddButton = () => {
        this.setState({ modal: !this.state.modal, })
    }
    render() {
        const {category} = this.props
        const { formElements } = this.state
        const formElementsArray = []
        for (let key in formElements) {
            formElementsArray.push({
                id: key,
                config: formElements[key]
            })
        }
        const formElementContainer = formElementsArray.map((elem, key) => {
            return (
                <div key={key}>
                    <label htmlFor="">{elem.config.label} {elem.id}</label>
                    <input type={elem.config.type} name={elem.id} value={elem.config.value} onChange={this.handleFormElementChange} placeholder={`${elem.config.label} ${elem.id}`} className="form-control" />
                    {elem.config.required && elem.config.touched && elem.config.hasError ? <span>
                        {elem.config.error}
                    </span> : ``}
                </div>
            )
        })
        const categoryList = category.categories.map((c, k) => {
            return (
                <tr key={k}>
                    <td>{c.title}</td>
                    <td>{c.description}</td>
                    <td>
                        <Button  onClick={() => this.handleModalEditButton(c)} size="sm" color="primary">Edit</Button>
                        <Button onClick={() => this.handleDeleteButton(c.id)} size="sm" color="danger">Delete</Button>
                    </td>
                </tr>
            )
        })

        return (
            <div>
                <h1>Category</h1>
                <Button size="sm" onClick={() => this.handleModalAddButton()} color="primary">Add</Button>
                <TableContainer headers={[`Title`, `Description`, `Actions`]} data={categoryList} />
                <Modal isOpen={this.state.modal} toggle={this.toggle}>
                    <form onSubmit={this.handleUsernameSubmit}>
                        <ModalHeader toggle={this.toggle}>Category</ModalHeader>
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
        category: state.category
    }
}

export default withRouter(connect(mapStateToProps, {fetch_categories, save_category, delete_category})(Category));