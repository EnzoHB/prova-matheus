<script lang="ts">
  import { page } from '$app/state'
  import { livros, capa, reais } from '../../livros'
  import { adicionar } from '../../carrinho.svelte'

  let livro = $derived(livros.find((l) => l.id === Number(page.params.id)))
  let adicionado = $state(false)

  function clicarAdicionar() {
    if (!livro) return
    adicionar(livro.id)
    adicionado = true
  }
</script>

<svelte:head>
  <title>Página Virada | {livro ? livro.titulo : 'Livro não encontrado'}</title>
</svelte:head>

{#if livro}
  <section class="detalhes">
    <img src={capa(livro)} alt="Capa do livro {livro.titulo}" />
    <div>
      <h1>{livro.titulo}</h1>
      <p><strong>Autor:</strong> {livro.autor}</p>
      <p><strong>Editora:</strong> {livro.editora}</p>
      <p><strong>Ano:</strong> {livro.ano}</p>
      <p><strong>Páginas:</strong> {livro.paginas}</p>
      <p><strong>Categoria:</strong> {livro.categoria}</p>
      <p>{livro.sinopse}</p>
      <p class="preco">{reais(livro.preco)}</p>
      <button class="botao" onclick={clicarAdicionar}>Adicionar ao carrinho</button>
      {#if adicionado}
        <p class="ok">Livro adicionado ao carrinho!</p>
      {/if}
      <p><a href="/livraria/catalogo">← Voltar para o catálogo</a></p>
    </div>
  </section>
{:else}
  <h1>Livro não encontrado</h1>
  <p><a href="/livraria/catalogo">← Voltar para o catálogo</a></p>
{/if}
