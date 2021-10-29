-- MySQL dump 10.13  Distrib 8.0.27, for Win64 (x86_64)
--
-- Host: localhost    Database: luyenthi
-- ------------------------------------------------------
-- Server version	8.0.27

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Dumping data for table `hangfirejob`
--

LOCK TABLES `hangfirejob` WRITE;
/*!40000 ALTER TABLE `hangfirejob` DISABLE KEYS */;
INSERT INTO `hangfirejob` (`Id`, `StateId`, `StateName`, `InvocationData`, `Arguments`, `CreatedAt`, `ExpireAt`) VALUES (1,7,'Succeeded','{\"Type\":\"Luyenthi.Services.MailService, Luyenthi.Services, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null\",\"Method\":\"SendMail\",\"ParameterTypes\":\"[\\\"Luyenthi.Core.Dtos.SendMailDto, Luyenthi.Core, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null\\\"]\",\"Arguments\":\"[\\\"{\\\\\\\"ToEmail\\\\\\\":\\\\\\\"18021277@vnu.edu.vn\\\\\\\",\\\\\\\"Subject\\\\\\\":\\\\\\\"Mã kích hoạt tài khoản\\\\\\\",\\\\\\\"Body\\\\\\\":\\\\\\\"<div>Xin chào<b> Thái</b>!</div> </br><div>Mã xác thực tài khoản của bạn là  : <b>FTNUFD</div><div><b>Lưu ý : </b>Vui lòng không chia sẻ mã này cho bất kỳ cá nhân nào vì lý do bảo mật.</div><div>Xin cảm ơn !</div>\\\\\\\"}\\\"]\"}','[\"{\\\"ToEmail\\\":\\\"18021277@vnu.edu.vn\\\",\\\"Subject\\\":\\\"Mã kích hoạt tài khoản\\\",\\\"Body\\\":\\\"<div>Xin chào<b> Thái</b>!</div> </br><div>Mã xác thực tài khoản của bạn là  : <b>FTNUFD</div><div><b>Lưu ý : </b>Vui lòng không chia sẻ mã này cho bất kỳ cá nhân nào vì lý do bảo mật.</div><div>Xin cảm ơn !</div>\\\"}\"]','2021-10-29 08:23:26.082352','2021-10-30 08:24:28.380571'),(2,10,'Succeeded','{\"Type\":\"Luyenthi.Services.MailService, Luyenthi.Services, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null\",\"Method\":\"SendMailAsync\",\"ParameterTypes\":\"[\\\"Luyenthi.Core.Dtos.SendMailDto, Luyenthi.Core, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null\\\"]\",\"Arguments\":\"[\\\"{\\\\\\\"ToEmail\\\\\\\":\\\\\\\"18021277@vnu.edu.vn\\\\\\\",\\\\\\\"Subject\\\\\\\":\\\\\\\"Mã kích hoạt tài khoản\\\\\\\",\\\\\\\"Body\\\\\\\":\\\\\\\"<div>Xin chào<b> Thái</b>!</div> </br><div>Mã xác thực tài khoản của bạn là  : <b>OKRKBM</div><div><b>Lưu ý : </b>Vui lòng không chia sẻ mã này cho bất kỳ cá nhân nào vì lý do bảo mật.</div><div>Xin cảm ơn !</div>\\\\\\\"}\\\"]\"}','[\"{\\\"ToEmail\\\":\\\"18021277@vnu.edu.vn\\\",\\\"Subject\\\":\\\"Mã kích hoạt tài khoản\\\",\\\"Body\\\":\\\"<div>Xin chào<b> Thái</b>!</div> </br><div>Mã xác thực tài khoản của bạn là  : <b>OKRKBM</div><div><b>Lưu ý : </b>Vui lòng không chia sẻ mã này cho bất kỳ cá nhân nào vì lý do bảo mật.</div><div>Xin cảm ơn !</div>\\\"}\"]','2021-10-29 08:24:36.877660','2021-10-30 08:24:42.119549'),(3,13,'Succeeded','{\"Type\":\"Luyenthi.Services.MailService, Luyenthi.Services, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null\",\"Method\":\"SendMail\",\"ParameterTypes\":\"[\\\"Luyenthi.Core.Dtos.SendMailDto, Luyenthi.Core, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null\\\"]\",\"Arguments\":\"[\\\"{\\\\\\\"ToEmail\\\\\\\":\\\\\\\"18021277@vnu.edu.vn\\\\\\\",\\\\\\\"Subject\\\\\\\":\\\\\\\"Mã kích hoạt tài khoản\\\\\\\",\\\\\\\"Body\\\\\\\":\\\\\\\"<div>Xin chào<b> Tiệp</b>!</div> </br><div>Mã xác thực tài khoản của bạn là  : <b>CAXEMA</div><div><b>Lưu ý : </b>Vui lòng không chia sẻ mã này cho bất kỳ cá nhân nào vì lý do bảo mật.</div><div>Xin cảm ơn !</div>\\\\\\\"}\\\"]\"}','[\"{\\\"ToEmail\\\":\\\"18021277@vnu.edu.vn\\\",\\\"Subject\\\":\\\"Mã kích hoạt tài khoản\\\",\\\"Body\\\":\\\"<div>Xin chào<b> Tiệp</b>!</div> </br><div>Mã xác thực tài khoản của bạn là  : <b>CAXEMA</div><div><b>Lưu ý : </b>Vui lòng không chia sẻ mã này cho bất kỳ cá nhân nào vì lý do bảo mật.</div><div>Xin cảm ơn !</div>\\\"}\"]','2021-10-29 08:26:51.199286','2021-10-30 08:27:23.786744'),(4,16,'Succeeded','{\"Type\":\"Luyenthi.Services.MailService, Luyenthi.Services, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null\",\"Method\":\"SendMail\",\"ParameterTypes\":\"[\\\"Luyenthi.Core.Dtos.SendMailDto, Luyenthi.Core, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null\\\"]\",\"Arguments\":\"[\\\"{\\\\\\\"ToEmail\\\\\\\":\\\\\\\"18021277@vnu.edu.vn\\\\\\\",\\\\\\\"Subject\\\\\\\":\\\\\\\"Mã kích hoạt tài khoản\\\\\\\",\\\\\\\"Body\\\\\\\":\\\\\\\"<div>Xin chào<b> Tiệp</b>!</div> </br><div>Mã xác thực tài khoản của bạn là  : <b>PIAWRN</div><div><b>Lưu ý : </b>Vui lòng không chia sẻ mã này cho bất kỳ cá nhân nào vì lý do bảo mật.</div><div>Xin cảm ơn !</div>\\\\\\\"}\\\"]\"}','[\"{\\\"ToEmail\\\":\\\"18021277@vnu.edu.vn\\\",\\\"Subject\\\":\\\"Mã kích hoạt tài khoản\\\",\\\"Body\\\":\\\"<div>Xin chào<b> Tiệp</b>!</div> </br><div>Mã xác thực tài khoản của bạn là  : <b>PIAWRN</div><div><b>Lưu ý : </b>Vui lòng không chia sẻ mã này cho bất kỳ cá nhân nào vì lý do bảo mật.</div><div>Xin cảm ơn !</div>\\\"}\"]','2021-10-29 08:33:03.661573','2021-10-30 08:33:16.848404'),(5,19,'Succeeded','{\"Type\":\"Luyenthi.Services.MailService, Luyenthi.Services, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null\",\"Method\":\"SendMail\",\"ParameterTypes\":\"[\\\"Luyenthi.Core.Dtos.SendMailDto, Luyenthi.Core, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null\\\"]\",\"Arguments\":\"[\\\"{\\\\\\\"ToEmail\\\\\\\":\\\\\\\"18021277@vnu.edu.vn\\\\\\\",\\\\\\\"Subject\\\\\\\":\\\\\\\"Mã kích hoạt tài khoản\\\\\\\",\\\\\\\"Body\\\\\\\":\\\\\\\"<div>Xin chào<b> Tiệp</b>!</div> </br><div>Mã xác thực tài khoản của bạn là  : <b>IGWZQU</div><div><b>Lưu ý : </b>Vui lòng không chia sẻ mã này cho bất kỳ cá nhân nào vì lý do bảo mật.</div><div>Xin cảm ơn !</div>\\\\\\\"}\\\"]\"}','[\"{\\\"ToEmail\\\":\\\"18021277@vnu.edu.vn\\\",\\\"Subject\\\":\\\"Mã kích hoạt tài khoản\\\",\\\"Body\\\":\\\"<div>Xin chào<b> Tiệp</b>!</div> </br><div>Mã xác thực tài khoản của bạn là  : <b>IGWZQU</div><div><b>Lưu ý : </b>Vui lòng không chia sẻ mã này cho bất kỳ cá nhân nào vì lý do bảo mật.</div><div>Xin cảm ơn !</div>\\\"}\"]','2021-10-29 08:35:07.504615','2021-10-30 08:35:16.809631');
/*!40000 ALTER TABLE `hangfirejob` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-10-30  3:00:02
