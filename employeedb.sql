-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 22, 2023 at 10:01 AM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `employeedb`
--

-- --------------------------------------------------------

--
-- Table structure for table `admintable`
--

CREATE TABLE `admintable` (
  `id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `admintable`
--

INSERT INTO `admintable` (`id`, `username`, `password`) VALUES
(1, 'zero', '$2y$10$Lje/eLyX43YocwKiKINjqeVQaPKU4hhjdEVkAoAFlOk2gBtDyeF0i');

-- --------------------------------------------------------

--
-- Table structure for table `employeefile`
--

CREATE TABLE `employeefile` (
  `recid` bigint(20) NOT NULL,
  `fullname` varchar(100) NOT NULL,
  `address` varchar(255) NOT NULL,
  `birthdate` date NOT NULL,
  `age` int(11) NOT NULL,
  `gender` varchar(15) NOT NULL,
  `civilstat` varchar(15) NOT NULL,
  `contactnum` varchar(11) NOT NULL,
  `salary` decimal(10,0) NOT NULL,
  `isactive` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `employeefile`
--

INSERT INTO `employeefile` (`recid`, `fullname`, `address`, `birthdate`, `age`, `gender`, `civilstat`, `contactnum`, `salary`, `isactive`) VALUES
(1, 'Juan Magtanggol', '123 Main St, Manila', '1998-08-10', 29, 'Male', 'Single', '09123456788', '20002', 1),
(2, 'Maria Santos', '456 Elm St, Cebu', '1992-04-15', 30, 'Female', 'Married', '09187654321', '60000', 1),
(3, 'Michael Johnson', '789 Oak St, Quezon City', '1994-12-01', 28, 'Male', 'Single', '09225551234', '55000', 0),
(4, 'Emily White', '567 Maple Ave, Davao', '1999-02-22', 22, 'Female', 'Single', '09338889999', '45000', 1),
(5, 'David Brown', '890 Pine Rd, Pasig', '1981-09-18', 40, 'Male', 'Divorced', '09445556666', '70000', 1),
(6, 'Jessica Lee', '321 Cedar Blvd, Makati', '1992-08-25', 29, 'Female', 'Single', '09557772233', '48000', 0),
(7, 'Daniel Clark', '234 Oak St, Cagayan de Oro', '1986-05-12', 35, 'Male', 'Married', '09668884444', '62000', 1),
(8, 'Michelle Garcia', '789 Elm St, Iloilo', '1995-07-30', 27, 'Female', 'Single', '09776667788', '52000', 1),
(9, 'Andrew Wilson', '456 Maple Ave, Batangas', '1989-01-08', 32, 'Male', 'Married', '09898887777', '67000', 0),
(10, 'Samantha Martinez', '123 Pine Rd, Bacolod', '1997-03-27', 24, 'Female', 'Single', '09955552222', '49000', 1),
(11, 'Brian Taylor', '567 Cedar Blvd, Taguig', '1983-11-03', 38, 'Male', 'Widowed', '09112223333', '72000', 1),
(12, 'Alexis Hernandez', '890 Oak St, Zamboanga', '1990-10-20', 31, 'Female', 'Married', '09227779999', '54000', 0),
(13, 'Christopher Smith', '789 Maple Ave, Naga', '1996-06-14', 26, 'Male', 'Single', '09334446666', '58000', 1),
(14, 'Amanda Johnson', '456 Pine Rd, Tarlac', '1992-09-05', 29, 'Female', 'Single', '09445552222', '50000', 0),
(15, 'William Davis', '123 Cedar Blvd, Legazpi', '1988-07-12', 33, 'Male', 'Married', '09557773333', '63000', 1),
(16, 'Stephanie Anderdaughter', '234 Elm St, Taclobo', '1995-04-01', 30, 'Other', 'Other', '09668885559', '10002', 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admintable`
--
ALTER TABLE `admintable`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `employeefile`
--
ALTER TABLE `employeefile`
  ADD PRIMARY KEY (`recid`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admintable`
--
ALTER TABLE `admintable`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `employeefile`
--
ALTER TABLE `employeefile`
  MODIFY `recid` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=47;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
