-- MySQL dump 10.13  Distrib 8.0.31, for Win64 (x86_64)
--
-- Host: localhost    Database: travel_buddy
-- ------------------------------------------------------
-- Server version	5.7.40-log

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
-- Table structure for table `master`
--

DROP TABLE IF EXISTS `master`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `master` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(45) NOT NULL,
  `name` varchar(45) NOT NULL,
  `password` varchar(500) DEFAULT NULL,
  `token` varchar(45) DEFAULT NULL,
  `expiry` datetime DEFAULT NULL,
  `phoneNum` varchar(45) NOT NULL,
  `show` tinyint(4) DEFAULT '0',
  `isActive` tinyint(4) DEFAULT '1',
  `lastUpdatedAt` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `gender` varchar(45) NOT NULL,
  `year` varchar(45) DEFAULT NULL,
  `college` varchar(45) DEFAULT NULL,
  `showYear` tinyint(4) DEFAULT '1',
  PRIMARY KEY (`id`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `master`
--

LOCK TABLES `master` WRITE;
/*!40000 ALTER TABLE `master` DISABLE KEYS */;
INSERT INTO `master` VALUES (1,'riya1@gmail.com','Riya','$2a$10$ELjBxi.mWZ5whED2UA4JRub91ycQ.8zJK4pFU0h71tTsoZezGyx56','877904','2023-06-01 12:44:03','9546007042',0,1,'2023-06-08 14:19:34','Female','3','KIIT',1),(2,'aryan@gmail.com','Aryan','$2a$10$IciNzi6FPa9321kbShNzKOpj0wQimDuYYGOjMajdUGv2CV3/NTXii','745982','2023-06-23 09:19:48','700435678',0,1,'2023-06-23 09:04:48','male','1','ITER',1);
/*!40000 ALTER TABLE `master` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `post`
--

DROP TABLE IF EXISTS `post`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `post` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `description` varchar(255) DEFAULT NULL,
  `fromPlaceId` int(11) DEFAULT NULL,
  `toPlaceId` int(11) DEFAULT NULL,
  `startDate` date DEFAULT NULL,
  `endDate` date DEFAULT NULL,
  `trainInfo` int(10) DEFAULT NULL,
  `created` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `lastUpdated` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `userId` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fromfk_idx` (`fromPlaceId`),
  KEY `tofk_idx` (`toPlaceId`),
  KEY `userIDfk_idx` (`userId`),
  CONSTRAINT `fromfk` FOREIGN KEY (`fromPlaceId`) REFERENCES `world`.`city` (`ID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `tofk` FOREIGN KEY (`toPlaceId`) REFERENCES `world`.`city` (`ID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `userIDfk` FOREIGN KEY (`userId`) REFERENCES `master` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=44 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `post`
--

LOCK TABLES `post` WRITE;
/*!40000 ALTER TABLE `post` DISABLE KEYS */;
INSERT INTO `post` VALUES (1,'1',2760,3318,'2023-06-08','2023-06-15',65466,'2023-06-12 16:54:27','2023-06-12 22:24:27',1),(2,'2',2760,3318,'2023-06-08','2023-06-15',65466,'2023-06-12 16:54:31','2023-06-12 22:24:31',1),(3,'3',2760,3318,'2023-06-08','2023-06-15',65466,'2023-06-12 16:54:35','2023-06-12 22:24:35',1),(4,'4',2760,3318,'2023-06-08','2023-06-15',65466,'2023-06-12 16:54:39','2023-06-12 22:24:39',1),(5,'5',2760,3318,'2023-06-08','2023-06-15',65466,'2023-06-12 16:54:42','2023-06-12 22:24:42',1),(6,'6',2760,3318,'2023-06-08','2023-06-15',65466,'2023-06-12 16:54:46','2023-06-12 22:24:46',1),(7,'7',2760,3318,'2023-06-08','2023-06-15',65466,'2023-06-12 16:54:49','2023-06-12 22:24:49',1),(8,'8',2760,3318,'2023-06-08','2023-06-15',65466,'2023-06-12 16:54:53','2023-06-12 22:24:53',1),(9,'9',2760,3318,'2023-06-08','2023-06-15',65466,'2023-06-12 16:54:56','2023-06-12 22:24:56',1),(10,'10',2760,3318,'2023-06-08','2023-06-15',65466,'2023-06-12 16:55:02','2023-06-12 22:25:02',1),(11,'11',2760,3318,'2023-06-08','2023-06-15',65466,'2023-06-12 16:55:07','2023-06-12 22:25:07',1),(12,'12',2760,3318,'2023-06-08','2023-06-15',65466,'2023-06-12 16:55:10','2023-06-12 22:25:10',1),(13,'13',2760,3318,'2023-06-08','2023-06-15',65466,'2023-06-12 16:55:13','2023-06-12 22:25:13',1),(14,'14',2760,3318,'2023-06-08','2023-06-15',65466,'2023-06-12 16:55:15','2023-06-12 22:25:15',1),(15,'15',2760,3318,'2023-06-08','2023-06-15',65466,'2023-06-12 16:55:20','2023-06-12 22:25:20',1),(16,'16',2760,3318,'2023-06-08','2023-06-15',65466,'2023-06-12 16:55:23','2023-06-12 22:25:23',1),(17,'17',2760,3318,'2023-06-08','2023-06-15',65466,'2023-06-12 16:55:26','2023-06-12 22:25:26',1),(18,'18',2760,3318,'2023-06-08','2023-06-15',65466,'2023-06-12 16:55:29','2023-06-12 22:25:29',1),(19,'19',2760,3318,'2023-06-08','2023-06-15',65466,'2023-06-12 16:55:32','2023-06-12 22:25:32',1),(20,'20',2760,3318,'2023-06-08','2023-06-15',65466,'2023-06-12 16:55:37','2023-06-12 22:25:37',1),(21,'ewdeffe',395,1849,'2023-06-08','2023-06-15',65466,'2023-06-12 17:17:18','2023-06-12 22:47:18',1),(22,'21',3683,2760,'2023-06-02','2023-06-08',12345,'2023-06-13 15:03:20','2023-06-13 20:33:20',1),(23,'21',3683,2760,'2023-06-02','2023-06-08',12345,'2023-06-13 15:08:02','2023-06-13 20:38:02',1),(24,'22',3318,1404,'2023-06-11','2023-06-13',1236,'2023-06-15 08:38:29','2023-06-15 14:08:29',1),(25,'23',958,1404,'2023-06-16','2023-06-21',12345,'2023-06-15 15:02:08','2023-06-15 20:32:08',1),(26,'Im Travelling for applying passport',1077,1062,'2023-06-22','2023-06-25',23456,'2023-06-21 07:49:44','2023-06-21 13:19:44',1),(27,'ssrgsdrg',3097,2760,'2023-06-09','2023-06-16',12345,'2023-06-22 07:36:28','2023-06-22 13:06:28',1),(28,'23',3097,2760,'2023-06-09','2023-06-16',12345,'2023-06-22 07:37:35','2023-06-22 13:07:35',1),(29,'hi',1194,1198,'2023-06-07','2023-06-10',12367,'2023-06-22 07:44:14','2023-06-22 13:14:14',1),(30,'hello',706,3827,'2023-06-23','2023-06-26',45678,'2023-06-22 08:07:19','2023-06-22 13:37:19',1),(31,'yo',3318,3683,'2023-06-06','2023-06-25',67890,'2023-06-22 08:11:24','2023-06-22 13:41:24',1),(32,'yo',3318,3683,'2023-06-06','2023-06-25',67890,'2023-06-22 08:16:21','2023-06-22 13:46:21',1),(33,'yo',3318,3683,'2023-06-06','2023-06-25',67890,'2023-06-22 08:17:05','2023-06-22 13:47:05',1),(34,'testing object ',3318,3683,'2023-06-06','2023-06-25',67890,'2023-06-22 08:18:00','2023-06-22 13:48:00',1),(35,'strawberry',1077,1045,'2023-06-23','2023-06-25',12801,'2023-06-22 08:24:54','2023-06-22 13:54:54',1),(36,'meow',1045,1062,'2023-06-23','2023-06-24',12345,'2023-06-22 08:28:32','2023-06-22 13:58:32',1),(37,'hello',3561,395,'2023-06-23','2023-06-25',90675,'2023-06-22 08:44:20','2023-06-22 14:14:20',1),(38,'yes',3561,3683,'2023-06-23','2023-06-25',90675,'2023-06-22 08:46:47','2023-06-22 14:16:47',1),(39,'yus',1062,1086,'2023-06-23','2023-06-25',23456,'2023-06-22 08:48:55','2023-06-22 14:18:55',1),(40,'no',1086,1077,'2023-06-23','2023-06-25',56789,'2023-06-22 08:49:28','2023-06-22 14:19:28',1),(41,'travelling',1077,1045,'2023-06-23','2023-06-25',12345,'2023-06-23 03:47:48','2023-06-23 09:17:48',2),(42,'booking ticket',3793,1097,'2023-06-26','2023-06-29',56789,'2023-06-23 03:49:32','2023-06-26 22:08:34',2),(43,'check',3097,670,'2023-06-26','2023-06-29',12345,'2023-06-26 16:56:07','2023-06-26 22:26:07',1);
/*!40000 ALTER TABLE `post` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'travel_buddy'
--
/*!50003 DROP PROCEDURE IF EXISTS `getPost` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `getPost`(IN pages INT , IN rowcount INT)
BEGIN
SELECT 
    t4.name,
    t4.college,
    t1.id,
    t1.description,
    t1.endDate,
    t1.startDate,
    t1.trainInfo,
    t2.Name AS fromPlace,
    t3.Name AS toPlace,
    t1.fromPlaceId,
    t1.toPlaceId
FROM
    post AS t1
        JOIN
         master AS t4 ON t4.id = t1.userId
        JOIN
    city AS t2 ON t1.fromPlaceId = t2.ID
        JOIN
    city AS t3 ON t3.ID = t1.toPlaceId
ORDER BY ID DESC LIMIT pages OFFSET rowcount;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-06-26 22:31:31
