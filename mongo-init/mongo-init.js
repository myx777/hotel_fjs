db = db.getSiblingDB("admin");
db.createUser({
  user: "__MONGO_ROOT_USER__",
  pwd: "__MONGO_ROOT_PASSWORD__",
  roles: [{ role: "root", db: "admin" }],
});

db.auth("__MONGO_ROOT_USER__", "__MONGO_ROOT_PASSWORD__");

// Переключение на базу данных hotels-db
db = db.getSiblingDB("hotels-db");

// Создание коллекций
db.createCollection("hotels");
db.createCollection("users");

// Роль для сервера
db.createRole(
  {
    role: "hotels-db",
    privileges: [
      {
        resource: { db: "hotels-db", collection: "" },
        actions: ["insert", "update", "find", "remove"],
      },
    ],
    roles: [],
  },
  { w: "majority", wtimeout: 5000 }
);

// Пользователь с правами на запись в hotels
db.createUser({
  user: "__MONGO_HOTELS_USER__",
  pwd: "__MONGO_HOTELS_PASSWORD__",
  roles: [{ role: "hotels-db", db: "hotels-db" }],
});