// src/routes/ingressos/+page.server.ts
import type { Actions } from './$types';

export const actions = {
  default: async ({ request }) => {
    const data = await request.formData();
    
    // Aqui você extrai os dados do formulário para salvar no banco ou enviar por API
    const fullName = data.get('fullName');
    const email = data.get('email');
    const ticketType = data.get('ticketType');
    const eventDate = data.get('eventDate');
    const quantity = data.get('quantity');

    // Simulando um delay de processamento (remova em produção)
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Retorna sucesso para o frontend
    return { success: true };
  }
} satisfies Actions;