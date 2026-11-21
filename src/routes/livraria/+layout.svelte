<script lang="ts">
  import { onMount } from 'svelte'
  import './livraria.css'
  import { carregarCarrinho, contador } from './carrinho.svelte'

  let { children } = $props()
  let menuAberto = $state(false)

  onMount(() => {
    carregarCarrinho()
  })
</script>

<div class="livraria">
  <header class="topo">
    <div class="topo-dentro">
      <a href="/livraria" class="logo">
        <img
          src="data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 40 40'%3E%3Crect width='40' height='40' rx='8' fill='%23b5651d'/%3E%3Cpath d='M10 10h9v20h-9zM21 10h9v20h-9z' fill='%23fff'/%3E%3C/svg%3E"
          alt="Logo da Livraria Página Virada"
          width="40"
          height="40"
        />
        <span>Página Virada</span>
      </a>
      <button
        class="hamburguer"
        onclick={() => (menuAberto = !menuAberto)}
        aria-label="Abrir menu"
        aria-expanded={menuAberto}>☰</button
      >
      <nav class:aberto={menuAberto}>
        <ul>
          <li><a href="/livraria" onclick={() => (menuAberto = false)}>Home</a></li>
          <li><a href="/livraria/catalogo" onclick={() => (menuAberto = false)}>Catálogo</a></li>
          <li><a href="/livraria/contato" onclick={() => (menuAberto = false)}>Contato</a></li>
          <li>
            <a href="/livraria/carrinho" onclick={() => (menuAberto = false)}
              >Carrinho ({contador()})</a
            >
          </li>
        </ul>
      </nav>
    </div>
  </header>

  <main class="conteudo">
    {@render children()}
  </main>

  <footer class="rodape">
    <div>
      <p>Rua dos Livros, 123, São Paulo, SP</p>
      <p>
        <a href="https://instagram.com" target="_blank">Instagram</a> |
        <a href="https://facebook.com" target="_blank">Facebook</a>
      </p>
      <p>© 2026 Página Virada. Todos os direitos reservados.</p>
    </div>
  </footer>
</div>
