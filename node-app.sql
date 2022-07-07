-- phpMyAdmin SQL Dump
-- version 5.1.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 08 Jul 2022 pada 00.44
-- Versi server: 10.4.24-MariaDB
-- Versi PHP: 7.4.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `node-app`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `admin`
--

CREATE TABLE `admin` (
  `id` int(11) NOT NULL,
  `username` text NOT NULL,
  `password` text NOT NULL,
  `last_login` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `admin`
--

INSERT INTO `admin` (`id`, `username`, `password`, `last_login`) VALUES
(1, 'admin', '$2a$10$HE5J044iWOPYJaKyAxW7heJcdNs42QOK.AWLL9zNEvUJXWT8j1EJS', '2022-07-08 05:39:11');

-- --------------------------------------------------------

--
-- Struktur dari tabel `laporan`
--

CREATE TABLE `laporan` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `nama_laporan` varchar(100) NOT NULL,
  `status_laporan` varchar(100) NOT NULL,
  `message` text NOT NULL,
  `file_laporan` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `laporan`
--

INSERT INTO `laporan` (`id`, `user_id`, `nama_laporan`, `status_laporan`, `message`, `file_laporan`) VALUES
(12, 1, 'logo sepakbolafgbfg', 'dipikirkangfbfg', 'wkwkfgh', 'upload/1657233076277-Muara teweh januari.pdf'),
(13, 1, 'logo sepakbola', 'dipikirkan', 'wkwk', 'uploads1657232204670-r88_image_retouch.png'),
(14, 1, 'logo sepakbola', 'dipikirkan', 'wkwk', 'uploads1657232261279-r88_image_retouch.png'),
(15, 1, 'logo sepakbola', 'dipikirkan', 'wkwk', '1657232282027-r88_image_retouch.png'),
(16, 1, 'logo sepakbola', 'dipikirkan', 'wkwk', 'upload/1657232311024-r88_image_retouch.png'),
(17, 1, 'logo sepakbola', 'dipikirkan', 'wkwk', 'upload/1657232321205-Muara teweh januari.pdf');

-- --------------------------------------------------------

--
-- Struktur dari tabel `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `nama_desa` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `nama_kades` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `username` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(200) COLLATE utf8mb4_unicode_ci NOT NULL,
  `provinsi` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `kabupaten` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `nama_logo` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_login` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `users`
--

INSERT INTO `users` (`id`, `nama_desa`, `nama_kades`, `username`, `password`, `provinsi`, `kabupaten`, `nama_logo`, `last_login`) VALUES
(6, 'Maliku Baru', 'liyando', 'lili', '$2a$10$JfB9BwIWT7CnDTuBv1v19.6o35AjKglxkwFEcIbzNtG4AU1E0wDCS', 'kalimantan tengah,', 'palangkaraya', 'Maliku baru', NULL),
(7, 'Maliku lamaxx', 'liyandoxxxx', 'lilixx', '$2a$10$9yD5M/1DTAsJ0GnJCN4yqughtQ88IzrPwNpcIZzPokd5JnTj42i6W', 'kalimantan tengahxx', 'palangkarayaxx', 'Maliku baruxx', '2022-07-08 03:47:22'),
(10, 'Maliku lama', 'liyandoxx', 'lilixxxc', '$2a$10$HE5J044iWOPYJaKyAxW7heJcdNs42QOK.AWLL9zNEvUJXWT8j1EJS', 'kalimantan tengah', 'palangkaraya', 'Maliku baru', NULL),
(11, 'Maliku lama', 'liyandoxx', 'testing', '$2a$10$AZEA5Cr54FgbYKd36AUYs.HENRJYtgbXLzKo/xdZD52LIbIZIVHgq', 'kalimantan tengah', 'palangkaraya', 'Maliku baru', '2022-07-08 05:40:21');

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `laporan`
--
ALTER TABLE `laporan`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `admin`
--
ALTER TABLE `admin`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT untuk tabel `laporan`
--
ALTER TABLE `laporan`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT untuk tabel `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
