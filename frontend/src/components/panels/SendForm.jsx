import React from 'react'
import { Field, reduxForm } from 'redux-form'
import TextField from 'material-ui/TextField'
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton'
import Checkbox from 'material-ui/Checkbox'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
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

const validate = values => {
  const errors = {}
  const requiredFields = [ 'from', 'to']
  requiredFields.forEach(field => {
    if (!values[ field ]) {
      errors[ field ] = 'Required'
    }
  })
  return errors
}

const renderTextField = ({ input, label, meta: { touched, error }, ...custom }) => (
  <TextField hintText={label}
    floatingLabelText={label}
    errorText={touched && error}
    {...input}
    {...custom}
  />
)

const renderCheckbox = ({ input, label }) => (
  <Checkbox label={label}
    checked={input.value ? true : false}
    onCheck={input.onChange}/>
)

const renderRadioGroup = ({ input, ...rest }) => (
  <RadioButtonGroup {...input} {...rest}
    valueSelected={input.value}
    onChange={(event, value) => input.onChange(value)}/>
)

const renderSelectField = ({ input, label, meta: { touched, error }, children, ...custom }) => (
  <SelectField
    floatingLabelText={label}
    errorText={touched && error}
    {...input}
    onChange={(event, index, value) => input.onChange(value)}
    children={children}
    {...custom}/>
)

const menuItem = addr => (<MenuItem value={addr} primaryText={addr}/>)

const SendForm = props => {
  const { handleSubmit, pristine, reset, submitting, walletContext } = props
  return (
    <form onSubmit={handleSubmit} className='view-container' style={styles.scroll}>
      <div>
        <Field name="from" component={renderSelectField} label="From">
          {walletContext.map(menuItem)}
        </Field>
      </div>
      <div>
        <Field name="to" component={renderSelectField} label="To">
          {walletContext.map(menuItem)}
        </Field>
      </div>
        <div>
        <RaisedButton style={styles.rowButton} type='submit' primary label='Submit' disabled={pristine || submitting} />
        <RaisedButton style={styles.rowButton} secondary label='Clear Values' disabled={pristine || submitting} onClick={reset} />
      </div>
    </form>
  )
}

export default reduxForm({
  form: 'send',  // a unique identifier for this form
  validate
})(SendForm)
