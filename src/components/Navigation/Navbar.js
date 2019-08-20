import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import withAuth from '../../components/Auth/withAuth';

class Navbar extends Component {
  render () {
    return (
      <div className='nav-container'>
      <nav>
        <ul>
          {this.props.isLoggedIn ? (
          <React.Fragment>
            <li><Link to='/trips'><img src={'/images/trips.svg'} alt='Trips'/>Trips</Link></li>
            <li><Link to='/discover'><img src={'/images/discover.svg'} alt='Discover'/>Discover</Link></li>
            <li><Link to='/profile'><img src={'/images/profile.svg'} alt='Trips'/>Profile</Link></li>
          </React.Fragment>
          ) : null
        }
        </ul>
      </nav>
      </div>
    );
  }
}

export default withAuth(Navbar);
