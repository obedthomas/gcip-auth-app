import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { css } from '@emotion/core'
// First way to import
import { BounceLoader } from 'react-spinners'

// Can be a string as well. Need to ensure each key-value pair ends with ;
const override = css`
  position: absolute;
  top: 50%,
  left: 50%,
  display: block;
`

const PrivateRoute = ({ component: Component, auth, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props => {
        if (auth.loading) {
          return (
            <BounceLoader
              css={override}
              size={150}
              color={'#123abc'}
              loading={true}
            />
          )
        } else if (auth.isAuthenticated === true && !auth.loading) {
          return <Component {...props} />
        }
        return (
          <Redirect
            to={{
              pathname: '/public/login',
              state: { from: props.location },
            }}
          />
        )
      }}
    />
  )
}

const mapStateToProps = state => ({
  auth: state.auth,
})

export default connect(mapStateToProps)(PrivateRoute)
