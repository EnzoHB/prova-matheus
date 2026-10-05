<!-- src/routes/culinaria/+page.svelte -->
<script lang="ts">
  import { Utensils } from 'lucide-svelte';
</script>

<div class="flex-grow">
  <main class="w-[85%] mx-auto py-12 md:py-20 min-h-screen">
    <header class="mb-12 md:mb-16">
      <h1 class="text-3xl md:text-5xl font-bold text-foreground mb-4">
        <span class="text-primary font-extrabold text-4xl md:text-6xl mr-2">O</span> que vamos servir
      </h1>
      <p class="text-lg max-w-2xl text-muted-foreground">
        Uma seleção cuidadosa de pratos tradicionais, preparados com ingredientes frescos e técnicas seculares. Nossa praça de alimentação oferece uma jornada gastronômica autêntica.
      </p>
    </header>
    
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
      <!-- Prato Destaque (Sushi) -->
      <figure class="bg-card text-card-foreground border-2 border-border p-6 md:p-8 flex flex-col md:flex-row gap-6 md:gap-8 items-center col-span-1 md:col-span-2 relative overflow-hidden group shadow-sm">
        <div class="w-full md:w-1/2 aspect-video bg-muted relative overflow-hidden rounded-sm">
          <img 
            class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out" 
            src="/semana-japonesa/img/suhsi.jpg" 
            alt="Sushi Clássico"
          />
        </div>
        <figcaption class="w-full md:w-1/2 flex flex-col justify-center">
          <h2 class="text-2xl md:text-3xl font-bold mb-2">Sushi Clássico</h2>
          <p class="text-lg text-muted-foreground mb-4">
            Nigiri e maki preparados por mestres sushi locais, utilizando peixes da estação e arroz temperado artesanalmente.
          </p>
          <ul class="list-none space-y-2 font-medium">
            <li class="flex items-center gap-2"><span class="w-2 h-2 rounded-full bg-primary"></span> Maguro (Atum)</li>
            <li class="flex items-center gap-2"><span class="w-2 h-2 rounded-full bg-muted-foreground"></span> Sake (Salmão)</li>
            <li class="flex items-center gap-2"><span class="w-2 h-2 rounded-full bg-muted-foreground"></span> Tamago (Omelete Doce)</li>
          </ul>
        </figcaption>
      </figure>
      
      <!-- Prato 2 (Ramen) -->
      <figure class="bg-card text-card-foreground border border-border p-6 flex flex-col group shadow-sm">
        <div class="w-full aspect-[4/3] bg-muted mb-4 overflow-hidden rounded-sm">
          <img 
            class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out" 
            src="/semana-japonesa/img/cardapio.jpg" 
            alt="Ramen de Porco"
          />
        </div>
        <figcaption>
          <h3 class="text-2xl font-bold mb-2">Ramen de Porco</h3>
          <p class="text-lg text-muted-foreground">
            Caldo Tonkotsu rico e encorpado, cozido lentamente, servido com macarrão artesanal, fatias de chashu, ovo marinado e cebolinha.
          </p>
        </figcaption>
      </figure>
      
      <!-- Prato 3 (Tempura) -->
      <figure class="bg-card text-card-foreground border border-border p-6 flex flex-col group shadow-sm">
        <div class="w-full aspect-[4/3] bg-muted mb-4 overflow-hidden relative rounded-sm">
          <div class="absolute inset-0 flex items-center justify-center bg-secondary/20">
            <!-- Substituí o material-symbols-outlined pelo ícone do Lucide (padrão do shadcn) -->
            <Utensils class="w-12 h-12 text-muted-foreground" />
          </div>
        </div>
        <figcaption>
          <h3 class="text-2xl font-bold mb-2">Tempura Misto</h3>
          <p class="text-lg text-muted-foreground">
            Legumes frescos e camarões empanados em uma massa leve e crocante, acompanhados de molho tentsuyu suave.
          </p>
        </figcaption>
      </figure>
    </div>
  </main>
</div>