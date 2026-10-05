<!-- src/routes/galeria/+page.svelte -->
<div class="flex-grow">
  <main class="w-[85%] mx-auto py-12 md:py-20">
    <section class="mb-16 text-center">
      <h1 class="text-3xl md:text-5xl font-bold text-foreground mb-4">
        Memórias da Tradição
      </h1>
      <p class="text-lg text-muted-foreground max-w-2xl mx-auto">
        Explore registros visuais da nossa última edição, capturando a essência da culinária, as apresentações culturais e a atmosfera vibrante da Semana da Cultura Japonesa.
      </p>
    </section>
    
    <section class="grid grid-cols-1 md:grid-cols-3 md:grid-rows-3 gap-4 md:gap-6 h-auto md:h-[800px] mb-16">
      <!-- Imagem Destaque (Ocupa 2 colunas e 2 linhas) -->
      <div class="md:col-span-2 md:row-span-2 border-2 border-border relative group overflow-hidden bg-card p-2 h-[400px] md:h-auto shadow-sm">
        <img 
          class="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" 
          src="/semana-japonesa/img/gal-1.jpg" 
          alt="Cerimônia do Chá" 
        />
        <div class="absolute bottom-4 left-4 bg-background/95 px-4 py-2 border opacity-0 group-hover:opacity-100 transition-opacity shadow-sm">
          <span class="font-semibold text-foreground">Cerimônia do Chá</span>
        </div>
      </div>
      
      <!-- Imagem Menor 1 -->
      <div class="border border-border relative group overflow-hidden bg-card p-2 aspect-square shadow-sm">
        <img 
          class="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" 
          src="/semana-japonesa/img/gal-2.jpg" 
          alt="Apresentação de Tambores Taiko" 
        />
      </div>
      
      <!-- Imagem Menor 2 -->
      <div class="border border-border relative group overflow-hidden bg-card p-2 aspect-square shadow-sm">
        <img 
          class="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" 
          src="/semana-japonesa/img/gal-3.jpg" 
          alt="Workshop de Origami" 
        />
      </div>
      
      <!-- Imagem Larga (Base) -->
      <div class="md:col-span-2 border border-border relative group overflow-hidden bg-card p-2 h-[200px] md:h-auto shadow-sm">
        <img 
          class="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" 
          src="/semana-japonesa/img/gal-4.jpg" 
          alt="Público aproveitando a gastronomia no festival" 
        />
      </div>
    </section>
  </main>
</div>