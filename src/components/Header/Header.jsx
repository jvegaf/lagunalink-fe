/* eslint-disable no-unused-vars */
import {
  MDBCollapse,
  MDBContainer,
  MDBDropdown,
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarNav,
  MDBNavbarToggler,
  MDBNavItem,
  MDBDropdownToggle,
  MDBIcon,
  MDBDropdownMenu,
  MDBDropdownItem,
  MDBTypography
} from 'mdbreact'
import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useUser } from '../../hooks/useUser'

export const Header = () => {
  const { signOut } = useUser()
  const history = useHistory()
  const [collapse, setCollapse] = useState(false)
  const goToDashboard = (e) => {
    e.preventDefault()
    history.push('/dashboard')
  }

  const signout = (e) => {
    e.preventDefault()
    signOut()
    history.push('/signin')
  }

  return (
    <MDBNavbar color="unique-color" fixed="top" dark expand="md">
      <MDBContainer>
        <MDBNavbarBrand href="/">
          <h4><span className="font-weight-bolder">LagunaLink</span></h4>
        </MDBNavbarBrand>
        <MDBNavbarToggler />
        <MDBCollapse isOpen={collapse} navbar>
          <MDBNavbarNav right>
          <MDBNavItem>
              <MDBDropdown>
                <MDBDropdownToggle nav caret>
                  <MDBIcon icon="user" />
                </MDBDropdownToggle>
                <MDBDropdownMenu className="dropdown-default">
                  <MDBDropdownItem onClick={goToDashboard}>Cuenta</MDBDropdownItem>
                  <MDBDropdownItem onClick={signout}>Cerrar Sesion</MDBDropdownItem>
                </MDBDropdownMenu>
              </MDBDropdown>
            </MDBNavItem>
          </MDBNavbarNav>
        </MDBCollapse>
      </MDBContainer>
    </MDBNavbar>
  )
}
