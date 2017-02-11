import React from 'react';
import { Route, IndexRoute } from 'react-router';

import requireAuth from './utils/requireAuth';
import AdminMiddleware from './utils/AdminMiddleware';

import App from './container/App';
import Home from './components/Home';
import LoginPage from './container/LoginPage';
import SignupPage from './container/SignupPage';
import ProfilePage from './container/ProfilePage';
import NewPost from './container/NewPost';
import UpdatePostPage from './container/UpdatePostPage';
import ViewPost from './container/ViewPost';
import AllPostPage from './container/AllPostPage';
import SelfPostPage from './container/SelfPostPage';
import AdminDashboardPage from './container/AdminDashboardPage';
import AdminPostsPage from './container/AdminPostsPage';
import AdminUserPage from './container/AdminUserPage';
import AdminUserDetailPage from './container/AdminUserDetailPage';


export default(
    <Route path="/" component={App} >
        <IndexRoute component={Home} />
        <Route path="/signin" component={LoginPage} />
        <Route path="/signup" component={SignupPage} />
        <Route path="/all-posts" component={AllPostPage} />
        <Route path="/profile" component={requireAuth(ProfilePage)} />
        <Route path="/new-post" component={requireAuth(NewPost)} />
        <Route path="/update-post/:postId" component={requireAuth(UpdatePostPage)} />
        <Route path="/view-post/:postId" component={requireAuth(ViewPost)} />
        <Route path="/self-posts" component={requireAuth(SelfPostPage)} />
        <Route path="/Admin" component={requireAuth(AdminDashboardPage)} />
        <Route path="/admin/posts" component={AdminMiddleware(AdminPostsPage)} />
        <Route path="/admin/users" component={AdminMiddleware(AdminUserPage)} />
        <Route path="/admin/user-detail/:userId" component={AdminMiddleware(AdminUserDetailPage)} />
    </Route>
)
