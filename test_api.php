<?php
// 간단한 API 테스트
$testData = [
    'name' => '테스트회원',
    'gender' => 'male',
    'phone' => '010-1234-5678',
    'address' => '서울시',
    'productName' => '테스트상품',
    'productPrice' => 100000,
    'paymentType' => 'card',
    'visitPaths' => ['지인추천'],
    'practiceMethod' => 'first',
    'preConsultation' => true,
    'writtenPass' => false,
    'functionPass' => false,
    'drivingPass' => false,
    'finalPass' => false,
    'refunded' => false,
    'expired' => false,
    'termsAgreed' => true,
    'generalMemo' => '테스트메모',
    'educationMemos' => ['교육메모1', '교육메모2']
];

echo "테스트 데이터 필드 수: " . count($testData) . "\n";
echo "테스트 데이터: " . json_encode($testData, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT) . "\n";

// API 호출
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, 'http://localhost:8000/api/members_complete_final.php');
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($testData));
curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json']);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

echo "HTTP 코드: " . $httpCode . "\n";
echo "응답: " . $response . "\n";
?>
