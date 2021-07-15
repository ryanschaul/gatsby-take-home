import * as React from "react"
import {unmountComponentAtNode} from "react-dom"
import { render, screen } from "@testing-library/react"
import { describe, test } from "@jest/globals"
import ErrorLineItem from "../components/errorLineItem"

describe("ErrorLineItem", () => {
  test("Renders ErrorLineItem component", () => {
    render(<ErrorLineItem />)
  })

  test("Renders an element with class of error-line-item", () => {
    const { container } = render(<ErrorLineItem />)
    expect(container.firstChild).toHaveClass('error-line-item')
  })

  test("Renders an element with a class of error-mark", () => {
    const { container } = render(<ErrorLineItem />)
    expect(container.firstChild.firstChild).toHaveClass('error-mark')
  })

  test("Renders an 'x'", () => {
    render(<ErrorLineItem />)
    const p = screen.getByText('x')
    expect(p).toBeInTheDocument()
  })

  test("Renders with props", () => {
    const { container } = render(<ErrorLineItem primaryText='Enter a valid' fieldName='name' />)
    
    const primaryText = screen.getByText('Enter a valid')
    expect(primaryText).toBeInTheDocument()

    const fieldName = screen.getByText('name')
    expect(fieldName).toBeInTheDocument()
  })
})