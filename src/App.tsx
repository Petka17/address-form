import * as React from 'react'

import useGoogleAutocompleteSuggestions, { AddressToComponentMapping } from 'use-google-address-suggestions'

type Address = {
  country: string
  house: string
  street: string
  city: string
  state: string
  zip: string
}

const addressFieldsMapping: AddressToComponentMapping<Address> = {
  country: {
    componentType: 'country',
    nameForm: 'long_name',
  },
  house: {
    componentType: 'street_number',
    nameForm: 'short_name',
  },
  street: {
    nameForm: 'short_name',
    componentType: 'route',
  },
  city: {
    componentType: 'locality',
    nameForm: 'long_name',
  },
  state: {
    componentType: 'administrative_area_level_1',
    nameForm: 'short_name',
  },
  zip: {
    componentType: 'postal_code',
    nameForm: 'short_name',
  },
}

const App = (): JSX.Element => {
  const [{ country, house, street, city, state, zip }, updateAddress] = React.useReducer(
    (state: Address, newValues: Partial<Address>) => ({
      ...state,
      ...newValues,
    }),
    {
      country: '',
      house: '',
      street: '',
      city: '',
      state: '',
      zip: '',
    },
  )

  const { input, setInput, suggestions, getPlace } = useGoogleAutocompleteSuggestions({
    key: process.env.GOOGLE_MAPS_API_KEY || '',
    language: 'en',
    mapping: addressFieldsMapping,
    cb: updateAddress,
  })

  const onInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setInput(e.target.value)
  }

  const handleAddressClick = (placeId: string) => () => getPlace(placeId)

  return (
    <React.Fragment>
      <div className="locationField">
        <input
          id="autocomplete"
          className="autocomplete"
          placeholder="Enter your address"
          type="text"
          autoComplete="new-password"
          value={input}
          onChange={onInput}
        />
      </div>

      <table className="address">
        <tbody>
          <tr>
            <td className="label">Country</td>
            <td className="wideField" colSpan={3}>
              <input className="field" value={country} readOnly />
            </td>
          </tr>
          <tr>
            <td className="label">Street address</td>
            <td className="slimField">
              <input className="field" value={house} readOnly />
            </td>
            <td className="wideField" colSpan={2}>
              <input className="field" value={street} readOnly />
            </td>
          </tr>
          <tr>
            <td className="label">City</td>
            <td className="wideField" colSpan={3}>
              <input className="field" value={city} readOnly />
            </td>
          </tr>
          <tr>
            <td className="label">State</td>
            <td className="slimField">
              <input className="field" value={state} readOnly />
            </td>
            <td className="label">Zip code</td>
            <td className="wideField">
              <input className="field" value={zip} readOnly />
            </td>
          </tr>
        </tbody>
      </table>
      <ul>
        {suggestions.map(({ placeId, description }) => (
          <li key={placeId} onClick={handleAddressClick(placeId)}>
            {description}
          </li>
        ))}
      </ul>
    </React.Fragment>
  )
}

export default App
