import React, { Component } from 'react';
import withAuth from '../../components/Auth/withAuth';
import { Link } from 'react-router-dom';

class Backbar extends Component {
  render () {
    return (
      <div className='go-back'>
      <Link onClick={() => {
        this.props.history.goBack();
      }
      }> Back </Link>
      </div>
    );
  }
}

export default Backbar;
