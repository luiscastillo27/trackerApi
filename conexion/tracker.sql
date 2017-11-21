-- phpMyAdmin SQL Dump
-- version 4.7.5
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost
-- Tiempo de generación: 21-11-2017 a las 01:13:09
-- Versión del servidor: 5.7.20
-- Versión de PHP: 7.1.7

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `tracker`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `coordenadas`
--

CREATE TABLE `coordenadas` (
  `idCoordenada` int(11) NOT NULL,
  `latitud` double NOT NULL,
  `logitud` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `coordenadas`
--

INSERT INTO `coordenadas` (`idCoordenada`, `latitud`, `logitud`) VALUES
(1, 19.699485994162497, -98.72451782226562),
(2, 19.423858594979777, -98.98956298828125),
(3, 19.69172830299251, -98.45947265625),
(4, 19.699485994162497, -98.72451782226562),
(5, 19.826141627230633, -98.98956298828125),
(6, 19.423858594979777, -99.13101196289062);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `dirrecciones`
--

CREATE TABLE `dirrecciones` (
  `idDireccion` int(11) NOT NULL,
  `idUsuario` int(11) NOT NULL,
  `idCoordenada` int(11) DEFAULT NULL,
  `pais` text NOT NULL,
  `cuidad` text NOT NULL,
  `cp` int(11) NOT NULL,
  `calle` varchar(27) NOT NULL,
  `colonia` text NOT NULL,
  `numero` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `dirrecciones`
--

INSERT INTO `dirrecciones` (`idDireccion`, `idUsuario`, `idCoordenada`, `pais`, `cuidad`, `cp`, `calle`, `colonia`, `numero`) VALUES
(1, 1, 1, 'Mexico', 'CDMX', 19290, 'Portalegre', 'Real Toledo', 111);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `mantenimientos`
--

CREATE TABLE `mantenimientos` (
  `idMantenimiento` int(11) NOT NULL,
  `idVehiculo` int(11) NOT NULL,
  `idCoordenada` int(11) DEFAULT NULL,
  `tipo` enum('Electrico','Mecanico') DEFAULT NULL,
  `fechaI` varchar(27) NOT NULL,
  `fechaT` varchar(27) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `mantenimientos`
--

INSERT INTO `mantenimientos` (`idMantenimiento`, `idVehiculo`, `idCoordenada`, `tipo`, `fechaI`, `fechaT`) VALUES
(1, 1, 1, 'Electrico', '27/03/15', '27/04/15');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `piezas`
--

CREATE TABLE `piezas` (
  `idPieza` int(11) NOT NULL,
  `stock` int(11) NOT NULL,
  `nombre` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `piezas`
--

INSERT INTO `piezas` (`idPieza`, `stock`, `nombre`) VALUES
(1, 27, 'pieza 1'),
(2, 15, 'pieza 2'),
(3, 72, 'pieza 3'),
(4, 51, 'pieza 4');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `rutas`
--

CREATE TABLE `rutas` (
  `idRuta` int(11) NOT NULL,
  `idDireccion` int(11) NOT NULL,
  `IdUsuario` int(11) NOT NULL,
  `articulo` varchar(127) DEFAULT NULL,
  `fechaI` varchar(27) NOT NULL,
  `fechaF` varchar(27) DEFAULT '',
  `estado` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `rutas`
--

INSERT INTO `rutas` (`idRuta`, `idDireccion`, `IdUsuario`, `articulo`, `fechaI`, `fechaF`, `estado`) VALUES
(1, 1, 1, 'iPhone 5s', '27/03/15', '27/04/15', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sensores`
--

CREATE TABLE `sensores` (
  `idSensor` int(11) NOT NULL,
  `stock` int(11) NOT NULL,
  `nombre` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `sensores`
--

INSERT INTO `sensores` (`idSensor`, `stock`, `nombre`) VALUES
(1, 27, 'sensor 1'),
(2, 15, 'sensor 2'),
(3, 72, 'sensor 3'),
(4, 51, 'sensor 4');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `idUsuario` int(11) NOT NULL,
  `email` varchar(27) NOT NULL,
  `password` varchar(300) NOT NULL DEFAULT '',
  `state` int(11) NOT NULL,
  `rango` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`idUsuario`, `email`, `password`, `state`, `rango`) VALUES
(1, 'luisyosemite@gmail.com', '$2a$10$2ZVx0ZZ49h1GSwFxFXCWHOn4GFsvRiA1jXt342bp3lWs67dAsLi1q', 1, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `vehiculos`
--

CREATE TABLE `vehiculos` (
  `idVehiculo` int(11) NOT NULL,
  `idUsuario` int(11) DEFAULT NULL,
  `marca` text NOT NULL,
  `modelo` text NOT NULL,
  `matricula` varchar(10) NOT NULL,
  `tipo` text NOT NULL,
  `anio` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `vehiculos`
--

INSERT INTO `vehiculos` (`idVehiculo`, `idUsuario`, `marca`, `modelo`, `matricula`, `tipo`, `anio`) VALUES
(1, 1, 'Ford', 'Fiestaikon', '444-XKD', 'carro', 2012),
(2, 1, 'Ford', 'Mustang', '271-SXD', 'carro', 2019),
(3, 1, 'Ford', 'Fiesta', '152-ZJM', 'carro', 2015);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `coordenadas`
--
ALTER TABLE `coordenadas`
  ADD PRIMARY KEY (`idCoordenada`);

--
-- Indices de la tabla `dirrecciones`
--
ALTER TABLE `dirrecciones`
  ADD PRIMARY KEY (`idDireccion`);

--
-- Indices de la tabla `mantenimientos`
--
ALTER TABLE `mantenimientos`
  ADD PRIMARY KEY (`idMantenimiento`);

--
-- Indices de la tabla `piezas`
--
ALTER TABLE `piezas`
  ADD PRIMARY KEY (`idPieza`);

--
-- Indices de la tabla `rutas`
--
ALTER TABLE `rutas`
  ADD PRIMARY KEY (`idRuta`);

--
-- Indices de la tabla `sensores`
--
ALTER TABLE `sensores`
  ADD PRIMARY KEY (`idSensor`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`idUsuario`);

--
-- Indices de la tabla `vehiculos`
--
ALTER TABLE `vehiculos`
  ADD PRIMARY KEY (`idVehiculo`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `coordenadas`
--
ALTER TABLE `coordenadas`
  MODIFY `idCoordenada` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `dirrecciones`
--
ALTER TABLE `dirrecciones`
  MODIFY `idDireccion` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `mantenimientos`
--
ALTER TABLE `mantenimientos`
  MODIFY `idMantenimiento` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `piezas`
--
ALTER TABLE `piezas`
  MODIFY `idPieza` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `rutas`
--
ALTER TABLE `rutas`
  MODIFY `idRuta` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `sensores`
--
ALTER TABLE `sensores`
  MODIFY `idSensor` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `idUsuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `vehiculos`
--
ALTER TABLE `vehiculos`
  MODIFY `idVehiculo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
