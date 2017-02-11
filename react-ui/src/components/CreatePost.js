import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { SubmissionError } from 'redux-form';

import { renderField, renderSelectCatField, renderTextAreaField } from '../utils/textFieldGroup';
import { required } from '../utils/validations';
import { postSubmit } from '../actions/post';


const submitData = (data, dispatch) => {
    dispatch (postSubmit(data))
    .catch((error) => {
        throw new SubmissionError({ _error: error.response.data.errors});
    })
}


class CreatePost extends React.Component{
    componentWillMount(){
        this.props.fetchCategoryData()
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
                <h1>Create a new post</h1>
                <form onSubmit={handleSubmit(submitData)}>
                    <div className={typeof error!=='undefined'?'show alert alert-danger': 'hidden'}>
                     <strong>Error!</strong> {error}
                    </div>
                    <div className={(submitSucceeded===true)?'show alert alert-success': 'hidden'}>
                      <strong>Success!</strong> Post has been Created!.
                    </div>
                    <Field name="title" type="input" label="Post Name" component={renderField} validate={required} />
                    <Field name="category" type="input" label="Category Name" component={renderSelectCatField} data={category} validate={required} />
                    <Field name="content" type="input" label="Post content" component={renderTextAreaField} validate={required} />

                    <button type="submit" disabled={submitSucceeded} className="btn btn-primary btn-lg">Submit</button>

                    <button type="button" disabled={pristine || submitting} onClick={reset} className="btn btn-danger btn-lg">Clear Values</button>
                </form>
            </div>
        )
    }
}

export default reduxForm({
    form: 'newPost'
})(CreatePost);
