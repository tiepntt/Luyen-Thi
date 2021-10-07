# Luyenthi - IPractice

> Hệ thống ôn luyện thi THPT Quốc gia 2021

##

**Team Member:**

- Nguyen Thai Tiep

## Requirement

- [.Net Core 5.0](https://docs.microsoft.com/en-us/ef/core/)
- [ReactJs 17.0](https://reactjs.org/docs/getting-started.html)
- [Mysql 8.0](https://dev.mysql.com/downloads/)

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
npm install
```

Start project

```sh
npm start
```

- Server

Update Migration in **Package Manager Console** at Project `Luyenthi.DbMigrator`

```sh
Update-Database
```

- Mysql
  Import by **Command prompt** in `Luyenthi.DbMigrator>Data>`

```sh
mysql -u root -p luyenthi< dump.sql
```
Dump data by **Command prompt** in `Luyenthi.DbMigrator>Data>`
```sh
mysqldump -u root -p luyenthi -t --complete-insert >dump.sql
```
