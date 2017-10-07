import React from 'react';
import Layout from './layout/Layout'

require('./../styles/layout/bootstrap/js/bootstrap')


export default class App extends React.Component {
  render() {
    return (
      <div>
				<Layout/>
      </div>
    )
  }
}
