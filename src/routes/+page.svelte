<script lang="ts">
  const projetos = [
    { nome: 'Semana da Cultura Japonesa', link: '/semana-japonesa' },
    { nome: 'Lista de Compras', link: '/lista-de-compras' },
    { nome: 'Sistema de Pedidos para Restaurante', link: '/sistema-de-restaurante' },
    { nome: 'Volt', link: '/volt' },
    { nome: 'Livraria', link: '/livraria' },
  ]
</script>

<svelte:head>
  <title>Web 2 | Projetos</title>
</svelte:head>

<main class="mx-auto max-w-2xl p-8">
  <h1 class="mb-6 text-3xl font-bold">Desenvolvimento Web 2</h1>
  <ul class="space-y-3">
    {#each projetos as p}
      <li>
        <a href={p.link} class="block rounded-lg border p-4 hover:bg-muted">{p.nome}</a>
      </li>
    {/each}
  </ul>
</main>
