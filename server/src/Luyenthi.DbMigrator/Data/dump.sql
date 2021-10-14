-- MySQL dump 10.13  Distrib 8.0.23, for Win64 (x86_64)
--
-- Host: localhost    Database: luyenthi
-- ------------------------------------------------------
-- Server version	8.0.23

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Dumping data for table `aspnetroleclaims`
--

LOCK TABLES `aspnetroleclaims` WRITE;
/*!40000 ALTER TABLE `aspnetroleclaims` DISABLE KEYS */;
/*!40000 ALTER TABLE `aspnetroleclaims` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `aspnetroles`
--

LOCK TABLES `aspnetroles` WRITE;
/*!40000 ALTER TABLE `aspnetroles` DISABLE KEYS */;
INSERT INTO `aspnetroles` (`Id`, `Name`, `NormalizedName`, `ConcurrencyStamp`) VALUES ('daf39ce6-9c5f-495e-af95-810df7f64e40','Admin','ADMIN','8ef10264-5501-465e-9140-025bead0a9d9'),('f25e6a5a-2ce9-4273-9bd3-3b71755add19','Teacher','TEACHER','0d8cc93c-eb42-4ae3-b953-2d2b82056949'),('fcdea3ce-afe0-4fff-b32c-6c28309ec12e','Student','STUDENT','b7096b3b-0a05-44f1-b728-1438a3c50a10');
/*!40000 ALTER TABLE `aspnetroles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `aspnetuserclaims`
--

LOCK TABLES `aspnetuserclaims` WRITE;
/*!40000 ALTER TABLE `aspnetuserclaims` DISABLE KEYS */;
/*!40000 ALTER TABLE `aspnetuserclaims` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `aspnetuserlogins`
--

LOCK TABLES `aspnetuserlogins` WRITE;
/*!40000 ALTER TABLE `aspnetuserlogins` DISABLE KEYS */;
/*!40000 ALTER TABLE `aspnetuserlogins` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `aspnetuserroles`
--

LOCK TABLES `aspnetuserroles` WRITE;
/*!40000 ALTER TABLE `aspnetuserroles` DISABLE KEYS */;
INSERT INTO `aspnetuserroles` (`UserId`, `RoleId`) VALUES ('cb3850a2-0a32-4cee-a175-08df5ec6169b','daf39ce6-9c5f-495e-af95-810df7f64e40');
/*!40000 ALTER TABLE `aspnetuserroles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `aspnetusers`
--

LOCK TABLES `aspnetusers` WRITE;
/*!40000 ALTER TABLE `aspnetusers` DISABLE KEYS */;
INSERT INTO `aspnetusers` (`Id`, `Provider`, `CreatedAt`, `UpdatedAt`, `CreatedBy`, `UpdatedBy`, `FirstName`, `LastName`, `BirthDay`, `Gender`, `ActiveCode`, `UserName`, `NormalizedUserName`, `Email`, `NormalizedEmail`, `EmailConfirmed`, `PasswordHash`, `SecurityStamp`, `ConcurrencyStamp`, `PhoneNumber`, `PhoneNumberConfirmed`, `TwoFactorEnabled`, `LockoutEnd`, `LockoutEnabled`, `AccessFailedCount`) VALUES ('cb3850a2-0a32-4cee-a175-08df5ec6169b','luyenthi','0001-01-01 00:00:00.000000','0001-01-01 00:00:00.000000',NULL,NULL,'Tiệp','Nguyễn','2000-06-20 00:00:00.000000',0,NULL,'admin',NULL,'nguyenthaitiep206@gmail.com',NULL,1,'AQAAAAEAACcQAAAAEM6KlKMSi6Es3NxolOIcDFy+LkNPd9hzkoFF1aHAR6AsY+AwjobuK6at/ygJS/g1Bg==',NULL,'65fe9e5b-9b79-4245-8127-a6d1cd27a576','0819200620',1,0,NULL,0,0);
/*!40000 ALTER TABLE `aspnetusers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `aspnetusertokens`
--

LOCK TABLES `aspnetusertokens` WRITE;
/*!40000 ALTER TABLE `aspnetusertokens` DISABLE KEYS */;
/*!40000 ALTER TABLE `aspnetusertokens` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `chapters`
--

LOCK TABLES `chapters` WRITE;
/*!40000 ALTER TABLE `chapters` DISABLE KEYS */;
/*!40000 ALTER TABLE `chapters` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `documenthistories`
--

LOCK TABLES `documenthistories` WRITE;
/*!40000 ALTER TABLE `documenthistories` DISABLE KEYS */;
/*!40000 ALTER TABLE `documenthistories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `documents`
--

LOCK TABLES `documents` WRITE;
/*!40000 ALTER TABLE `documents` DISABLE KEYS */;
/*!40000 ALTER TABLE `documents` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `grades`
--

LOCK TABLES `grades` WRITE;
/*!40000 ALTER TABLE `grades` DISABLE KEYS */;
/*!40000 ALTER TABLE `grades` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `gradesubjects`
--

LOCK TABLES `gradesubjects` WRITE;
/*!40000 ALTER TABLE `gradesubjects` DISABLE KEYS */;
/*!40000 ALTER TABLE `gradesubjects` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `levelquestions`
--

LOCK TABLES `levelquestions` WRITE;
/*!40000 ALTER TABLE `levelquestions` DISABLE KEYS */;
/*!40000 ALTER TABLE `levelquestions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `questionhistories`
--

LOCK TABLES `questionhistories` WRITE;
/*!40000 ALTER TABLE `questionhistories` DISABLE KEYS */;
/*!40000 ALTER TABLE `questionhistories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `questions`
--

LOCK TABLES `questions` WRITE;
/*!40000 ALTER TABLE `questions` DISABLE KEYS */;
/*!40000 ALTER TABLE `questions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `questionsetquestion`
--

LOCK TABLES `questionsetquestion` WRITE;
/*!40000 ALTER TABLE `questionsetquestion` DISABLE KEYS */;
/*!40000 ALTER TABLE `questionsetquestion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `questionsets`
--

LOCK TABLES `questionsets` WRITE;
/*!40000 ALTER TABLE `questionsets` DISABLE KEYS */;
/*!40000 ALTER TABLE `questionsets` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `subjects`
--

LOCK TABLES `subjects` WRITE;
/*!40000 ALTER TABLE `subjects` DISABLE KEYS */;
/*!40000 ALTER TABLE `subjects` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `templatequestions`
--

LOCK TABLES `templatequestions` WRITE;
/*!40000 ALTER TABLE `templatequestions` DISABLE KEYS */;
/*!40000 ALTER TABLE `templatequestions` ENABLE KEYS */;
UNLOCK TABLES;

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

-- Dump completed on 2021-10-14 22:31:31
