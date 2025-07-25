import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { CreateRoom } from './pages/rooms/create'
import { Room } from './pages/rooms/rooms'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { RecordAudio } from './pages/record-audio/recordAudio'

const queryClient = new QueryClient()
export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route index element={<CreateRoom />} />
          <Route path="/rooms/:id" element={<Room />} />
          <Route path="/room/:id/audio" element={<RecordAudio />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  )
}
