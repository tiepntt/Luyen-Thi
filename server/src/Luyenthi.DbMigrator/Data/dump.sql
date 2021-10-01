-- MySQL dump 10.13  Distrib 5.7.33, for Win64 (x86_64)
--
-- Host: localhost    Database: luyenthi
-- ------------------------------------------------------
-- Server version	5.7.33-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `__efmigrationshistory`
--

DROP TABLE IF EXISTS `__efmigrationshistory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `__efmigrationshistory` (
  `MigrationId` varchar(150) NOT NULL,
  `ProductVersion` varchar(32) NOT NULL,
  PRIMARY KEY (`MigrationId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `__efmigrationshistory`
--

LOCK TABLES `__efmigrationshistory` WRITE;
/*!40000 ALTER TABLE `__efmigrationshistory` DISABLE KEYS */;
INSERT INTO `__efmigrationshistory` VALUES ('20211001164745_Initial','5.0.10');
/*!40000 ALTER TABLE `__efmigrationshistory` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `aspnetroleclaims`
--

DROP TABLE IF EXISTS `aspnetroleclaims`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `aspnetroleclaims` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `RoleId` char(36) CHARACTER SET ascii NOT NULL,
  `ClaimType` longtext,
  `ClaimValue` longtext,
  PRIMARY KEY (`Id`),
  KEY `IX_AspNetRoleClaims_RoleId` (`RoleId`),
  CONSTRAINT `FK_AspNetRoleClaims_AspNetRoles_RoleId` FOREIGN KEY (`RoleId`) REFERENCES `aspnetroles` (`Id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `aspnetroleclaims`
--

LOCK TABLES `aspnetroleclaims` WRITE;
/*!40000 ALTER TABLE `aspnetroleclaims` DISABLE KEYS */;
/*!40000 ALTER TABLE `aspnetroleclaims` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `aspnetroles`
--

DROP TABLE IF EXISTS `aspnetroles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `aspnetroles` (
  `Id` char(36) CHARACTER SET ascii NOT NULL,
  `Name` varchar(256) DEFAULT NULL,
  `NormalizedName` varchar(256) DEFAULT NULL,
  `ConcurrencyStamp` longtext,
  PRIMARY KEY (`Id`),
  UNIQUE KEY `RoleNameIndex` (`NormalizedName`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `aspnetroles`
--

LOCK TABLES `aspnetroles` WRITE;
/*!40000 ALTER TABLE `aspnetroles` DISABLE KEYS */;
INSERT INTO `aspnetroles` VALUES ('daf39ce6-9c5f-495e-af95-810df7f64e40','Admin','ADMIN','81430699-1041-410f-970c-750fe6075b6b'),('f25e6a5a-2ce9-4273-9bd3-3b71755add19','Teacher','TEACHER','4963815b-ddfa-4c19-aaf4-6229b8e83391'),('fcdea3ce-afe0-4fff-b32c-6c28309ec12e','Student','STUDENT','062c02e9-ba51-40b9-aa9f-62f87416b96c');
/*!40000 ALTER TABLE `aspnetroles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `aspnetuserclaims`
--

DROP TABLE IF EXISTS `aspnetuserclaims`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `aspnetuserclaims` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `UserId` char(36) CHARACTER SET ascii NOT NULL,
  `ClaimType` longtext,
  `ClaimValue` longtext,
  PRIMARY KEY (`Id`),
  KEY `IX_AspNetUserClaims_UserId` (`UserId`),
  CONSTRAINT `FK_AspNetUserClaims_AspNetUsers_UserId` FOREIGN KEY (`UserId`) REFERENCES `aspnetusers` (`Id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `aspnetuserclaims`
--

LOCK TABLES `aspnetuserclaims` WRITE;
/*!40000 ALTER TABLE `aspnetuserclaims` DISABLE KEYS */;
/*!40000 ALTER TABLE `aspnetuserclaims` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `aspnetuserlogins`
--

DROP TABLE IF EXISTS `aspnetuserlogins`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `aspnetuserlogins` (
  `LoginProvider` varchar(255) NOT NULL,
  `ProviderKey` varchar(255) NOT NULL,
  `ProviderDisplayName` longtext,
  `UserId` char(36) CHARACTER SET ascii NOT NULL,
  PRIMARY KEY (`LoginProvider`,`ProviderKey`),
  KEY `IX_AspNetUserLogins_UserId` (`UserId`),
  CONSTRAINT `FK_AspNetUserLogins_AspNetUsers_UserId` FOREIGN KEY (`UserId`) REFERENCES `aspnetusers` (`Id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `aspnetuserlogins`
--

LOCK TABLES `aspnetuserlogins` WRITE;
/*!40000 ALTER TABLE `aspnetuserlogins` DISABLE KEYS */;
/*!40000 ALTER TABLE `aspnetuserlogins` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `aspnetuserroles`
--

DROP TABLE IF EXISTS `aspnetuserroles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `aspnetuserroles` (
  `UserId` char(36) CHARACTER SET ascii NOT NULL,
  `RoleId` char(36) CHARACTER SET ascii NOT NULL,
  PRIMARY KEY (`UserId`,`RoleId`),
  KEY `IX_AspNetUserRoles_RoleId` (`RoleId`),
  CONSTRAINT `FK_AspNetUserRoles_AspNetRoles_RoleId` FOREIGN KEY (`RoleId`) REFERENCES `aspnetroles` (`Id`) ON DELETE CASCADE,
  CONSTRAINT `FK_AspNetUserRoles_AspNetUsers_UserId` FOREIGN KEY (`UserId`) REFERENCES `aspnetusers` (`Id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `aspnetuserroles`
--

LOCK TABLES `aspnetuserroles` WRITE;
/*!40000 ALTER TABLE `aspnetuserroles` DISABLE KEYS */;
INSERT INTO `aspnetuserroles` VALUES ('cb3850a2-0a32-4cee-a175-08df5ec6169b','daf39ce6-9c5f-495e-af95-810df7f64e40');
/*!40000 ALTER TABLE `aspnetuserroles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `aspnetusers`
--

DROP TABLE IF EXISTS `aspnetusers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `aspnetusers` (
  `Id` char(36) CHARACTER SET ascii NOT NULL,
  `CreatedAt` datetime(6) NOT NULL,
  `UpdatedAt` datetime(6) NOT NULL,
  `CreatedBy` char(36) CHARACTER SET ascii DEFAULT NULL,
  `UpdatedBy` char(36) CHARACTER SET ascii DEFAULT NULL,
  `FirstName` longtext,
  `LastName` longtext,
  `BirthDay` datetime(6) NOT NULL,
  `Gender` int(11) NOT NULL,
  `UserName` varchar(256) DEFAULT NULL,
  `NormalizedUserName` varchar(256) DEFAULT NULL,
  `Email` varchar(256) DEFAULT NULL,
  `NormalizedEmail` varchar(256) DEFAULT NULL,
  `EmailConfirmed` tinyint(1) NOT NULL,
  `PasswordHash` longtext,
  `SecurityStamp` longtext,
  `ConcurrencyStamp` longtext,
  `PhoneNumber` longtext,
  `PhoneNumberConfirmed` tinyint(1) NOT NULL,
  `TwoFactorEnabled` tinyint(1) NOT NULL,
  `LockoutEnd` datetime(6) DEFAULT NULL,
  `LockoutEnabled` tinyint(1) NOT NULL,
  `AccessFailedCount` int(11) NOT NULL,
  PRIMARY KEY (`Id`),
  UNIQUE KEY `UserNameIndex` (`NormalizedUserName`),
  KEY `EmailIndex` (`NormalizedEmail`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `aspnetusers`
--

LOCK TABLES `aspnetusers` WRITE;
/*!40000 ALTER TABLE `aspnetusers` DISABLE KEYS */;
INSERT INTO `aspnetusers` VALUES ('cb3850a2-0a32-4cee-a175-08df5ec6169b','0001-01-01 00:00:00.000000','0001-01-01 00:00:00.000000',NULL,NULL,'Tiệp','Nguyễn','1980-01-01 00:00:00.000000',0,'admin',NULL,'Admin@Admin.com',NULL,1,'AQAAAAEAACcQAAAAEF4tSpfR8/Dt51WvPskIagTlJ5uicBqonbdFfEGYisrr6f7lh/HVMksm41aPxIy3EQ==',NULL,'dc505839-5478-4cc6-8523-92e7c4e22d15','0819200620',1,0,NULL,0,0);
/*!40000 ALTER TABLE `aspnetusers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `aspnetusertokens`
--

DROP TABLE IF EXISTS `aspnetusertokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `aspnetusertokens` (
  `UserId` char(36) CHARACTER SET ascii NOT NULL,
  `LoginProvider` varchar(255) NOT NULL,
  `Name` varchar(255) NOT NULL,
  `Value` longtext,
  PRIMARY KEY (`UserId`,`LoginProvider`,`Name`),
  CONSTRAINT `FK_AspNetUserTokens_AspNetUsers_UserId` FOREIGN KEY (`UserId`) REFERENCES `aspnetusers` (`Id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `aspnetusertokens`
--

LOCK TABLES `aspnetusertokens` WRITE;
/*!40000 ALTER TABLE `aspnetusertokens` DISABLE KEYS */;
/*!40000 ALTER TABLE `aspnetusertokens` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `chapters`
--

DROP TABLE IF EXISTS `chapters`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `chapters` (
  `Id` char(36) CHARACTER SET ascii NOT NULL,
  `Name` longtext,
  `Code` varchar(255) DEFAULT NULL,
  `OrderNumber` longtext,
  `SubjectId` char(36) CHARACTER SET ascii NOT NULL,
  `GradeId` char(36) CHARACTER SET ascii NOT NULL,
  `CreatedAt` datetime(6) NOT NULL,
  `UpdatedAt` datetime(6) NOT NULL,
  `CreatedBy` char(36) CHARACTER SET ascii DEFAULT NULL,
  `UpdatedBy` char(36) CHARACTER SET ascii DEFAULT NULL,
  PRIMARY KEY (`Id`),
  UNIQUE KEY `IX_Chapters_Code` (`Code`),
  KEY `IX_Chapters_GradeId` (`GradeId`),
  KEY `IX_Chapters_SubjectId` (`SubjectId`),
  CONSTRAINT `FK_Chapters_Grades_GradeId` FOREIGN KEY (`GradeId`) REFERENCES `grades` (`Id`) ON DELETE CASCADE,
  CONSTRAINT `FK_Chapters_Subjects_SubjectId` FOREIGN KEY (`SubjectId`) REFERENCES `subjects` (`Id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chapters`
--

LOCK TABLES `chapters` WRITE;
/*!40000 ALTER TABLE `chapters` DISABLE KEYS */;
/*!40000 ALTER TABLE `chapters` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `documents`
--

DROP TABLE IF EXISTS `documents`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `documents` (
  `Id` char(36) CHARACTER SET ascii NOT NULL,
  `Name` longtext,
  `NameNomarlize` longtext,
  `SubjectId` char(36) CHARACTER SET ascii NOT NULL,
  `GradeId` char(36) CHARACTER SET ascii NOT NULL,
  `Description` longtext,
  `ImageUrl` longtext,
  `DocumentType` int(11) NOT NULL,
  `Status` int(11) NOT NULL,
  `ParentId` char(36) CHARACTER SET ascii DEFAULT NULL,
  `CreatedAt` datetime(6) NOT NULL,
  `UpdatedAt` datetime(6) NOT NULL,
  `CreatedBy` char(36) CHARACTER SET ascii DEFAULT NULL,
  `UpdatedBy` char(36) CHARACTER SET ascii DEFAULT NULL,
  PRIMARY KEY (`Id`),
  KEY `IX_Documents_GradeId` (`GradeId`),
  KEY `IX_Documents_ParentId` (`ParentId`),
  KEY `IX_Documents_SubjectId` (`SubjectId`),
  CONSTRAINT `FK_Documents_Documents_ParentId` FOREIGN KEY (`ParentId`) REFERENCES `documents` (`Id`),
  CONSTRAINT `FK_Documents_Grades_GradeId` FOREIGN KEY (`GradeId`) REFERENCES `grades` (`Id`) ON DELETE CASCADE,
  CONSTRAINT `FK_Documents_Subjects_SubjectId` FOREIGN KEY (`SubjectId`) REFERENCES `subjects` (`Id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `documents`
--

LOCK TABLES `documents` WRITE;
/*!40000 ALTER TABLE `documents` DISABLE KEYS */;
/*!40000 ALTER TABLE `documents` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `grades`
--

DROP TABLE IF EXISTS `grades`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `grades` (
  `Id` char(36) CHARACTER SET ascii NOT NULL,
  `Name` longtext,
  `Code` varchar(255) DEFAULT NULL,
  `OrderNumber` int(11) NOT NULL,
  PRIMARY KEY (`Id`),
  UNIQUE KEY `IX_Grades_Code` (`Code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `grades`
--

LOCK TABLES `grades` WRITE;
/*!40000 ALTER TABLE `grades` DISABLE KEYS */;
INSERT INTO `grades` VALUES ('73a6f98e-8bcf-49db-b413-cf79ff3189bd','Lớp 11','lop-11',11),('7d9c9e86-89c5-49bf-bf35-99a97ca22f2a','Lớp 12','lop-12',12),('80486e93-144e-4969-afc5-cae30a87a1bf','Lớp 10','lop-10',10),('e377aa7a-4e79-4d3d-8fba-0219193b43f7','Ôn thi THPQ Quốc gia','on-thi-thpt-quoc-gia',13);
/*!40000 ALTER TABLE `grades` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `gradesubjects`
--

DROP TABLE IF EXISTS `gradesubjects`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gradesubjects` (
  `GradeId` char(36) CHARACTER SET ascii NOT NULL,
  `SubjectId` char(36) CHARACTER SET ascii NOT NULL,
  PRIMARY KEY (`GradeId`,`SubjectId`),
  KEY `IX_GradeSubjects_SubjectId` (`SubjectId`),
  CONSTRAINT `FK_GradeSubjects_Grades_GradeId` FOREIGN KEY (`GradeId`) REFERENCES `grades` (`Id`) ON DELETE CASCADE,
  CONSTRAINT `FK_GradeSubjects_Subjects_SubjectId` FOREIGN KEY (`SubjectId`) REFERENCES `subjects` (`Id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gradesubjects`
--

LOCK TABLES `gradesubjects` WRITE;
/*!40000 ALTER TABLE `gradesubjects` DISABLE KEYS */;
INSERT INTO `gradesubjects` VALUES ('73a6f98e-8bcf-49db-b413-cf79ff3189bd','18cdf684-f05e-4db2-a6da-f3d63856291c'),('7d9c9e86-89c5-49bf-bf35-99a97ca22f2a','18cdf684-f05e-4db2-a6da-f3d63856291c'),('80486e93-144e-4969-afc5-cae30a87a1bf','18cdf684-f05e-4db2-a6da-f3d63856291c'),('e377aa7a-4e79-4d3d-8fba-0219193b43f7','18cdf684-f05e-4db2-a6da-f3d63856291c'),('73a6f98e-8bcf-49db-b413-cf79ff3189bd','2e3a837f-efb0-4aae-9d8a-6c7ad75882db'),('7d9c9e86-89c5-49bf-bf35-99a97ca22f2a','2e3a837f-efb0-4aae-9d8a-6c7ad75882db'),('80486e93-144e-4969-afc5-cae30a87a1bf','2e3a837f-efb0-4aae-9d8a-6c7ad75882db'),('e377aa7a-4e79-4d3d-8fba-0219193b43f7','2e3a837f-efb0-4aae-9d8a-6c7ad75882db'),('73a6f98e-8bcf-49db-b413-cf79ff3189bd','370c25ae-5e13-4057-a76d-f2511a65143e'),('7d9c9e86-89c5-49bf-bf35-99a97ca22f2a','370c25ae-5e13-4057-a76d-f2511a65143e'),('80486e93-144e-4969-afc5-cae30a87a1bf','370c25ae-5e13-4057-a76d-f2511a65143e'),('e377aa7a-4e79-4d3d-8fba-0219193b43f7','370c25ae-5e13-4057-a76d-f2511a65143e'),('73a6f98e-8bcf-49db-b413-cf79ff3189bd','49795e43-199c-4d75-bc72-4d510af25dcb'),('7d9c9e86-89c5-49bf-bf35-99a97ca22f2a','49795e43-199c-4d75-bc72-4d510af25dcb'),('80486e93-144e-4969-afc5-cae30a87a1bf','49795e43-199c-4d75-bc72-4d510af25dcb'),('e377aa7a-4e79-4d3d-8fba-0219193b43f7','49795e43-199c-4d75-bc72-4d510af25dcb'),('73a6f98e-8bcf-49db-b413-cf79ff3189bd','5497624c-b5ec-4288-afba-0c0a4abe18d2'),('7d9c9e86-89c5-49bf-bf35-99a97ca22f2a','5497624c-b5ec-4288-afba-0c0a4abe18d2'),('80486e93-144e-4969-afc5-cae30a87a1bf','5497624c-b5ec-4288-afba-0c0a4abe18d2'),('e377aa7a-4e79-4d3d-8fba-0219193b43f7','5497624c-b5ec-4288-afba-0c0a4abe18d2'),('73a6f98e-8bcf-49db-b413-cf79ff3189bd','5a8cd25d-6905-4a9e-b968-d9878234fcb4'),('7d9c9e86-89c5-49bf-bf35-99a97ca22f2a','5a8cd25d-6905-4a9e-b968-d9878234fcb4'),('80486e93-144e-4969-afc5-cae30a87a1bf','5a8cd25d-6905-4a9e-b968-d9878234fcb4'),('e377aa7a-4e79-4d3d-8fba-0219193b43f7','5a8cd25d-6905-4a9e-b968-d9878234fcb4'),('73a6f98e-8bcf-49db-b413-cf79ff3189bd','72230517-0e81-4eb9-a29f-cf8b7b8902ad'),('7d9c9e86-89c5-49bf-bf35-99a97ca22f2a','72230517-0e81-4eb9-a29f-cf8b7b8902ad'),('80486e93-144e-4969-afc5-cae30a87a1bf','72230517-0e81-4eb9-a29f-cf8b7b8902ad'),('e377aa7a-4e79-4d3d-8fba-0219193b43f7','72230517-0e81-4eb9-a29f-cf8b7b8902ad'),('73a6f98e-8bcf-49db-b413-cf79ff3189bd','ce80af0d-1772-48b6-9a79-d894a560ba62'),('7d9c9e86-89c5-49bf-bf35-99a97ca22f2a','ce80af0d-1772-48b6-9a79-d894a560ba62'),('80486e93-144e-4969-afc5-cae30a87a1bf','ce80af0d-1772-48b6-9a79-d894a560ba62'),('e377aa7a-4e79-4d3d-8fba-0219193b43f7','ce80af0d-1772-48b6-9a79-d894a560ba62');
/*!40000 ALTER TABLE `gradesubjects` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `levelquestions`
--

DROP TABLE IF EXISTS `levelquestions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `levelquestions` (
  `Id` char(36) CHARACTER SET ascii NOT NULL,
  `Name` longtext,
  `Code` varchar(255) DEFAULT NULL,
  `OrderNumber` int(11) NOT NULL,
  PRIMARY KEY (`Id`),
  UNIQUE KEY `IX_LevelQuestions_Code` (`Code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `levelquestions`
--

LOCK TABLES `levelquestions` WRITE;
/*!40000 ALTER TABLE `levelquestions` DISABLE KEYS */;
/*!40000 ALTER TABLE `levelquestions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `questions`
--

DROP TABLE IF EXISTS `questions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `questions` (
  `Id` char(36) CHARACTER SET ascii NOT NULL,
  `SubjectId` char(36) CHARACTER SET ascii DEFAULT NULL,
  `GradeId` char(36) CHARACTER SET ascii DEFAULT NULL,
  `ChapterId` char(36) CHARACTER SET ascii DEFAULT NULL,
  `UnitId` char(36) CHARACTER SET ascii DEFAULT NULL,
  `LevelId` char(36) CHARACTER SET ascii DEFAULT NULL,
  `ParentId` char(36) CHARACTER SET ascii DEFAULT NULL,
  `Content` longtext,
  `Introduction` longtext,
  `Solve` longtext,
  `CorrectAnswer` longtext,
  `Status` int(11) NOT NULL,
  `OrderNumber` int(11) NOT NULL,
  `CreatedAt` datetime(6) NOT NULL,
  `UpdatedAt` datetime(6) NOT NULL,
  `CreatedBy` char(36) CHARACTER SET ascii DEFAULT NULL,
  `UpdatedBy` char(36) CHARACTER SET ascii DEFAULT NULL,
  PRIMARY KEY (`Id`),
  KEY `IX_Questions_ChapterId` (`ChapterId`),
  KEY `IX_Questions_GradeId` (`GradeId`),
  KEY `IX_Questions_LevelId` (`LevelId`),
  KEY `IX_Questions_ParentId` (`ParentId`),
  KEY `IX_Questions_SubjectId` (`SubjectId`),
  KEY `IX_Questions_UnitId` (`UnitId`),
  CONSTRAINT `FK_Questions_Chapters_ChapterId` FOREIGN KEY (`ChapterId`) REFERENCES `chapters` (`Id`),
  CONSTRAINT `FK_Questions_Grades_GradeId` FOREIGN KEY (`GradeId`) REFERENCES `grades` (`Id`),
  CONSTRAINT `FK_Questions_LevelQuestions_LevelId` FOREIGN KEY (`LevelId`) REFERENCES `levelquestions` (`Id`),
  CONSTRAINT `FK_Questions_Questions_ParentId` FOREIGN KEY (`ParentId`) REFERENCES `questions` (`Id`) ON DELETE CASCADE,
  CONSTRAINT `FK_Questions_Subjects_SubjectId` FOREIGN KEY (`SubjectId`) REFERENCES `subjects` (`Id`),
  CONSTRAINT `FK_Questions_Units_UnitId` FOREIGN KEY (`UnitId`) REFERENCES `units` (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `questions`
--

LOCK TABLES `questions` WRITE;
/*!40000 ALTER TABLE `questions` DISABLE KEYS */;
/*!40000 ALTER TABLE `questions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `questionsetquestion`
--

DROP TABLE IF EXISTS `questionsetquestion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `questionsetquestion` (
  `Id` char(36) CHARACTER SET ascii NOT NULL,
  `QuestionId` char(36) CHARACTER SET ascii NOT NULL,
  `QuestionSetId` char(36) CHARACTER SET ascii NOT NULL,
  PRIMARY KEY (`Id`),
  KEY `IX_QuestionSetQuestion_QuestionId` (`QuestionId`),
  KEY `IX_QuestionSetQuestion_QuestionSetId` (`QuestionSetId`),
  CONSTRAINT `FK_QuestionSetQuestion_QuestionSets_QuestionSetId` FOREIGN KEY (`QuestionSetId`) REFERENCES `questionsets` (`Id`) ON DELETE CASCADE,
  CONSTRAINT `FK_QuestionSetQuestion_Questions_QuestionId` FOREIGN KEY (`QuestionId`) REFERENCES `questions` (`Id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `questionsetquestion`
--

LOCK TABLES `questionsetquestion` WRITE;
/*!40000 ALTER TABLE `questionsetquestion` DISABLE KEYS */;
/*!40000 ALTER TABLE `questionsetquestion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `questionsets`
--

DROP TABLE IF EXISTS `questionsets`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `questionsets` (
  `Id` char(36) CHARACTER SET ascii NOT NULL,
  `CreatedAt` datetime(6) NOT NULL,
  `UpdatedAt` datetime(6) NOT NULL,
  `CreatedBy` char(36) CHARACTER SET ascii DEFAULT NULL,
  `UpdatedBy` char(36) CHARACTER SET ascii DEFAULT NULL,
  `Show` tinyint(1) NOT NULL,
  `Name` longtext,
  `OrderNumber` int(11) NOT NULL,
  `DocumentId` char(36) CHARACTER SET ascii NOT NULL,
  PRIMARY KEY (`Id`),
  KEY `IX_QuestionSets_DocumentId` (`DocumentId`),
  CONSTRAINT `FK_QuestionSets_Documents_DocumentId` FOREIGN KEY (`DocumentId`) REFERENCES `documents` (`Id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `questionsets`
--

LOCK TABLES `questionsets` WRITE;
/*!40000 ALTER TABLE `questionsets` DISABLE KEYS */;
/*!40000 ALTER TABLE `questionsets` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `subjects`
--

DROP TABLE IF EXISTS `subjects`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `subjects` (
  `Id` char(36) CHARACTER SET ascii NOT NULL,
  `Name` longtext,
  `Code` varchar(255) DEFAULT NULL,
  `OrderNumber` int(11) NOT NULL,
  PRIMARY KEY (`Id`),
  UNIQUE KEY `IX_Subjects_Code` (`Code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `subjects`
--

LOCK TABLES `subjects` WRITE;
/*!40000 ALTER TABLE `subjects` DISABLE KEYS */;
INSERT INTO `subjects` VALUES ('18cdf684-f05e-4db2-a6da-f3d63856291c','Lịch sử','lich-su',5),('2e3a837f-efb0-4aae-9d8a-6c7ad75882db','Tiếng Anh','tieng-anh',10),('370c25ae-5e13-4057-a76d-f2511a65143e','Giáo dục công dân','giao-duc-cong-dan',7),('49795e43-199c-4d75-bc72-4d510af25dcb','Toán học','toan-hoc',1),('5497624c-b5ec-4288-afba-0c0a4abe18d2','Vật lý','vat-ly',2),('5a8cd25d-6905-4a9e-b968-d9878234fcb4','Sinh học','sinh-hoc',4),('72230517-0e81-4eb9-a29f-cf8b7b8902ad','Hóa học','hoa-hoc',3),('ce80af0d-1772-48b6-9a79-d894a560ba62','Địa lý','dia-ly',6);
/*!40000 ALTER TABLE `subjects` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `units`
--

DROP TABLE IF EXISTS `units`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `units` (
  `Id` char(36) CHARACTER SET ascii NOT NULL,
  `Name` longtext,
  `Code` varchar(255) DEFAULT NULL,
  `ChapterId` char(36) CHARACTER SET ascii NOT NULL,
  `GradeId` char(36) CHARACTER SET ascii NOT NULL,
  `CreatedAt` datetime(6) NOT NULL,
  `UpdatedAt` datetime(6) NOT NULL,
  `CreatedBy` char(36) CHARACTER SET ascii DEFAULT NULL,
  `UpdatedBy` char(36) CHARACTER SET ascii DEFAULT NULL,
  PRIMARY KEY (`Id`),
  UNIQUE KEY `IX_Units_Code` (`Code`),
  KEY `IX_Units_ChapterId` (`ChapterId`),
  KEY `IX_Units_GradeId` (`GradeId`),
  CONSTRAINT `FK_Units_Chapters_ChapterId` FOREIGN KEY (`ChapterId`) REFERENCES `chapters` (`Id`) ON DELETE CASCADE,
  CONSTRAINT `FK_Units_Grades_GradeId` FOREIGN KEY (`GradeId`) REFERENCES `grades` (`Id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `units`
--

LOCK TABLES `units` WRITE;
/*!40000 ALTER TABLE `units` DISABLE KEYS */;
/*!40000 ALTER TABLE `units` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-10-01 23:49:13
