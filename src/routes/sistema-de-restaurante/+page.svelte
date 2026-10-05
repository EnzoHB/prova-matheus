<script lang="ts">
    import { onMount } from 'svelte';
    import { Produto, Carrinho, Gerenciador, Pedido } from './something.svelte';
    import { Trash2, Plus, Minus, Edit, CheckCircle, ShoppingCart, Info, UtensilsCrossed } from 'lucide-svelte';
    
    // Componentes do shadcn-svelte
    import { Button } from '#lib/components/ui/button';
    import { Input } from '#lib/components/ui/input';
    import { Textarea } from '#lib/components/ui/textarea';
    import { Label } from '#lib/components/ui/label';
    import { Badge } from '#lib/components/ui/badge';
    import * as Card from '#lib/components/ui/card';

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
</script>

<div class="min-h-screen bg-muted/30 font-sans text-foreground pb-12">
    
    <!-- Toast de Feedback Estilizado -->
    {#if feedbackMsg}
        <div class="fixed bottom-6 right-6 z-50 rounded-lg bg-primary text-primary-foreground px-6 py-4 shadow-xl flex items-center gap-3 animate-in slide-in-from-bottom-5">
            <CheckCircle class="h-5 w-5" />
            <span class="font-medium">{feedbackMsg}</span>
        </div>
    {/if}

    <header class="bg-card border-b sticky top-0 z-40 shadow-sm">
        <div class="max-w-7xl mx-auto flex justify-between items-center p-4 md:p-6">
            <div class="flex items-center gap-2 text-primary">
                <UtensilsCrossed class="h-6 w-6" />
                <h1 class="text-2xl font-bold tracking-tight">Le Petit Bistrô</h1>
            </div>
            <div class="flex items-center gap-2 font-semibold bg-primary/10 text-primary px-4 py-2 rounded-full">
                <ShoppingCart class="h-5 w-5" />
                <span>{carrinho.itens.length} itens</span>
            </div>
        </div>
    </header>

    <main class="max-w-7xl mx-auto p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        <!-- COLUNA ESQUERDA: Cardápio e Carrossel -->
        <div class="lg:col-span-2 space-y-10">
            
            <!-- CARROSSEL DE DESTAQUES -->
            <section>
                <div class="flex items-center justify-between mb-4">
                    <h2 class="text-2xl font-semibold tracking-tight">Destaques do Chef</h2>
                </div>
                <div class="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-4 scroll-smooth hide-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0">
                    {#each gerenciador.produtos.slice(0, 4) as produto}
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
                </div>
            </section>

            <!-- LISTAGEM COMPLETA DO CARDÁPIO -->
            <section>
                <h2 class="text-2xl font-semibold tracking-tight mb-4">Cardápio Completo</h2>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {#each gerenciador.produtos as produto}
                        <Card.Root class="flex flex-row overflow-hidden hover:bg-muted/50 transition-colors">
                            <img src={produto.imagem} alt={produto.nome} class="w-32 h-auto object-cover" />
                            <div class="flex flex-col flex-1 p-4">
                                <div class="flex justify-between items-start mb-1">
                                    <h3 class="font-bold leading-none">{produto.nome}</h3>
                                    <div class="flex gap-1 -mt-1 -mr-2">
                                        <Button variant="ghost" size="icon" class="h-8 w-8 text-muted-foreground hover:text-primary" onclick={() => prepararEdicao(produto)} title="Editar">
                                            <Edit class="h-4 w-4" />
                                        </Button>
                                        <Button variant="ghost" size="icon" class="h-8 w-8 text-muted-foreground hover:text-destructive" onclick={() => removerProduto(produto.id)} title="Remover">
                                            <Trash2 class="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                                <p class="text-xs text-muted-foreground line-clamp-2 mb-3">{produto.descricao}</p>
                                
                                <div class="mt-auto flex justify-between items-center">
                                    <span class="font-bold text-primary">
                                        {produto.preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                                    </span>
                                    <Button variant="secondary" size="icon" class="h-8 w-8 rounded-full" onclick={() => adicionarAoCarrinho(produto)}>
                                        <Plus class="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        </Card.Root>
                    {/each}
                </div>
            </section>

            <!-- ADMIN: GESTÃO DO CARDÁPIO -->
            <Card.Root class="border-primary/20 bg-primary/5">
                <Card.Header>
                    <Card.Title class="flex items-center gap-2">
                        {editando ? 'Atualizar Produto' : 'Cadastrar Novo Produto'}
                    </Card.Title>
                    <Card.Description>Gerencie os itens disponíveis no cardápio do restaurante.</Card.Description>
                </Card.Header>
                <Card.Content>
                    <form onsubmit={salvarProduto} class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div class="space-y-2">
                            <Label for="nome">Nome do Prato</Label>
                            <Input id="nome" bind:value={formProduto.nome} required />
                        </div>
                        <div class="space-y-2">
                            <Label for="preco">Preço (R$)</Label>
                            <Input id="preco" type="number" bind:value={formProduto.preco} step="0.01" required />
                        </div>
                        <div class="space-y-2">
                            <Label for="categoria">Categoria</Label>
                            <Input id="categoria" bind:value={formProduto.categoria} placeholder="Ex: Entradas, Pratos Principais..." required />
                        </div>
                        <div class="space-y-2">
                            <Label for="imagem">URL da Imagem</Label>
                            <Input id="imagem" type="url" bind:value={formProduto.imagem} required />
                        </div>
                        <div class="space-y-2 sm:col-span-2">
                            <Label for="descricao">Descrição detalhada</Label>
                            <Textarea id="descricao" bind:value={formProduto.descricao} rows={3} required />
                        </div>
                        
                        <div class="sm:col-span-2 flex justify-end gap-3 mt-2">
                            {#if editando}
                                <Button type="button" variant="outline" onclick={() => { editando = false; formProduto = { id: '', nome: '', descricao: '', preco: 0, categoria: '', imagem: '' }; }}>
                                    Cancelar
                                </Button>
                            {/if}
                            <Button type="submit">
                                {editando ? 'Salvar Alterações' : 'Cadastrar Produto'}
                            </Button>
                        </div>
                    </form>
                </Card.Content>
            </Card.Root>
        </div>

        <!-- COLUNA DIREITA: CARRINHO DE COMPRAS -->
        <aside class="lg:sticky lg:top-24 h-fit">
            <Card.Root class="shadow-lg border-muted">
                <Card.Header class="pb-4 border-b">
                    <Card.Title class="text-2xl flex items-center gap-2">
                        Seu Pedido
                    </Card.Title>
                </Card.Header>

                <Card.Content class="pt-6">
                    {#if carrinho.itens.length === 0}
                        <div class="text-center py-10 text-muted-foreground flex flex-col items-center">
                            <div class="bg-muted p-4 rounded-full mb-4">
                                <ShoppingCart class="h-8 w-8 opacity-50" />
                            </div>
                            <p class="font-medium">Seu carrinho está vazio.</p>
                            <p class="text-sm">Adicione itens do cardápio para começar.</p>
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
                </Card.Content>
                
                {#if carrinho.itens.length > 0}
                    <Card.Footer class="flex flex-col gap-3 bg-muted/30 pt-4">
                        <Button size="lg" class="w-full font-bold text-base" onclick={finalizarPedido}>
                            Finalizar Pedido
                        </Button>
                        <Button variant="ghost" class="w-full text-muted-foreground hover:text-destructive" onclick={limparCarrinho}>
                            Esvaziar Carrinho
                        </Button>
                    </Card.Footer>
                {/if}
            </Card.Root>
        </aside>
    </main>
</div>

<style>
    /* Oculta a barra de rolagem mantendo a funcionalidade nativa do CSS scroll snap */
    .hide-scrollbar::-webkit-scrollbar { display: none; }
    .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
    
    /* Scrollbar customizada suave para o carrinho */
    .custom-scrollbar::-webkit-scrollbar { width: 4px; }
    .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
    .custom-scrollbar::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 4px; }
    .custom-scrollbar:hover::-webkit-scrollbar-thumb { background: #cbd5e1; }
</style>