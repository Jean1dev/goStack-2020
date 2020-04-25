import React from 'react'
import { Container } from './styles'

interface TooltipoProps {
    title: string
    className?: string
}

const Tooltip: React.FC<TooltipoProps> = ({ title, className, children }) => {
    return (
        <Container className={className}>
            {children}
            <span>{title}</span>
        </Container>
    )
}

export default Tooltip