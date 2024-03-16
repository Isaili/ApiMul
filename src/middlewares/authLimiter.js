import rateLimit from "express-rate-limit";

export const Login = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 3,
  message: "Demasiados intentos, inténtalo de nuevo después de 15 minutos",
});



export const changePassword = rateLimit({
  windowMs: 24 * 60 * 60 * 1000, 
  max: 3, 
  message: "Demasiadas actualizaciones, inténtalo de nuevo después de 24 horas",
})


export const amountLimit = rateLimit ({
  windowMs: 3 *60 *1000,
  max:5,
  message: "Demasiadas peticiobes, intentelo de nuevo en 2 minutos"
})

export const getsLimit = rateLimit({
  windowMs: 2 *60 *1000,
  max:5,
  message: "Demasiadas peticiobes, intentelo de nuevo en 2 minutos"
})