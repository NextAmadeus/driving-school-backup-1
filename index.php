<?php
// 로그인 상태 확인
session_start();

// 로그인되지 않은 경우 로그인 페이지로 리다이렉트
if (!isset($_SESSION['isLoggedIn']) || $_SESSION['isLoggedIn'] !== true) {
    header('Location: login.html');
    exit();
}

// 로그인된 경우 메인 페이지로 리다이렉트
header('Location: index.html');
exit();
?>
