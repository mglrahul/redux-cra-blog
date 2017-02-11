const signup_validate = values => {
  const errors = {}
  if (values.password !== values.confirm_password) {
    errors.confirm_password = 'Password does not matched'
  }
  return errors
}

export default signup_validate
