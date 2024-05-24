import {Github,FileVideo,Upload,Wand2} from 'lucide-react'
import { Button } from "@/components/ui/button";
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';

export function Home(){
  return(
    <div className='min-h-screen flex flex-col'>
      <header className="flex px-6 py-3 items-center justify-between border-b">
          <h1 className="text-xl font-bold">Upload AI</h1>

          <div className="flex items-center gap-3" >
            <span className="text-sm text-muted-foreground">Developed by Matheus Sunderhus</span>

            <Separator orientation='vertical' className='h-6'/>
            <Button  variant={"outline"}>
              <Github className='w-4 h-4 mr-2'/>
              Github</Button>
            </div>
      </header>

      <main className='flex flex-1 p-6 gap-6'>
        <div className='flex flex-1 flex-col gap-4'>
          <div className='grid grid-rows-2 gap-4 flex-1'>
              <Textarea className='resize-none p-4 leading-relaxed' placeholder='Inclua o prompt para a IA...'/>
              <Textarea className='resize-none p-4 leading-relaxed' placeholder='Resultado gerado pela IA...' readOnly/>
          </div>
          <p className='text-sm text-muted-foreground'>Lembre-se: Você pode utilizar a variável <code className='text-green-400'>
          {'{'}transcription{'}'}</code> no prompt para adicionar o conteúdo da transcrição do vídeo selecionado</p>
        </div>

        <aside className='w-80 space-y-6'>
          <form className='space-y-6' >
            <label htmlFor="video" className='border flex rounded-md aspect-video cursor-pointer border-dashed text-sm flex-col gap-2 items-center justify-center text-muted-foreground hover:bg-primary/20 transition-colors'>
              <FileVideo className='size-4' />
              Selecione um vídeo
            </label>
            <input 
              type="file"
              id="video"
              accept="video/mp4" 
              className="sr-only" />
              <Separator />
              <div className='space-y-2 '>
                <Label htmlFor='transcription-prompt'>Prompt de transcriçao</Label>
                <Textarea id='transcription-prompt' className='min-h-20 leading-relaxed resize-none'
                placeholder='Inclua palavras chave mencionada no vídeo separadas por virgula'/>
              </div>

              <Button type='submit' className='w-full'>
                Carregar vídeo
                <Upload  className='size-4 ml-2'/>
              </Button>
          </form>
          <Separator />
          <form className='space-y-6' >

            <div className='space-y-2'>
                <Label>Prompt</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder='Selecione um prompt'/>
                  </SelectTrigger>
                  <SelectContent >
                    <SelectItem value='youtube'>Youtube</SelectItem>
                    <SelectItem value='linkedin'>LinkedIn</SelectItem>
                  </SelectContent>
                </Select>
                <span className='block text-xs text-muted-foreground italic'>Você poderá customizar essa opção em breve</span>
            </div>
            <div className='space-y-2'>
                <Label>Model *</Label>
                <Select disabled value='gpt3.5'>
                  <SelectTrigger>
                    <SelectValue/>
                  </SelectTrigger>
                  <SelectContent >
                    <SelectItem value='gpt3.5'>GPT 3.5 Turbo</SelectItem>
                    <SelectItem value='gpt4.0'>GPT 4.o</SelectItem>
                  </SelectContent>
                </Select>
                <span className='block text-xs text-muted-foreground italic'>*Você poderá customizar essa opção em breve</span>
            </div>

            <div className='space-y-2'>
              <div className='space-y-4'>
                <Label>Temperature</Label>
                <Slider  min={0} max={1} step={0.1} value={[0.5]}>
                  
                </Slider>
                <span className='block text-xs text-muted-foreground italic'>Valores mais altos tendem a deixar o resultado mais criativo e com possíveis erros.</span>
              </div>
              <Separator/>   

              <Button type='submit' className='w-full'>
                Executar
                <Wand2  className='size-4 ml-2'/>
              </Button>         
            </div>
          </form>
        </aside>
      </main>
    </div>
  )
}