import React, { useState } from "react"
import { Form, Field } from 'react-final-form'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

const BaseURL = axios.create({
  baseURL: 'https://reactassessmentapi20220523183259.azurewebsites.net/api/',
});

const isValidEmail = (val) => {
  if (val === undefined) {
    return false
  }

  if (val === null || val.length === 0) {
    return false
  }

  const emailRegex = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
  return emailRegex.test(val)
}

const OrganizationForm = () => {
  const navigate = useNavigate();
  const [tryAgain, setTryAgain] = useState(false)

  const onSubmit = (formValues) => {
    BaseURL.post('/cbo', {
      organizationName: formValues.organizationName,
      pointOfContact: formValues.pointOfContact,
      phone: formValues.phone,
      email: formValues.email,
    })
      .then(function (response) {
        navigate('/program', { state: { cbo: response.data.id } });
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
        setTryAgain(true)
      });
  }

  const validate = values => {
    const errors = {}
    if (!values.organizationName) {
      errors.organizationName = 'Required'
    }
    if (!values.pointOfContact) {
      errors.pointOfContact = 'Required'
    }
    if (!values.phone) {
      errors.phone = 'Required'
    } else {
      if (values.phone.length !== 10) {
        errors.phone = 'Phone is invalid'
      }
    }
    if (!values.email) {
      errors.email = 'Required'
    } else {
      if (!isValidEmail(values.email)) {
        errors.email = 'Email is invalid'
      }
    }

    return errors
  }


  return <div>
    <h3>Community Based Organization</h3>
    {tryAgain ? <h2>Something went wrong! Please, try again</h2> : null}
    <Form
      onSubmit={onSubmit}
      // initialValues={{ stooge: 'larry', employed: false }}
      validate={validate}
      render={({ handleSubmit, form, submitting, pristine, values }) => (
        <form onSubmit={handleSubmit}>
          <div>

            <Field
              name="organizationName"
            >
              {({ input, meta }) => (
                <div>
                  <label>Organization Name (required)</label>
                  <input {...input} type="text" placeholder="Organization Name" />
                  {meta.error && meta.touched && <span>{meta.error}</span>}
                </div>
              )}
            </Field>
          </div>
          <div>
            <Field
              name="pointOfContact"
            >
              {({ input, meta }) => (
                <div>
                  <label>Point of contact (required)</label>
                  <input {...input} type="text" placeholder="Point of contact" />
                  {meta.error && meta.touched && <span>{meta.error}</span>}
                </div>
              )}
            </Field>
          </div>
          <div>
            <Field
              name="phone"
            >
              {({ input, meta }) => (
                <div>
                  <label>Phone</label>
                  <input {...input} type="text" />
                  {meta.error && meta.touched && <span>{meta.error}</span>}
                </div>
              )}
            </Field>
          </div>
          <div>
            <Field
              name="email"
            >
              {({ input, meta }) => (
                <div>
                  <label>Email</label>
                  <input {...input} type="text" />
                  {meta.error && meta.touched && <span>{meta.error}</span>}
                </div>
              )}
            </Field>
          </div>
          <div className="buttons">
            <button type="submit" disabled={submitting || pristine}>
              Submit
            </button>
          </div>
        </form>
      )}
    />
  </div>
}

export default OrganizationForm