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
INSERT INTO `__efmigrationshistory` VALUES ('20210923141419_initial','5.0.10');
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
INSERT INTO `aspnetroles` VALUES ('daf39ce6-9c5f-495e-af95-810df7f64e40','Admin','ADMIN','08b46f4e-1dbd-46d1-83cf-08d567dae6c9'),('f25e6a5a-2ce9-4273-9bd3-3b71755add19','Teacher','TEACHER','9890804a-43b3-4610-8cec-88b8d325a0b7'),('fcdea3ce-afe0-4fff-b32c-6c28309ec12e','Student','STUDENT','984e78c6-2b22-46a9-81d1-e3f89ec0b87b');
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
  `SubjectId` char(36) CHARACTER SET ascii DEFAULT NULL,
  `GradesId` char(36) CHARACTER SET ascii DEFAULT NULL,
  `CreatedAt` datetime(6) NOT NULL,
  `UpdatedAt` datetime(6) NOT NULL,
  `CreatedBy` char(36) CHARACTER SET ascii DEFAULT NULL,
  `UpdatedBy` char(36) CHARACTER SET ascii DEFAULT NULL,
  PRIMARY KEY (`Id`),
  UNIQUE KEY `IX_Chapters_Code` (`Code`),
  KEY `IX_Chapters_GradesId` (`GradesId`),
  KEY `IX_Chapters_SubjectId` (`SubjectId`),
  CONSTRAINT `FK_Chapters_Grades_GradesId` FOREIGN KEY (`GradesId`) REFERENCES `grades` (`Id`),
  CONSTRAINT `FK_Chapters_Subjects_SubjectId` FOREIGN KEY (`SubjectId`) REFERENCES `subjects` (`Id`)
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
-- Table structure for table `document`
--

DROP TABLE IF EXISTS `document`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `document` (
  `Id` char(36) CHARACTER SET ascii NOT NULL,
  `Name` longtext,
  `CreatedAt` datetime(6) NOT NULL,
  `UpdatedAt` datetime(6) NOT NULL,
  `CreatedBy` char(36) CHARACTER SET ascii DEFAULT NULL,
  `UpdatedBy` char(36) CHARACTER SET ascii DEFAULT NULL,
  `SubjectId` char(36) CHARACTER SET ascii DEFAULT NULL,
  `GradeId` char(36) CHARACTER SET ascii DEFAULT NULL,
  PRIMARY KEY (`Id`),
  KEY `IX_Document_GradeId` (`GradeId`),
  KEY `IX_Document_SubjectId` (`SubjectId`),
  CONSTRAINT `FK_Document_Grades_GradeId` FOREIGN KEY (`GradeId`) REFERENCES `grades` (`Id`),
  CONSTRAINT `FK_Document_Subjects_SubjectId` FOREIGN KEY (`SubjectId`) REFERENCES `subjects` (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `document`
--

LOCK TABLES `document` WRITE;
/*!40000 ALTER TABLE `document` DISABLE KEYS */;
/*!40000 ALTER TABLE `document` ENABLE KEYS */;
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
  PRIMARY KEY (`Id`),
  UNIQUE KEY `IX_Grades_Code` (`Code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `grades`
--

LOCK TABLES `grades` WRITE;
/*!40000 ALTER TABLE `grades` DISABLE KEYS */;
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
-- Table structure for table `partdocument`
--

DROP TABLE IF EXISTS `partdocument`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `partdocument` (
  `Id` char(36) CHARACTER SET ascii NOT NULL,
  `CreatedAt` datetime(6) NOT NULL,
  `UpdatedAt` datetime(6) NOT NULL,
  `CreatedBy` char(36) CHARACTER SET ascii DEFAULT NULL,
  `UpdatedBy` char(36) CHARACTER SET ascii DEFAULT NULL,
  `Name` longtext,
  `DocumentId` char(36) CHARACTER SET ascii DEFAULT NULL,
  PRIMARY KEY (`Id`),
  KEY `IX_PartDocument_DocumentId` (`DocumentId`),
  CONSTRAINT `FK_PartDocument_Document_DocumentId` FOREIGN KEY (`DocumentId`) REFERENCES `document` (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `partdocument`
--

LOCK TABLES `partdocument` WRITE;
/*!40000 ALTER TABLE `partdocument` DISABLE KEYS */;
/*!40000 ALTER TABLE `partdocument` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `questiondocumentparts`
--

DROP TABLE IF EXISTS `questiondocumentparts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `questiondocumentparts` (
  `QuestionId` char(36) CHARACTER SET ascii NOT NULL,
  `PartDocumentId` char(36) CHARACTER SET ascii NOT NULL,
  PRIMARY KEY (`PartDocumentId`,`QuestionId`),
  KEY `IX_QuestionDocumentParts_QuestionId` (`QuestionId`),
  CONSTRAINT `FK_QuestionDocumentParts_PartDocument_PartDocumentId` FOREIGN KEY (`PartDocumentId`) REFERENCES `partdocument` (`Id`) ON DELETE CASCADE,
  CONSTRAINT `FK_QuestionDocumentParts_Questions_QuestionId` FOREIGN KEY (`QuestionId`) REFERENCES `questions` (`Id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `questiondocumentparts`
--

LOCK TABLES `questiondocumentparts` WRITE;
/*!40000 ALTER TABLE `questiondocumentparts` DISABLE KEYS */;
/*!40000 ALTER TABLE `questiondocumentparts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `questions`
--

DROP TABLE IF EXISTS `questions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `questions` (
  `Id` char(36) CHARACTER SET ascii NOT NULL,
  `CreatedAt` datetime(6) NOT NULL,
  `UpdatedAt` datetime(6) NOT NULL,
  `CreatedBy` char(36) CHARACTER SET ascii DEFAULT NULL,
  `UpdatedBy` char(36) CHARACTER SET ascii DEFAULT NULL,
  `Content` longtext,
  `Solve` longtext,
  `ParentId` char(36) CHARACTER SET ascii DEFAULT NULL,
  `GradeId` char(36) CHARACTER SET ascii DEFAULT NULL,
  `SubjectId` char(36) CHARACTER SET ascii DEFAULT NULL,
  `ChapterId` char(36) CHARACTER SET ascii DEFAULT NULL,
  `UnitId` char(36) CHARACTER SET ascii DEFAULT NULL,
  `LevelId` char(36) CHARACTER SET ascii DEFAULT NULL,
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
  CONSTRAINT `FK_Questions_Questions_ParentId` FOREIGN KEY (`ParentId`) REFERENCES `questions` (`Id`),
  CONSTRAINT `FK_Questions_Subjects_SubjectId` FOREIGN KEY (`SubjectId`) REFERENCES `subjects` (`Id`),
  CONSTRAINT `FK_Questions_Unit_UnitId` FOREIGN KEY (`UnitId`) REFERENCES `unit` (`Id`)
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
-- Table structure for table `subjects`
--

DROP TABLE IF EXISTS `subjects`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `subjects` (
  `Id` char(36) CHARACTER SET ascii NOT NULL,
  `Name` longtext,
  `Code` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`Id`),
  UNIQUE KEY `IX_Subjects_Code` (`Code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `subjects`
--

LOCK TABLES `subjects` WRITE;
/*!40000 ALTER TABLE `subjects` DISABLE KEYS */;
/*!40000 ALTER TABLE `subjects` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `unit`
--

DROP TABLE IF EXISTS `unit`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `unit` (
  `Id` char(36) CHARACTER SET ascii NOT NULL,
  `Name` longtext,
  `Code` varchar(255) DEFAULT NULL,
  `ChapterId` char(36) CHARACTER SET ascii DEFAULT NULL,
  `GradeId` char(36) CHARACTER SET ascii DEFAULT NULL,
  `CreatedAt` datetime(6) NOT NULL,
  `UpdatedAt` datetime(6) NOT NULL,
  `CreatedBy` char(36) CHARACTER SET ascii DEFAULT NULL,
  `UpdatedBy` char(36) CHARACTER SET ascii DEFAULT NULL,
  PRIMARY KEY (`Id`),
  UNIQUE KEY `IX_Unit_Code` (`Code`),
  KEY `IX_Unit_ChapterId` (`ChapterId`),
  KEY `IX_Unit_GradeId` (`GradeId`),
  CONSTRAINT `FK_Unit_Chapters_ChapterId` FOREIGN KEY (`ChapterId`) REFERENCES `chapters` (`Id`),
  CONSTRAINT `FK_Unit_Grades_GradeId` FOREIGN KEY (`GradeId`) REFERENCES `grades` (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `unit`
--

LOCK TABLES `unit` WRITE;
/*!40000 ALTER TABLE `unit` DISABLE KEYS */;
/*!40000 ALTER TABLE `unit` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-09-23 21:47:26
