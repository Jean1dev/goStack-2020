import { celebrate, Segments, Joi } from 'celebrate'

export default celebrate({
    [Segments.BODY]: {
        provider_id: Joi.string().uuid().required(),
        date: Joi.date().required()
    }
})