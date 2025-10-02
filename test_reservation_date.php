<?php
// 예약일 저장 테스트
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

try {
    // 데이터베이스 연결
    $host = 'localhost';
    $dbname = 'induck1111';
    $username = 'induck1111';
    $password = 'APPLEwogh3853!';
    
    $conn = new mysqli($host, $username, $password, $dbname);
    
    if ($conn->connect_error) {
        throw new Exception('DB 연결 실패: ' . $conn->connect_error);
    }
    
    $conn->set_charset("utf8mb4");
    
    // 테스트 데이터
    $testData = [
        'memberId' => null,
        'memberName' => '테스트 예약',
        'memberType' => 'new',
        'scheduleType' => 'practice',
        'startHour' => '09',
        'startMinute' => '00',
        'endHour' => '10',
        'endMinute' => '00',
        'targetDay' => 1,
        'targetSeat' => 1,
        'reservationDate' => '2024-01-15', // 테스트 예약일
        'reservationMemo' => '테스트 메모',
        'educationMemos' => [],
        'functionTestDate' => null,
        'roadTestDate' => null,
        'productName' => '테스트 상품',
        'productHours' => 1,
        'contactPhone' => '010-1234-5678'
    ];
    
    // 예약 저장
    $stmt = $conn->prepare("INSERT INTO reservations (member_id, member_name, contact_phone, member_type, schedule_type, start_hour, start_minute, end_hour, end_minute, target_day, target_seat, reservation_date, reservation_memo, education_memos, function_test_date, road_test_date, product_name, product_hours) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
    
    if (!$stmt) {
        throw new Exception("Prepare failed: " . $conn->error);
    }
    
    $memberId = $testData['memberId'];
    $memberName = $testData['memberName'];
    $contactPhone = $testData['contactPhone'];
    $memberType = $testData['memberType'];
    $scheduleType = $testData['scheduleType'];
    $startHour = $testData['startHour'];
    $startMinute = $testData['startMinute'];
    $endHour = $testData['endHour'];
    $endMinute = $testData['endMinute'];
    $targetDay = $testData['targetDay'];
    $targetSeat = $testData['targetSeat'];
    $reservationDate = $testData['reservationDate'];
    $reservationMemo = $testData['reservationMemo'];
    $educationMemos = json_encode($testData['educationMemos']);
    $functionTestDate = $testData['functionTestDate'];
    $roadTestDate = $testData['roadTestDate'];
    $productName = $testData['productName'];
    $productHours = $testData['productHours'];
    
    $stmt->bind_param("issssssssiisssssi", $memberId, $memberName, $contactPhone, $memberType, $scheduleType, $startHour, $startMinute, $endHour, $endMinute, $targetDay, $targetSeat, $reservationDate, $reservationMemo, $educationMemos, $functionTestDate, $roadTestDate, $productName, $productHours);
    
    if ($stmt->execute()) {
        $reservationId = $conn->insert_id;
        echo json_encode([
            'success' => true,
            'message' => '예약일 저장 테스트 성공',
            'reservationId' => $reservationId,
            'reservationDate' => $reservationDate
        ]);
    } else {
        throw new Exception("Execute failed: " . $stmt->error);
    }
    
    $stmt->close();
    
} catch (Exception $e) {
    echo json_encode([
        'success' => false,
        'message' => $e->getMessage()
    ]);
} finally {
    if (isset($conn)) {
        $conn->close();
    }
}
?>
