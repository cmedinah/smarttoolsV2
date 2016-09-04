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

-- Dumping structure for table smarttools.concursos
CREATE TABLE IF NOT EXISTS `concursos` (
  `idconcurso` int(10) NOT NULL AUTO_INCREMENT,
  `idadministrador` int(10) unsigned DEFAULT '0',
  `token_concurso` varchar(60) DEFAULT NULL,
  `estado` int(5) unsigned DEFAULT '0',
  `publicado` int(5) unsigned DEFAULT '0',
  `terminado` int(5) unsigned DEFAULT '0',
  `total_videos` int(5) unsigned DEFAULT '0',
  `videos_por_procesar` int(5) unsigned DEFAULT '0',
  `videos_procesados` int(5) unsigned DEFAULT '0',
  `nombre_concurso` varchar(200) DEFAULT '0',
  `descripcion` text,
  `banner` varchar(200) DEFAULT '0',
  `url_concurso` varchar(200) DEFAULT '0',
  `fecha_inicial` datetime DEFAULT NULL,
  `fecha_inicial_string` varchar(20) DEFAULT '0',
  `fecha_inicial_timestamp` varchar(11) DEFAULT '0',
  `fecha_final` datetime DEFAULT NULL,
  `fecha_final_string` varchar(20) DEFAULT '0',
  `fecha_final_timestamp` int(11) DEFAULT '0',
  `fecha_creacion` datetime DEFAULT NULL,
  `fecha_creacion_string` varchar(20) DEFAULT '0',
  `hora_creacion_string` varchar(20) DEFAULT '0',
  PRIMARY KEY (`idconcurso`),
  KEY `idadministrador` (`idadministrador`),
  KEY `estado` (`estado`),
  KEY `publicado` (`publicado`),
  KEY `terminado` (`terminado`),
  KEY `token_concurso` (`token_concurso`),
  KEY `url_concurso` (`url_concurso`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

-- Dumping data for table smarttools.concursos: 3 rows
/*!40000 ALTER TABLE `concursos` DISABLE KEYS */;
INSERT INTO `concursos` (`idconcurso`, `idadministrador`, `token_concurso`, `estado`, `publicado`, `terminado`, `total_videos`, `videos_por_procesar`, `videos_procesados`, `nombre_concurso`, `descripcion`, `banner`, `url_concurso`, `fecha_inicial`, `fecha_inicial_string`, `fecha_inicial_timestamp`, `fecha_final`, `fecha_final_string`, `fecha_final_timestamp`, `fecha_creacion`, `fecha_creacion_string`, `hora_creacion_string`) VALUES
	(1, 5, '56174e43-0a79-ab86-5a75-0b764997ec09', 1, 1, 0, 0, 0, 0, 'Un nuevo concurso', '<h3 style="margin: 15px 0px; padding: 0px; font-weight: 700; font-size: 14px; color: rgb(0, 0, 0); font-family: "Open Sans", Arial, sans-serif;">The standard Lorem Ipsum passage, used since the 1500s</h3><p style="margin-bottom: 15px; padding: 0px; text-align: justify; font-family: "Open Sans", Arial, sans-serif;">"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."</p><h3 style="margin: 15px 0px; padding: 0px; font-weight: 700; font-size: 14px; color: rgb(0, 0, 0); font-family: "Open Sans", Arial, sans-serif;">Section 1.10.32 of "de Finibus Bonorum et Malorum", written by Cicero in 45 BC</h3><p style="margin-bottom: 15px; padding: 0px; text-align: justify; font-family: "Open Sans", Arial, sans-serif;">"Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?"</p>', '21f5cfec-e8bf-7545-81ae-6d07e6af1730.png', 'un_nuevo_concurso', '2016-09-01 00:00:00', '2016-09-01', '1472706000', '2016-09-15 00:00:00', '2016-09-15', 1473915600, '2016-09-01 10:10:35', '01/09/2016', '10:10:35 am'),
	(2, 5, 'f57f65e6-f05e-186c-4889-a7961a68f6cb', 1, 1, 0, 0, 0, 0, 'Hago otro concurso', '<p>Para las pruebas...</p>', 'f61ca8f7-67d7-96de-a3f5-9ac7189dac0b.jpeg', 'hago_otro_concurso', '2016-09-07 00:00:00', '2016-09-07', '1473224400', '2016-09-15 00:00:00', '2016-09-15', 1473915600, '2016-09-01 09:37:10', '01/09/2016', '09:37:10 am'),
	(3, 5, 'f5f2f51f-10fb-314a-6e78-551f2bb6a39f', 1, 1, 0, 0, 0, 0, 'Un nuevo concurso', '<p>rter</p>', '9eb5b161-e957-3e2e-8bf6-78cfa97362a6.png', 'gh', '2016-09-01 00:00:00', '2016-09-01', '1472706000', '2016-09-28 00:00:00', '2016-09-28', 1475038800, '2016-09-01 10:10:35', '01/09/2016', '10:10:35 am'),
	(4, 5, 'cde267ea-db30-6b36-1181-e8ede8a69b68', 1, 1, 0, 0, 0, 0, 'Para estar en el rango editado', '<p>Ya editado</p>', '76b190cf-f399-a994-989c-69af6d2e9ad7.png', 'para_estar_en_el_rango', '2016-09-01 00:00:00', '2016-09-01', '1472706000', '2016-09-09 00:00:00', '2016-09-09', 1473397200, '2016-09-01 16:22:35', '01/09/2016', '04:22:35 pm'),
	(5, 5, '3e69aba1-d659-9f75-bd3e-708217ecee5c', 1, 1, 0, 0, 0, 0, 'Concurso del mundo', '<p>veamos si queda de forma completa</p>', '5ca93282-595a-0e91-00e3-778ca66684b7.jpeg', 'concurso_del_mundo', '2016-09-03 00:00:00', '2016-09-03', '1472878800', '2016-09-16 00:00:00', '2016-09-16', 1474002000, '2016-09-01 16:37:44', '01/09/2016', '04:37:44 pm');
/*!40000 ALTER TABLE `concursos` ENABLE KEYS */;
/*!40014 SET FOREIGN_KEY_CHECKS=1 */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
