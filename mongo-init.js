// db = connect("localhost:27017", "mongo", "mongo")
// Переключение на базу данных hotels-db
db = db.getSiblingDB("hotels-db");

// Создание коллекций
// if (!db.getCollectionNames().includes("hotels") && !db.getCollectionNames().includes("users")) {
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
    user: "__MONGO_HOTELS_WRITE_USER__",
    pwd: "__MONGO_HOTELS_WRITE_PASSWORD__",
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
    user: "__MONGO_HOTELS_READ_USER__",
    pwd: " __MONGO_HOTELS_READ_PASSWORD__",
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
    user: "__MONGO_USERS_WRITE_USER__",
    pwd: "__MONGO_USERS_WRITE_PASSWORD__",
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
    user: "__MONGO_USERS_READ_USER__",
    pwd: "__MONGO_USERS_READ_PASSWORD__",
    roles: [{ role: "readUsersOnly", db: "hotels-db" }],
  });
// }
