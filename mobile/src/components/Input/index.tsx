import React, { 
    useEffect, 
    useRef, 
    useImperativeHandle, 
    forwardRef, 
    useCallback,
    useState } from 'react';
import { Container, TextInput, Icon } from './styles';
import { TextInputProps } from 'react-native'
import { useField } from '@unform/core'

interface InputProps extends TextInputProps {
    name: string
    icon?: string
}

interface InputValuReference {
    value: string
}

interface InputRef {
    focus(): void
}

const Input: React.RefForwardingComponent<InputRef, InputProps> =
    ({ icon = '', name, ...rest }, ref) => {

        const [isFocused, setIsFocused] = useState(false)
        const [isFilled, setIsFilled] = useState(false)
        const inputElementRef = useRef<any>(null)
        const { registerField, defaultValue = '', fieldName, error } = useField(name)
        const inputValueRef = useRef<InputValuReference>({ value: defaultValue })

        const handleInputFocus = useCallback(() => {
            setIsFocused(true)
        }, [])

        const handleINputBlur = useCallback(() => {
            setIsFocused(false)
            setIsFilled(!!inputValueRef.current.value)
        }, [])

        useImperativeHandle(ref, () => ({
            focus() {
                inputElementRef.current.focus()
            }
        }))

        useEffect(() => {
            registerField({
                name: fieldName,
                ref: inputValueRef.current,
                path: 'value',
                setValue(ref: any, value: string) {
                    inputValueRef.current.value = value
                    inputElementRef.current.setNativeProps({ text: value })
                },
                clearValue() {
                    inputValueRef.current.value = ''
                    inputElementRef.current.clear()
                }
            })
        }, [fieldName, registerField])

        return (
            <Container isFocused={isFocused} isErrored={!!error}>
                <Icon name={icon} size={20} color={isFocused || isFilled ? '#ff9000' : '#666360'}></Icon>
                <TextInput
                    ref={inputElementRef}
                    keyboardAppearance="dark"
                    placeholderTextColor="#666360"
                    defaultValue={defaultValue}
                    onFocus={handleInputFocus}
                    onBlur={handleINputBlur}
                    onChangeText={value => {
                        inputValueRef.current.value = value
                    }}
                    {...rest}></TextInput>
            </Container>
        )
    }

export default forwardRef(Input)