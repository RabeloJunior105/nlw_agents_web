import { useQuery } from "@tanstack/react-query"
import type { GetRoomsQuestionsResponse } from "./types/GetRoomQuestionsResponse"

export function useRoomQuestions(roomId: string) {
    return useQuery({
        queryKey: ['get-questions', roomId],

        queryFn: async () => {
            const response = await fetch(`http://localhost:3000/rooms/${roomId}/questions`)
            const dataRes: GetRoomsQuestionsResponse = await response.json()
            return dataRes
        },
    })
}



