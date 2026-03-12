<?php

namespace App\Service;

use GuzzleHttp\Client;
use GuzzleHttp\Exception\GuzzleException;

class GeminiService
{
    private Client $client;
    private string $apiKey;
    private string $model;
    private string $apiUrl = 'https://generativelanguage.googleapis.com/v1beta/models/';

    public function __construct(string $apiKey, string $model)
    {
        $this->apiKey = $apiKey;
        $this->model = $model;
        $this->client = new Client([
            'timeout' => 30,
            'verify' => false // Development only - set to true in production
        ]);
    }

    public function getAnswer(string $userQuestion, string $faqContext): string
    {
        $systemPrompt = "Bạn là trợ lý AI thông minh của cửa hàng. Nhiệm vụ của bạn là trả lời câu hỏi của khách hàng dựa trên thông tin FAQ được cung cấp.

Quy tắc:
1. Chỉ trả lời dựa trên thông tin có trong FAQ
2. Nếu không tìm thấy thông tin phù hợp, hãy lịch sự nói rằng bạn không có thông tin đó và đề nghị khách hàng liên hệ trực tiếp
3. Trả lời ngắn gọn, thân thiện và chuyên nghiệp
4. Sử dụng tiếng Việt tự nhiên

Thông tin FAQ:
{$faqContext}

Câu hỏi của khách hàng: {$userQuestion}";

        try {
            $url = $this->apiUrl . $this->model . ':generateContent?key=' . $this->apiKey;
            
            $response = $this->client->post($url, [
                'json' => [
                    'contents' => [
                        [
                            'role' => 'user',
                            'parts' => [
                                ['text' => $systemPrompt]
                            ]
                        ]
                    ],
                    'generationConfig' => [
                        'temperature' => 0.7,
                        'maxOutputTokens' => 500,
                    ]
                ],
                'headers' => [
                    'Content-Type' => 'application/json'
                ]
            ]);

            $data = json_decode($response->getBody()->getContents(), true);
            
            if (isset($data['candidates'][0]['content']['parts'][0]['text'])) {
                return $data['candidates'][0]['content']['parts'][0]['text'];
            }
            
            throw new \RuntimeException('Invalid response format from Gemini API');
            
        } catch (GuzzleException $e) {
            $errorDetails = $e->getMessage();
            if ($e->hasResponse()) {
                $errorDetails .= " | Response: " . $e->getResponse()->getBody()->getContents();
            }
            throw new \RuntimeException('Gemini API error: ' . $errorDetails);
        }
    }
}
