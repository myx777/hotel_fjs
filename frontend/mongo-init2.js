/**
 * Инициализация БД Mongo
 */
db = db.getSiblingDB("admin");

// Создание root пользователя
db.createUser({
  user: `${MONGO_ROOT_USER}`, // Укажите root пользователя
  pwd: `${MONGO_ROOT_PASSWORD}`, // Укажите пароль root
  roles: [{ role: "root", db: "admin" }],
});

// Переключение на базу данных hotels-db
db = db.getSiblingDB("hotels-db");

// Создание коллекций
db.createCollection("hotels");
db.createCollection("users");

// Роль: Запись только в коллекцию hotels
db.createRole({
  role: "writeHotelsOnly",
  privileges: [
    {
      resource: { db: "hotels-db", collection: "hotels" },
      actions: ["insert", "update"],
    },
  ],
  roles: [],
});

// Пользователь с правами на запись в hotels
db.createUser({
  user: `${MONGO_HOTEL_WRITE_USER}`, // Имя пользователя
  pwd: `${MONGO_HOTEL_WRITE_PASSWORD}`, // Пароль
  roles: [{ role: "writeHotelsOnly", db: "hotels-db" }],
});

// Роль: Чтение только из коллекции hotels
db.createRole({
  role: "readHotelsOnly",
  privileges: [
    {
      resource: { db: "hotels-db", collection: "hotels" },
      actions: ["find"],
    },
  ],
  roles: [],
});

// Пользователь с правами на чтение hotels
db.createUser({
  user: `${MONGO_HOTEL_READ_USER}`, // Имя пользователя
  pwd: `${MONGO_HOTEL_READ_PASSWORD}`, // Пароль
  roles: [{ role: "readHotelsOnly", db: "hotels-db" }],
});

// Роль: Запись только в коллекцию users
db.createRole({
  role: "writeUsersOnly",
  privileges: [
    {
      resource: { db: "hotels-db", collection: "users" },
      actions: ["insert", "update"],
    },
  ],
  roles: [],
});

// Пользователь с правами на запись в users
db.createUser({
  user: `${MONGO_USERS_WRITE_USER}`, // Имя пользователя
  pwd: `${MONGO_USERS_WRITE_PASSWORD}`, // Пароль
  roles: [{ role: "writeUsersOnly", db: "hotels-db" }],
});

// Роль: Чтение только из коллекции users
db.createRole({
  role: "readUsersOnly",
  privileges: [
    {
      resource: { db: "hotels-db", collection: "users" },
      actions: ["find"],
    },
  ],
  roles: [],
});

// Пользователь с правами на чтение users
db.createUser({
  user: `${MONGO_USERS_READ_USER}`, // Имя пользователя
  pwd: `${MONGO_USERS_READ_PASSWORD}`, // Пароль
  roles: [{ role: "readUsersOnly", db: "hotels-db" }],
});
