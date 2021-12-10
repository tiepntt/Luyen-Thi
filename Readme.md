# Luyenthi - IPractice

> Hệ thống ôn luyện thi THPT Quốc gia 2021

##

**Team Member:**

- Nguyen Thai Tiep

## Requirement

- [.Net Core 5.0](https://docs.microsoft.com/en-us/ef/core/)
- [ReactJs 17.0](https://reactjs.org/docs/getting-started.html)
- [Mysql 8.0](https://dev.mysql.com/downloads/)
- [NodeJs v14](https://nodejs.org/en/download/)

## Installation

Navigate and config into each file in sub-directory:

> server/Luyenthi.HttpApi.Host/appconfig.json

> client/.env.development

Terminal/Bash/CMD:
In each directory

- client
- server
- mysqlserver

```
MyProject
├── .gitignore       // Standard gitignore file
├── client           // Client dir
├── server           // .Net core server
├── Credentials      // MySQL server
└── README.md        // README file

```

## Start Project

- Client :
  Install dependencies

```sh
yarn install
```

Start project

```sh
yarn start
```

- Server

Update Migration in **Package Manager Console** at Project `Luyenthi.DbMigrator`

```sh
Update-Database
```

- Mysql
  Import by **Command prompt** in `Luyenthi.DbMigrator>Data>`

```sh
mysql -u root -p luyenthi > dump.sql
```

Dump data by **Command prompt** in `Luyenthi.DbMigrator>Data>`

```sh
mysqldump -u root  -p luyenthi -t --complete-insert --ignore-table=luyenthi.__efmigrationshistory > dump.sql
```
- Mysql
  Import by **Mysql Workbench** in `[Dữ liệu đầy đủ](https://drive.google.com/drive/folders/1zI9-o4Pihj5jtXWQZlhCM3H72nBLiQvz)`