<script lang="ts">
    import { onMount } from "svelte";
    import { Plus, Trash2, ShoppingCart, ListTodo, Edit2, ShoppingBag } from "lucide-svelte";
    
    // Componentes do shadcn-svelte
    import { Button } from "#lib/components/ui/button";
    import { Input } from "#lib/components/ui/input";
    import { Badge } from "#lib/components/ui/badge";
    import { Checkbox } from "#lib/components/ui/checkbox";
    import * as Card from "#lib/components/ui/card";
    import * as Select from "#lib/components/ui/select";

    let editando = $state(-1);
    let nomeItem = $state("");
    let qtd = $state("");
    let categoria = $state("Alimentos");
    
    // Tipagem básica opcional para organizar
    type Item = { nomeItem: string; qtd: number; categoria: string };
    let itens: Item[] = $state([]);
    let comprados: number[] = $state([]);

    $inspect(comprados);

    onMount(() => {
        let itensSalvos = localStorage.getItem("itens_compras"); // Mudei levemente a key para evitar conflitos
        if (itensSalvos) {
            let abc = JSON.parse(itensSalvos);
            abc.forEach((item: Item) => itens.push(item));
        }
    });

    function submeterFormulario(event: Event) {
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
        let item = { nomeItem, qtd: Number(qtd) || 1, categoria };
        itens.push(item);
    }

    function persistirItens() {
        localStorage.setItem('itens_compras', JSON.stringify(itens));
    }

    function limparItem() {
        nomeItem = "";
        qtd = "";
        categoria = "Alimentos";
    }

    function removerItem(i: number) {
        itens.splice(i, 1);       
        
        // Mantive sua lógica inteligente de reajuste de índices
        comprados = comprados
            .filter(idx => idx !== i)
            .map(idx => (idx > i ? idx - 1 : idx));

        persistirItens();
    }

    // Função auxiliar para integrar o Checkbox do shadcn com sua array de índices
    function toggleComprado(i: number, isChecked: boolean) {
        if (isChecked) {
            if (!comprados.includes(i)) comprados = [...comprados, i];
        } else {
            comprados = comprados.filter(idx => idx !== i);
        }
        persistirItens();
    }

    function entrarEmModoEdicao(i: number) {
        editando = i;
    }

    function sairDoModoEdicao() {
        editando = -1;
        persistirItens(); 
    }

    let categorias = ["Alimentos", "Eletrodomésticos", "Roupas", "Outros"];
</script>

<main class="min-h-screen bg-muted/30 py-8 px-4 font-sans text-foreground">
    <div class="max-w-3xl mx-auto space-y-6">
        
        <!-- HEADER -->
        <header class="flex items-center gap-3 mb-8">
            <div class="bg-primary p-3 rounded-xl text-primary-foreground shadow-sm">
                <ShoppingCart class="h-6 w-6" />
            </div>
            <h1 class="text-3xl font-bold tracking-tight">Lista de Compras</h1>
        </header>

        <!-- FORMULÁRIO DE ADIÇÃO -->
        <Card.Root class="shadow-sm border-muted">
            <Card.Content class="p-4 sm:p-6">
                <form class="flex flex-col sm:flex-row gap-3" onsubmit={submeterFormulario}>
                    <div class="flex-1">
                        <Input 
                            type="text" 
                            placeholder="O que você precisa comprar?" 
                            bind:value={nomeItem}
                            class="h-11"
                        />
                    </div>
                    <div class="w-full sm:w-24">
                        <Input 
                            type="number" 
                            placeholder="Qtd" 
                            bind:value={qtd}
                            min="1"
                            class="h-11"
                        />
                    </div>
                    <div class="w-full sm:w-48">
                        <Select.Root onSelectedChange={(v) => v && (categoria = v.value)}>
                            <Select.Trigger class="h-11">
                                <Select.Value placeholder={categoria} />
                            </Select.Trigger>
                            <Select.Content>
                                {#each categorias as ctg}
                                    <Select.Item value={ctg}>{ctg}</Select.Item>
                                {/each}
                            </Select.Content>
                        </Select.Root>
                    </div>
                    <Button type="submit" class="h-11 px-8 gap-2 font-semibold">
                        <Plus class="h-5 w-5" /> Adicionar
                    </Button>
                </form>
            </Card.Content>
        </Card.Root>

        <!-- STATUS BAR -->
        <section class="flex flex-wrap gap-3 py-2" aria-label="Estatísticas da lista">
            <Badge variant="outline" class="text-sm py-1.5 px-3 bg-background shadow-sm">
                Total: <strong class="ml-1 text-primary">{itens.length}</strong>
            </Badge>
            <Badge variant="secondary" class="text-sm py-1.5 px-3 shadow-sm text-green-700 bg-green-100 hover:bg-green-100">
                No carrinho: <strong class="ml-1">{comprados.length}</strong>
            </Badge>
            <Badge variant="secondary" class="text-sm py-1.5 px-3 shadow-sm text-orange-700 bg-orange-100 hover:bg-orange-100">
                Faltam: <strong class="ml-1">{itens.length - comprados.length}</strong>
            </Badge>
        </section>
        
        <!-- LISTA DE ITENS -->
        {#if itens.length > 0}
            <div class="space-y-3">
                {#each itens as item, i}
                    {@const isComprado = comprados.includes(i)}
                    {@const isEditando = editando === i}
                    
                    <Card.Root class="overflow-hidden transition-all duration-200 {isComprado ? 'bg-muted/50 border-muted opacity-75' : 'bg-background shadow-sm hover:shadow-md hover:border-primary/30'}">
                        <div class="flex items-center p-3 sm:p-4 gap-4">
                            
                            <!-- Checkbox Shadcn -->
                            <div class="flex-shrink-0 pt-1">
                                <Checkbox 
                                    checked={isComprado}
                                    onCheckedChange={(v) => toggleComprado(i, v as boolean)}
                                    class="h-6 w-6 rounded-md transition-colors"
                                />
                            </div>

                            <!-- Área de Edição/Exibição -->
                            <!-- onfocusout usa currentTarget para evitar acionar ao clicar entre inputs filhos -->
                            <div 
                                class="flex-1 flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 {isComprado ? 'line-through text-muted-foreground' : ''}" 
                                onfocusin={() => entrarEmModoEdicao(i)}
                                onfocusout={(e) => {
                                    if (!e.currentTarget.contains(e.relatedTarget as Node)) sairDoModoEdicao();
                                }}
                            >
                                <div class="flex-1 relative group">
                                    <input 
                                        type="text" 
                                        class="w-full bg-transparent border-b-2 border-transparent focus:border-primary outline-none transition-colors font-medium text-lg pb-1 {isComprado ? 'text-muted-foreground' : 'text-foreground'}"
                                        bind:value={item.nomeItem} 
                                        aria-label="Editar nome do item"
                                    />
                                    {#if !isEditando && !isComprado}
                                        <Edit2 class="h-3 w-3 absolute right-0 top-2 opacity-0 group-hover:opacity-30 transition-opacity" />
                                    {/if}
                                </div>
                                
                                <div class="flex items-center gap-3 text-sm text-muted-foreground">
                                    <div class="flex items-center gap-1 bg-muted px-2 py-1 rounded-md">
                                        <input 
                                            type="number" 
                                            class="w-12 bg-transparent outline-none text-center font-medium {isComprado ? 'text-muted-foreground' : 'text-foreground'}"
                                            bind:value={item.qtd} 
                                        />
                                        <span>un.</span>
                                    </div>
                                    
                                    <select 
                                        class="bg-transparent font-medium outline-none cursor-pointer hover:text-foreground transition-colors {isComprado ? 'text-muted-foreground' : ''}" 
                                        bind:value={item.categoria}
                                    >
                                        {#each categorias as ctg}
                                            <option value={ctg} class="text-foreground">{ctg}</option>
                                        {/each}
                                    </select>
                                </div>
                            </div>
                            
                            <!-- Botão de Deletar -->
                            <Button 
                                variant="ghost" 
                                size="icon" 
                                class="flex-shrink-0 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                                onclick={() => removerItem(i)}
                                aria-label="Remover item"
                            >
                                <Trash2 class="h-5 w-5" />
                            </Button>
                        </div>
                    </Card.Root>
                {/each}
            </div>
        {:else}
            <!-- EMPTY STATE -->
            <Card.Root class="border-dashed border-2 bg-transparent shadow-none">
                <Card.Content class="flex flex-col items-center justify-center py-16 text-muted-foreground">
                    <ShoppingBag class="h-16 w-16 mb-4 opacity-20" />
                    <h3 class="text-xl font-semibold mb-2 text-foreground">Sua lista está vazia</h3>
                    <p>Adicione itens no formulário acima para começar suas compras!</p>
                </Card.Content>
            </Card.Root>
        {/if}
    </div>
</main>