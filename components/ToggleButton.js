
import * as React from 'react'
import styled from 'styled-components'

const ToggleButton = ({ checked, onClick, ...props }) => {
  const id = 'checkbox-' + parseInt(Math.random() * 1000)
  return (
    <Wrapper>
      <CheckBox
        type='checkbox'
        id={id}
        checked={checked}
        onInput={(e) => onClick(e)}
      />
      <CheckBoxLabel htmlFor={id} both={props.both} />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  position: relative;
`
const CheckBoxLabel = styled.label`
  display: flex;
  width: 1.75rem;
  height: 1rem;
  border-radius: 0.5rem;
  background: ${(props) =>
    props.both ? '#4881d8' : '#adadad'};
  cursor: pointer;
  &::after {
    content: '';
    display: block;
    border-radius: 50%;
    width: 0.9rem;
    height: 0.9rem;
    top: 0.05rem;
    left: 0.1rem;
    background: ${(props) => (props.both ? '#fff' : '#484848')};
    transition: 0.2s;
  }
`
const CheckBox = styled.input`
  display: none;
  ${(props) =>
    props.checked &&
    `
    &:checked + ${CheckBoxLabel} {
      background: #4881d8;
      &::after {
        content: '';
        background: #fff;
        left: .75rem;
        transition: 0.2s;
      }
    }
  `}
`

export default ToggleButton
