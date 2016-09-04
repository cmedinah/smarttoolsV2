-- --------------------------------------------------------
-- Host:                         localhost
-- Server version:               5.1.33-community-log - MySQL Community Server (GPL)
-- Server OS:                    Win32
-- HeidiSQL version:             7.0.0.4053
-- Date/time:                    2016-09-01 16:41:32
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET FOREIGN_KEY_CHECKS=0 */;

-- Dumping structure for table smarttools.administrador_empresa
CREATE TABLE IF NOT EXISTS `administrador_empresa` (
  `idadministrador` int(10) NOT NULL AUTO_INCREMENT,
  `estado` int(5) unsigned DEFAULT '0',
  `identificacion` varchar(20) DEFAULT '0',
  `nombres` varchar(50) DEFAULT '0',
  `apellidos` varchar(50) DEFAULT '0',
  `email` varchar(50) DEFAULT '0',
  `password` varchar(60) DEFAULT '0',
  `nombre_empresa` varchar(60) DEFAULT '0',
  `fecha` datetime DEFAULT NULL,
  KEY `idadministrador` (`idadministrador`),
  KEY `estado` (`estado`),
  KEY `identificacion` (`identificacion`)
) ENGINE=MyISAM AUTO_INCREMENT=13 DEFAULT CHARSET=latin1;

-- Dumping data for table smarttools.administrador_empresa: 9 rows
/*!40000 ALTER TABLE `administrador_empresa` DISABLE KEYS */;
INSERT INTO `administrador_empresa` (`idadministrador`, `estado`, `identificacion`, `nombres`, `apellidos`, `email`, `password`, `nombre_empresa`, `fecha`) VALUES
	(9, 1, '123', 'sda', 'asda', 'correo@correo.com', '$2a$10$7yTLVneXLcFhf8I6q7m9n.0UIN42nNINlBHmn5ZLURa8/Rx1sXzly', 'Empresa', '2016-08-27 00:00:00'),
	(3, 1, '1234', 'sda', 'asda', 'correo2@correo.com', '$2a$10$g0bM./g.22QIhctQLXwB0.382tgHyiyzigBEPVeWiyfEWVKlSPPAy', 'Empresa', '0000-00-00 00:00:00'),
	(4, 1, '12345', 'sda', 'asda', 'correo3@correo.com', '$2a$10$5i2ERTGETxoXnHRvcNIjw.l0Fpzt41LS67tOnvhh4WiuS2qI3UGOC', 'Empresa', '2016-08-27 00:00:00'),
	(5, 1, '11276127', 'Jorge', 'Rubiano', 'jorge.rubiano.udec@gmail.com', '$2a$10$oSbb49KFFb4m9ov0VJSf6.hKVSobzkTlddcpdjLVaVi/FnIvWE4ey', 'Mi Empresa', '2016-08-27 00:00:00'),
	(6, 1, '561201152', 'Camila', 'MarÃ­n', 'camila_marin1984@hotmail.com', '$2a$10$AfcJSRZBjDocyF2X.PR7JuR0kXKwJf1PbuNibeRIwUVMnlrduL3my', 'Pruebas', '2016-08-27 00:00:00'),
	(8, 1, '84042356785', 'Carlos', 'MuÃ±oz', 'carlos@correo.com', '$2a$10$CSP6kQuqhVS.TzksD5zjkebD4b11V0UodoPFBnAvEc.dU4RB4Mz/W', 'Carlos INC', '2016-08-27 00:00:00'),
	(10, 1, '123789', 'sda', 'asda', 'correo@hgcorreo.com', '$2a$10$esDYpo1ZLBdvqyWp0d5GRe4/dgwz3zs2W.DYholKe8w0MVEfMmfmm', 'Empresa', '2016-08-27 00:00:00'),
	(11, 1, '345345345', 'Camilo', 'Medina', 'camilo@medina.com', '$2a$10$zGBMSC3zR.qr3VJ8TLJdv.Ny.VywUhSBJyDhd6jfAXEIfmIwBxxTK', 'Uniandes', '2016-08-28 00:00:00'),
	(12, 1, '854734834', 'MarÃ­a', 'Sharapova', 'maria@correo.com', '$2a$10$ts0uL10Eu16H96QFEd3Mv.0iPMdfDTgI7UKqgCzcT2OKnYaIjbCRW', 'MarÃ­a INC.', '2016-08-28 00:00:00');
/*!40000 ALTER TABLE `administrador_empresa` ENABLE KEYS */;
/*!40014 SET FOREIGN_KEY_CHECKS=1 */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
