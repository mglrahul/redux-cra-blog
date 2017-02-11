import React from 'react'
import { Link } from 'react-router'
import moment from 'moment';

class AdminUser extends React.Component{
    componentWillMount(){
        this.props.AllUsers()
    }

    componentWillUnmount(){
        this.props.reset()
    }

    renderFormatTimestamp(timestamp){
        return moment(timestamp).format('MMMM Do YYYY, h:mm:ss a');
    }

    renderPosts(users){
        return users.map(user =>
            <div key={user._id} className="list-group-item">
                <div className="pull-right top">
                    <Link to={`/admin/user-detail/${user._id}`} className="btn btn-primary">View</Link>
                </div>
                <p><strong>Username:</strong> {user.username}</p>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Created At:</strong> {this.renderFormatTimestamp(user.createdAt)}</p>
                <p><strong>Updated At:</strong> {this.renderFormatTimestamp(user.updatedAt)}</p>
            </div>
        )
    }

    renderUserPagination(AllUser){
        const previousLink = (AllUser.page > 1) ? AllUser.page-1 : true;
        const nextLink = (AllUser.pages > AllUser.page) ? AllUser.page + 1 : true;

        return <nav aria-label="...">
          <ul className="pager">
            <li>
                <button onClick={() => this.props.peginatedUsers(previousLink)} className="btn btn-primary"
                 disabled={(previousLink===true) ? true : false} >Previous</button></li>
            <li>
                <button onClick={() => this.props.peginatedUsers(nextLink)} className="btn btn-primary"
                disabled={(nextLink===true)? true : false} >Next</button></li>
          </ul>
        </nav>
    }

    render(){
        const {AllUser} = this.props
        if(!AllUser){
            return (
                <div>loading</div>
            )
        }

        return(
            <div>
                <div>
                    <h1>All Users</h1>
                </div>
                <div className="list-group">
                    {this.renderPosts(AllUser.docs)}
                </div>
                <div>
                    {this.renderUserPagination(AllUser)}
                </div>
            </div>
        )
    }
}

export default AdminUser;
