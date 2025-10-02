<?php
// 서버 상태 디버깅용 파일
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');

echo json_encode([
    'status' => '서버 연결 성공',
    'timestamp' => date('Y-m-d H:i:s'),
    'php_version' => phpversion(),
    'pdo_available' => extension_loaded('pdo'),
    'mysqli_available' => extension_loaded('mysqli'),
    'request_method' => $_SERVER['REQUEST_METHOD'],
    'content_type' => $_SERVER['CONTENT_TYPE'] ?? 'not set',
    'raw_input' => file_get_contents('php://input'),
    'post_data' => $_POST,
    'get_data' => $_GET
], JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
?>
