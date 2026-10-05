<script lang=ts>
    import { onMount } from 'svelte';
    import * as Drawer from '#lib/components/ui/drawer/index.ts';
    import { Trash2, Plus, Minus, Edit, CheckCircle, ShoppingCart, Info, UtensilsCrossed, X } from 'lucide-svelte';
    import { Produto, Carrinho, Gerenciador, Pedido } from './classes.svelte';

    import { Button } from '#lib/components/ui/button';
    import { Input } from '#lib/components/ui/input';
    import { Textarea } from '#lib/components/ui/textarea';
    import { Label } from '#lib/components/ui/label';
    import { Badge } from '#lib/components/ui/badge';
    import * as Card from '#lib/components/ui/card/index.ts';
    import { id } from 'zod/locales';
  
    // --- STATE & INTERACTIVITY ---
    let currentTime = $state('');
    let theme = $state('light');
    let selectedCategory = $state('Todas');
    let searchQuery = $state('');
    let visibleCount = $state(6);
    let email = $state('');
    let newsletterMsg = $state('');
    let newsletterSuccess = $state(false);
  
    const categories = ['Todas', 'Tecnologia', 'Negócios', 'Ciência', 'Cultura', 'Opinião'];
  
    const categoryColors = {
      'Tecnologia': '#2F6BEB',
      'Negócios': '#C07A12',
      'Ciência': '#0F8C7E',
      'Cultura': '#B8348F',
      'Opinião': '#5A6472'
    };
  
    // --- NEWS DATA (12 total items: 1 Hero + 3 Secondary + 8+ Grid Articles) ---
    const heroArticle = {
      id: 1,
      title: 'Padrões da web em 2026: o que muda para quem desenvolve interfaces',
      subtitle: 'Novas APIs de layout e recursos nativos do navegador prometem reduzir a dependência de bibliotecas externas e mudar a rotina de quem trabalha com front-end.',
      category: 'Tecnologia',
      author: 'Marina Alves',
      date: '21 set 2026',
      readTime: '6 min de leitura',
      initial: 'T'
    };
  
    const topListArticles = [
      {
        id: 2,
        title: 'Startups brasileiras de software crescem 18% no primeiro semestre',
        category: 'Negócios',
        date: '20 set'
      },
      {
        id: 3,
        title: 'Pesquisadores criam método mais eficiente para comprimir dados de sensores',
        category: 'Ciência',
        date: '20 set'
      },
      {
        id: 4,
        title: 'Museus digitais ganham espaço e repensam a visita',
        category: 'Cultura',
        date: '19 set'
      }
    ];
  
    const allGridArticles = [
      {
        id: 5,
        title: 'CSS ganha novos recursos de container queries que simplificam a responsividade',
        category: 'Tecnologia',
        author: 'Rafael Costa',
        date: '21 set',
        readTime: '4 min',
        initial: 'T'
      },
      {
        id: 6,
        title: 'JavaScript: o que esperar da próxima versão da linguagem',
        category: 'Tecnologia',
        author: 'Beatriz Nunes',
        date: '21 set',
        readTime: '5 min',
        initial: 'T'
      },
      {
        id: 7,
        title: 'Startups brasileiras de software crescem 18% no primeiro semestre',
        category: 'Negócios',
        author: 'Diego Prado',
        date: '20 set',
        readTime: '3 min',
        initial: 'N'
      },
      {
        id: 8,
        title: 'Baterias de estado sólido avançam em testes de laboratório',
        category: 'Ciência',
        author: 'Camila Rocha',
        date: '19 set',
        readTime: '6 min',
        initial: 'C'
      },
      {
        id: 9,
        title: 'Podcasts independentes batem recorde de audiência no país',
        category: 'Cultura',
        author: 'Lucas Mendes',
        date: '18 set',
        readTime: '4 min',
        initial: 'C'
      },
      {
        id: 10,
        title: 'Acessibilidade digital vira exigência em novos projetos públicos',
        category: 'Tecnologia',
        author: 'Helena Souza',
        date: '18 set',
        readTime: '5 min',
        initial: 'T'
      },
      {
        id: 11,
        title: 'O custo invisível da complexidade no desenvolvimento moderno',
        category: 'Opinião',
        author: 'Fernando Lira',
        date: '17 set',
        readTime: '7 min',
        initial: 'O'
      },
      {
        id: 12,
        title: 'Fusão entre gigantes de nuvem redefine o mercado corporativo latino',
        category: 'Negócios',
        author: 'Patrícia Viana',
        date: '16 set',
        readTime: '5 min',
        initial: 'N'
      },
      {
        id: 13,
        title: 'Telescópio orbital registra moléculas orgânicas em exoplaneta próximo',
        category: 'Ciência',
        author: 'Roberto Salles',
        date: '15 set',
        readTime: '8 min',
        initial: 'C'
      }
    ];

    // Carrinho de compras

    const gerenciador = new Gerenciador();
    const carrinho = new Carrinho();    

    let formProduto = $state({ id: '', nome: '', descricao: '', preco: 0, categoria: '', imagem: '' });
    let editando = $state(false);

    // Estado do cliente
    let nomeCliente = $state('');
    let feedbackMsg = $state('');

    onMount(async () => {
        const dadosLocais = localStorage.getItem('restaurante_dados');
        if (dadosLocais) {
            const { produtos, pedidos } = JSON.parse(dadosLocais);
            gerenciador.produtos = produtos.map((p: any) => new Produto(p.id, p.nome, p.descricao, p.preco, p.categoria, p.imagem));
            gerenciador.pedidos = pedidos;
        } else {
            // Se não houver cache, busca os dados da API (+server.ts)
            try {
                const res = await fetch('/sistema-de-restaurante/api/');
                const produtosIniciais = await res.json();
                produtosIniciais.forEach((p: any) => gerenciador.adicionarProduto(new Produto(p.id, p.nome, p.descricao, p.preco, p.categoria, p.imagem)));
                salvarDados();
            } catch (e) {
                console.log("Iniciando sem dados da API");
            }
        }
    });

    function salvarDados() {
        localStorage.setItem('restaurante_dados', JSON.stringify({
            produtos: gerenciador.produtos,
            pedidos: gerenciador.pedidos
        }));
    }

    function mostrarFeedback(msg: string) {
        feedbackMsg = msg;
        setTimeout(() => feedbackMsg = '', 3000);
    }

    // --- OPERAÇÕES CRUD DE PRODUTOS --- //
    function salvarProduto(e: Event) {
        e.preventDefault();
        if (editando) {
            gerenciador.atualizarProduto(formProduto.id, { ...formProduto });
            mostrarFeedback('Produto atualizado com sucesso!');
        } else {
            const novoProduto = new Produto(
                crypto.randomUUID(), formProduto.nome, formProduto.descricao, formProduto.preco, formProduto.categoria, formProduto.imagem
            );
            gerenciador.adicionarProduto(novoProduto);
            mostrarFeedback('Produto cadastrado com sucesso!');
        }
        formProduto = { id: '', nome: '', descricao: '', preco: 0, categoria: '', imagem: '' };
        editando = false;
        salvarDados();
    }

    function prepararEdicao(produto: Produto) {
        formProduto = { ...produto };
        editando = true;
    }

    function removerProduto(id: string) {
        if (confirm('Atenção: Tem certeza que deseja remover este produto do cardápio?')) {
            gerenciador.removerProduto(id);
            carrinho.removerItem(id);
            salvarDados();
            mostrarFeedback('Produto removido.');
        }
    }

    // --- OPERAÇÕES DO CARRINHO --- //
    function adicionarAoCarrinho(produto: Produto) {
        carrinho.adicionarItem(produto);
        mostrarFeedback(`${produto.nome} adicionado!`);
    }

    function limparCarrinho() {
        if (confirm('Deseja realmente esvaziar seu carrinho?')) {
            carrinho.limpar();
            mostrarFeedback('Carrinho esvaziado.');
        }
    }

    function finalizarPedido() {
        if (!nomeCliente.trim()) {
            alert('Por favor, informe seu nome antes de finalizar o pedido.');
            return;
        }
        if (carrinho.itens.length === 0) {
            alert('Seu carrinho está vazio.');
            return;
        }

        const pedido = new Pedido(nomeCliente, carrinho.itens, carrinho.tipoEntrega, 'Pendente', carrinho.total);
        gerenciador.adicionarPedido(pedido);
        carrinho.limpar();
        nomeCliente = '';
        salvarDados();
        mostrarFeedback('Pedido finalizado com sucesso!');
    }



    // -- Carrinho de compras
  
    // --- REACTIVE FILTERING (Category + Live Search) ---
    let filteredArticles = $derived(allGridArticles.filter(article => {
      const matchesCat = selectedCategory === 'Todas' || article.category === selectedCategory;
      const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase().trim());
      return matchesCat && matchesSearch;
    }))
  
    let visibleArticles = $derived(filteredArticles.slice(0, visibleCount));
  
    // --- FUNCTIONS ---
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
      localStorage.setItem('latencia-theme', theme);
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
  
      // Check saved theme or system preference (Bonus + Spec requirement)
      const savedTheme = localStorage.getItem('latencia-theme');
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
    <!-- TOP BAR: LIVE BADGE, CLOCK, THEME BUTTON -->
    <div class="topbar">
      <div class="container topbar-inner">
        <div class="live-status">
          <span class="live-indicator">● FRETE GRÁTIS ACIMA DE R$ 199 POR TEMPO LIMITADO</span>
          <span class="clock-text">{currentTime}</span>
        </div>
      </div>
    </div>
  
    <!-- STICKY MASTHEAD: LOGO, NAV, LIVE SEARCH -->
    <header class="masthead">
      <div class="container masthead-inner">
        <div class="brand-nav">
          <a href="#top" class="logo" onclick={event => (event.preventDefault(), selectCategory('Todas'))}>
            Latên<span class="logo-dot">·</span>cia
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
            </div>
          </Drawer.Trigger>
          <Drawer.Content>
            <Drawer.Header>
              <div class='flex justify-between'>
                <Drawer.Title>Seu carrinho</Drawer.Title>
                <Drawer.Close>
                  <div class="flex items-center gap-2 font-semibold bg-secondary/10 text-primary px-4 py-2 rounded-full">
                    <X class="h-5 w-5"/>
                  </div>
                </Drawer.Close>
              </div>
            </Drawer.Header>
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
                            <!-- Toggle de Entrega Personalizado (Estilo Segmented Control) -->
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

                            <div class="space-y-2">
                                <Label for="nomeCliente" class="sr-only">Seu Nome</Label>
                                <Input id="nomeCliente" bind:value={nomeCliente} placeholder="Seu nome para o pedido" class="bg-muted/50" />
                            </div>
                        </div>
                    {/if}
            </ul>
            <Drawer.Footer>
              <Button class="font-extrabold bg-primary">
                Finalizar compra
              </Button>
            </Drawer.Footer>
          </Drawer.Content>
        </Drawer.Root>

      </div>
    </header>
  
    <main class="container">
      <!-- HERO SECTION: FEATURED ARTICLE + 3 NUMBERED SECONDARY ARTICLES -->
      <section class="hero-section" aria-label="Destaques principais">
        <article class="hero-main">
          <div class="thumbnail hero-thumb">
            <svg
              viewBox="0 0 600 340"
              role="img"
              aria-label="Ilustração em gradiente da editoria {heroArticle.category} com a letra {heroArticle.initial}"
            >
              <defs>
                <linearGradient id="heroGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stop-color="#2563EB" />
                  <stop offset="100%" stop-color="#7DA2F8" />
                </linearGradient>
              </defs>
              <rect width="600" height="340" fill="url(#heroGrad)" rx="10" />
              <circle cx="480" cy="110" r="145" fill="rgba(255,255,255,0.08)" />
              <text x="48" y="255" font-family="Newsreader, serif" font-size="220" font-weight="700" fill="#FFFFFF">
                {heroArticle.initial}
              </text>
            </svg>
          </div>
  
          <span class="badge-pill" style="background-color: {categoryColors[heroArticle.category]}">
            {heroArticle.category.toUpperCase()}
          </span>
  
          <h1 class="hero-title">{heroArticle.title}</h1>
          <p class="hero-subtitle">{heroArticle.subtitle}</p>
          <p class="meta">
            Por <strong>{heroArticle.author}</strong> · {heroArticle.date} · {heroArticle.readTime}
          </p>
        </article>
  
        <!-- <aside class="hero-sidebar" aria-label="Mais lidas">
          <ol class="numbered-list">
            {#each topListArticles as item, idx}
              <li class="numbered-item">
                <span class="item-number">{idx + 1}</span>
                <div class="item-body">
                  <h2 class="item-title">
                    <a href="#artigo-{item.id}">{item.title}</a>
                  </h2>
                  <span class="meta">{item.category} · {item.date}</span>
                </div>
              </li>
            {/each}
          </ol>
        </aside> -->
      </section>
  
      <hr class="section-divider" />
  
      <!-- LATEST NEWS SECTION: FILTER PILLS + RESPONSIVE CARD GRID -->
      <section class="latest-section" aria-labelledby="heading-ultimas">
        <div class="latest-header">
          <h2 id="heading-ultimas" class="section-title">Últimas</h2>
          <div class="filter-group" role="tablist" aria-label="Filtrar notícias por editoria">
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
  
        {#if visibleArticles.length > 0}
          <div class="articles-grid">
            <!-- {#each visibleArticles as article (article.id)} -->
            {#each gerenciador.produtos.slice(0, 4) as produto (produto.id)}
              <Card.Root class="snap-center shrink-0 w-[280px] overflow-hidden group hover:shadow-md transition-all">
                  <div class="h-48 w-full overflow-hidden">
                      <img src={produto.imagem} alt={produto.nome} class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  </div>
                  <Card.Content class="p-4 pt-5">
                      <Badge variant="secondary" class="mb-2">{produto.categoria}</Badge>
                      <Card.Title class="text-lg line-clamp-1">{produto.nome}</Card.Title>
                      <p class="text-primary font-bold text-xl mt-2">
                          {produto.preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                      </p>
                  </Card.Content>
                  <Card.Footer class="p-4 pt-0">
                      <Button onclick={() => adicionarAoCarrinho(produto)} class="w-full gap-2">
                          <Plus class="h-4 w-4" /> Adicionar
                      </Button>
                  </Card.Footer>
              </Card.Root>
            {/each}
              <!-- <article class="news-card">
                <div class="thumbnail card-thumb">
                  <svg
                    viewBox="0 0 400 250"
                    role="img"
                    aria-label="Miniatura da editoria {article.category}: {article.title}"
                  >
                    <defs>
                      <linearGradient id="cardGrad-{article.id}" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stop-color="#2563EB" />
                        <stop offset="100%" stop-color="#7DA2F8" />
                      </linearGradient>
                    </defs>
                    <rect width="400" height="250" fill="url(#cardGrad-{article.id})" rx="8" />
                    <circle cx="320" cy="70" r="95" fill="rgba(255,255,255,0.08)" />
                    <text x="30" y="190" font-family="Newsreader, serif" font-size="150" font-weight="700" fill="#FFFFFF">
                      {article.initial}
                    </text>
                  </svg>
                </div>
  
                <div class="category-bar" style="background-color: {categoryColors[article.category]}">
                  {article.category.toUpperCase()}
                </div>
  
                <h3 class="card-title">
                  <a href="#noticia-{article.id}">{article.title}</a>
                </h3>
  
                <p class="meta">{article.author} · {article.date} · {article.readTime}</p>
              </article> -->
            <!-- {/each} -->
          </div>
        {:else}
          <p class="empty-results">
            Nenhuma matéria encontrada para "<strong>{searchQuery}</strong>" na editoria <strong>{selectedCategory}</strong>.
          </p>
        {/if}
  
        {#if visibleCount < filteredArticles.length}
          <div class="load-more-container">
            <button class="load-more-btn" onclick={loadMore}>
              Carregar mais
            </button>
          </div>
        {/if}
      </section>
  
      <!-- NEWSLETTER SECTION: REGEX EMAIL VALIDATION + FEEDBACK -->
      <section class="newsletter-box" aria-labelledby="heading-newsletter">
        <h2 id="heading-newsletter" class="newsletter-title">Receba a Latência no seu e-mail</h2>
        <p class="newsletter-desc">
          Um resumo das principais notícias de tecnologia toda sexta-feira.<br />
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
    <footer class="site-footer">
      <div class="container footer-inner">
        <p class="copyright">© 2026 Latência · Portal-modelo para fins didáticos</p>
        <nav aria-label="Links institucionais">
          <ul class="footer-links">
            <li><a href="#sobre">Sobre</a></li>
            <li><a href="#contato" >Contato</a></li>
            <li><a href="#privacidade" >Privacidade</a></li>
            <li><a href="#termos">Termos</a></li>
          </ul>
        </nav>
      </div>
    </footer>
  </div>
  
  <style>
    /* --- CSS CUSTOM PROPERTIES (SPEC PALETTE & TYPOGRAPHY) --- */
    .portal-wrapper {
      --paper: #FFFFFF;
      --ink: #151710;
      --slate: #5A6472;
      --mist: #EEF0F3;
      --line: #E2E5EA;
      --signal: #E5372A;
  
      --font-serif: 'Newsreader', Georgia, serif;
      --font-sans: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  
      background-color: var(--paper);
      color: var(--ink);
      font-family: var(--font-sans);
      min-height: 100vh;
      transition: background-color 0.25s ease, color 0.25s ease;
    }
  
    /* Dark Theme Overrides */
    .portal-wrapper[data-theme="dark"] {
      --paper: #0F1115;
      --ink: #F3F4F6;
      --slate: #9CA3AF;
      --mist: #1E222B;
      --line: #2D3340;
      --signal: #EF4444;
    }
  
    :global(body) {
      margin: 0;
      padding: 0;
      -webkit-font-smoothing: antialiased;
    }
  
    * {
      box-sizing: border-box;
    }
  
    a {
      color: inherit;
      text-decoration: none;
    }
  
    /* Visible Focus States for Accessibility */
    a:focus-visible,
    button:focus-visible,
    input:focus-visible {
      outline: 2px solid var(--signal);
      outline-offset: 2px;
    }
  
    .container {
      max-width: 1060px;
      margin: 0 auto;
      padding: 0 1.25rem;
    }
  
    /* --- 1. TOP BAR --- */
    .topbar {
      border-bottom: 1px solid var(--line);
      font-size: 0.78rem;
      padding: 0.45rem 0;
    }
  
    .topbar-inner {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  
    .live-status {
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }
  
    .live-indicator {
      color: var(--signal);
      font-weight: 700;
      letter-spacing: 0.04em;
      font-size: 0.72rem;
    }
  
    .clock-text {
      color: var(--slate);
    }
  
    .theme-btn {
      background: transparent;
      border: 1px solid var(--line);
      color: var(--slate);
      border-radius: 999px;
      padding: 0.22rem 0.75rem;
      font-size: 0.75rem;
      font-family: var(--font-sans);
      cursor: pointer;
      transition: border-color 0.2s, color 0.2s;
    }
  
    .theme-btn:hover {
      border-color: var(--ink);
      color: var(--ink);
    }
  
    /* --- 2. STICKY MASTHEAD --- */
    .masthead {
      position: sticky;
      top: 0;
      z-index: 50;
      background-color: var(--paper);
      border-bottom: 1px solid var(--line);
      padding: 0.9rem 0;
      transition: background-color 0.25s ease;
    }
  
    .masthead-inner {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 1rem;
    }
  
    .brand-nav {
      display: flex;
      align-items: center;
      gap: 2.2rem;
    }
  
    .logo {
      font-family: var(--font-serif);
      font-size: 1.75rem;
      font-weight: 700;
      letter-spacing: -0.02em;
      color: var(--ink);
    }
  
    .logo-dot {
      color: var(--signal);
    }
  
    .nav-links {
      display: flex;
      list-style: none;
      margin: 0;
      padding: 0;
      gap: 1.4rem;
    }
  
    .nav-links a {
      font-size: 0.88rem;
      font-weight: 500;
      color: var(--ink);
      transition: color 0.15s;
    }
  
    .nav-links a:hover,
    .nav-links a.active {
      color: var(--signal);
    }
  
    .search-box {
      position: relative;
      display: flex;
      align-items: center;
    }
  
    .search-icon {
      position: absolute;
      left: 0.75rem;
      color: var(--slate);
      pointer-events: none;
    }
  
    .search-box input {
      background-color: var(--mist);
      border: 1px solid transparent;
      border-radius: 999px;
      padding: 0.45rem 1rem 0.45rem 2.2rem;
      font-size: 0.82rem;
      color: var(--ink);
      font-family: var(--font-sans);
      width: 215px;
      transition: border-color 0.2s, width 0.2s;
    }
  
    .search-box input:focus {
      border-color: var(--slate);
      outline: none;
    }
  
    /* --- 3. HERO SECTION --- */
    .hero-section {
      display: grid;
      grid-template-columns: 1.65fr 1fr;
      gap: 2.75rem;
      padding: 2.25rem 0 2rem;
      align-items: start;
    }
  
    .thumbnail svg {
      width: 100%;
      height: auto;
      display: block;
      border-radius: 8px;
    }
  
    .hero-thumb {
      margin-bottom: 1rem;
    }
  
    .badge-pill {
      display: inline-block;
      color: #FFFFFF;
      font-size: 0.68rem;
      font-weight: 700;
      padding: 0.25rem 0.55rem;
      border-radius: 4px;
      letter-spacing: 0.04em;
      margin-bottom: 0.75rem;
    }
  
    .hero-title {
      font-family: var(--font-serif);
      font-size: 2.35rem;
      line-height: 1.12;
      margin: 0 0 0.85rem 0;
      font-weight: 700;
      letter-spacing: -0.015em;
    }
  
    .hero-subtitle {
      color: var(--slate);
      font-size: 0.96rem;
      line-height: 1.55;
      margin: 0 0 1rem 0;
    }
  
    .meta {
      color: var(--slate);
      font-size: 0.76rem;
      margin: 0;
    }
  
    .meta strong {
      color: var(--ink);
      font-weight: 600;
    }
  
    .numbered-list {
      list-style: none;
      margin: 0;
      padding: 0;
      display: flex;
      flex-direction: column;
    }
  
    .numbered-item {
      display: flex;
      gap: 1rem;
      padding: 1.15rem 0;
      border-bottom: 1px solid var(--line);
    }
  
    .numbered-item:first-child {
      padding-top: 0.25rem;
    }
  
    .numbered-item:last-child {
      border-bottom: none;
    }
  
    .item-number {
      font-family: var(--font-serif);
      font-size: 1.35rem;
      font-weight: 700;
      color: var(--signal);
      line-height: 1.2;
      min-width: 1.1rem;
    }
  
    .item-title {
      font-family: var(--font-serif);
      font-size: 1.02rem;
      font-weight: 700;
      line-height: 1.35;
      margin: 0 0 0.35rem 0;
    }
  
    .item-title a:hover {
      color: var(--signal);
    }
  
    .section-divider {
      border: 0;
      border-top: 1px solid var(--line);
      margin: 0.5rem 0 2rem;
    }
  
    /* --- 4. LATEST SECTION & GRID --- */
    .latest-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 1rem;
      margin-bottom: 1.5rem;
    }
  
    .section-title {
      font-family: var(--font-serif);
      font-size: 1.45rem;
      margin: 0;
      font-weight: 700;
    }
  
    .filter-group {
      display: flex;
      flex-wrap: wrap;
      gap: 0.45rem;
    }
  
    .filter-pill {
      background: transparent;
      border: 1px solid var(--line);
      color: var(--slate);
      padding: 0.35rem 0.85rem;
      border-radius: 999px;
      font-size: 0.78rem;
      font-family: var(--font-sans);
      cursor: pointer;
      transition: all 0.15s ease;
    }
  
    .filter-pill:hover {
      border-color: var(--ink);
      color: var(--ink);
    }
  
    .filter-pill.active {
      background-color: var(--ink);
      color: var(--paper);
      border-color: var(--ink);
      font-weight: 500;
    }
  
    .articles-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 1.75rem 1.35rem;
    }
  
    .news-card {
      display: flex;
      flex-direction: column;
      transition: transform 0.2s ease;
    }
  
    .news-card:hover {
      transform: translateY(-2px);
    }
  
    .card-thumb {
      margin-bottom: 0.65rem;
    }
  
    .category-bar {
      color: #FFFFFF;
      font-size: 0.66rem;
      font-weight: 700;
      letter-spacing: 0.04em;
      padding: 0.3rem 0.6rem;
      border-radius: 4px;
      margin-bottom: 0.6rem;
    }
  
    .card-title {
      font-family: var(--font-serif);
      font-size: 1.06rem;
      line-height: 1.32;
      margin: 0 0 0.55rem 0;
      font-weight: 700;
    }
  
    .card-title a:hover {
      color: var(--signal);
    }
  
    .empty-results {
      text-align: center;
      padding: 3rem 1rem;
      color: var(--slate);
    }
  
    .load-more-container {
      display: flex;
      justify-content: center;
      margin: 2.5rem 0 1rem;
    }
  
    .load-more-btn {
      background: transparent;
      border: 1px solid var(--ink);
      color: var(--ink);
      border-radius: 999px;
      padding: 0.65rem 1.65rem;
      font-size: 0.84rem;
      font-weight: 600;
      font-family: var(--font-sans);
      cursor: pointer;
      transition: background-color 0.2s, color 0.2s;
    }
  
    .load-more-btn:hover {
      background-color: var(--ink);
      color: var(--paper);
    }
  
    /* --- 5. NEWSLETTER SECTION --- */
    .newsletter-box {
      background-color: #15171A;
      color: #FFFFFF;
      border-radius: 12px;
      padding: 3.25rem 1.5rem;
      margin: 3.5rem 0;
      text-align: center;
    }
  
    .newsletter-title {
      font-family: var(--font-serif);
      font-size: 1.65rem;
      margin: 0 0 0.6rem 0;
    }
  
    .newsletter-desc {
      color: #9CA3AF;
      font-size: 0.88rem;
      line-height: 1.55;
      margin: 0 0 1.6rem 0;
    }
  
    .newsletter-form {
      display: flex;
      justify-content: center;
      gap: 0.65rem;
      max-width: 430px;
      margin: 0 auto;
    }
  
    .newsletter-form input {
      flex: 1;
      background-color: rgba(255, 255, 255, 0.07);
      border: 1px solid rgba(255, 255, 255, 0.18);
      color: #FFFFFF;
      border-radius: 999px;
      padding: 0.65rem 1.15rem;
      font-size: 0.85rem;
      font-family: var(--font-sans);
    }
  
    .newsletter-form input::placeholder {
      color: #9CA3AF;
    }
  
    .btn-subscribe {
      background-color: var(--signal);
      color: #FFFFFF;
      border: none;
      border-radius: 999px;
      padding: 0.65rem 1.4rem;
      font-size: 0.85rem;
      font-weight: 600;
      font-family: var(--font-sans);
      cursor: pointer;
      transition: opacity 0.2s;
    }
  
    .btn-subscribe:hover {
      opacity: 0.9;
    }
  
    .newsletter-feedback {
      margin: 1rem 0 0;
      font-size: 0.82rem;
    }
  
    .newsletter-feedback.ok {
      color: #34D399;
    }
  
    .newsletter-feedback.err {
      color: #F87171;
    }
  
    /* --- 6. FOOTER --- */
    .site-footer {
      border-top: 1px solid var(--line);
      padding: 1.75rem 0;
      font-size: 0.78rem;
      color: var(--slate);
    }
  
    .footer-inner {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 1rem;
    }
  
    .copyright {
      margin: 0;
    }
  
    .footer-links {
      display: flex;
      list-style: none;
      margin: 0;
      padding: 0;
      gap: 1.35rem;
    }
  
    .footer-links a:hover {
      color: var(--ink);
    }
  
    /* --- RESPONSIVE MEDIA QUERIES --- */
    @media (max-width: 900px) {
      .hero-section {
        grid-template-columns: 1fr;
        gap: 2rem;
      }
  
      .articles-grid {
        grid-template-columns: repeat(2, 1fr);
      }
    }
  
    @media (max-width: 640px) {
      .masthead-inner {
        flex-direction: column;
        align-items: stretch;
      }
  
      .brand-nav {
        flex-direction: column;
        align-items: flex-start;
        gap: 0.75rem;
      }
  
      .nav-links {
        flex-wrap: wrap;
        gap: 0.85rem;
      }
  
      .search-box input {
        width: 100%;
      }
  
      .hero-title {
        font-size: 1.85rem;
      }
  
      .articles-grid {
        grid-template-columns: 1fr;
      }
  
      .newsletter-form {
        flex-direction: column;
      }
    }
  </style>