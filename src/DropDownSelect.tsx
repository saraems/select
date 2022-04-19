import React, { KeyboardEvent, useState } from 'react';
import styled, { css } from 'styled-components';

const DOWN_ARROW_KEY_CODE = 40;
const UP_ARROW_KEY_CODE = 38;

type DropDownSelectProps = {
  labelText: string;
  options: SelectOption[];
};

type SelectOption = { text: string; pillColor: string };

const S = {
  SelectContainer: styled.div`
    width: 535px;
  `,
  SelectLabel: styled.label`
    display: flex;
    align-items: center;
    justify-content: flex-start;
  `,
  Select: styled.select`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 48px;
    padding: 0px 16px;
    border-radius: 16px;

    &:focus {
      background: #b7faac;
    }
  `,
  ListContainer: styled.div`
    padding: 4px;
    border-radius: 16px;
    filter: drop-shadow(0px 4px 30px rgba(0, 0, 0, 0.1));
  `,
  OptionsList: styled.ul`
    display: flex;
    flex-direction: column;
    list-style: none;
    width: 100%;
    padding: 0;
    margin: 0;
    border-radius: 10px;
  `,
  Pill: styled.div<{ color?: string }>`
    height: 22.4px;
    width: 22.4px;
    border-radius: 50%;
    margin: 0 8px;

    ${({ color }) =>
      color &&
      css`
        background-color: ${color};
      `}
  `,
  OptionElement: styled.li`
    list-style: none;
    width: 100%;
  `,
  Option: styled.div`
    display: flex;
    align-items: center;
    padding: 2px 8px;
    height: 47px;
    width: 100%;
    border: none;
    background: transparent;
    font: inherit;

    line-height: normal;
    -webkit-font-smoothing: inherit;
    -moz-osx-font-smoothing: inherit;
    appearance: none;

    &:focus,
    :hover {
      background: #b7faac;
    }
  `,
};

const DropDownSelect = ({ labelText, options }: DropDownSelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [value, setValue] = useState(options[0].text);
  const [activeElementIndex, setActiveElementIndex] = useState(0);

const keyEventHandler = ( e: KeyboardEvent<HTMLSpanElement>) => {
    const isLastElementActive = activeElementIndex === options.length - 1;
    const isFirstElementActive = activeElementIndex === 0;

    if (e.keyCode === DOWN_ARROW_KEY_CODE) {
      const nextElementIndex = isLastElementActive ? 0 : activeElementIndex + 1;
      setActiveElementIndex(nextElementIndex);
    } else if (e.keyCode === UP_ARROW_KEY_CODE) {
      const nextElementIndex = isFirstElementActive ? options.length - 1 : activeElementIndex - 1;
      setActiveElementIndex(nextElementIndex);
    }
  console.log('activeElementIndex', activeElementIndex);
  };

  return (
    <S.SelectContainer>
      <S.SelectLabel htmlFor="base-select">{labelText}</S.SelectLabel>
      <S.Select id="base-select" onClick={() => setIsOpen(!isOpen)} onChange={() => setValue(value)}>
        {value}
      </S.Select>
      {isOpen && (
        <S.ListContainer>
          <S.OptionsList
            tabIndex={0}
            role="listbox"
            onChange={() => setValue(value)}
            onKeyDown={keyEventHandler}
            aria-activedescendant={`option__${activeElementIndex}`}
          >
            {options?.map(({ text, pillColor }, index) => (
              <S.OptionElement key={index}>
                <S.Option id={`option__${index}`} role="option" aria-selected={index === activeElementIndex} data-value={activeElementIndex}>
                  <S.Pill color={pillColor} />
                  {text}
                </S.Option>
              </S.OptionElement>
            ))}
          </S.OptionsList>
        </S.ListContainer>
      )}
    </S.SelectContainer>
  );
};

export default DropDownSelect;
