import { Github, Wand2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { VideoInputForm } from "@/components/video-input-form";
import { useState } from "react";

export function Home() {
  const [transcription, setTriscription] = useState("");
  return (
    <div className="min-h-screen flex flex-col">
      <header className="flex px-6 py-3 items-center justify-between border-b">
        <h1 className="text-xl font-bold">Upload AI</h1>

        <div className="flex items-center gap-3">
          <span className="text-sm text-muted-foreground">
            Developed by Matheus Sunderhus
          </span>

          <Separator orientation="vertical" className="h-6" />
          <Button variant={"outline"}>
            <Github className="w-4 h-4 mr-2" />
            Github
          </Button>
        </div>
      </header>

      <main className="flex flex-1 p-6 gap-6">
        <div className="flex flex-1 flex-col gap-4">
          <div className="grid grid-rows-2 gap-4 flex-1">
            <Textarea
              className="resize-none p-4 leading-relaxed"
              placeholder="Inclua o prompt para a IA..."
            />
            <Textarea
              className="resize-none p-4 leading-relaxed"
              placeholder="Resultado gerado pela IA..."
              value={transcription}
              readOnly
            />
          </div>
          <p className="text-sm text-muted-foreground">
            Lembre-se: Você pode utilizar a variável{" "}
            <code className="text-green-400">
              {"{"}transcription{"}"}
            </code>{" "}
            no prompt para adicionar o conteúdo da transcrição do vídeo
            selecionado
          </p>
        </div>

        <aside className="w-80 space-y-6">
          <VideoInputForm updateTranscription={setTriscription} />
          <Separator />
          <form className="space-y-6">
            <div className="space-y-2">
              <Label>Prompt</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione um prompt" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="youtube">Youtube</SelectItem>
                  <SelectItem value="linkedin">LinkedIn</SelectItem>
                </SelectContent>
              </Select>
              <span className="block text-xs text-muted-foreground italic">
                Você poderá customizar essa opção em breve
              </span>
            </div>
            <div className="space-y-2">
              <Label>Model *</Label>
              <Select disabled value="gpt3.5">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="gpt3.5">GPT 3.5 Turbo</SelectItem>
                  <SelectItem value="gpt4.0">GPT 4.o</SelectItem>
                </SelectContent>
              </Select>
              <span className="block text-xs text-muted-foreground italic">
                *Você poderá customizar essa opção em breve
              </span>
            </div>

            <div className="space-y-2">
              <div className="space-y-4">
                <Label>Temperature</Label>
                <Slider min={0} max={1} step={0.1} value={[0.5]}></Slider>
                <span className="block text-xs text-muted-foreground italic">
                  Valores mais altos tendem a deixar o resultado mais criativo e
                  com possíveis erros.
                </span>
              </div>
              <Separator />

              <Button type="submit" className="w-full">
                Executar
                <Wand2 className="size-4 ml-2" />
              </Button>
            </div>
          </form>
        </aside>
      </main>
    </div>
  );
}
