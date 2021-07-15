import React, { useState } from 'react'
import data from '../data/countryRegionSelect.json'
import ErrorLineItem from './errorLineItem';
import axios from 'axios';

const Form = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [country, setCountry] = useState('');
  const [region, setRegion] = useState('');
  const [submissionAttempted, setSubmissionAttempted] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState(false);
  const [submissionFailure, setSubmissionFailure] = useState(false);

  const validName = name !== '';
  const validEmail = email.match(/.+@.+/);
  const validCountry = country !== "" && country !== "Select a country";
  const validRegion = region !== "" && region !== "Select a state" && region !== "Select a province";
  const usaOrCanada = country === 'United States' || country === 'Canada';

  let validForm;
  if (country === 'United States' || country === 'Canada') {
    validForm = validName && validEmail && validCountry && validRegion;
  } else {
    validForm = validName && validEmail && validCountry;
  }

  const submitHandler = async (event) => {
    event.preventDefault();
    setSubmissionAttempted(true);
    if (!validForm) return;

    try {
      await axios.post('/api/form', {
        name,
        email,
        country,
        region
      });

      setSubmissionSuccess(true);
      setSubmissionFailure(false);
      setSubmissionAttempted(false);
    } catch (error) {
      setSubmissionFailure(true);
    }
  }

  const displayFormTitle = () => {
    if (submissionSuccess) {
      return <h4 className='form-heading' style={{ color: 'var(--color-accent-light)' }}>Successfully signed up to the newsletter ✅</h4>
    } else if (submissionFailure) {
      return <h4 className='form-heading' style={{ color: 'var(--color-error)' }}>Our server returned an error. 🚨 <br></br> (it's us, not you)</h4>
    } else if (!validForm && submissionAttempted) {
      return <h4 className='form-heading' style={{ color: 'var(--color-error)' }}>Something went wrong :(</h4>
    } else {
      return <h4 className='form-heading'>Newsletter</h4>
    }
  }

  const displayFormMessage = () => {
    if (submissionSuccess) {
      return <p className='form-message' style={{ color: 'var(--color-accent-light)' }}>See you soon in an inbox near you ;)</p>
    } else if (submissionFailure) {
      return <p className='form-message'>Please click the <strong>Sign me up</strong> button to try again. <br></br> We saved your input below:</p>
    } else if (!validForm && submissionAttempted) {
      return <p className='form-message'>Please review the following fields:</p>
    } else {
      return <p className='form-message'>I'm sending an update once a month - I'll never sell your email. And you can really, truly unsubscribe anytime.</p>
    }
  }

  const displayRegion = () => {
    if (country === 'Canada') {
      return "Province *"
    } else {
      return "State *"
    }
  }

  const displayRegions = () => {
    if (usaOrCanada) {
      let foundCountry = data.find(item => {
        return item.countryName === country
      });

      return foundCountry.regions.map(region => {
        return <option key={region.name}>{region.name}</option>
      });
    }
  }

  const selectCountryHandler = (event) => {
    setCountry(event.target.value);
    setRegion('');
  }

  return (
    <div className='form-wrapper'>
      <form onSubmit={submitHandler} className={`${submissionSuccess ? 'submission-success' : undefined} ${(!validForm && submissionAttempted) || submissionFailure ? 'form-error-border' : undefined}`}>
        <div className={(!validForm && submissionAttempted) || submissionFailure ? 'form-error' : undefined}>
          <div className='form-messages'>
            {displayFormTitle()}
            {displayFormMessage()}
            <div className={`${(!validForm && submissionAttempted) || submissionFailure ? 'error-line-items' : undefined}`}>
              {!validName && submissionAttempted && <ErrorLineItem primaryText='Enter a valid' fieldName='name' />}
              {!validEmail && submissionAttempted && <ErrorLineItem primaryText='Enter a valid' fieldName='email address' />}
              {!validCountry && submissionAttempted && <ErrorLineItem primaryText='Select a' fieldName='country' />}
              {country === 'United States' && !validRegion && submissionAttempted && <ErrorLineItem primaryText='Select a' fieldName='state' />}
              {country === 'Canada' && !validRegion && submissionAttempted && <ErrorLineItem primaryText='Select a' fieldName='province' />}
            </div>
          </div>
        </div>
        {!submissionSuccess &&
          <>
            <div className='all-form-controls'>
              <div className='form-control'>
                <label htmlFor='name' className='form-label'>Name *</label>
                <input
                  id='name'
                  className={`control-element ${!validName && submissionAttempted ? 'control-element-error' : undefined}`}
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                />
              </div>

              <div className='form-control'>
                <label htmlFor='email' className='form-label'>Email *</label>
                <input
                  id='email'
                  className={`control-element ${!validEmail && submissionAttempted ? 'control-element-error' : undefined}`}
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                />
              </div>

              <div className='form-control'>
                <label htmlFor='country' className='form-label'>Country *</label>
                <div class="select-wrapper">
                  <select
                    id='country'
                    className={`control-element ${!validCountry && submissionAttempted ? 'control-element-error' : undefined}`}
                    value={country}
                    onChange={selectCountryHandler}
                  >
                    <option>Select a country</option>
                    {data.map(country => {
                      return <option key={country.countryName}>{country.countryName}</option>
                    })}
                  </select>
                  </div>
              </div>

              <div className='form-control'>
                <label
                  htmlFor='region'
                  className={`form-label ${!usaOrCanada ? 'disabled' : undefined}`}
                >{displayRegion()}</label>
                <div class="select-wrapper">
                  <select
                    id='region'
                    className={`control-element ${!usaOrCanada ? 'disabled' : undefined} ${usaOrCanada && !validRegion && submissionAttempted ? 'control-element-error' : undefined}`}
                    disabled={!usaOrCanada}
                    value={region}
                    onChange={(event) => setRegion(event.target.value)}
                  >
                    {country !== "Canada" ? <option>Select a state</option> : undefined}
                    {country === "Canada" ? <option>Select a province</option> : undefined}
                    {displayRegions()}
                  </select>
                </div>
              </div>
            </div>

            <div className='submit-control'>
              <button type='submit' className='form-submit-button'>Sign me up</button>
              <p className='required-fields'>* required fields</p>
            </div>
          </>
        }
      </form>
    </div>
  )
}

export default Form