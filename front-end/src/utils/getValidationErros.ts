import { ValidationError } from "yup";

interface ResponseError {
    [key: string]: string
}

export default function getValidationErrors(err: ValidationError): ResponseError {
    const validationsErros: ResponseError = {}

    err.inner.forEach(e => {
        validationsErros[e.path] = e.message
    })

    return validationsErros
}