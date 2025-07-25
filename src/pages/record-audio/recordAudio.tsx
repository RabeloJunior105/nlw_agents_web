import { Button } from "@/components/ui/button";
import { useRef, useState } from "react";
import { Navigate, useParams } from "react-router-dom";

type AudioParams = {
    id: string
}
export function RecordAudio() {
    const params = useParams<AudioParams>()

    const [IsRecording, setIsRecording] = useState(false)
    const recorder = useRef<MediaRecorder | null>(null)

    const isRecordSupported = !!navigator.mediaDevices && typeof navigator.mediaDevices.getUserMedia === 'function' && typeof window.MediaRecorder

    const intervalRef = useRef<NodeJS.Timeout | null>(null)

    async function createRecorder(stream: MediaStream) {
        recorder.current = new MediaRecorder(stream, {
            mimeType: 'audio/webm',
            audioBitsPerSecond: 64_000,
        })

        recorder.current.ondataavailable = event => {
            if (event.data.size > 0) {
                console.log(event.data)
                uplodAudio(event.data)
            }
        }

        recorder.current.onstart = () => {
            console.log("iniciando gravaçao")
        }

        recorder.current.onstop = () => {
            console.log("pausando gravaçao")
        }

        recorder.current.start()
    }

    async function startRecording() {
        setIsRecording(true)
        if (!isRecordSupported) {
            alert("não suporta gravação")
            return
        }
        const audio = await navigator.mediaDevices.getUserMedia({
            audio: {
                echoCancellation: true,
                noiseSuppression: true,
                sampleRate: 44_100
            }
        })

        createRecorder(audio)

        intervalRef.current = setInterval(() => {
            recorder.current?.stop()
            createRecorder(audio)
        }, 5000)
    }

    async function stopRecording() {
        setIsRecording(false)

        if (recorder.current && recorder.current.state !== 'inactive') {
            recorder.current.stop()
        }

        if (intervalRef.current) {
            clearInterval(intervalRef.current)
        }
    }

    async function uplodAudio(audio: Blob) {

        const formdata = new FormData()
        formdata.append('file', audio, 'audio.webm')

        const response = await fetch(`http://localhost:3000/rooms/${params.id}/audio`, {
            method: 'POST',
            body: formdata
        })

        const result = await response.json()
        console.log(result)
    }

    if (!params.id) {
        return <Navigate replace to="/" />
    }


    return (
        <div className="h-screen flex items-center justify-center gap-3 flex-col">
            {
                !IsRecording ? (
                    <Button onClick={startRecording}>Gravar audio</Button>
                ) :
                    (
                        <Button onClick={stopRecording}>Parar gravação</Button>
                    )
            }

            {IsRecording && (
                <p>Gravando...</p>
            )}
        </div>
    )
}
