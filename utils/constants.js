const INVALID_URL_MSG = 'Неправильный формат ссылки';
const INVALID_EMAIL_MSG = 'Неправильный формат адреса электронной почты';

const LOGGED_IN_MSG = 'Авторизация прошла успешно';
const LOGGED_OUT_MSG = 'Вы успешно вышли из аккаунта';

const ERROR_MSG = {
  CONFLICT_EMAIL: 'Пользователь с таким email уже зарегистрирован',
  BAD_REQUEST: 'Переданы некорректные данные',
  UNAUTHORIZED: 'Неправильные почта или пароль',
  NOT_FOUND_USER: 'Запрашиваемый пользователь не найден',
  NOT_FOUND_MOVIE: 'Запрашиваемый фильм не найден',
  FORBIDDEN: 'Вы не можете удалять фильмы, добавленные другими пользователями',
  NOT_FOUND_PATH: 'Запрашиваемый ресурс не найден',
  INTERNAL: 'На сервере произошла ошибка',
};

module.exports = {
  INVALID_URL_MSG,
  INVALID_EMAIL_MSG,
  ERROR_MSG,
  LOGGED_IN_MSG,
  LOGGED_OUT_MSG,
};
