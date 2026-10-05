<script lang="ts">
  import * as Card from "#lib/components/ui/card/index.js";
  import { Clock } from "lucide-svelte";

  // Array de eventos para facilitar a manutenção e escalabilidade do cronograma
  const events = [
    {
      date: "10/OUT",
      time: "18:00",
      title: "Cerimônia de Abertura",
      description: "Junte-se a nós para a grande inauguração do festival, apresentando discursos de autoridades locais e uma performance especial de boas-vindas.",
      image: "/images/abertura.jpg" // Substitua pelo caminho real da sua imagem
    },
    {
      date: "11/OUT",
      time: "20:00",
      title: "Workshop de Sushi Clássico",
      description: "Aprenda as técnicas fundamentais da preparação do sushi com mestres culinários. Vagas limitadas, requer inscrição prévia.",
      image: "/images/sushi.jpg" // Substitua pelo caminho real da sua imagem
    },
    {
      date: "15/OUT",
      time: "20:00",
      title: "Workshop de Sushi Clássico",
      description: "Aprenda as técnicas fundamentais da preparação do sushi com mestres culinários. Vagas limitadas, requer inscrição prévia.",
      image: "/images/sushi.jpg" // Substitua pelo caminho real da sua imagem
    },
    {
      date: "11/OUT",
      time: "20:00",
      title: "Workshop de Sushi Clássico",
      description: "Aprenda as técnicas fundamentais da preparação do sushi com mestres culinários. Vagas limitadas, requer inscrição prévia.",
      image: "/images/sushi.jpg" // Substitua pelo caminho real da sua imagem
    }
  ];
</script>

<div class="min-h-screen bg-[#F8F9FA] font-sans px-4 py-12 lg:px-8 lg:py-20">
  <div class="mx-auto max-w-7xl">
    
    <!-- Cabeçalho da Página -->
    <div class="mb-12 max-w-3xl">
      <!-- Título com "Drop Cap" (Primeira letra maior e vermelha) -->
      <h1 class="mb-4  text-4xl font-bold text-gray-900 md:text-5xl flex items-baseline">
        Cronograma de Atividades
      </h1>
      
      <!-- Descrição da seção -->
      <p class="text-gray-600 leading-relaxed text-base md:text-lg">
        Explore a rica tapeçaria de eventos que preparamos para a Semana da Cultura Japonesa. De cerimônias 
        tradicionais a workshops interativos, nossa programação foi curada para oferecer uma imersão 
        profunda e autêntica.
      </p>
    </div>

    <!-- Grid de Eventos -->
    <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
      {#each events as event}
        <Card.Root class="rounded-none border-gray-200 bg-white shadow-sm flex flex-col overflow-hidden">
          <Card.Content class="p-8 flex-1 flex flex-col">
            
            <!-- Linha Superior: Data e Horário[cite: 1] -->
            <div class="flex items-center justify-between mb-6">
              <div class="bg-[#D92323] px-3 py-1 font-bold text-white text-sm">
                {event.date}
              </div>
              <div class="flex items-center gap-2 font-medium text-gray-700">
                <Clock class="h-5 w-5" />
                <span>{event.time}</span>
              </div>
            </div>

            <!-- Conteúdo Textual do Evento[cite: 1] -->
            <h2 class=" text-2xl font-bold text-gray-900 mb-3">
              {event.title}
            </h2>
            <p class="text-gray-600 mb-8 flex-1">
              {event.description}
            </p>

            <!-- Imagem do Evento em Escala de Cinza[cite: 1] -->
            <div class="mt-auto w-full">
              <img 
                src={event.image} 
                alt={event.title} 
                class="w-full h-[240px] object-cover grayscale"
              />
            </div>
            
          </Card.Content>
        </Card.Root>
      {/each}
    </div>

  </div>
</div>