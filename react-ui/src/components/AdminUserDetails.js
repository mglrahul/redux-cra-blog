import React from 'react';
import moment from 'moment';

class AdminUserDetails extends React.Component {
    componentWillMount(dispatch){
        this.props.fetchUserDetail(this.props.params.userId);
    }

    componentWillUnmount() {
       this.props.resetMe();
    }

    renderFormatTimestamp(timestamp){
        return moment(timestamp).format('MMMM Do YYYY, h:mm:ss a');
    }

    renderUserDetails(userDetail){
        if(userDetail.length === 15){
            return <div>No record Found!</div>
        }else {
            return <div>
                        <h1>User Detail Page</h1>
                        <div key={userDetail._id} className="list-group-item">
                            <p><strong>Name:</strong> {userDetail.fname} {userDetail.lname } </p>
                            <p><strong>Gender:</strong> {userDetail.gender}</p>
                            <p><strong>Country:</strong> {userDetail.country}</p>
                            <p><strong>Aboit Us:</strong> {userDetail.about_us}</p>
                            <p><strong>Newsletter:</strong> {userDetail.newsletter}</p>
                            <p><strong>Created At:</strong> {this.renderFormatTimestamp(userDetail.createdAt)}</p>
                            <p><strong>Updated At:</strong> {this.renderFormatTimestamp(userDetail.updatedAt)}</p>
                        </div>
                    </div>
        }
    }

    render(){
        const { userDetail } = this.props

        if(!userDetail){
            return <div>Loading</div>
        }

        return (
            <div>{this.renderUserDetails(userDetail)}</div>
        )
    }
}

export default AdminUserDetails;
