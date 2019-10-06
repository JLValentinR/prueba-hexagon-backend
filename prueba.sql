-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1:3306
-- Tiempo de generación: 06-10-2019 a las 20:25:16
-- Versión del servidor: 5.7.19
-- Versión de PHP: 7.0.23

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `prueba`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `favoritos`
--

DROP TABLE IF EXISTS `favoritos`;
CREATE TABLE IF NOT EXISTS `favoritos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user` varchar(50) NOT NULL DEFAULT '0',
  `nombre` varchar(50) NOT NULL,
  `descripcion` varchar(150) NOT NULL,
  `matchs` float NOT NULL,
  `subida` date NOT NULL,
  `modificacion` date NOT NULL,
  `tipo` int(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `favoritos`
--

INSERT INTO `favoritos` (`id`, `user`, `nombre`, `descripcion`, `matchs`, `subida`, `modificacion`, `tipo`) VALUES
(1, 'tgyu', 'ReactJS', 'Descripción de prueba', 435, '2019-10-04', '2019-10-04', 1),
(2, 'tgyu', 'Laravel', 'Descripción de prueba', 435, '2019-10-04', '2019-10-04', 2),
(3, 'tgyu', 'MySQL', 'Descripción de prueba', 435, '2019-10-04', '2019-10-04', 3);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `segmentos`
--

DROP TABLE IF EXISTS `segmentos`;
CREATE TABLE IF NOT EXISTS `segmentos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user` varchar(50) NOT NULL DEFAULT '0',
  `nombre` varchar(50) NOT NULL,
  `descripcion` varchar(150) NOT NULL,
  `matchs` float NOT NULL,
  `subida` date NOT NULL,
  `modificacion` date NOT NULL,
  `tipo` int(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=21 DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `segmentos`
--

INSERT INTO `segmentos` (`id`, `user`, `nombre`, `descripcion`, `matchs`, `subida`, `modificacion`, `tipo`) VALUES
(1, '0', 'JavaScript', 'Descripción de prueba', 100, '2019-10-06', '2019-10-06', 1),
(2, '0', 'PHP', 'Descripción de prueba', 200, '2019-10-06', '2019-10-06', 2),
(3, '0', 'NodeJS', 'Descripción de prueba', 200, '2019-10-06', '2019-10-06', 1),
(4, '0', 'ReactJS', 'Descripción de prueba', 200, '2019-10-06', '2019-10-06', 1),
(5, '0', 'jQuery', 'Descripción de prueba', 150, '2019-10-06', '2019-10-06', 1),
(6, '0', 'Angular', 'Descripción de prueba', 100, '2019-10-06', '2019-10-06', 1),
(7, '0', 'Vue', 'Descripción de prueba', 150, '2019-10-06', '2019-10-06', 1),
(8, '0', 'PHPMailer', 'Descripción de prueba', 150, '2019-10-06', '2019-10-06', 2),
(9, '0', 'Laravel', 'Descripción de prueba', 300, '2019-10-06', '2019-10-06', 2),
(10, '0', 'CodeIgniter', 'Descripción de prueba', 120, '2019-10-06', '2019-10-06', 2),
(11, '0', 'Symfony', 'Descripción de prueba', 180, '2019-10-06', '2019-10-06', 2),
(12, '0', 'Zend', 'Descripción de prueba', 130, '2019-10-06', '2019-10-06', 2),
(13, '0', 'MySQL', 'Descripción de prueba', 100, '2019-10-06', '2019-10-06', 3),
(14, '0', 'MongoDB', 'Descripción de prueba', 140, '2019-10-06', '2019-10-06', 3),
(15, '0', 'PostgreSQL', 'Descripción de prueba', 200, '2019-10-06', '2019-10-06', 3),
(16, '0', 'MariaDB', 'Descripción de prueba', 170, '2019-10-06', '2019-10-06', 3),
(17, '0', 'Microsoft SQL Server', 'Descripción de prueba', 300, '2019-10-06', '2019-10-06', 3),
(18, '0', 'Polymer', 'Descripción de prueba', 250, '2019-10-06', '2019-10-06', 1),
(19, '0', 'Oracle', 'Descripción de prueba', 120, '2019-10-06', '2019-10-06', 3),
(20, '0', 'Microsoft Access', 'Descripción de prueba', 140, '2019-10-06', '2019-10-06', 3);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tokens`
--

DROP TABLE IF EXISTS `tokens`;
CREATE TABLE IF NOT EXISTS `tokens` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `token` varchar(60) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `tokens`
--

INSERT INTO `tokens` (`id`, `token`) VALUES
(1, '2f8f64ebec31084a75213053ec72070d673b74e8');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
