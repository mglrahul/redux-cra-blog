
import { connect } from 'react-redux';

import ProfileForm from '../components/ProfileForm';
import { profile, setProfileData, resetProfileData } from '../actions/user';

const mapStateToProps = (state) => ({
    profile: state.user.profile
})

const mapDispatchToProps = (dispatch) => {
    return {
      fetchProfile: () => {
        dispatch(profile()).then((response) => {
                dispatch(setProfileData(response))
            });
      },
      resetMe: () => {
        dispatch(resetProfileData());
      }
    }
}

const ProfilePage = connect(mapStateToProps, mapDispatchToProps)(ProfileForm);

export default ProfilePage;
