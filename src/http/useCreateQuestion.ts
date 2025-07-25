import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { CreateRoomQuestionRequest, CreateRoomQuestionResponse } from "./types/CreateQuestionRequest";
import type { GetRoomsQuestionsResponse } from "./types/GetRoomQuestionsResponse";
import type { id } from "zod/v4/locales";

export function useCreateQuestions(roomId: string) {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async ({ question }: CreateRoomQuestionRequest) => {
            const response = await fetch(`http://localhost:3000/rooms/${roomId}/questions`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ question })
            })

            const result: CreateRoomQuestionResponse = await response.json()
            return result
        },

        onMutate: ({ question }) => {
            const questions = queryClient.getQueryData<GetRoomsQuestionsResponse[]>(['get-questions', roomId])


            const questionArray = questions ? questions : []

            const newQuestion: GetRoomsQuestionsResponse = {
                id: crypto.randomUUID(),
                question,
                answer: null,
                createdAt: new Date().toISOString(),
                isGenmeratingAnswer: true,
            }
            queryClient.setQueryData<GetRoomsQuestionsResponse[]>(['get-questions', roomId], [
                newQuestion,
                ...questionArray
            ])

            return { newQuestion, questions }
        },
        onError(_error, _variables, context) {

            if (context?.questions) {
                queryClient.setQueryData<GetRoomsQuestionsResponse[]>(['get-questions', roomId], context?.questions)
            }

        },
        onSuccess(data, _variables, context) {
            queryClient.setQueryData<GetRoomsQuestionsResponse[]>(['get-questions', roomId], (questions) => {

                if (!questions) {
                    return questions
                }
                if (!context?.newQuestion) {
                    return questions
                }


                return questions.map(question => {
                    if (question.id === context.newQuestion.id) {
                        return {
                            ...context.newQuestion,
                            id: data.id,
                            answer: data.awnser,
                            isGenmeratingAnswer: false,
                        }

                    }

                    return question
                })
            })
        },
    })
}