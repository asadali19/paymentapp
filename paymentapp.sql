-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 23, 2024 at 09:43 AM
-- Server version: 10.4.19-MariaDB
-- PHP Version: 7.4.20

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `paymentapp`
--

-- --------------------------------------------------------

--
-- Table structure for table `channel`
--

CREATE TABLE `channel` (
  `channel_id` int(11) NOT NULL,
  `code` int(11) NOT NULL,
  `channel_name` varchar(25) NOT NULL,
  `status` int(11) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `channel`
--

INSERT INTO `channel` (`channel_id`, `code`, `channel_name`, `status`, `createdAt`, `updatedAt`) VALUES
(1, 0, 'ATM 1', 0, '2024-07-22 12:41:21', '2024-07-22 12:41:21'),
(2, 1, 'POS Terminal', 1, '2024-07-22 12:41:20', '2024-07-22 12:41:20'),
(3, 2, 'WEB', 1, '2024-07-22 05:49:07', '2024-07-22 05:49:07');

-- --------------------------------------------------------

--
-- Table structure for table `charges`
--

CREATE TABLE `charges` (
  `charges_id` int(11) NOT NULL,
  `name` varchar(25) NOT NULL,
  `rangeamount` varchar(100) NOT NULL,
  `percentage` varchar(100) NOT NULL,
  `fixedamount` varchar(100) NOT NULL,
  `merchant_id` int(11) NOT NULL,
  `status` int(11) NOT NULL,
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `charges`
--

INSERT INTO `charges` (`charges_id`, `name`, `rangeamount`, `percentage`, `fixedamount`, `merchant_id`, `status`, `updatedAt`, `createdAt`) VALUES
(3, '2nd charges', '1-200', '7', '200', 3, 0, '2024-07-10 10:30:03', '2024-07-10 10:30:03'),
(8, 'givig46', 'HD uf', '245353', '5838835', 19, 0, '2024-07-09 08:32:03', '2024-07-09 08:32:03');

-- --------------------------------------------------------

--
-- Table structure for table `cities`
--

CREATE TABLE `cities` (
  `city_id` int(11) NOT NULL,
  `city_name` varchar(25) NOT NULL,
  `region_id` int(11) NOT NULL,
  `code` varchar(50) NOT NULL,
  `status` int(11) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `cities`
--

INSERT INTO `cities` (`city_id`, `city_name`, `region_id`, `code`, `status`, `createdAt`, `updatedAt`) VALUES
(1, 'Islamabad', 3, '001', 1, '2024-07-22 06:54:22', '2024-07-22 06:54:22'),
(2, 'Gilgit', 4, '010', 1, '2024-07-22 06:54:10', '2024-07-22 06:54:10'),
(3, 'Sakardu', 4, '011', 1, '2024-07-22 06:54:36', '2024-07-22 06:54:36'),
(4, 'Kashmor', 8, '012', 0, '2024-07-22 11:42:46', '2024-07-22 11:42:46');

-- --------------------------------------------------------

--
-- Table structure for table `group`
--

CREATE TABLE `group` (
  `group_id` int(11) NOT NULL,
  `group_name` varchar(25) NOT NULL,
  `status` int(11) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `group`
--

INSERT INTO `group` (`group_id`, `group_name`, `status`, `createdAt`, `updatedAt`) VALUES
(1, 'Nishat', 1, '2024-07-06 06:21:44', '2024-07-06 06:21:44');

-- --------------------------------------------------------

--
-- Table structure for table `industry`
--

CREATE TABLE `industry` (
  `industry_id` int(11) NOT NULL,
  `code` varchar(50) NOT NULL,
  `industry_name` varchar(50) NOT NULL,
  `status` int(11) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `industry`
--

INSERT INTO `industry` (`industry_id`, `code`, `industry_name`, `status`, `createdAt`, `updatedAt`) VALUES
(1, '01', 'Financial Institution Commercial Banks', 1, '2024-07-22 06:58:53', '2024-07-22 06:58:53'),
(2, '02', 'Financial Institution MF, Other Banks', 1, '2024-07-22 06:59:17', '2024-07-22 06:59:17'),
(3, '03', 'Financial Institution FINTechs', 1, '2024-07-22 07:00:40', '2024-07-22 07:00:40'),
(4, '04', 'Grocery Business Chain (IMT)', 1, '2024-07-22 07:00:53', '2024-07-22 07:00:53'),
(5, '05', 'Grocery Business Chain (LMT)', 1, '2024-07-22 07:01:10', '2024-07-22 07:01:10');

-- --------------------------------------------------------

--
-- Table structure for table `merchant`
--

CREATE TABLE `merchant` (
  `merchant_id` int(11) NOT NULL,
  `subgroup_id` int(11) DEFAULT NULL,
  `name` varchar(25) NOT NULL,
  `phone` varchar(11) NOT NULL,
  `email` varchar(25) NOT NULL,
  `business_name` varchar(25) NOT NULL,
  `address` varchar(150) NOT NULL,
  `status` int(11) NOT NULL,
  `updatedAt` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `createdAt` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `merchant`
--

INSERT INTO `merchant` (`merchant_id`, `subgroup_id`, `name`, `phone`, `email`, `business_name`, `address`, `status`, `updatedAt`, `createdAt`) VALUES
(3, 1, 'Shahroz ahmad', '04342342342', 'asad@test.com', 'Textile Industry', 'F8 markaz', 1, '2024-07-08 06:25:45', '2024-07-08 06:25:45'),
(18, 2, 'asad ali', '03401810724', 'gamsjhdjdhc', 'love', 'hdjdhjsjdjdjx', 0, '2024-07-08 09:47:58', '2024-07-08 09:47:58'),
(19, 2, 'noman fiaz', '03487683260', 'numanfiaz@gmail.com', 'Schools and colleges', 'f11 markaz', 1, '2024-07-08 12:42:28', '2024-07-08 12:42:28');

-- --------------------------------------------------------

--
-- Table structure for table `permissions`
--

CREATE TABLE `permissions` (
  `permission_id` int(11) NOT NULL,
  `permission_name` varchar(25) NOT NULL,
  `description` varchar(50) NOT NULL,
  `status` int(11) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `permissions`
--

INSERT INTO `permissions` (`permission_id`, `permission_name`, `description`, `status`, `createdAt`, `updatedAt`) VALUES
(1, '/api/user', 'Can Get All users', 1, '2024-07-06 06:55:32', '2024-07-06 06:55:32'),
(2, '/api/register', 'Can add new user', 1, '2024-07-06 06:55:17', '2024-07-06 06:55:17');

-- --------------------------------------------------------

--
-- Table structure for table `region`
--

CREATE TABLE `region` (
  `region_id` int(11) NOT NULL,
  `code` int(11) NOT NULL,
  `region_name` varchar(25) NOT NULL,
  `status` int(11) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `region`
--

INSERT INTO `region` (`region_id`, `code`, `region_name`, `status`, `createdAt`, `updatedAt`) VALUES
(3, 1, 'Fedral', 1, '2024-07-22 06:17:29', '2024-07-22 06:17:29'),
(4, 10, 'GB', 1, '2024-07-22 06:31:29', '2024-07-22 06:31:29'),
(5, 11, 'AJK', 1, '2024-07-22 06:31:34', '2024-07-22 06:31:34'),
(6, 2, 'PUNJAB', 1, '2024-07-22 06:23:27', '2024-07-22 06:23:27'),
(7, 5, 'KPK', 1, '2024-07-22 06:30:57', '2024-07-22 06:30:57'),
(8, 3, 'SINDH', 1, '2024-07-22 06:30:13', '2024-07-22 06:30:13'),
(9, 4, 'Balochistan', 1, '2024-07-22 06:31:15', '2024-07-22 06:31:15');

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `role_id` int(11) NOT NULL,
  `role_name` varchar(25) NOT NULL,
  `permissions` varchar(50) NOT NULL,
  `status` int(11) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`role_id`, `role_name`, `permissions`, `status`, `createdAt`, `updatedAt`) VALUES
(1, 'admin', '[1,2]', 1, '2024-07-05 06:16:07', '2024-07-05 06:16:07'),
(2, 'Accounts', '[1]', 1, '2024-07-06 06:38:38', '2024-07-06 06:38:38');

-- --------------------------------------------------------

--
-- Table structure for table `subgroup`
--

CREATE TABLE `subgroup` (
  `subgroup_id` int(11) NOT NULL,
  `subgroup_name` varchar(25) NOT NULL,
  `code` varchar(50) NOT NULL,
  `status` int(11) NOT NULL,
  `group_id` int(11) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `subgroup`
--

INSERT INTO `subgroup` (`subgroup_id`, `subgroup_name`, `code`, `status`, `group_id`, `createdAt`, `updatedAt`) VALUES
(1, 'F8 markaz Branch', '01', 1, 1, '2024-07-22 07:24:37', '2024-07-22 07:24:37'),
(2, 'Burewala Branch', '02', 1, 1, '2024-07-22 07:24:40', '2024-07-22 07:24:40'),
(3, 'RWP Branch', '03', 1, 1, '2024-07-22 07:26:23', '2024-07-22 07:26:23');

-- --------------------------------------------------------

--
-- Table structure for table `terminal`
--

CREATE TABLE `terminal` (
  `terminal_id` int(11) NOT NULL,
  `serial_no` varchar(255) NOT NULL,
  `unique_terminal` varchar(255) NOT NULL,
  `terminal_sn` varchar(50) NOT NULL,
  `product_key` varchar(50) NOT NULL,
  `location` varchar(200) NOT NULL,
  `merchant_id` int(11) NOT NULL,
  `status` int(11) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `terminal`
--

INSERT INTO `terminal` (`terminal_id`, `serial_no`, `unique_terminal`, `terminal_sn`, `product_key`, `location`, `merchant_id`, `status`, `createdAt`, `updatedAt`) VALUES
(20, '00001', '0001010100001', '12345', 'abcde', 'NY', 1, 1, '2024-07-22 08:38:31', '2024-07-22 08:38:31'),
(21, '00002', '0001010100002', '12345', 'abcde', 'NY', 1, 1, '2024-07-22 08:39:10', '2024-07-22 08:39:10'),
(22, '00003', '0001010100003', '12345', 'abcde', 'NY', 1, 1, '2024-07-23 07:05:43', '2024-07-23 07:05:43');

-- --------------------------------------------------------

--
-- Table structure for table `transaction`
--

CREATE TABLE `transaction` (
  `trans_id` int(11) NOT NULL,
  `reference_no` varchar(250) NOT NULL,
  `amount` varchar(255) NOT NULL,
  `trans_status` varchar(50) NOT NULL,
  `trans_type` varchar(50) NOT NULL,
  `card_no` varchar(100) NOT NULL,
  `terminal_id` int(11) NOT NULL,
  `merchant_id` int(11) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `transaction`
--

INSERT INTO `transaction` (`trans_id`, `reference_no`, `amount`, `trans_status`, `trans_type`, `card_no`, `terminal_id`, `merchant_id`, `createdAt`, `updatedAt`) VALUES
(1, '1234', '1000', 'Success', 'card', '1234', 1, 1, '2024-07-03 08:14:22', '2024-07-03 08:14:22'),
(2, '1234', '1000', 'Success', 'card', '1234', 1, 1, '2024-07-03 08:15:27', '2024-07-03 08:15:27');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `user_id` int(11) NOT NULL,
  `role_id` int(11) DEFAULT NULL,
  `subgroup_id` int(11) DEFAULT NULL,
  `first_name` varchar(25) NOT NULL,
  `last_name` varchar(25) NOT NULL,
  `username` varchar(25) NOT NULL,
  `password` varchar(100) NOT NULL,
  `email` varchar(25) NOT NULL,
  `phone` varchar(11) NOT NULL,
  `address` varchar(150) NOT NULL,
  `status` int(11) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `token` varchar(250) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`user_id`, `role_id`, `subgroup_id`, `first_name`, `last_name`, `username`, `password`, `email`, `phone`, `address`, `status`, `createdAt`, `updatedAt`, `token`) VALUES
(6, 1, 1, 'Wassem', 'Akram', 'Waseem1234', '$2a$10$L4nCqa1OyXyyYdQevRiVt.8mAUTndVsXe9zgW43IXAPYOwPGeRnDq', 'Wassem@test.com', '12345678', 'Lahore', 1, '2024-07-23 07:05:12', '2024-07-23 07:05:12', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjYsImlhdCI6MTcyMTcxODMxMn0.iZQEFo9EtwSzY6MT-SfAPvL5r6SyPuvlTxCOug6vQ2g'),
(7, 2, 1, 'Asad', 'Ali', 'asad1234', '$2a$10$w459MmWMzRbuu7WKk8/Ff.BHA7eMoCMjv1njpoyYbDDciiQZrohMu', 'Wassem@test.com', '12345678', 'Lahore', 1, '2024-07-06 06:38:26', '2024-07-06 06:38:26', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjcsImlhdCI6MTcyMDI0NzczOH0.VRplc4J7pU8HuX8IsNmqAvD5-iSct8WEL19go_cyjcU'),
(11, 1, 1, 'shahroz', 'ahmad 67', 'shari@123', '$2a$10$ds8UlES9xC5Jj9EIeWMWwOaDdhBKKluUAp9jDe08LQzJMTLaCSUUG', 'example12@gmail.com', '$2a$10$ds8U', 'f11 markaz islamabad', 0, '2024-07-22 06:53:54', '2024-07-22 06:53:54', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjExLCJpYXQiOjE3MjE2Mjc4MTR9.hOAL5Tsu6C4cjEblm6t1nXK8Xt4ETRh0U562qboDnF4');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `channel`
--
ALTER TABLE `channel`
  ADD PRIMARY KEY (`channel_id`);

--
-- Indexes for table `charges`
--
ALTER TABLE `charges`
  ADD PRIMARY KEY (`charges_id`);

--
-- Indexes for table `cities`
--
ALTER TABLE `cities`
  ADD PRIMARY KEY (`city_id`);

--
-- Indexes for table `group`
--
ALTER TABLE `group`
  ADD PRIMARY KEY (`group_id`);

--
-- Indexes for table `industry`
--
ALTER TABLE `industry`
  ADD PRIMARY KEY (`industry_id`);

--
-- Indexes for table `merchant`
--
ALTER TABLE `merchant`
  ADD PRIMARY KEY (`merchant_id`);

--
-- Indexes for table `permissions`
--
ALTER TABLE `permissions`
  ADD PRIMARY KEY (`permission_id`);

--
-- Indexes for table `region`
--
ALTER TABLE `region`
  ADD PRIMARY KEY (`region_id`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`role_id`);

--
-- Indexes for table `subgroup`
--
ALTER TABLE `subgroup`
  ADD PRIMARY KEY (`subgroup_id`);

--
-- Indexes for table `terminal`
--
ALTER TABLE `terminal`
  ADD PRIMARY KEY (`terminal_id`);

--
-- Indexes for table `transaction`
--
ALTER TABLE `transaction`
  ADD PRIMARY KEY (`trans_id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `channel`
--
ALTER TABLE `channel`
  MODIFY `channel_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `charges`
--
ALTER TABLE `charges`
  MODIFY `charges_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `cities`
--
ALTER TABLE `cities`
  MODIFY `city_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `group`
--
ALTER TABLE `group`
  MODIFY `group_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `industry`
--
ALTER TABLE `industry`
  MODIFY `industry_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `merchant`
--
ALTER TABLE `merchant`
  MODIFY `merchant_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `permissions`
--
ALTER TABLE `permissions`
  MODIFY `permission_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `region`
--
ALTER TABLE `region`
  MODIFY `region_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
  MODIFY `role_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `subgroup`
--
ALTER TABLE `subgroup`
  MODIFY `subgroup_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `terminal`
--
ALTER TABLE `terminal`
  MODIFY `terminal_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `transaction`
--
ALTER TABLE `transaction`
  MODIFY `trans_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
