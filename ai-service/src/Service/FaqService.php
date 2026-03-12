<?php

namespace App\Service;

use Symfony\Contracts\HttpClient\HttpClientInterface;

class FaqService
{
    private HttpClientInterface $httpClient;
    private string $backendApiUrl;

    public function __construct(HttpClientInterface $httpClient, string $backendApiUrl)
    {
        $this->httpClient = $httpClient;
        $this->backendApiUrl = $backendApiUrl;
    }

    public function getAllFaqs(): array
    {
        try {
            $response = $this->httpClient->request('GET', $this->backendApiUrl . '/faqs');
            $data = $response->toArray();
            
            return $data['data'] ?? [];
        } catch (\Exception $e) {
            throw new \RuntimeException('Failed to fetch FAQs: ' . $e->getMessage());
        }
    }

    public function formatFaqsForPrompt(array $faqs): string
    {
        $formatted = "Danh sách câu hỏi và câu trả lời:\n\n";
        
        foreach ($faqs as $faq) {
            $formatted .= "Q: {$faq['question']}\n";
            $formatted .= "A: {$faq['answer']}\n";
            if (!empty($faq['keywords'])) {
                $formatted .= "Keywords: {$faq['keywords']}\n";
            }
            $formatted .= "\n";
        }
        
        return $formatted;
    }
}
