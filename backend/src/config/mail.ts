interface IMailConfig {
    driver: 'etherial' | 'ses'
    defaults: {
        email: string
        name: string
    }
}

export default {
    driver: process.env.MAIL_DRIVER || 'etherial',
    defaults: {
        email: 'email_configurado_na_aws@gmail.com',
        name: 'example'
    }
} as IMailConfig