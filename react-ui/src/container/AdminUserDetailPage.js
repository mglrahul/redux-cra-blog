
import { connect } from 'react-redux';

import AdminUserDetails from '../components/AdminUserDetails';
import { getUserDetail, setUserDetails, resetUserDetails } from '../actions/user';

const mapStateToProps = (state) => {
    return {
        userDetail: (state.user.userDetail) ? state.user.userDetail : 'No Record Found'
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
      fetchUserDetail: (id) => {
        dispatch(getUserDetail(id)).then((response) => {
                dispatch(setUserDetails(response))
            });
      },
      resetMe: () => {
        dispatch(resetUserDetails());
      }
    }
}

const AdminUserDetailPage = connect(mapStateToProps, mapDispatchToProps)(AdminUserDetails);

export default AdminUserDetailPage;
