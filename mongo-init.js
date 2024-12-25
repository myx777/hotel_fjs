/**
 * Инициализация БД Mongo
 */
/**
 * Инициализация БД Mongo
 */
// db = db.getSiblingDB("admin");

// Создание root пользователя
// db.createUser({
//   user: "mongo",
//   pwd: "mongo", 
//   roles: [{ role: "root", db: "admin" }],
// });

// Подключение к базе admin с авторизацией
// db = connect( 'mongodb://localhost/admin' );
// db = db.getSiblingDB("admin");
// db.auth("mongo", "mongo");

// Переключение на базу данных hotels-db
db = db.getSiblingDB("hotels-db");

// Создание коллекций
if (!db.getCollectionNames().includes("hotels") && !db.getCollectionNames().includes("users")) {
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
    user: "user",
    pwd: "pwd",
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
    user: "user1",
    pwd: "pwd1",
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
    user: "user2",
    pwd: "pwd2",
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
    user: "user3",
    pwd: "pwd3",
    roles: [{ role: "readUsersOnly", db: "hotels-db" }],
  });
}