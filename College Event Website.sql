-- phpMyAdmin SQL Dump
-- version 5.0.4deb2ubuntu5
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Apr 14, 2022 at 11:24 AM
-- Server version: 8.0.28-0ubuntu0.21.10.3
-- PHP Version: 8.0.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `test`
--

-- --------------------------------------------------------

--
-- Table structure for table `Comments`
--

CREATE TABLE `Comments` (
  `id` int NOT NULL,
  `Comment` varchar(255) NOT NULL,
  `EventID` varchar(255) NOT NULL,
  `StudentName` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `Comments`
--

INSERT INTO `Comments` (`id`, `Comment`, `EventID`, `StudentName`) VALUES
(5, 'test comment', '16', 'Jamie'),
(6, 'second comment', '16', 'Jamie');

-- --------------------------------------------------------

--
-- Table structure for table `Events`
--

CREATE TABLE `Events` (
  `id` tinyint NOT NULL,
  `Datetime` datetime NOT NULL,
  `Name` varchar(255) NOT NULL,
  `Description` varchar(255) NOT NULL,
  `Type` varchar(255) NOT NULL,
  `SchoolID` varchar(255) NOT NULL,
  `Approved` varchar(255) NOT NULL,
  `RSOID` varchar(255) NOT NULL,
  `Longitude` varchar(255) NOT NULL,
  `Latitude` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `Events`
--

INSERT INTO `Events` (`id`, `Datetime`, `Name`, `Description`, `Type`, `SchoolID`, `Approved`, `RSOID`, `Longitude`, `Latitude`) VALUES
(10, '2022-04-15 20:37:00', 'maps test', 'maps test', 'RSO', '5', '-1', '9', '-81.2000599', '28.6024274'),
(11, '2022-05-07 20:38:00', 'second maps', 'second maps', 'RSO', '5', '-1', '9', '-81.2044372651123', '28.598734884141795'),
(12, '2022-04-29 10:05:00', 'demo public event', 'demo public event', 'public', '7', '-1', '-1', '-81.2058963868164', '28.601485443996626'),
(13, '2022-04-11 10:06:00', 'demo private event', 'demo private event', 'private', '7', '-1', '-1', '-81.21482277841797', '28.597416097034746'),
(16, '2022-04-04 10:45:00', 'demo rso event', 'demo rso event', 'RSO', '7', '-1', '11', '-81.20825673074951', '28.6071370533532');

-- --------------------------------------------------------

--
-- Table structure for table `Ratings`
--

CREATE TABLE `Ratings` (
  `id` int NOT NULL,
  `EventID` varchar(255) NOT NULL,
  `Rating` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `Ratings`
--

INSERT INTO `Ratings` (`id`, `EventID`, `Rating`) VALUES
(1, '6', '10'),
(2, '6', '25'),
(3, '15', '3'),
(4, '15', '1'),
(5, '15', '5'),
(6, '16', '1'),
(7, '16', '5');

-- --------------------------------------------------------

--
-- Table structure for table `RSO`
--

CREATE TABLE `RSO` (
  `id` int NOT NULL,
  `Name` varchar(255) NOT NULL,
  `SchoolID` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `RSO`
--

INSERT INTO `RSO` (`id`, `Name`, `SchoolID`) VALUES
(1, 'testRSO', '5'),
(2, 'testRSO', '5'),
(3, 'testRSO2', '5'),
(4, 'testRSO3', '5'),
(9, 'testRSOID', '5'),
(10, 'my first rso', '4'),
(11, 'test school rso', '7'),
(14, 'demo rso', '7');

-- --------------------------------------------------------

--
-- Table structure for table `Student`
--

CREATE TABLE `Student` (
  `StudentID` tinyint NOT NULL,
  `Name` varchar(255) NOT NULL,
  `Password` varchar(255) NOT NULL,
  `School_Email` varchar(255) NOT NULL,
  `School` varchar(255) NOT NULL,
  `RSOAdminID` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '-1',
  `RSOID` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '-1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `Student`
--

INSERT INTO `Student` (`StudentID`, `Name`, `Password`, `School_Email`, `School`, `RSOAdminID`, `RSOID`) VALUES
(1, 'test', '098f6bcd4621d373cade4e832627b4f6', 'test', '5', '9', '9'),
(2, 'julian', '0bb22c74181003d22f2f6382dc47c758', 'jb@gmail.com', '5', '-1', '9'),
(3, 'secondtest', '42f4cc484e89c74f33ca1d2c1cace4d3', 'secondtest', '5', '-1', '9'),
(4, 'Kriya', 'fced881731be3ea01d1189eb7ce37337', 'kirya@ucf.edu', '5', '-1', '9'),
(5, 'Aliza', '25b805c991c15d944f95f1ef33899615', 'Aliza@ucf.edu', '5', '-1', '9'),
(6, 'Dylan', '709488e90b981b35e9a634b6ab414277', 'dylan@ucf.edu', '5', '-1', '9'),
(7, 'Nick', '06f7c4187975fb44eb9314b9a4019912', 'nick@ucf.edu', '4', '10', '10'),
(8, 'Jamie', 'ff57033d9796ab4c4c8c8d5badcf20a2', 'jamie@ucf.edu', '7', '11', '11'),
(9, 'Katrina', 'caa9d463ca593d626c753f4bec0c1450', 'katrina@ucf.edu', '4', '-1', '11'),
(10, 'Jacob', 'c22289fcb12f66d070f1e802864d4dc4', 'jacob@ucf.edu', '4', '-1', '11'),
(11, 'Marshall', '84484fa33f17f7a763c9555f46bac8d2', 'marshall@ucf.edu', '4', '-1', '11'),
(12, 'Michael', '6b14f8250b391463ed27635dc528bb21', 'michael@ucf.edu', '4', '-1', '11'),
(13, 'Thomas', 'a7397d8d7e79daa0609c1e92782712f7', 'thomas@ucf.edu', '4', '-1', '-1'),
(14, 'Timothy', 'fab6a71812c39c2703b634c40bb76221', 'timothy@ucf.edu', '4', '-1', '-1'),
(15, 'Olivia', '2764761ddc6ce843b4badd542b742693', 'olivia@ucf.edu', '4', '-1', '-1'),
(16, 'Denise', 'c4802856e4fa3f0a980605b5fce91970', 'denise@ucf.edu', '4', '-1', '-1'),
(17, 'Anthony', 'de4e6ec2d2ab2e0907aab4145559ee5d', 'anthony@ucf.edu', '4', '-1', '-1'),
(18, 'Geoff', '66e764e4ea6e3a7535d256e356ef84f7', 'geoff@ucf.edu', '4', '-1', '-1'),
(19, 'Jesuani', '4b4efa8b787d904a755f3f38bd934c6c', 'jesuani@ucf.edu', '4', '-1', '-1'),
(20, 'James', '5721c634b6c516e6b87417f1ca775be5', 'james@ucf.edu', '4', '-1', '-1'),
(25, 'demo user', 'fd6138204c4eb1dd19e63896c1557e27', 'demo@testschool.edu', '7', '14', '14');

-- --------------------------------------------------------

--
-- Table structure for table `University`
--

CREATE TABLE `University` (
  `SchoolID` tinyint NOT NULL,
  `Name` varchar(255) NOT NULL,
  `Password` varchar(255) NOT NULL,
  `Username` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `University`
--

INSERT INTO `University` (`SchoolID`, `Name`, `Password`, `Username`) VALUES
(1, 'test', 'test', 'test'),
(3, 'jules', '58e537189c53a9d3969e8795588ea574', 'jules'),
(4, 'UCF', '098f6bcd4621d373cade4e832627b4f6', 'ucf'),
(5, 'kriya', 'fced881731be3ea01d1189eb7ce37337', 'kriya'),
(6, 'Aliza', '25b805c991c15d944f95f1ef33899615', 'Aliza'),
(7, 'testschool', 'de8e430c116ef5613c63b6fd72a4836e', 'testschool');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `Comments`
--
ALTER TABLE `Comments`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `Events`
--
ALTER TABLE `Events`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `Ratings`
--
ALTER TABLE `Ratings`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `RSO`
--
ALTER TABLE `RSO`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `Student`
--
ALTER TABLE `Student`
  ADD PRIMARY KEY (`StudentID`);

--
-- Indexes for table `University`
--
ALTER TABLE `University`
  ADD PRIMARY KEY (`SchoolID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `Comments`
--
ALTER TABLE `Comments`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `Events`
--
ALTER TABLE `Events`
  MODIFY `id` tinyint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `Ratings`
--
ALTER TABLE `Ratings`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `RSO`
--
ALTER TABLE `RSO`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `Student`
--
ALTER TABLE `Student`
  MODIFY `StudentID` tinyint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT for table `University`
--
ALTER TABLE `University`
  MODIFY `SchoolID` tinyint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
