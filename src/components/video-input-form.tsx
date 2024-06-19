import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { FileVideo, Upload } from "lucide-react";
import { ChangeEvent, FormEvent, useMemo, useRef, useState } from "react";
import { getFFmpeg } from "@/lib/ffmpeg";
import { fetchFile } from "@ffmpeg/util";
import { api } from "@/lib/axios";

export function VideoInputForm({
  updateTranscription,
}: {
  updateTranscription: (transcription: string) => void;
}) {
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const promptInputRef = useRef<HTMLTextAreaElement>(null);
  const handleFileSelected = (event: ChangeEvent<HTMLInputElement>) => {
    const { files } = event.currentTarget;
    const isEmptyFile = !files || files.length === 0;

    if (isEmptyFile) {
      return;
    }

    const selectedFile = files[0];
    setVideoFile(selectedFile);
  };

  const previewURl = useMemo(() => {
    if (!videoFile) {
      return;
    }

    return URL.createObjectURL(videoFile);
  }, [videoFile]);

  const convertVideoToAudio = async (video: File) => {
    console.log("Convert started ...");

    const ffmpeg = await getFFmpeg();

    console.log(ffmpeg);

    await ffmpeg.writeFile("input.mp4", await fetchFile(video));

    ffmpeg.on("progress", (progress) => {
      console.log(
        "Convert progress" + Math.round(progress.progress * 100) + "%"
      );
    });

    await ffmpeg.exec([
      // The "-i" flag is used to specify the input file.
      // "input.mp4" is the name of the input file.
      "-i",
      "input.mp4",

      // The "-map" flag is used to specify which streams to include in the output.
      // "0:a" means select the first audio stream.
      "-map",
      "0:a",

      // The "-b:a" flag is used to specify the bitrate for the audio stream.
      // "20k" means 20 kilobits per second.
      "-b:a",
      "20k",

      // The "-acodec" flag is used to specify the audio codec to use for the output.
      // "libmp3lame" is a popular audio codec for MP3 encoding.
      "-acodec",
      "libmp3lame",

      // The last argument is the name of the output file.
      "output.mp3",
    ]);

    const data = await ffmpeg.readFile("output.mp3");

    const audioFileBlob = new Blob([data], {
      type: "audio/mp3",
    });
    const audioFile = new File([audioFileBlob], "audio.mp3", {
      type: "audio/mpeg",
    });

    console.log("Convert finished");

    return audioFile;
  };
  const handleUploadVideo = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const prompt = promptInputRef.current?.value;

    if (!videoFile) {
      return;
    }
    if (!prompt) {
      return;
    }

    const audioFile = await convertVideoToAudio(videoFile);

    const data = new FormData();
    data.append("file", audioFile);

    const response = await api.post("/video", data);
    const videoId = response.data.video.id;

    const result = await api.post(`/video/${videoId}/transcription`, {
      prompt,
    });

    updateTranscription(result.data.transcription);
  };

  return (
    <form onSubmit={handleUploadVideo} className="space-y-6">
      <label
        htmlFor="video"
        className="border flex rounded-md aspect-video cursor-pointer border-dashed text-sm flex-col gap-2 items-center justify-center text-muted-foreground hover:bg-primary/20 transition-colors relative"
      >
        {previewURl ? (
          <video
            controls={false}
            src={previewURl}
            className="pointer-events-none absolute inset-0"
          />
        ) : (
          <>
            <FileVideo className="size-4" />
            Selecione um vídeo
          </>
        )}
      </label>

      <input
        type="file"
        id="video"
        accept="video/mp4"
        className="sr-only"
        onChange={handleFileSelected}
      />

      <Separator />

      <div className="space-y-2 ">
        <Label htmlFor="transcription-prompt">Prompt de transcriçao</Label>
        <Textarea
          ref={promptInputRef}
          id="transcription-prompt"
          className="min-h-20 leading-relaxed resize-none"
          placeholder="Inclua palavras chave mencionada no vídeo separadas por virgula"
        />
      </div>

      <Button type="submit" className="w-full">
        Carregar vídeo
        <Upload className="size-4 ml-2" />
      </Button>
    </form>
  );
}
