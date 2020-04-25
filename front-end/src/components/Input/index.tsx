import React, { InputHTMLAttributes, useEffect, useRef, useState, useCallback } from 'react'
import { useField } from '@unform/core'
import { IconBaseProps } from 'react-icons'
import { FiAlertCircle } from 'react-icons/fi'
import { Container, Error } from './styles'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    name: string
    icon: React.ComponentType<IconBaseProps>
}

const Input: React.FC<InputProps> = ({ name, icon: Icon, ...rest }) => {
    const inputRef = useRef<HTMLInputElement>(null)
    const [focus, setFocus] = useState(false)
    const [isFilled, setIsFilled] = useState(false)
    const { fieldName, defaultValue, error, registerField } = useField(name)

    useEffect(() => {
        registerField({
            name: fieldName,
            ref: inputRef.current,
            path: 'value'
        })
    }, [fieldName, registerField])

    const handleInputBlur = useCallback(() => {
        setFocus(false)
        setIsFilled(!!inputRef.current?.value)
    }, [])

    return (
        <Container isErrored={!!error} isFilled={isFilled} isFocused={focus}>
            {Icon && <Icon size={20}></Icon>}
            <input
                onFocus={() => setFocus(true)}
                onBlur={handleInputBlur}
                defaultValue={defaultValue}
                ref={inputRef}
                {...rest} ></input>

            {error && <Error title={error}>
                <FiAlertCircle color="#c53030" size={20} />
            </Error>}
        </Container>
    )
}

export default Input
