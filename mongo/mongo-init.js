let con = new Mongo("localhost:27017");
let dbAdmin = con.getDB("admin"); // 使用 admin Database

// let dbMCAJawS = con.getDB("MCAJawS");
let auth = dbAdmin.auth("root", "0000");

let dbName = "elecrawler";

let db = dbAdmin.getSiblingDB(dbName);
printjson(dbName);

if (auth == 1) {
    // 列出 users
    let user = dbAdmin.getUsers();
    printjson(user);

    // 新增 MCA Jaw small
    db.createUser({
        user: "keliduan",
        pwd: "sakuraha",
        roles: [
            {
                role: "dbAdmin",
                db: dbName,
            },
            {
                role: "read",
                db: dbName,
            },
            {
                role: "readWrite",
                db: dbName,
            },
        ],
    });

    // 列出 databases
    // let dbs = dbAdmin.adminCommand("listDatabases");
    // printjson(dbs);

    // 列出 users
    // let user = dbAdmin.getUsers();
    // print(user);

    // 列出 users
    user = db.getUsers();
    printjson(user);

    let collections = db.getCollectionNames();
    printjson(collections);
}
