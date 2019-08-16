import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import withAuth from '../../components/Auth/withAuth';

class Navbar extends Component {
  render () {
    return (
      <nav>
        <ul>
          {this.props.isLoggedIn ? (
          <React.Fragment>
            <li><Link to='/trips'><img src={'/images/airplane-v2.png'} alt='Trips'/></Link></li>
            <li><Link to='/discover'><img src={'/images/find-v2.png'} alt='Discover'/></Link></li>
            <li><Link to='/profile'><img src={'/images/user.png'} alt='Trips'/></Link></li>
          </React.Fragment>
          ) : null
        }
        </ul>
      </nav>
    );
  }
}

export default withAuth(Navbar);
