-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 16, 2018 at 05:25 PM
-- Server version: 10.1.28-MariaDB
-- PHP Version: 7.1.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `db_client`
--

-- --------------------------------------------------------

--
-- Table structure for table `employee_dtr`
--

CREATE TABLE `employee_dtr` (
  `time_sheet_id` int(11) NOT NULL,
  `employee_id` varchar(25) NOT NULL,
  `employee_date` varchar(25) NOT NULL,
  `employee_timein` varchar(25) NOT NULL,
  `employee_timeout` varchar(25) NOT NULL,
  `employee_overtime` int(11) NOT NULL,
  `employee_late` int(11) NOT NULL,
  `employee_status` varchar(25) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `employee_dtr`
--

INSERT INTO `employee_dtr` (`time_sheet_id`, `employee_id`, `employee_date`, `employee_timein`, `employee_timeout`, `employee_overtime`, `employee_late`, `employee_status`) VALUES
(1, '20001', '2018-03-06', '16:49:50', '11:42:01', 0, 0, 'time-out'),
(2, '20001', '2018-03-07', '16:55:53', '11:42:01', 0, 0, 'time-out'),
(3, '20001', '2018-03-08', '16:58:03', '11:42:01', 0, 0, 'time-out'),
(4, '20001', '2018-03-09', '16:58:32', '11:42:01', 0, 0, 'time-out'),
(5, '20001', '2018-03-10', '16:59:38', '11:42:01', 0, 0, 'time-out'),
(6, '20001', '2018-03-11', '17:10:31', '11:42:01', 0, 0, 'time-out'),
(7, '20001', '2018-03-12', '17:11:24', '11:42:01', 0, 0, 'time-out'),
(8, '20001', '2018-03-13', '17:11:48', '11:42:01', 0, 0, 'time-out'),
(9, '20001', '2018-03-14', '17:13:18', '11:42:01', 0, 0, 'time-out'),
(10, '20001', '2018-03-15', '17:13:44', '11:42:01', 0, 0, 'time-out'),
(11, '20001', '2018-03-16', '17:14:47', '11:42:01', 0, 0, 'time-out'),
(12, '20001', '2018-03-17', '17:16:31', '11:42:01', 0, 0, 'time-out'),
(13, '20001', '2018-03-18', '17:17:48', '11:42:01', 0, 0, 'time-out'),
(14, '20000', '2018-03-19', '17:17:58', '08:01:47', 0, 0, 'time-out'),
(15, '20001', '2018-03-19', '17:29:35', '11:42:01', 0, 0, 'time-out'),
(16, '20000', '2018-03-21', '17:29:47', '08:01:47', 0, 0, 'time-out'),
(17, '20002', '2018-03-22', '17:31:02', '08:01:15', 0, 0, 'time-out'),
(18, '20002', '2018-03-23', '17:31:43', '08:01:15', 0, 0, 'time-out'),
(19, '20002', '2018-03-24', '18:32:23', '08:01:15', 0, 0, 'time-out'),
(20, '20000', '2018-03-25', '18:32:32', '08:01:47', 0, 0, 'time-out'),
(21, '20001', '2018-03-20', '18:52:00', '11:42:01', 0, 0, 'time-out'),
(22, '20000', '2018-03-31', '22:23:27', '08:01:47', 0, 0, 'time-out'),
(23, '20001', '2018-03-21', '11:41:40', '11:42:01', 0, 0, 'time-out'),
(24, '20000', '2018-04-11', '08:20:26', '08:20:33', 0, 0, 'time-out'),
(25, '20000', '2018-04-11', '10:45:12', '04:20:33', 0, 0, 'time-out'),
(26, '20000', '2018-04-16', '22:14:47', '22:14:55', 1, 0, 'time-out'),
(27, '20002', '2018-04-17', '00:04:32', '23:42:45', 0, 0, 'time-out'),
(28, '20017	', '2018-04-29', '23:42:42', '23:42:45', 0, 0, 'time-out'),
(29, '20001', '2018-03-22', '03:18:08', '10:58:12', 0, 2, 'time-out'),
(30, '20000', '2018-04-30', '03:23:13', '03:24:40', 1, 2, 'time-out'),
(31, '20002', '2018-04-30', '09:56:49', '10:13:48', 6, 0, 'time-out'),
(32, '20002', '2018-04-30', '10:11:06', '10:13:48', 6, 1, 'time-out'),
(33, '20002', '2018-04-30', '10:13:44', '10:13:48', 0, 1, 'time-out'),
(34, '20001', '2018-04-30', '10:57:50', '10:58:12', 0, 1, 'time-out');

-- --------------------------------------------------------

--
-- Table structure for table `employee_info`
--

CREATE TABLE `employee_info` (
  `employee_id` int(11) NOT NULL,
  `employee_position` varchar(25) NOT NULL,
  `employee_password` varchar(25) NOT NULL DEFAULT 'none',
  `employee_fname` varchar(35) NOT NULL,
  `employee_lname` varchar(35) NOT NULL,
  `employee_bday` varchar(25) NOT NULL,
  `employee_age` varchar(35) NOT NULL,
  `employee_address` varchar(50) NOT NULL,
  `employee_status` varchar(25) NOT NULL DEFAULT 'time-out'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `employee_info`
--

INSERT INTO `employee_info` (`employee_id`, `employee_position`, `employee_password`, `employee_fname`, `employee_lname`, `employee_bday`, `employee_age`, `employee_address`, `employee_status`) VALUES
(20000, 'waiter', 'none', 'noemie', 'ibanez', '1998-03-25', '20', 'sample address', 'time-out'),
(20001, 'dishwasher', 'none', 'marlon', 'mateo', '1995-03-25', '23', 'upper ramirez st.', 'time-out'),
(20003, 'supervisor', 'admin', 'felizardo', 'ramoe', '1999-03-25', '20', 'sample address', 'time-out'),
(20004, 'cook', 'none', 'arnel', 'sabiniano', '1998-10-13', '20', 'dgwydgdsuj', 'time-out');

-- --------------------------------------------------------

--
-- Table structure for table `employee_reports`
--

CREATE TABLE `employee_reports` (
  `payroll_id` int(11) NOT NULL,
  `payroll_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `employee_id` int(11) NOT NULL,
  `employee_fname` varchar(25) NOT NULL,
  `employee_lname` varchar(25) NOT NULL,
  `total_salary` int(30) NOT NULL,
  `employee_position` varchar(25) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `employee_reports`
--

INSERT INTO `employee_reports` (`payroll_id`, `payroll_date`, `employee_id`, `employee_fname`, `employee_lname`, `total_salary`, `employee_position`) VALUES
(6, '2018-05-08 02:43:40', 20000, 'noemie', 'ibanez', 94, 'waiter');

-- --------------------------------------------------------

--
-- Table structure for table `employee_tax`
--

CREATE TABLE `employee_tax` (
  `deduction_id` int(11) NOT NULL,
  `employee_id` int(11) NOT NULL,
  `employee_deduction` varchar(25) NOT NULL,
  `deduction_amount` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `employee_tax`
--

INSERT INTO `employee_tax` (`deduction_id`, `employee_id`, `employee_deduction`, `deduction_amount`) VALUES
(53, 20000, 'pag-ibig', 300),
(54, 20000, 'sss', 0),
(55, 20000, 'philhealth', 0),
(56, 20000, 'others', 0),
(57, 20001, 'pag-ibig', 100),
(58, 20001, 'sss', 0),
(59, 20001, 'philhealth', 0),
(60, 20001, 'others', 0),
(61, 20002, 'pag-ibig', 0),
(62, 20002, 'sss', 0),
(63, 20002, 'philhealth', 0),
(64, 20002, 'others', 0),
(65, 20003, 'pag-ibig', 0),
(66, 20003, 'sss', 0),
(67, 20003, 'philhealth', 0),
(68, 20003, 'others', 0),
(69, 20004, 'pag-ibig', 0),
(70, 20004, 'sss', 0),
(71, 20004, 'philhealth', 0),
(72, 20004, 'others', 0),
(73, 20005, 'pag-ibig', 0),
(74, 20005, 'sss', 0),
(75, 20005, 'philhealth', 0),
(76, 20005, 'others', 0),
(77, 20006, 'pag-ibig', 0),
(78, 20006, 'sss', 0),
(79, 20006, 'philhealth', 0),
(80, 20006, 'others', 0),
(81, 20007, 'pag-ibig', 0),
(82, 20007, 'sss', 0),
(83, 20007, 'philhealth', 0),
(84, 20007, 'others', 0),
(85, 20004, 'pag-ibig', 0),
(86, 20004, 'sss', 0),
(87, 20004, 'philhealth', 0),
(88, 20004, 'others', 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `employee_dtr`
--
ALTER TABLE `employee_dtr`
  ADD PRIMARY KEY (`time_sheet_id`);

--
-- Indexes for table `employee_info`
--
ALTER TABLE `employee_info`
  ADD PRIMARY KEY (`employee_id`);

--
-- Indexes for table `employee_reports`
--
ALTER TABLE `employee_reports`
  ADD PRIMARY KEY (`payroll_id`);

--
-- Indexes for table `employee_tax`
--
ALTER TABLE `employee_tax`
  ADD PRIMARY KEY (`deduction_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `employee_dtr`
--
ALTER TABLE `employee_dtr`
  MODIFY `time_sheet_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- AUTO_INCREMENT for table `employee_info`
--
ALTER TABLE `employee_info`
  MODIFY `employee_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20005;

--
-- AUTO_INCREMENT for table `employee_reports`
--
ALTER TABLE `employee_reports`
  MODIFY `payroll_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `employee_tax`
--
ALTER TABLE `employee_tax`
  MODIFY `deduction_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=89;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
