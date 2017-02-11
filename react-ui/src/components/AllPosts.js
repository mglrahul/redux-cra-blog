import React from 'react'

import moment from 'moment';

class AllPosts extends React.Component{
    componentWillMount(){
        this.props.allPosts()
    }

    componentWillUnmount(){
        this.props.reset()
    }

    renderFormatTimestamp(timestamp){
        return moment(timestamp).format('MMMM Do YYYY, h:mm:ss a');
    }

    renderPosts(posts){
        return posts.map(post =>
            <div key={post._id} className="list-group-item">
                <p><strong>Title:</strong> {post.title}</p>
                <p><strong>Category:</strong> {post.category.name}</p>
                <p><strong>Content:</strong> {post.content}</p>
                <p><strong>Post Owner Username:</strong> {post.user.username}</p>
                <p><strong>Created At:</strong> {this.renderFormatTimestamp(post.createdAt)}</p>
                <p><strong>Updated At:</strong> {this.renderFormatTimestamp(post.updatedAt)}</p>
            </div>
        )
    }

    renderPostPagination(AllPosts){
        const previousLink = (AllPosts.page > 1) ? AllPosts.page-1 : true;
        const nextLink = (AllPosts.pages > AllPosts.page) ? AllPosts.page + 1 : true;

        return <nav aria-label="...">
          <ul className="pager">
            <li>
                <button onClick={() => this.props.peginatedPosts(previousLink)} className="btn btn-primary"
                 disabled={(previousLink === true) ? true : false} >Previous</button></li>
            <li>
                <button onClick={() => this.props.peginatedPosts(nextLink)} className="btn btn-primary"
                disabled={(nextLink === true)? true : false} >Next</button></li>
          </ul>
        </nav>
    }

    render(){
        const {AllPosts} = this.props
        if(!AllPosts){
            return (
                <div>loading</div>
            )
        }

        return(
            <div>
                <div>
                    <h1>All Posts</h1>
                </div>
                <div className="list-group">
                    {this.renderPosts(AllPosts.docs)}
                </div>
                <div>
                    {this.renderPostPagination(AllPosts)}
                </div>
            </div>
        )
    }
}

export default AllPosts;
