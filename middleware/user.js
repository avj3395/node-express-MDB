import Joi from "joi";

export const validateRegister = async (req, res, next) => {
  const { name, email, password } = req.body;

  const schema = Joi.object({
    name: Joi.string().alphanum().min(3).max(30).required(),
    email: Joi.string().email({ minDomainSegments: 2 }).required(),
    password: Joi.string().min(3).required(),
  });

  try {
    const value = await schema.validateAsync({ name, email, password });
    next();
  } catch (err) {
    return res.status(400).send({
      message: err.details[0].message,
    });
  }
};

export const validateLogin = async (req, res, next) => {
  const { email, password } = req.body;

  const schema = Joi.object({
    email: Joi.string().email({ minDomainSegments: 2 }).required(),
    password: Joi.string().min(3).required(),
  });
  try {
    const value = await schema.validateAsync({ email, password });
    next();
  } catch (err) {
    return res.status(400).send({
      message: err.details[0].message,
    });
  }
};
