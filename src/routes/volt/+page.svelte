<script lang=ts>
    import { onMount } from 'svelte';
    import "./style.css"
    import * as Drawer from '#lib/components/ui/drawer/index.ts';
    import { Plus, Minus, ShoppingCart, X } from 'lucide-svelte';
    import { Produto, Carrinho, Gerenciador, Pedido } from './classes.svelte';

    import { Button } from '#lib/components/ui/button'; 
    import { Input } from '#lib/components/ui/input'; 
    import { Textarea } from '#lib/components/ui/textarea';
    import { Label } from '#lib/components/ui/label';
    import { Badge } from '#lib/components/ui/badge';
    import * as Card from '#lib/components/ui/card/index.ts';
    import * as Alert from "#lib/components/ui/alert/index.ts";
    import * as Popover from "#lib/components/ui/popover/index.ts";
  
    // --- STATE & INTERACTIVITY ---
    let currentTime = $state('');
    let theme = $state('light');
    let selectedCategory = $state('Todas');
    let searchQuery = $state('');
    let visibleCount = $state(6);
    let email = $state('');
    let newsletterMsg = $state('');
    let newsletterSuccess = $state(false);
  
    const categories = ['Todas', 'Audio', 'Acessórios', 'Casa', 'Vestível'];
  
    const categoryColors = {
      'Audio': '#6D28D9',
      'Acessórios': '#C07A12',
      'Casa': '#0F8C7E',
      'Vestível ': '#B8348F',
    };
  
    const heroCallout = {
      id: 1,
      title: 'Tecnologia que acompanha o seu ritmo',
      subtitle: 'Áudio, acessórios, e gadgets sleecionados com até 30% de desconto. Entrega rápida para todo o páis.',
      category: 'Aduio',
      initial: 'T'
    };


    const gerenciador = new Gerenciador();
    const carrinho = new Carrinho();    

    let nomeCliente = $state('');
    let feedbackMsg = $state('');

    onMount(async () => {
        const dadosLocais = localStorage.getItem('volt_dados');
        if (dadosLocais) {
            const { produtos, pedidos, itens } = JSON.parse(dadosLocais);
            gerenciador.produtos = produtos.map((p: any) => new Produto(p.id, p.nome, p.descricao, p.preco, p.categoria, p.imagem, p.avaliacao));
            gerenciador.pedidos = pedidos;
            for (let produto of gerenciador.produtos) {
              carrinho.adicionarItem(produto);
            }
    
        } else {
            // Se não houver cache, busca os dados da API (+server.ts)
            try {
                const res = await fetch('/volt/api/');
                const produtosIniciais = await res.json();
                produtosIniciais.forEach((p: any) => gerenciador.adicionarProduto(new Produto(p.id, p.nome, p.descricao, p.preco, p.categoria, p.imagem, p.avalicao)));
                salvarDados();
            } catch (e) {
                console.log("Iniciando sem dados da API");
            }
        }
    });

    function salvarDados() {
        localStorage.setItem('volt_dados', JSON.stringify({
            produtos: gerenciador.produtos,
            pedidos: gerenciador.pedidos,
            itens: carrinho.itens
        }));
    }

    function mostrarFeedback(msg: string) {
        feedbackMsg = msg;
        alert(feedbackMsg)
    }

    function adicionarAoCarrinho(produto: Produto) {
        carrinho.adicionarItem(produto);
        salvarDados();
    }

    function finalizarPedido() {
        if (carrinho.itens.length === 0) {
            alert('Seu carrinho está vazio.');
            return;
        }

        const pedido = new Pedido(nomeCliente, carrinho.itens, carrinho.tipoEntrega, 'Pendente', carrinho.total);
        gerenciador.adicionarPedido(pedido);
        carrinho.limpar();
        localStorage.clear();
        nomeCliente = '';
        salvarDados();
        mostrarFeedback('Pedido finalizado com sucesso!');
    }
  
    let filteredProducts = $derived(gerenciador.produtos.filter(produto => {
      const matchesCat = selectedCategory === 'Todas' || produto.categoria === selectedCategory;
      const matchesSearch = produto.nome.toLowerCase().includes(searchQuery.toLowerCase().trim());
      return matchesCat && matchesSearch;
    }))
  
    let visibleProducts = $derived(filteredProducts.slice(0, visibleCount));
  
    function updateClock() {
      const now = new Date();
      const datePart = now.toLocaleDateString('pt-BR', {
        weekday: 'long',
        day: 'numeric',
        month: 'long'
      });
      const timePart = now.toLocaleTimeString('pt-BR');
      const formattedDate = datePart.charAt(0).toUpperCase() + datePart.slice(1);
      currentTime = `${formattedDate} · ${timePart}`;
    }
  
    function toggleTheme() {
      theme = theme === 'light' ? 'dark' : 'light';
      localStorage.setItem('volt-theme', theme);
    }
  
    function selectCategory(cat) {
      selectedCategory = cat;
      visibleCount = 6;
    }
  
    function loadMore() {
      visibleCount += 3;
    }
  
    function handleNewsletter(e) {
      e.preventDefault();
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        newsletterSuccess = false;
        newsletterMsg = 'Por favor, insira um endereço de e-mail válido.';
      } else {
        newsletterSuccess = true;
        newsletterMsg = 'Inscrição confirmada! Você receberá nossa edição toda sexta-feira.';
        email = '';
      }
    }
  
    onMount(() => {
      updateClock();
      const interval = setInterval(updateClock, 1000);
      const savedTheme = localStorage.getItem('volt-theme');
      if (savedTheme) {
        theme = savedTheme;
      } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        theme = 'dark';
      }
  
      return () => clearInterval(interval);
    });
  </script>
  
  <svelte:head>
    <title>Volt - Sua loja de utensílios domésticos</title>
    <link
      href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Newsreader:opsz,wght@6..72,600;6..72,700&display=swap"
      rel="stylesheet"
    />
  </svelte:head>
  
  <div class="portal-wrapper" data-theme={theme}>
    <!-- LIVE BADGE, CLOCK, THEME BUTTON -->
    <div class="topbar">
      <div class="container topbar-inner">
        <div class="live-status">
          <span class="live-indicator">● FRETE GRÁTIS ACIMA DE R$ 199 POR TEMPO LIMITADO</span>
          <span class="clock-text">{currentTime}</span>
        </div>
      </div>
    </div>
  
    <!-- MASTER HEAD -->
    <header class="masthead">
      <div class="container masthead-inner">
        <div class="brand-nav">
          <a href="#top" class="logo" onclick={event => (event.preventDefault(), selectCategory('Todas'))}>
            Volt
          </a>
          <nav aria-label="Navegação principal">
            <ul class="nav-links">
              {#each categories.slice(1) as cat}
                <li>
                  <a
                    href="#{cat.toLowerCase()}"
                    class:active={selectedCategory === cat}
                    onclick={() => (event?.preventDefault(), selectCategory(cat))}
                  >
                    {cat}
                  </a>
                </li>
              {/each}
            </ul>
          </nav>
        </div>
  
        <div class="search-box">
          <svg class="search-icon" viewBox="0 0 24 24" width="15" height="15" stroke="currentColor" stroke-width="2" fill="none">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <input
            type="search"
            placeholder="Buscar produtos..."
            bind:value={searchQuery}
            aria-label="Buscar produtos pelo título"
          />
        </div>

        <button class="theme-btn" onclick={toggleTheme} aria-label="Alternar tema claro ou escuro">
          {#if theme === 'light'}
            🌙 Escuro
          {:else}
            ☀️ Claro
          {/if}
        </button>
        
        <Drawer.Root direction=right>
          <Drawer.Trigger>
            <div class="flex items-center gap-2 font-semibold bg-secondary/10 text-primary px-4 py-2 rounded-full">
              <ShoppingCart class="h-5 w-5"/>
              <div>{carrinho.itens.length}</div>
            </div>
          </Drawer.Trigger>
          <Drawer.Content>
            <Drawer.Header>
              <div class='flex justify-between'>
                <Drawer.Title><span class="text-inter">Seu carrinho</span></Drawer.Title>
                <Drawer.Close>
                  <div class="flex items-center gap-2 font-semibold bg-secondary/10 text-primary px-4 py-2 rounded-full">
                    <X class="h-5 w-5"/>
                  </div>
                </Drawer.Close >
              </div>
            </Drawer.Header>
            <div class='drawer-content'>
              <ul>
                {#if carrinho.itens.length === 0}
                          <div class="text-center py-10 text-muted-foreground flex flex-col items-center">
                              <div class="bg-muted p-4 rounded-full mb-4">
                                  <ShoppingCart class="h-8 w-8 opacity-50" />
                              </div>
                              <p class="font-medium">Seu carrinho está vazio.</p>
                              <p class="text-sm">Adicione itens da loja para começar</p>
                          </div>
                      {:else}
                          <div class="flex-1 overflow-y-auto max-h-[35vh] pr-2 space-y-4 mb-6 custom-scrollbar">
                              {#each carrinho.itens as item}
                                  <div class="flex justify-between items-center group">
                                      <div class="flex-1">
                                          <p class="font-medium text-sm leading-tight">{item.produto.nome}</p>
                                          <p class="text-muted-foreground text-xs mt-0.5">
                                              {item.produto.preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} un.
                                          </p>
                                      </div>
                                      
                                      <div class="flex items-center gap-2 bg-muted rounded-md p-1">
                                          <Button variant="ghost" size="icon" class="h-6 w-6 text-muted-foreground hover:text-foreground" onclick={() => carrinho.atualizarQuantidade(item.produto.id, item.quantidade - 1)}>
                                              <Minus class="h-3 w-3" />
                                          </Button>
                                          <span class="font-medium text-sm w-4 text-center">{item.quantidade}</span>
                                          <Button variant="ghost" size="icon" class="h-6 w-6 text-muted-foreground hover:text-foreground" onclick={() => carrinho.atualizarQuantidade(item.produto.id, item.quantidade + 1)}>
                                              <Plus class="h-3 w-3" />
                                          </Button>
                                      </div>
                                  </div>
                              {/each}
                          </div>

                          <div class="space-y-6">
                              <!-- Toggle -->
                              <div class="flex bg-muted p-1 rounded-lg">
                                  <button class="flex-1 py-2 text-sm font-medium rounded-md transition-all {carrinho.tipoEntrega === 'local' ? 'bg-background shadow text-foreground' : 'text-muted-foreground hover:text-foreground'}" onclick={() => carrinho.tipoEntrega = 'local'}>
                                      Retirar no Local
                                  </button>
                                  <button class="flex-1 py-2 text-sm font-medium rounded-md transition-all {carrinho.tipoEntrega === 'delivery' ? 'bg-background shadow text-foreground' : 'text-muted-foreground hover:text-foreground'}" onclick={() => carrinho.tipoEntrega = 'delivery'}>
                                      Delivery (+R$ 2,50)
                                  </button>
                              </div>

                              <!-- Resumo Financeiro -->
                              <div class="space-y-2 text-sm">
                                  <div class="flex justify-between text-muted-foreground">
                                      <span>Subtotal</span>
                                      <span>{carrinho.subtotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
                                  </div>
                                  {#if carrinho.tipoEntrega === 'delivery'}
                                      <div class="flex justify-between text-primary font-medium">
                                          <span>Taxa de Entrega</span>
                                          <span>{carrinho.taxaEntrega.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
                                      </div>
                                  {/if}
                                  <div class="flex justify-between text-xl font-bold text-foreground pt-4 border-t">
                                      <span>Total</span>
                                      <span>{carrinho.total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
                                  </div>
                              </div>
                          </div>
                      {/if}
              </ul>
            </div>
            
            <Drawer.Footer>
              <Drawer.Close>
                <Button class="font-extrabold bg-primary" onclick={finalizarPedido}>
                  Finalizar compra
                </Button>
              </Drawer.Close>
            </Drawer.Footer>
          </Drawer.Content>
        </Drawer.Root>

      </div>
    </header>
  
    <main class="container">
      <section class="hero-section" aria-label="Destaques principais">
        <article class="hero-main">
          <div class="hero-section-inner">
            <div>
              <Card.Root>
                <Card.Header>
                  <Card.Title>
                    <span class="badge-pill" style="background-color: {categoryColors[heroCallout.category]}">
                      {heroCallout.category.toUpperCase()}
                    </span>
                    <h1 class="hero-title">{heroCallout.title}</h1>
                  </Card.Title>
                </Card.Header>
                <Card.Content>
                  <p class="hero-subtitle">{heroCallout.subtitle}</p>
                  <Button onclick={() => window.location.hash = "1"} class="bg-primary w-full gap-2">
                    Ver Oferta
                  </Button>
                </Card.Content>
              </Card.Root>
            </div>
            <div>
              <div class="thumbnail hero-thumb">
                <svg
                  viewBox="0 0 600 340"
                  role="img"
                  aria-label="Ilustração em gradiente {heroCallout.category} com a letra {heroCallout.initial}"
                >
                  <defs>
                    <linearGradient id="heroGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stop-color="#2563EB" />
                      <stop offset="100%" stop-color="#611dfe" />
                    </linearGradient>
                  </defs>
                  <rect width="600" height="340" fill="url(#heroGrad)" rx="10" />
                  <circle cx="480" cy="110" r="145" fill="rgba(255,255,255,0.08)" />
                  <text x="48" y="255" font-size="220" font-weight="700" fill="#FFFFFF">
                    {heroCallout.initial}
                  </text>
                </svg>
              </div>
            </div> 
          </div>
        </article>
      </section>
  
      <hr class="section-divider" />
  
      <section class="latest-section" aria-labelledby="heading-ultimas">
        <div class="latest-header">
          <h2 id="heading-ultimas" class="section-title">Produtos</h2>
          <div class="filter-group" role="tablist" aria-label="Filtrar produtos por categoria">
            {#each categories as cat}
              <button
                class="filter-pill"
                class:active={selectedCategory === cat}
                onclick={() => selectCategory(cat)}
                role="tab"
                aria-selected={selectedCategory === cat}
              >
                {cat}
              </button>
            {/each}
          </div>
        </div>
  
        {#if visibleProducts.length > 0}
          <div class="articles-grid">
            {#each visibleProducts as produto, i (produto.id)}
              <Card.Root class="snap-center shrink-0 w-[350px] overflow-hidden group hover:shadow-md transition-all">
                  <div class="thumbnail card-thumb">
                    <svg
                      viewBox="0 0 400 250"
                      role="img"
                      aria-label="Miniatura do produto {produto.categoria}: {produto.nome}"
                    >
                      <defs>
                        <linearGradient id="cardGrad-{produto.id}" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stop-color="#6D28D9" />
                          <stop offset="100%" stop-color="#6D28D9" />
                        </linearGradient>
                      </defs>
                      <rect width="400" height="250" fill="url(#cardGrad-{produto.id})" rx="8" />
                      <circle cx="320" cy="70" r="95" fill="rgba(255,255,255,0.08)" />
                      <text x="30" y="190" font-size="150" font-weight="700" fill="#FFFFFF">
                        {produto.nome.slice(0, 1)}
                      </text>
                    </svg>
                  </div>
                  <Card.Content class="p-4 pt-5">
                      <Badge variant="secondary" class="mb-2">{produto.categoria}</Badge>
                      <Card.Title class="text-lg line-clamp-1"><span id={String(i)} class=text-inter>{produto.nome}</span></Card.Title>
                      <div class='flex gap-1'>
                        {#each { length: 5 } as _, i}
                            <span style="width: 10px; aspect-ratio: 1; border-radius: 1000px; background-color: {i + 1 < produto.avaliacao? "#F59E0B" : "#F3F4F6"}"></span>
                        {/each}
                      </div>
                      <p class="font-bold text-xl mt-2">
                          {produto.preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                      </p>
                  </Card.Content>
                  <Card.Footer class="p-4 pt-0">
                      <Popover.Root>
                        <Popover.Trigger class='w-full'>
                          <Button onclick={() => adicionarAoCarrinho(produto)} class="w-full gap-2">
                            <Plus class="h-4 w-4" /> Adicionar
                          </Button>
                        </Popover.Trigger>
                        <Popover.Content>Item adicionado ao carrinho</Popover.Content>
                      </Popover.Root>
                  </Card.Footer>
              </Card.Root>
            {/each}
          </div>
        {:else}
          <p class="empty-results">
            Nenhum produto encontrado para "<strong>{searchQuery}</strong>" na volt <strong>{selectedCategory}</strong>.
          </p>
        {/if}
  
        {#if visibleCount < filteredProducts.length}
          <div class="load-more-container">
            <button class="load-more-btn" onclick={loadMore}>
              Carregar mais
            </button>
          </div>
        {/if}
      </section>
  
      <!-- OFFER SECTION -->
      <section class="newsletter-box bg-secondary" aria-labelledby="heading-newsletter">
        <h2 id="heading-newsletter" class="newsletter-title">Ganhe 10% na primeira compra</h2>
        <p class="newsletter-desc">
          Assine a newsletter e receba o cupom de boas-vindas, além das ofertas da semana<br />
          Sem spam.
        </p>
  
        <form class="newsletter-form" onsubmit={handleNewsletter} novalidate>
          <input
            type="email"
            placeholder="seu@email.com"
            bind:value={email}
            aria-label="Seu endereço de e-mail"
            required
          />
          <button type="submit" class="btn-subscribe">Assinar</button>
        </form>
  
        {#if newsletterMsg}
          <p class="newsletter-feedback" class:ok={newsletterSuccess} class:err={!newsletterSuccess} role="status">
            {newsletterMsg}
          </p>
        {/if}
      </section>
    </main>
  
    <!-- FOOTER -->
    <footer class="border-t bg-muted/20 py-12 px-4 md:px-6">
      <div class="mx-auto w-full max-w-7xl">
        <div class="grid grid-cols-1 gap-8 md:grid-cols-4 lg:gap-12">
          <!-- Branding / About -->
          <div class="flex flex-col gap-4">
            <a href="/" class="text-xl font-bold tracking-tight">Volt</a>
            <p class="text-sm text-muted-foreground">
              Os melhores produtos do mercado somente na maior distribuira de eletro-eletrônicos do Brasil
            </p>
          </div>
  
          <!-- Contact Info -->
          <div class="flex flex-col gap-4">
            <h3 class="font-semibold text-foreground">Contato</h3>
            <ul class="flex flex-col gap-2 text-sm text-muted-foreground">
              <li>enzohhb@gmail.com</li>
              <li>(11) 991494-2391</li>
              <li>São Paulo, SP</li>
            </ul>
          </div>
  
          <!-- Social Media -->
          <div class="flex flex-col gap-4">
            <h3 class="font-semibold text-foreground">Redes Sociais</h3>
            <ul class="flex flex-col gap-2 text-sm text-muted-foreground">
              <li>
                <a href="https://instagram.com" target="_blank" class="hover:text-foreground transition-colors">Instagram</a>
              </li>
              <li>
                <a href="https://twitter.com" target="_blank" class="hover:text-foreground transition-colors">X (Twitter)</a>
              </li>
              <li>
                <a href="https://tiktok.com" target="_blank" class="hover:text-foreground transition-colors">TikTok</a>
              </li>
            </ul>
          </div>
        </div>
  
        <!-- Bottom Bar -->
        <div class="mt-12 flex flex-col items-center justify-between gap-4 border-t pt-8 text-sm text-muted-foreground md:flex-row">
          <p>© {new Date().getFullYear()} Volt. Todos os direitos reservados.</p>
          <div class="flex gap-4">
            <a href="/" class="hover:text-foreground transition-colors">Termos de Uso</a>
            <a href="/" class="hover:text-foreground transition-colors">Privacidade</a>
          </div>
        </div>
      </div>
    </footer>
  </div>