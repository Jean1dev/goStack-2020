import React, { createContext, useContext, useCallback, useState } from 'react'
import ToastContainer from '../components/Toast'
import { uuid } from 'uuidv4'

export interface ToastMessage {
    id: string
    type?: 'success' | 'error' | 'info'
    title: string
    description?: string
}

interface ToastContextData {
    addToast(data: Omit<ToastMessage, 'id'>): void
    removeToast(id: string): void
}

const ToastContext = createContext({} as ToastContextData)

const ToastProvider: React.FC = ({ children }) => {
    const [messages, setMessages] = useState<ToastMessage[]>([])

    const addToast = useCallback(({ type, title, description }: Omit<ToastMessage, 'id'>) => {
        const id = uuid()
        const toast = {
            id,
            type,
            title,
            description
        }

        setMessages((oldValues) => [ ...oldValues, toast ])
    }, [])

    const removeToast = useCallback((id: string) => {
        setMessages(oldState => oldState.filter(message => message.id !== id))
    }, [])

    return (
        <ToastContext.Provider value={{ addToast, removeToast }}>
            {children}
            <ToastContainer messages={messages}></ToastContainer>
        </ToastContext.Provider>
    )
}

function useToast(): ToastContextData {
    const context = useContext(ToastContext)

    if (!context) {
        throw new Error('Contexto nao utilizado')
    }

    return context
}

export { ToastProvider, useToast }