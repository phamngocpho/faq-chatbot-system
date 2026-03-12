<?php

namespace App\Controller;

use App\Service\FaqService;
use App\Service\GeminiService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class AiController extends AbstractController
{
    private FaqService $faqService;
    private GeminiService $geminiService;

    public function __construct(FaqService $faqService, GeminiService $geminiService)
    {
        $this->faqService = $faqService;
        $this->geminiService = $geminiService;
    }

    public function healthCheck(): JsonResponse
    {
        return new JsonResponse([
            'status' => 'ok',
            'service' => 'FAQ AI Microservice',
            'ai_provider' => 'Google Gemini',
            'version' => '1.0.0',
            'timestamp' => date('Y-m-d H:i:s')
        ]);
    }

    public function getAnswer(Request $request): JsonResponse
    {
        try {
            // Parse request body
            $data = json_decode($request->getContent(), true);
            
            if (!isset($data['question']) || empty(trim($data['question']))) {
                return new JsonResponse([
                    'success' => false,
                    'error' => 'Question is required'
                ], Response::HTTP_BAD_REQUEST);
            }

            $userQuestion = trim($data['question']);
            $sessionId = $data['session_id'] ?? uniqid('session_', true);

            // Fetch FAQs from backend
            $faqs = $this->faqService->getAllFaqs();
            
            if (empty($faqs)) {
                return new JsonResponse([
                    'success' => false,
                    'error' => 'No FAQs available'
                ], Response::HTTP_SERVICE_UNAVAILABLE);
            }

            // Format FAQs for AI prompt
            $faqContext = $this->faqService->formatFaqsForPrompt($faqs);

            // Get answer from Gemini
            $answer = $this->geminiService->getAnswer($userQuestion, $faqContext);

            return new JsonResponse([
                'success' => true,
                'data' => [
                    'question' => $userQuestion,
                    'answer' => $answer,
                    'session_id' => $sessionId,
                    'timestamp' => date('Y-m-d H:i:s')
                ]
            ]);

        } catch (\Exception $e) {
            return new JsonResponse([
                'success' => false,
                'error' => $e->getMessage()
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
