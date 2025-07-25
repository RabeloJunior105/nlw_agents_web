import { useForm } from 'react-hook-form'
import { z } from 'zod/v4'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from './card'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/form'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { useCreateRoom } from '@/http/useCreateRoom'

const createRoomSchema = z.object({
  name: z.string().min(3, { message: 'Inclua no minimo 3 caracteres' }),
  description: z.string(),
})

type CreateRoomFormData = z.infer<typeof createRoomSchema>

export function CreateRoomForm() {
  const { mutateAsync: createRoom } = useCreateRoom()
  const createRoomForm = useForm<CreateRoomFormData>({
    resolver: zodResolver(createRoomSchema),
    defaultValues: {
      name: '',
      description: '',
    },
  })

  async function handleCreateRoom(data: CreateRoomFormData) {
    await createRoom({
      name: data.name,
      description: data.description,
    })

    createRoomForm.reset()
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Criar Salas</CardTitle>
        <CardDescription>
          Crie uma nova sala para começar a fazer e receber perguntas pelo Agent
          de IA
        </CardDescription>

        <CardContent>
          <Form {...createRoomForm}>
            <form
              onSubmit={createRoomForm.handleSubmit(handleCreateRoom)}
              className="flex flex-col gap-4"
            >
              <FormField
                control={createRoomForm.control}
                name="name"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>Nome da sala</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Digite o nome da sala" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )
                }}
              />
              <FormField
                control={createRoomForm.control}
                name="description"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>Descrição da sala</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Digite a descrição da sala"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )
                }}
              />
              <Button type="submit" className="w-full">
                Criar Sala
              </Button>
            </form>
          </Form>
        </CardContent>
      </CardHeader>
    </Card>
  )
}
