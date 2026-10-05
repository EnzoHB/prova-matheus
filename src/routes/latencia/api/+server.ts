import { json } from '@sveltejs/kit';
import type { RequestHandler } from '../$types';

export const GET: RequestHandler = async () => {
    // Retorna os dados iniciais do cardápio caso o localStorage esteja vazio.
    const produtosIniciais = [
        {
            id: '1',
            nome: 'Hambúrguer Artesanal',
            descricao: 'Pão brioche, blend 200g, queijo prato, bacon e maionese da casa.',
            preco: 35.90,
            categoria: 'Lanches',
            imagem: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=500&q=80'
        },
        {
            id: '2',
            nome: 'Pizza Margherita',
            descricao: 'Massa de fermentação natural, molho de tomate, mussarela e manjericão.',
            preco: 45.00,
            categoria: 'Pizzas',
            imagem: 'https://images.unsplash.com/photo-1604068549290-dea0e4a30536?auto=format&fit=crop&w=500&q=80'
        },
        {
            id: '3',
            nome: 'Salmão Grelhado',
            descricao: 'Posta de salmão com crosta de gergelim e legumes salteados.',
            preco: 62.50,
            categoria: 'Pratos Principais',
            imagem: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=500&q=80'
        }
    ];

    return json(produtosIniciais);
};