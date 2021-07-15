import * as React from "react"
import { render, screen, waitForElementToBeRemoved, waitFor } from "@testing-library/react"
import { describe, test } from "@jest/globals"
import userEvent from '@testing-library/user-event'

import Form from "../components/form"

describe("Form", () => {
  test("Renders Form component", () => {
    render(<Form />)
  })

  test("Submit button exists", () => {
    render(<Form />)

    const button = screen.getByRole('button')

    expect(button).toBeInTheDocument()
  })

  test("Submit button click displays error message with no user input", () => {
    render(<Form />)
    
    const button = screen.getByRole('button')
    userEvent.click(button)
    const errorText = screen.getByText('Something went wrong', {exact: false})

    expect(errorText).toBeInTheDocument()
  })

  test("Name input accepts a user input", () => {
    render(<Form />)

    const nameInput = screen.getByLabelText("Name *")

    userEvent.type(nameInput, 'Ryan')

    expect(nameInput).toHaveValue('Ryan')
  })

  test("United States option is selected from select input", () => {
    render(<Form />)

    const countrySelector = screen.getByLabelText("Country *")
    userEvent.selectOptions(countrySelector, [
      screen.getByText('United States')
    ])

    expect(screen.getByRole('option', { name: 'United States' }).selected).toBe(true)
  })

  test("Illinois option is selected after selecting United States", () => {
    render(<Form />)

    const countrySelector = screen.getByLabelText("Country *")
    userEvent.selectOptions(countrySelector, [
      screen.getByText('United States')
    ])

    const regionSelector = screen.getByLabelText("State *")
    userEvent.selectOptions(regionSelector, [
      screen.getByText('Illinois')
    ])

    expect(screen.getByRole('option', { name: 'Illinois' }).selected).toBe(true)
  })

  test("Canada option is selected from select input", () => {
    render(<Form />)

    const countrySelector = screen.getByLabelText("Country *")
    userEvent.selectOptions(countrySelector, [
      screen.getByText('Canada')
    ])

    expect(screen.getByRole('option', { name: 'Canada' }).selected).toBe(true)
  })

  test("Alberta option is selected after selecting Canada", () => {
    render(<Form />)

    const countrySelector = screen.getByLabelText("Country *")
    userEvent.selectOptions(countrySelector, [
      screen.getByText('Canada')
    ])

    const regionSelector = screen.getByLabelText("Province *")
    userEvent.selectOptions(regionSelector, [
      screen.getByText('Alberta')
    ])

    expect(screen.getByRole('option', { name: 'Alberta' }).selected).toBe(true)
  })

  test("Submits form with name missing displays error message", async () => {
    render(<Form />)

    const emailInput = screen.getByLabelText("Email *")
    userEvent.type(emailInput, 'rschaul@gmail.com')
  
    const countrySelector = screen.getByLabelText("Country *")
    userEvent.selectOptions(countrySelector, [
      screen.getByText('United States')
    ])
  
    const regionSelector = screen.getByLabelText("State *")
    userEvent.selectOptions(regionSelector, [
      screen.getByText('Illinois')
    ])
  
    const button = screen.getByRole('button')
    userEvent.click(button)
  
    await waitFor(() => {
      const errorMessage = screen.getByText('Please review the following fields', {exact: false})
    
      expect(errorMessage).toBeInTheDocument()
    })
  })

  test("Submits form with email missing displays error message", async () => {
    render(<Form />)
  
    const nameInput = screen.getByLabelText("Name *")
    userEvent.type(nameInput, 'Ryan')
  
    const countrySelector = screen.getByLabelText("Country *")
    userEvent.selectOptions(countrySelector, [
      screen.getByText('United States')
    ])
  
    const regionSelector = screen.getByLabelText("State *")
    userEvent.selectOptions(regionSelector, [
      screen.getByText('Illinois')
    ])
  
    const button = screen.getByRole('button')
    userEvent.click(button)
  
    await waitFor(() => {
      const errorMessage = screen.getByText('email address', {exact: false})
    
      expect(errorMessage).toBeInTheDocument()
    })
  })

  test("Submits form with country missing displays error message", async () => {
    render(<Form />)
  
    const nameInput = screen.getByLabelText("Name *")
    userEvent.type(nameInput, 'Ryan')
  
    const emailInput = screen.getByLabelText("Email *")
    userEvent.type(emailInput, 'rschaul@gmail.com')
  
    const button = screen.getByRole('button')
    userEvent.click(button)
  
    await waitFor(() => {
      const errorMessage = screen.getByText('Please review the following fields', {exact: false})
    
      expect(errorMessage).toBeInTheDocument()
    })
  })

  test("Submits form with region missing displays error message", async () => {
    render(<Form />)
  
    const nameInput = screen.getByLabelText("Name *")
    userEvent.type(nameInput, 'Ryan')
  
    const emailInput = screen.getByLabelText("Email *")
    userEvent.type(emailInput, 'rschaul@gmail.com')

    const countrySelector = screen.getByLabelText("Country *")
    userEvent.selectOptions(countrySelector, [
      screen.getByText('United States')
    ])
  
    const button = screen.getByRole('button')
    userEvent.click(button)

    await waitFor(() => {
      const errorMessage = screen.getByText('Please review the following fields', {exact: false})
    
      expect(errorMessage).toBeInTheDocument()
    })
  })
  
})