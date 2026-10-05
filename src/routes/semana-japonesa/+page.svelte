<script lang="ts">
  import { Button } from "#lib/components/ui/button/index.js";
  import * as Card from "#lib/components/ui/card/index.js";
  import { MapPin, Utensils, Paintbrush } from "lucide-svelte";
</script>

<div class="min-h-screen bg-[#F8F9FA] font-sans">
  <!-- HERO SECTION -->
  <section class="relative mx-auto flex max-w-7xl flex-col items-center justify-between px-4 py-12 lg:flex-row lg:px-8 lg:py-24">
    
    <!-- Left Content / Overlapping Card -->
    <div class="relative z-10 w-full lg:w-1/2 lg:-mr-16">
      <!-- Hard red shadow effect recreated with box-shadow[cite: 1] -->
      <div class="bg-white p-8 shadow-[8px_8px_0_0_#D92323] md:p-12 border border-gray-100">
        <p class="mb-4 text-sm font-bold tracking-widest text-[#D92323] uppercase">
          10 a 15 de Outubro
        </p>
        
        <h1 class="mb-6 text-4xl font-bold leading-tight text-gray-900 md:text-5xl">
          O que é a Semana da Cultura Japonesa?
        </h1>
        
        <!-- Red left border paragraph[cite: 1] -->
        <div class="mb-8 border-l-4 border-[#D92323] pl-4 text-gray-600">
          <p>
            Uma imersão profunda nas tradições, na arte e na culinária milenar, 
            apresentada através de uma lente contemporânea. Explore o contraste 
            entre o antigo e o novo em uma celebração única.
          </p>
        </div>
        
        <div class="mb-8 flex items-center gap-2 font-medium text-gray-900">
          <MapPin class="h-5 w-5 text-[#D92323]" />
          <span>Centro de Exposições, São Paulo</span>
        </div>
        
        <Button class="bg-[#1C1C1C] text-white hover:bg-black px-8 py-6 rounded-4xl text-base">
          Garantir Participação
        </Button>
      </div>
    </div>

    <!-- Right Image[cite: 1] -->
    <div class="mt-8 w-full lg:mt-0 lg:w-[60%]">
      <!-- Replace src with your actual abstract torii gate image -->
      <img 
        src="/images/hero-graphic.png" 
        alt="Gráfico da Cultura Japonesa" 
        class="h-auto w-full object-contain"
      />
    </div>
  </section>

  <!-- FEATURES GRID SECTION -->
  <section class="mx-auto max-w-7xl px-4 py-16 lg:px-8 bg-white">
    <div class="grid grid-cols-1 gap-6 lg:grid-cols-3">
      
      <a href="/semana-japonesa/culinaria" class="relative col-span-1 flex min-h-[400px] flex-col justify-end overflow-hidden border bg-gray-100 lg:col-span-2 transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:border-[#D92323] cursor-pointer">
        <img 
          src="/images/matcha-tea.jpg" 
          alt="Tradição Milenar Cerimônia do Chá" 
          class="absolute inset-0 h-full w-full object-cover"
        />
        <!-- Dark gradient overlay for text readability[cite: 2] -->
        <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
        
        <div class="relative z-10 p-8">
          <span class="mb-4 inline-block bg-[#D92323] px-3 py-1 text-sm font-semibold text-white">
            Destaque
          </span>
          <h2 class="mb-2 font-serif text-3xl font-bold text-white">
            Tradição Milenar
          </h2>
          <p class="max-w-md text-gray-200">
            Cerimônias do chá, caligrafia e apresentações de Taiko em uma atmosfera de puro respeito histórico.
          </p>
        </div>
     </a>

      <!-- Right Column: Smaller Cards[cite: 2] -->
      <div class="col-span-1 flex flex-col gap-6">
        
        <!-- Gastronomy Card[cite: 2] -->
        <Card.Root class="flex-1 rounded-none border-gray-200 bg-[#FAFAFA] transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:border-[#D92323] cursor-pointer">
            <Card.Header class="pb-2">
            <Utensils class="h-6 w-6 text-[#D92323] mb-2" />
            <Card.Title class="text-lg font-extrabold">Gastronomia Autêntica</Card.Title>
          </Card.Header>
          <Card.Content>
            <p class="text-sm text-gray-600">
              Pratos icônicos preparados por mestres culinários, do sushi tradicional ao contemporâneo izakaya.
            </p>
          </Card.Content>
        </Card.Root>

        <!-- Art Workshops Card[cite: 2] -->
        <Card.Root class="flex-1 rounded-none border-gray-200 bg-[#FAFAFA] shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:border-[#D92323] cursor-pointer">
          <Card.Header class="pb-2">
            <Paintbrush class="h-6 w-6 text-[#D92323] mb-2" />
            <Card.Title class="text-lg font-extrabold">Oficinas de Arte</Card.Title>
          </Card.Header>
          <Card.Content>
            <p class="text-sm text-gray-600">
              Workshops interativos de Origami, Shodo e Ikebana abertos ao público de todas as idades.
            </p>
          </Card.Content>
        </Card.Root>

      </div>
    </div>
  </section>
</div>