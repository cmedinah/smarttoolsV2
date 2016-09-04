-- --------------------------------------------------------
-- Host:                         localhost
-- Server version:               5.1.33-community-log - MySQL Community Server (GPL)
-- Server OS:                    Win32
-- HeidiSQL version:             7.0.0.4053
-- Date/time:                    2016-09-01 16:41:33
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET FOREIGN_KEY_CHECKS=0 */;

-- Dumping structure for table smarttools.estado_video
CREATE TABLE IF NOT EXISTS `estado_video` (
  `idestado` int(10) NOT NULL AUTO_INCREMENT,
  `estado` int(5) DEFAULT '0',
  `estado_video` int(5) DEFAULT '0',
  `nombre_estado` varchar(100) DEFAULT '0',
  `fecha` datetime DEFAULT NULL,
  PRIMARY KEY (`idestado`),
  KEY `estado` (`estado`),
  KEY `estado_video` (`estado_video`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

-- Dumping data for table smarttools.estado_video: 3 rows
/*!40000 ALTER TABLE `estado_video` DISABLE KEYS */;
INSERT INTO `estado_video` (`idestado`, `estado`, `estado_video`, `nombre_estado`, `fecha`) VALUES
	(1, 1, 1, 'En cola', '2016-08-26 18:35:43'),
	(2, 1, 2, 'En proceso', '2016-08-26 18:35:59'),
	(3, 1, 3, 'Procesado', '2016-08-26 18:36:12');
/*!40000 ALTER TABLE `estado_video` ENABLE KEYS */;
/*!40014 SET FOREIGN_KEY_CHECKS=1 */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
