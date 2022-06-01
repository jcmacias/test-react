import React, { useState } from "react"
import { Form, Field } from 'react-final-form'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

const BaseURL = axios.create({
  baseURL: 'https://reactassessmentapi20220523183259.azurewebsites.net/api/',
});

const ProgramForm = (props) => {
  const navigate = useNavigate();
  const [tryAgain, setTryAgain] = useState(false)
  const { cbo } = props

  console.log(cbo, props)
  const onSubmit = (formValues) => {
    BaseURL.post('/programs', {
      name: formValues.name,
      description: formValues.description,
      classification: formValues.classification,
      status: formValues.status,
      cboId: cbo
    })
      .then(function (response) {
        console.log(response);
        navigate('/organizationList');
      })
      .catch(function (error) {
        console.log(error);
        setTryAgain(true)
      });
  }

  const validate = values => {
    const errors = {}
    if (!values.name) {
      errors.name = 'Required'
    }
    if (!values.classification) {
      errors.classification = 'Required'
    }
    if (!values.status) {
      errors.status = 'Required'
    }

    return errors
  }


  return <div>
    <h3>New Program</h3>
    {tryAgain ? <h2>Something went wrong! Please, try again</h2> : null}
    <Form
      onSubmit={onSubmit}
      // initialValues={{ stooge: 'larry', employed: false }}
      validate={validate}
      render={({ handleSubmit, form, submitting, pristine, values }) => (
        <form onSubmit={handleSubmit}>
          <div>

            <Field
              name="name"
            >
              {({ input, meta }) => (
                <div>
                  <label>Program Name (required)</label>
                  <input {...input} type="text" placeholder="Program Name" />
                  {meta.error && meta.touched && <span>{meta.error}</span>}
                </div>
              )}
            </Field>
          </div>
          <div>
            <Field
              name="description"
            >
              {({ input, meta }) => (
                <div>
                  <label>Program Description (optional)</label>
                  <textarea {...input} type="text" placeholder="Program Description" />
                  {meta.error && meta.touched && <span>{meta.error}</span>}
                </div>
              )}
            </Field>
          </div>
          <div>
            <label>Program Classification</label>
            <Field name="classification" component="select">
              <option selected value="Direct Service">Direct Service</option>
              <option value="Advocacy">Advocacy</option>
              <option value="Capacity Building">Capacity Building</option>
              <option value="Research & Analysis">{`Research & Analysis`}</option>
            </Field>
          </div>
          <div>
            <label>Partnership Status</label>
            <Field name="status" component="select">
              <option selected value="Level 1">Level 1</option>
              <option value="Level 2">Level 2</option>
              <option value="Level 3">Level 3</option>
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

export default ProgramForm