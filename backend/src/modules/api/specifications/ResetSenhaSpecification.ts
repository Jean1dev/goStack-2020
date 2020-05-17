import { celebrate, Segments, Joi } from 'celebrate'

export default celebrate({
    [Segments.BODY]: {
        token: Joi.string().uuid().required(),
        password: Joi.string().required(),
        password_confimation: Joi.string().required().valid(Joi.ref('password'))
    }
})