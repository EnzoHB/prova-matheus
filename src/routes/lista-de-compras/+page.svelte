<script>
    import { onMount } from "svelte";
    import './style.css'

    let editando = $state(-1);
    let nomeItem = $state("");
    let qtd = $state("");
    let categoria = $state("Alimentos");
    let itens = $state([]);
    let comprados = $state([]);

    $inspect(comprados);

    onMount(() => {
        let itensSalvos = localStorage.getItem("itens");
        if (itensSalvos) {
            let abc = JSON.parse(itensSalvos);
            abc.forEach(item => itens.push(item));
        }
    });

    function submeterFormulario(event) {
        event.preventDefault();
        if (!validarNovoItem()) return;
        
        adicionarItemLista();
        persistirItens();
        limparItem();
    }

    function validarNovoItem() {
        return nomeItem.trim().length > 0;
    }

    function adicionarItemLista() {
        let item = { nomeItem, qtd: Number(qtd), categoria };
        itens.push(item);
    }

    function persistirItens() {
        localStorage.setItem('itens', JSON.stringify(itens));
    }

    function limparItem() {
        nomeItem = "";
        qtd = "";
        categoria = "Alimentos";
    }

    function removerItem(i) {
        itens.splice(i, 1);       
        
        comprados = comprados
            .filter(idx => idx !== i)
            .map(idx => (idx > i ? idx - 1 : idx));

        persistirItens();
    }

    function entrarEmModoEdicao(i) {
        editando = i;
    }

    function sairDoModoEdicao() {
        editando = -1;
        persistirItens(); 
    }

    let categorias = ["Alimentos", "Eletrodomésticos", "Roupas", "Outros"];
</script>

<main class="main">
    <header class="header">
        <h1>Lista de Compras</h1>
    </header>

    <form class="controls card-shadow" onsubmit={submeterFormulario}>
        <div class="input-group">
            <input 
                type="text" 
                class="input-main"
                aria-label="Adicionar novo item" 
                placeholder="Adicionar item..." 
                bind:value={nomeItem}
            />
            <input 
                id="campoQtd" 
                type="number" 
                class="input-qtd"
                aria-label="Quantidade"
                placeholder="Qtd" 
                bind:value={qtd}
            />
            <select class="input-select" aria-label="Categoria" bind:value={categoria}>
                {#each categorias as ctg}
                    <option value={ctg}>{ctg}</option>
                {/each}
            </select>
        </div>
        <button type="submit" class="btn-primary" aria-label="Adicionar item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
        </button>
    </form>

    <section class="status-bar" aria-label="Estatísticas da lista">
        <div class="badge">Total: <strong>{itens.length}</strong></div>
        <div class="badge">No carrinho: <strong>{comprados.length}</strong></div>
        <div class="badge pendentes">Faltam: <strong>{itens.length - comprados.length}</strong></div>
    </section>
    
    {#if itens.length > 0}
        <ul class="itens card-shadow">
            {#each itens as item, i}
                <li class={["item", comprados.includes(i) ? "riscado" : "", editando === i ? "focado" : ""]}>
                    
                    <label class="checkbox-wrapper">
                        <input type="checkbox" bind:group={comprados} value={i} onchange={persistirItens}/> 
                        <span class="custom-checkbox"></span>
                    </label>

                    <div class="item-content" onfocusin={() => entrarEmModoEdicao(i)} onfocusout={sairDoModoEdicao}>
                        <input 
                            type="text" 
                            class="inline-input text-bold" 
                            bind:value={item.nomeItem} 
                            aria-label="Editar nome do item"
                        />
                        
                        <div class="item-meta">
                            <input 
                                type="number" 
                                class="inline-input text-meta width-auto" 
                                bind:value={item.qtd} 
                                aria-label="Editar quantidade"
                            />
                            <span class="text-meta">qtd.</span>
                            <select 
                                class="inline-input text-meta width-auto select-inline" 
                                bind:value={item.categoria}
                                aria-label="Editar categoria"
                            >
                                {#each categorias as ctg}
                                    <option value={ctg}>{ctg}</option>
                                {/each}
                            </select>
                        </div>
                    </div>
                    
                    <button type="button" class="btn-icon btn-danger" aria-label="Remover {item.nomeItem}" onclick={() => removerItem(i)}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M3 6h18"></path>
                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                        </svg>
                    </button>
                </li>
            {/each}
        </ul>
    {:else}
        <div class="empty-state">
            <p>Sua lista está vazia. Adicione itens acima!</p>
        </div>
    {/if}
</main>