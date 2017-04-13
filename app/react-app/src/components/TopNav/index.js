import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { isActive, getContainerId } from '../../reducers'
import LoginForm from '../LoginForm'
import CreateUserForm from '../CreateUserForm'
import FlatButton from 'material-ui/FlatButton'
import Modal from 'react-modal'
import './styles.css'

class TopNav extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isCreateModalOpen: false,
            isLoginModalOpen: false,
            authenticated: false,
            user: {},
        }
    }

    handleCreateUser() {
        console.log('creating user')
    }

    handleLogin() {
        console.log('logging in')
    }

    /*renderContainerId() {
        const { containerId } = this.props
        const version = 12345678
        return (
        <div className='containerSection'>
            { `ID: ${containerId} Version: ${version}` }
        </div>
        )
    }*/

    makeCreateButton() {
        return (
            <FlatButton
                onClick={this.toggleCreateModal}
                label="Create User"
            />
        )
    }

    makeLoginButton() {
        return (
            <FlatButton
                onClick={this.toggleLoginModal}
                label="Login"
            />
        )
    }

    toggleCreateModal = () => {
        this.setState({
            isCreateModalOpen: !this.state.isCreateModalOpen,
        })
    }

    toggleLoginModal = () => {
        this.setState({
            isLoginModalOpen: !this.state.isLoginModalOpen,
        })
    }
    
    renderCreateModal = () => {
        return (
            <Modal
                isOpen={this.state.isCreateModalOpen}
                onRequestClose={this.toggleCreateModal}
            >
            <div className='formContainer'>
            <CreateUserForm handleSubmit={this.handleCreateUser} />
            </div>
            </Modal>
        )
    }

    renderLoginModal = () => {
        return (
            <Modal
                isOpen={this.state.isLoginModalOpen}
                onRequestClose={this.toggleLoginModal}
            >
            <div className='formContainer'>
            <LoginForm handleSubmit={this.handleLogin} />
            </div>
            </Modal>

        )
    }

    renderUnauthenticated() {
        return (
            <div className='inauthenticated'>
                {this.makeLoginButton()}
                {this.makeCreateButton()}
                {this.renderCreateModal()}
                {this.renderLoginModal()}
            </div>
        )
    }

    renderAuthenticated() {
        return (
            <div className='authenticated'>

            </div>
        )
    }

    render() {
        return (
            <div className='navContainer'>
            { this.state.authenticated ? this.renderAuthenticated() : this.renderUnauthenticated()}
            </div>
        )
    }
}

const mapStateToProps = state => ({
    isActive: isActive(state),
    containerId: getContainerId(state),

})


export default connect(
  mapStateToProps,
)(TopNav)
