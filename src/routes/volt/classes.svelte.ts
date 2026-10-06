// Utilizando .svelte.ts para permitir que as classes usem o $state do Svelte 5
// garantindo a reatividade exigida pela interface enquanto mantém o encapsulamento da POO.

export class Produto {
    id: string;
    nome: string;
    descricao: string;
    preco: number;
    avaliacao: number;
    categoria: string;
    imagem: string;

    constructor(id: string, nome: string, descricao: string, preco: number, categoria: string, imagem: string, avaliacao: number) {
        this.id = id;
        this.nome = nome;
        this.descricao = descricao;
        this.preco = preco;
        this.categoria = categoria;
        this.avaliacao = avaliacao;
        this.imagem = imagem;
    }
}

export class ItemCarrinho {
    produto: Produto = $state() as Produto;
    quantidade: number = $state(1);

    constructor(produto: Produto, quantidade: number) {
        this.produto = produto;
        this.quantidade = quantidade;
    }

    get subtotal(): number {
        return this.produto.preco * this.quantidade;
    }
}

export class Carrinho {
    itens: ItemCarrinho[] = $state([]);
    tipoEntrega: 'delivery' | 'local' = $state('local');
    taxaEntrega: number = 2.50;

    adicionarItem(produto: Produto) {
        const itemExistente = this.itens.find(i => i.produto.id === produto.id);
        if (itemExistente) {
            itemExistente.quantidade++;
        } else {
            this.itens.push(new ItemCarrinho(produto, 1));
        }
    }

    removerItem(produtoId: string) {
        this.itens = this.itens.filter(i => i.produto.id !== produtoId);
    }

    atualizarQuantidade(produtoId: string, quantidade: number) {
        const item = this.itens.find(i => i.produto.id === produtoId);
        if (item) {
            if (quantidade <= 0) this.removerItem(produtoId);
            else item.quantidade = quantidade;
        }
    }

    limpar() {
        this.itens = [];
    }

    get subtotal(): number {
        return this.itens.reduce((acc, item) => acc + item.subtotal, 0);
    }

    get total(): number {
        const taxa = this.tipoEntrega === 'delivery' ? this.taxaEntrega : 0;
        return this.subtotal + taxa;
    }
}

export class Pedido {
    cliente: string;
    itens: ItemCarrinho[];
    tipoEntrega: string;
    status: string;
    total: number;
    data: Date;

    constructor(cliente: string, itens: ItemCarrinho[], tipoEntrega: string, status: string, total: number) {
        this.cliente = cliente;
        this.itens = [...itens]; // Copia para evitar mutações futuras
        this.tipoEntrega = tipoEntrega;
        this.status = status;
        this.total = total;
        this.data = new Date();
    }
}

export class Gerenciador {
    produtos: Produto[] = $state([]);
    pedidos: Pedido[] = $state([]);

    // CREATE
    adicionarProduto(produto: Produto) {
        this.produtos.push(produto);
    }

    // READ
    obterProdutos(): Produto[] {
        return this.produtos;
    }

    // UPDATE
    atualizarProduto(id: string, dadosAtualizados: Partial<Produto>) {
        const index = this.produtos.findIndex(p => p.id === id);
        if (index !== -1) {
            this.produtos[index] = { ...this.produtos[index], ...dadosAtualizados } as Produto;
        }
    }

    // DELETE
    removerProduto(id: string) {
        this.produtos = this.produtos.filter(p => p.id !== id);
    }

    adicionarPedido(pedido: Pedido) {
        this.pedidos.push(pedido);
    }
}