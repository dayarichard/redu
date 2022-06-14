import React,{Component} from 'react'
import { connect, useDispatch } from 'react-redux';
import { logoutUser } from './store/auth';
import withRouter from './withRouter';

class Logout extends Component {

    logout = () => {
      window.localStorage.removeItem('token');
    
      const {history} = this.props
      history("/login",{replace:true})
      this.props.logoutUser();
    }
    
    render() {
      return (
        <button onClick={this.logout} className='btn btn-danger'>Logout</button>
      )
    }
  }

  const mapStateToProps = (dispatch) => {
    return {
        logoutUser: () => dispatch(logoutUser()),
    };
  };


export default connect(null,mapStateToProps)(withRouter(Logout))