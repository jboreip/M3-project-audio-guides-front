import React, { Component } from 'react';
import withAuth from '../../components/Auth/withAuth';

class Backbar extends Component {
  render () {
    return (
      <div className='go-back'>
      <a onClick={() => {
        this.props.history.goBack();
      }
      }> Back </a>
      </div>
    );
  }
}

export default Backbar;
