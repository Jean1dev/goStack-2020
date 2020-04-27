import React, { useEffect } from 'react'
import { Toast } from './styles'
import { FiAlertCircle, FiXCircle, FiCheckCircle, FiInfo } from 'react-icons/fi'
import { ToastMessage, useToast } from '../../hooks/ToastContext'

interface ToastProps {
    message: ToastMessage
    style: object
}

const icons = {
    info: <FiInfo size={24}></FiInfo>,
    error: <FiAlertCircle size={24}></FiAlertCircle>,
    success: <FiCheckCircle size={24}></FiCheckCircle>
}

const ToastComponent: React.FC<ToastProps> = ({ message, style }) => {
    const { removeToast } = useToast()

    useEffect(() => {
        const timer = setTimeout(() => {
            removeToast(message.id)
        }, 3000)

        return () => {
            clearTimeout(timer)
        }
    }, [removeToast, message.id])

    return (
        <Toast type={message.type} hasdescription={!!message.description} style={style}>
            {icons[message.type || 'info']}

            <div>
                <strong> {message.title} </strong>
                {message.description && <p>{message.description} </p>}
            </div>

            <button type="button" onClick={() => removeToast(message.id)}>
                <FiXCircle size={18}></FiXCircle>
            </button>
        </Toast>
    )
}

export default ToastComponent