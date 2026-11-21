<script lang="ts">
  let nome = $state('')
  let email = $state('')
  let assunto = $state('')
  let mensagem = $state('')
  let erros = $state({ nome: '', email: '', assunto: '', mensagem: '' })
  let enviado = $state(false)

  function enviar(e: Event) {
    e.preventDefault()
    enviado = false
    erros.nome = nome.trim() ? '' : 'Informe seu nome'
    erros.email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? '' : 'E-mail inválido'
    erros.assunto = assunto.trim() ? '' : 'Informe o assunto'
    erros.mensagem =
      mensagem.trim().length >= 10 ? '' : 'A mensagem precisa ter pelo menos 10 letras'
    if (erros.nome || erros.email || erros.assunto || erros.mensagem) return
    enviado = true
    nome = ''
    email = ''
    assunto = ''
    mensagem = ''
  }
</script>

<svelte:head>
  <title>Página Virada | Contato</title>
</svelte:head>

<section>
  <h1>Sobre e Contato</h1>
  <p>
    A Página Virada é uma livraria pequena de São Paulo que vende livros novos e usados desde 2010.
  </p>

  <form class="formulario" onsubmit={enviar} novalidate>
    <label for="nome">Nome</label>
    <input id="nome" bind:value={nome} />
    {#if erros.nome}<p class="erro">{erros.nome}</p>{/if}

    <label for="email">E-mail</label>
    <input id="email" type="email" bind:value={email} />
    {#if erros.email}<p class="erro">{erros.email}</p>{/if}

    <label for="assunto">Assunto</label>
    <input id="assunto" bind:value={assunto} />
    {#if erros.assunto}<p class="erro">{erros.assunto}</p>{/if}

    <label for="mensagem">Mensagem</label>
    <textarea id="mensagem" rows="5" bind:value={mensagem}></textarea>
    {#if erros.mensagem}<p class="erro">{erros.mensagem}</p>{/if}

    <button class="botao" type="submit">Enviar</button>
    {#if enviado}<p class="ok">Mensagem enviada! Responderemos em breve.</p>{/if}
  </form>
</section>
