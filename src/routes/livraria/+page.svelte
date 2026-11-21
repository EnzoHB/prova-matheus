<script lang="ts">
  import { livros, capa, reais } from './livros'
  import { adicionar } from './carrinho.svelte'

  const vitrine = livros.slice(0, 4)
</script>

<svelte:head>
  <title>Página Virada | Home</title>
</svelte:head>

<section class="banner">
  <h1>Bem-vindo à Página Virada</h1>
  <p>Clássicos, ficção científica e tecnologia com preço de amigo.</p>
  <a href="/livraria/catalogo" class="botao">Ver catálogo</a>
</section>

<section>
  <h2>Destaques</h2>
  <div class="grade">
    {#each vitrine as livro}
      <article class="card">
        <img src={capa(livro)} alt="Capa do livro {livro.titulo}" />
        <h3><a href="/livraria/livro/{livro.id}">{livro.titulo}</a></h3>
        <p class="autor">{livro.autor}</p>
        <p class="preco">{reais(livro.preco)}</p>
        <button class="botao" onclick={() => adicionar(livro.id)}>Adicionar ao carrinho</button>
      </article>
    {/each}
  </div>
</section>
