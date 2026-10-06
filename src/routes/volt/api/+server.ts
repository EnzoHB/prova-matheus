import { json } from '@sveltejs/kit';
import type { RequestHandler } from '../$types';

export const GET: RequestHandler = async () => {
    // Retorna os dados iniciais do cardápio caso o localStorage esteja vazio.
    const produtosIniciais = [
        {
            id: '1',
            nome: 'Fone Bluetooth Aura',
            descricao: 'Sem descrição',
            preco: 299.90,
            avaliacao: 4.6,
            categoria: 'Audio',
            image: "about:blank"
        },
        {
            id: '2',
            nome: 'Caixa de Som Portátil',
            descricao: 'Sem descrição',
            preco: 189.90,
            categoria: 'Audio',
            avalicao: 4.4,
            image: "about:blank"
        },
        {
            id: '3',
            nome: 'Teclado Mecânico K2',
            descricao: 'Sem descrição',
            preco: 349.90,
            avalicao: 4.8,
            categoria: 'Acessórios',
            image: "about:blank"
        },
        {
            id: '4',
            nome: 'Smartwatch Fit Move',
            descricao: 'Sem descrição',
            preco: 459.90,
            avalicao: 4.5,
            categoria: 'Vestível',
            image: "about:blank"
        },
        {
            id: '5',
            nome: 'Carregador Rápido 65W',
            descricao: 'Sem descrição',
            preco: 149.90,
            avalicao: 4.7,
            categoria: 'Acessórios',
            image: "about:blank"
        },
        {
            id: '6',
            nome: 'Luminária Led Lumen',
            descricao: 'Sem descrição',
            preco: 129.90,
            avalicao: 4.2,
            categoria: 'Casa',
            image: "about:blank"
        },
        {
            id: '7',
            nome: 'Webcam Full HD Clara',
            descricao: 'Sem descrição',
            preco: 199.90,
            avalicao: 3,
            categoria: 'Acessórios',
            image: "about:blank"
        },
        {
            id: '8',
            nome: 'Hub USB-C 7 em 1',
            descricao: 'Sem descrição',
            preco: 259.90,
            avalicao: 2,
            categoria: 'Acessórios',
            image: "about:blank"
        }
    ];

    return json(produtosIniciais);
};