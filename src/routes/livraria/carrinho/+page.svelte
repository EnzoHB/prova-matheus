<script lang="ts">
  import { livros, reais } from '../livros'
  import { carrinho, mudarQuantidade, remover, total } from '../carrinho.svelte'

  let linhas = $derived(
    carrinho.itens
      .map((i) => ({ ...i, livro: livros.find((l) => l.id === i.id)! }))
      .filter((i) => i.livro),
  )
</script>

<svelte:head>
  <title>Página Virada | Carrinho</title>
</svelte:head>

<section>
  <h1>Carrinho</h1>

  {#if linhas.length === 0}
    <p>Seu carrinho está vazio. <a href="/livraria/catalogo">Ver catálogo</a></p>
  {:else}
    <div class="tabela-carrinho">
      {#each linhas as linha (linha.id)}
        <div class="linha">
          <span class="nome">{linha.livro.titulo}</span>
          <span>{reais(linha.livro.preco)}</span>
          <div class="qtd">
            <button
              onclick={() => mudarQuantidade(linha.id, linha.quantidade - 1)}
              aria-label="Diminuir">-</button
            >
            <span>{linha.quantidade}</span>
            <button
              onclick={() => mudarQuantidade(linha.id, linha.quantidade + 1)}
              aria-label="Aumentar">+</button
            >
          </div>
          <span>{reais(linha.livro.preco * linha.quantidade)}</span>
          <button class="remover" onclick={() => remover(linha.id)}>Remover</button>
        </div>
      {/each}
    </div>
    <p class="total">Total: {reais(total())}</p>
  {/if}
</section>
