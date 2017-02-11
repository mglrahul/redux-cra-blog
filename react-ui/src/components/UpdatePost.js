import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { SubmissionError } from 'redux-form';

import { renderField, renderSelectCatField, renderTextAreaField } from '../utils/textFieldGroup';
import { required } from '../utils/validations';
import { postUpdate } from '../actions/post';


const submitData = (data, dispatch) => {
    dispatch (postUpdate(data))
    .catch((error) => {
        throw new SubmissionError({ _error: error.response.data.errors});
    })
}


class UpdatePost extends React.Component{
    componentWillMount(){
        this.props.fetchCategoryData();
        this.props.fetchPost(this.props.params.postId);
    }

    render(){
        const { handleSubmit, submitSucceeded, pristine, reset, submitting, error, category } = this.props

        if (!category) {
          return (
              <div><p>Loading...</p></div>
          )
        }

        return(
            <div>
                <h1>Update post</h1>
                <form onSubmit={handleSubmit(submitData)}>
                    <div className={typeof error!=='undefined'?'show alert alert-danger': 'hidden'}>
                     <strong>Error!</strong> {error}
                    </div>
                    <div className={(submitSucceeded===true)?'show alert alert-success': 'hidden'}>
                      <strong>Success!</strong> Post has been Created!.
                    </div>
                    <Field name="title" type="input" label="Post Name" component={renderField} validate={required} />
                    <Field name="category" type="input" label="Category Name" component={renderSelectCatField}
                        data={category} validate={required} />
                    <Field name="content" type="input" label="Post content" component={renderTextAreaField} validate={required} />

                    <button type="submit" disabled={submitSucceeded} className="btn btn-primary btn-lg">Submit</button>

                    <button type="button" disabled={pristine || submitting} onClick={reset} className="btn btn-danger btn-lg">Clear Values</button>
                </form>
            </div>
        )
    }
}

UpdatePost = reduxForm({
    form: 'newPost',
    enableReinitialize: true
})(UpdatePost);

UpdatePost = connect(
    state => ({
        initialValues: state.post.postDetail
    })
)(UpdatePost)

export default UpdatePost
