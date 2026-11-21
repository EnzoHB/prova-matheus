<script lang="ts">
  import { livros, categorias, capa, reais } from '../livros'
  import { adicionar } from '../carrinho.svelte'

  let busca = $state('')
  let categoria = $state('Todas')

  let filtrados = $derived(
    livros.filter((l) => {
      const texto = busca.toLowerCase()
      const bateBusca =
        l.titulo.toLowerCase().includes(texto) || l.autor.toLowerCase().includes(texto)
      const bateCategoria = categoria === 'Todas' || l.categoria === categoria
      return bateBusca && bateCategoria
    }),
  )
</script>

<svelte:head>
  <title>Página Virada | Catálogo</title>
</svelte:head>

<section>
  <h1>Catálogo</h1>

  <div class="filtros">
    <label for="busca">Buscar</label>
    <input id="busca" type="search" placeholder="Título ou autor" bind:value={busca} />

    <label for="categoria">Categoria</label>
    <select id="categoria" bind:value={categoria}>
      {#each categorias as c}
        <option value={c}>{c}</option>
      {/each}
    </select>
  </div>

  {#if filtrados.length === 0}
    <p>Nenhum livro encontrado.</p>
  {/if}

  <div class="grade">
    {#each filtrados as livro (livro.id)}
      <article class="card">
        <img src={capa(livro)} alt="Capa do livro {livro.titulo}" />
        <h2><a href="/livraria/livro/{livro.id}">{livro.titulo}</a></h2>
        <p class="autor">{livro.autor}</p>
        <p class="categoria">{livro.categoria}</p>
        <p class="preco">{reais(livro.preco)}</p>
        <button class="botao" onclick={() => adicionar(livro.id)}>Adicionar ao carrinho</button>
      </article>
    {/each}
  </div>
</section>
