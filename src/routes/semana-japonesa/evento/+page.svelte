<!-- src/routes/midia/+page.svelte -->
<div class="flex-grow">
  <main class="w-[85%] max-w-7xl mx-auto py-12 md:py-20">
    <div class="mb-12 md:mb-16 border-b border-border pb-4">
      <h1 class="text-3xl md:text-5xl font-bold text-primary">
        Mídia & Acervo
      </h1>
      <p class="text-lg text-muted-foreground mt-4 max-w-2xl">
        Explore os registros visuais e audiovisuais das edições anteriores da Semana da Cultura Japonesa. Um mergulho na tradição, arte e gastronomia.
      </p>
    </div>
    
    <section class="mb-12 md:mb-16">
      <div class="bg-card text-card-foreground border-2 border-border p-1 relative mt-8 shadow-sm">
        <h2 class="absolute -top-7 left-4 bg-background px-4 text-xl md:text-2xl font-bold border-x-2 border-t-2 border-border flex items-center gap-1">
          <span class="text-primary font-extrabold text-3xl md:text-4xl">T</span>easer Oficial
        </h2>
        
        <div class="mt-8 aspect-video w-full bg-black flex items-center justify-center relative overflow-hidden rounded-sm">
          <!-- svelte-ignore a11y_media_has_caption -->
          <video 
            class="w-full h-full object-cover" 
            controls 
            src="/semana-japonesa/teaser.mp4"
          >
            Seu navegador não suporta a tag de vídeo.
          </video>
        </div>
        
        <div class="p-4 bg-muted/30 border-t border-border mt-1">
          <p class="font-semibold text-foreground">Momentos da Edição 2023</p>
          <p class="text-sm text-muted-foreground mt-1">
            Duração: 2:45 | Uma celebração da arte, dança e gastronomia que definem nossa herança cultural.
          </p>
        </div>
      </div>
    </section>
  </main>
</div>