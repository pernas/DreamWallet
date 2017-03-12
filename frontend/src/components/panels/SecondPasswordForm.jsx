import React from 'react'
import { Field, reduxForm } from 'redux-form'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'

const styles = {
  scroll: {
    height: '100%',
    overflow: 'scroll'
  },
  input: {
    width: 260,
    marginRight: 32
  },
  row: {
    marginBottom: 16
  },
  rowButton: {
    marginRight: 10
  }
}

const renderTextField = ({ input, label, meta: { touched, error }, ...custom }) => (
  <TextField hintText={label}
    floatingLabelText={label}
    errorText={touched && error}
    {...input}
    {...custom}
  />
)


const SecondPasswordForm = props => {
  const { handleSubmit, pristine, reset, submitting } = props
  return (
    <form onSubmit={handleSubmit} className='view-container' style={styles.scroll}>
      <div>
        <Field name="secondPassword" component={renderTextField} label="Second Password"/>
      </div>
      <div>
        <RaisedButton style={styles.rowButton} type='submit' primary label='TOGGLE' disabled={pristine || submitting} />
      </div>
    </form>
  )
}

export default reduxForm({
  form: 'secondPassword'
})(SecondPasswordForm)
