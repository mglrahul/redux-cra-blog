import React from 'react';
import classnames from 'classnames';
import map from 'lodash/map';


export const renderField = ({ input, label, type, meta: { touched, error, warning } }) => (
    <div className={classnames('form-group', { 'has-error':touched && error })}>
      <label className="control-label">{label}</label>
      <div>
        <input {...input} placeholder={label} type={type} className="form-control"/>
        {touched && ((error && <span className="help-block">{error}</span>))}
      </div>
    </div>
)

const countryList = (data) => {
    return map(data, (val, key) =>
        <option value={val} key={val}>{key}</option>
    );
}

const categoryList = (category) => {
    return category.map(cat =>
            <option value={cat._id} key={cat._id}>{cat.name}</option>
        )
}

export const renderSelectField = ({ input, label, data, type, meta: { touched, error, warning } }) => (
    <div className={classnames('form-group', { 'has-error':touched && error })}>
      <label className="control-label">{label}</label>
      <div>
        <select {...input} className="form-control" placeholder={label}>
            <option disabled value="">Select a type</option>
            {countryList(data)}
        </select>
        {touched && ((error && <span className="help-block">{error}</span>))}
      </div>
    </div>
)

export const renderSelectCatField = ({ input, label, data, type, meta: { touched, error, warning } }) => (
    <div className={classnames('form-group', { 'has-error':touched && error })}>
      <label className="control-label">{label}</label>
      <div>
        <select {...input} className="form-control" placeholder={label}>
            <option disabled value="">Select a category</option>
            {categoryList(data)}
        </select>
        {touched && ((error && <span className="help-block">{error}</span>))}
      </div>
    </div>
)

export const renderRadioField = ({ input, options, label, meta: { touched, error } }) => {
    return <div className={classnames('form-group', { 'has-error':touched && error })}>
              <label className="control-label">{label}</label>
              <div>
                {options.map(o =>
                        <label key={o.value} className="radio-inline">
                            <input type="radio" {...input} value={o.value} checked={o.value === input.value} /> {o.title}
                        </label>
                    )
                }
                {touched && ((error && <span className="help-block">{error}</span>))}
               </div>
            </div>
}

export const renderTextAreaField = ({ input, label, type, meta: { touched, error, warning } }) => (
    <div className={classnames('form-group', { 'has-error':touched && error })}>
      <label className="control-label">{label}</label>
      <div>
        <textarea {...input} placeholder={label} type={type} className="form-control"></textarea>
        {touched && ((error && <span className="help-block">{error}</span>))}
      </div>
    </div>
)

export const renderCheckboxField = ({ input, label, type, meta: { touched, error, warning } }) => (
    <div className={classnames('form-group', { 'has-error':touched && error })}>
      <div className="checkbox">
        <label><input {...input}  type={type}/>{label}</label>
        {touched && ((error && <span className="help-block">{error}</span>))}
      </div>
    </div>
)
