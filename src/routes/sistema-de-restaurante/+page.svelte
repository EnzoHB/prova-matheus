<script lang="ts">
    import { onMount } from 'svelte';
    import { Produto, Carrinho, Gerenciador, Pedido } from './something.svelte';
    import { Trash2, Plus, Minus, Edit, CheckCircle, ShoppingCart } from 'lucide-svelte';

    const gerenciador = new Gerenciador();
    const carrinho = new Carrinho();

    // Estado do formulário de produto (CREATE / UPDATE)
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
            const res = await fetch('/sistema-de-restaurante/api/');
            const produtosIniciais = await res.json();
            produtosIniciais.forEach((p: any) => gerenciador.adicionarProduto(new Produto(p.id, p.nome, p.descricao, p.preco, p.categoria, p.imagem)));
            salvarDados();
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
            carrinho.removerItem(id); // Consistência: remove do carrinho se sair do cardápio
            salvarDados();
            mostrarFeedback('Produto removido.');
        }
    }

    // --- OPERAÇÕES DO CARRINHO --- //
    function adicionarAoCarrinho(produto: Produto) {
        carrinho.adicionarItem(produto);
        mostrarFeedback(`${produto.nome} adicionado ao carrinho!`);
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
        mostrarFeedback('Pedido finalizado com sucesso! Acompanhe no balcão.');
    }
</script>

<div class="min-h-screen bg-slate-50 font-sans text-slate-900">
    
    <!-- Toast de Feedback (Padrão de IHC: Resposta Visual) -->
    {#if feedbackMsg}
        <div class="fixed top-4 right-4 z-50 rounded-lg bg-green-600 px-6 py-3 text-white shadow-lg transition-all flex items-center gap-2">
            <CheckCircle class="h-5 w-5" />
            <span class="font-medium">{feedbackMsg}</span>
        </div>
    {/if}

    <header class="bg-red-600 text-white shadow-md p-6 sticky top-0 z-40">
        <div class="max-w-7xl mx-auto flex justify-between items-center">
            <h1 class="text-2xl font-bold tracking-tight">Le Petit Bistrô</h1>
            <div class="flex items-center gap-2 font-semibold">
                <ShoppingCart class="h-6 w-6" />
                <span>{carrinho.itens.length} itens</span>
            </div>
        </div>
    </header>

    <main class="max-w-7xl mx-auto p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        <!-- COLUNA ESQUERDA: Cardápio e Carrossel -->
        <div class="lg:col-span-2 space-y-8">
            
            <!-- CARROSSEL DE DESTAQUES (Requisito IHC e Funcional) -->
            <section>
                <h2 class="text-xl font-bold mb-4 border-b pb-2">Destaques do Chef</h2>
                <div class="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-4 scroll-smooth hide-scrollbar">
                    {#each gerenciador.produtos.slice(0, 4) as produto}
                        <div class="snap-center shrink-0 w-72 rounded-xl bg-white shadow-sm border overflow-hidden group">
                            <img src={produto.imagem} alt={produto.nome} class="h-48 w-full object-cover transition-transform group-hover:scale-105" />
                            <div class="p-4">
                                <h3 class="font-bold text-lg">{produto.nome}</h3>
                                <p class="text-red-600 font-semibold mb-3">
                                    {produto.preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                                </p>
                                <button onclick={() => adicionarAoCarrinho(produto)} class="w-full bg-red-100 text-red-700 hover:bg-red-600 hover:text-white py-2 rounded-md font-medium transition-colors">
                                    Adicionar
                                </button>
                            </div>
                        </div>
                    {/each}
                </div>
            </section>

            <!-- LISTAGEM COMPLETA DO CARDÁPIO (READ & UPDATE/DELETE) -->
            <section>
                <h2 class="text-xl font-bold mb-4 border-b pb-2">Cardápio Completo</h2>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {#each gerenciador.produtos as produto}
                        <div class="flex rounded-xl bg-white shadow-sm border p-4 gap-4">
                            <img src={produto.imagem} alt={produto.nome} class="h-24 w-24 rounded-lg object-cover" />
                            <div class="flex-1 flex flex-col">
                                <div class="flex justify-between items-start">
                                    <h3 class="font-bold">{produto.nome}</h3>
                                    <div class="flex gap-1">
                                        <button onclick={() => prepararEdicao(produto)} class="p-1 text-slate-400 hover:text-blue-600 transition-colors" title="Editar">
                                            <Edit class="h-4 w-4" />
                                        </button>
                                        <button onclick={() => removerProduto(produto.id)} class="p-1 text-slate-400 hover:text-red-600 transition-colors" title="Remover do cardápio">
                                            <Trash2 class="h-4 w-4" />
                                        </button>
                                    </div>
                                </div>
                                <p class="text-sm text-slate-500 line-clamp-2 mb-2">{produto.descricao}</p>
                                <div class="mt-auto flex justify-between items-center">
                                    <span class="font-bold text-red-600">
                                        {produto.preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                                    </span>
                                    <button onclick={() => adicionarAoCarrinho(produto)} class="p-1.5 bg-slate-900 text-white rounded-md hover:bg-slate-800 transition-colors">
                                        <Plus class="h-4 w-4" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    {/each}
                </div>
            </section>

            <!-- ADMIN: GESTÃO DO CARDÁPIO (CREATE / UPDATE) -->
            <section class="bg-slate-200 rounded-xl p-6 mt-8">
                <h2 class="text-lg font-bold mb-4 flex items-center gap-2">
                    {editando ? 'Atualizar Produto' : 'Cadastrar Novo Produto no Cardápio'}
                </h2>
                <form onsubmit={salvarProduto} class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input type="text" bind:value={formProduto.nome} placeholder="Nome do Prato" required class="p-2 rounded border" />
                    <input type="number" bind:value={formProduto.preco} placeholder="Preço (R$)" step="0.01" required class="p-2 rounded border" />
                    <input type="text" bind:value={formProduto.categoria} placeholder="Categoria" required class="p-2 rounded border" />
                    <input type="url" bind:value={formProduto.imagem} placeholder="URL da Imagem" required class="p-2 rounded border" />
                    <textarea bind:value={formProduto.descricao} placeholder="Descrição detalhada" required class="p-2 rounded border sm:col-span-2"></textarea>
                    
                    <div class="sm:col-span-2 flex justify-end gap-2">
                        {#if editando}
                            <button type="button" onclick={() => { editando = false; formProduto = { id: '', nome: '', descricao: '', preco: 0, categoria: '', imagem: '' }; }} class="px-4 py-2 bg-slate-400 text-white rounded font-medium">Cancelar</button>
                        {/if}
                        <button type="submit" class="px-4 py-2 bg-slate-900 text-white rounded font-medium">
                            {editando ? 'Salvar Alterações' : 'Cadastrar Produto'}
                        </button>
                    </div>
                </form>
            </section>
        </div>

        <!-- COLUNA DIREITA: CARRINHO DE COMPRAS -->
        <aside class="h-fit sticky top-24 bg-white rounded-2xl shadow-xl border border-slate-100 p-6 flex flex-col">
            <h2 class="text-2xl font-bold mb-6 flex items-center gap-2">
                Seu Pedido
            </h2>

            {#if carrinho.itens.length === 0}
                <div class="text-center py-8 text-slate-400">
                    <ShoppingCart class="h-12 w-12 mx-auto mb-2 opacity-50" />
                    <p>Seu carrinho está vazio.</p>
                </div>
            {:else}
                <div class="flex-1 overflow-y-auto max-h-[40vh] pr-2 space-y-4 mb-6">
                    {#each carrinho.itens as item}
                        <div class="flex justify-between items-center">
                            <div class="flex-1">
                                <p class="font-semibold text-sm leading-tight">{item.produto.nome}</p>
                                <p class="text-slate-500 text-xs">
                                    {item.produto.preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} un.
                                </p>
                            </div>
                            
                            <div class="flex items-center gap-3 bg-slate-100 rounded-lg p-1">
                                <button onclick={() => carrinho.atualizarQuantidade(item.produto.id, item.quantidade - 1)} class="p-1 text-slate-600 hover:text-red-600">
                                    <Minus class="h-3 w-3" />
                                </button>
                                <span class="font-bold text-sm w-4 text-center">{item.quantidade}</span>
                                <button onclick={() => carrinho.atualizarQuantidade(item.produto.id, item.quantidade + 1)} class="p-1 text-slate-600 hover:text-green-600">
                                    <Plus class="h-3 w-3" />
                                </button>
                            </div>
                        </div>
                    {/each}
                </div>

                <div class="border-t pt-4 space-y-4">
                    
                    <!-- Opção de Entrega (Padrão de IHC: Visibilidade de Estado) -->
                    <div class="flex bg-slate-100 rounded-lg p-1">
                        <button class="flex-1 py-1.5 text-sm font-medium rounded-md transition-colors {carrinho.tipoEntrega === 'local' ? 'bg-white shadow text-slate-900' : 'text-slate-500'}" onclick={() => carrinho.tipoEntrega = 'local'}>
                            Retirar no Local
                        </button>
                        <button class="flex-1 py-1.5 text-sm font-medium rounded-md transition-colors {carrinho.tipoEntrega === 'delivery' ? 'bg-white shadow text-slate-900' : 'text-slate-500'}" onclick={() => carrinho.tipoEntrega = 'delivery'}>
                            Delivery (+R$ 2,50)
                        </button>
                    </div>

                    <!-- Resumo Financeiro -->
                    <div class="space-y-2 text-sm">
                        <div class="flex justify-between text-slate-600">
                            <span>Subtotal</span>
                            <span>{carrinho.subtotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
                        </div>
                        {#if carrinho.tipoEntrega === 'delivery'}
                            <div class="flex justify-between text-red-500 font-medium">
                                <span>Taxa de Entrega</span>
                                <span>{carrinho.taxaEntrega.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
                            </div>
                        {/if}
                        <div class="flex justify-between text-xl font-bold text-slate-900 pt-2 border-t">
                            <span>Total</span>
                            <span>{carrinho.total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
                        </div>
                    </div>

                    <input type="text" bind:value={nomeCliente} placeholder="Nome do Cliente" class="w-full p-3 rounded-lg border bg-slate-50 font-medium" />

                    <div class="flex gap-2">
                        <button onclick={limparCarrinho} class="px-4 py-3 text-red-600 bg-red-50 hover:bg-red-100 rounded-lg font-bold transition-colors">
                            Limpar
                        </button>
                        <button onclick={finalizarPedido} class="flex-1 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-bold text-lg transition-colors shadow-md shadow-red-200">
                            Finalizar Pedido
                        </button>
                    </div>
                </div>
            {/if}
        </aside>
    </main>
</div>

<style>
    /* Oculta a barra de rolagem mantendo a funcionalidade nativa do CSS scroll snap */
    .hide-scrollbar::-webkit-scrollbar { display: none; }
    .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
</style>