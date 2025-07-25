import { useQuery } from '@tanstack/react-query'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from './card'
import { Link } from 'react-router-dom'
import { Badge } from './ui/badge'
import { dayjs } from '@/lib/dayjs'
import { ArrowRight } from 'lucide-react'
import type { GetRoomsAPIResponse } from '@/http/types/GetRoomsAPIResponse.'

export function RoomList() {
  const { data, isLoading } = useQuery({
    queryKey: ['get-rooms'],
    queryFn: async () => {
      const response = await fetch('http://localhost:3000/rooms')
      const dataRes: GetRoomsAPIResponse[] = await response.json()
      return dataRes
    },
  })

  return (
    <Card>
      <CardHeader>
        <CardTitle>Salas Recentes</CardTitle>
        <CardDescription>Acesso Rapido as salas criadas</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        {isLoading && (
          <span className="text-muted text-sm">Carregando salas...</span>
        )}
        {data?.map((room) => {
          return (
            <Link
              key={room.id}
              className="flex items-center justify-between rounded-lg border p-3 hover:bg-accent"
              to={`/rooms/${room.id}`}
            >
              <div className="flex flex-1 flex-col gap-1">
                <h3 className="font-medium">{room.name}</h3>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">
                    {dayjs(room.createdAt).toNow()}
                  </Badge>

                  <Badge variant="secondary">
                    {room.questions_count} Pergunta(s)
                  </Badge>
                </div>
              </div>
              <span className="flex items-center gap-1 text-sm">
                Entrar
                <ArrowRight className="size-3" />
              </span>
            </Link>
          )
        })}
      </CardContent>
    </Card>
  )
}
