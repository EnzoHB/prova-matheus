<!-- src/routes/ingressos/+page.svelte -->
<script lang="ts">
  import { enhance } from '$app/forms';
  import { Button } from '#lib/components/ui/button';
  import { Input } from '#lib/components/ui/input';
  import { Label } from '#lib/components/ui/label';
  import * as Select from '#lib/components/ui/select';
  import { CheckCircle } from 'lucide-svelte';
  import type { ActionData } from './$types';

  // Svelte 5: $props() substitui o "export let"
  let { form }: { form: ActionData } = $props();

  // Svelte 5: $state() para variáveis reativas
  let ticketValue = $state("80");
  let quantity = $state(1);

  // Svelte 5: $derived() substitui os blocos reativos ($:)
  let total = $derived((parseInt(ticketValue) * quantity).toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }));
</script>

<div class="flex-grow flex flex-col min-h-screen">
  {#if form?.success}
    <div class="flex-grow flex items-center justify-center py-20">
      <div class="text-center p-8 border-2 border-primary max-w-md">
        <CheckCircle class="w-16 h-16 text-primary mx-auto mb-4" />
        <h2 class="text-2xl font-bold mb-2">Pedido Recebido!</h2>
        <p class="mb-6 text-muted-foreground">Obrigado por sua compra. Você receberá os detalhes em seu e-mail em breve.</p>
        <Button href="/" class="w-full">Voltar ao Início</Button>
      </div>
    </div>
  {:else}
    <section class="bg-muted border-b py-12 px-8">
      <div class="max-w-4xl mx-auto text-center">
        <h1 class="text-3xl md:text-5xl font-bold text-foreground mb-4 uppercase tracking-wider">Garanta seu Ingresso</h1>
        <p class="text-lg text-muted-foreground max-w-2xl mx-auto">
          Participe de uma imersão cultural inesquecível. Reserve sua entrada para a Semana da Cultura Japonesa e vivencie tradições milenares.
        </p>
      </div>
    </section>

    <section class="py-16 px-8 bg-background flex-grow">
      <div class="max-w-[800px] mx-auto bg-card border p-8 shadow-sm">
        <div class="mb-8 border-b-2 pb-4">
          <h2 class="text-2xl font-semibold text-primary">Detalhes da Compra</h2>
        </div>

        <form method="POST" use:enhance class="space-y-6">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="flex flex-col space-y-2">
              <Label for="fullName">Nome Completo</Label>
              <Input id="fullName" name="fullName" required type="text" placeholder="Digite seu nome" />
            </div>
            
            <div class="flex flex-col space-y-2">
              <Label for="email">E-mail</Label>
              <Input id="email" name="email" required type="email" placeholder="seu@email.com" />
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div class="flex flex-col space-y-2">
              <Label>Tipo de Ingresso</Label>
              <!-- Atualizando o state via callback do Select do shadcn -->
              <Select.Root onSelectedChange={(v) => v && (ticketValue = v.value)}>
                <Select.Trigger>
                  <Select.Value placeholder="Selecione..." />
                </Select.Trigger>
                <Select.Content>
                  <Select.Item value="80">Inteira - R$ 80,00</Select.Item>
                  <Select.Item value="40">Meia-Entrada - R$ 40,00</Select.Item>
                  <Select.Item value="20">Infantil - R$ 20,00</Select.Item>
                </Select.Content>
                <Select.Input name="ticketType" value={ticketValue} />
              </Select.Root>
            </div>

            <div class="flex flex-col space-y-2">
              <Label>Data de Visita</Label>
              <Select.Root>
                <Select.Trigger>
                  <Select.Value placeholder="Selecione..." />
                </Select.Trigger>
                <Select.Content>
                  <Select.Item value="10">10 de Outubro</Select.Item>
                  <Select.Item value="11">11 de Outubro</Select.Item>
                  <Select.Item value="12">12 de Outubro</Select.Item>
                  <Select.Item value="13">13 de Outubro</Select.Item>
                </Select.Content>
                <Select.Input name="eventDate" required />
              </Select.Root>
            </div>

            <div class="flex flex-col space-y-2">
              <Label for="quantity">Quantidade</Label>
              <Input 
                id="quantity" 
                name="quantity" 
                type="number" 
                min="1" 
                max="10" 
                bind:value={quantity} 
                required 
              />
            </div>
          </div>

          <div class="bg-muted p-4 border mt-8">
            <h3 class="font-semibold mb-2 border-b pb-2">Resumo do Pedido</h3>
            <div class="flex justify-between items-center py-2">
              <span class="text-muted-foreground">Subtotal</span>
              <span class="font-semibold">{total}</span>
            </div>
            <div class="flex justify-between items-center py-2 border-t mt-2">
              <span class="font-bold">Total</span>
              <span class="text-2xl font-bold text-primary">{total}</span>
            </div>
          </div>

          <div class="mt-8 flex justify-end">
            <Button type="submit" class="w-full md:w-auto min-w-[200px]">
              Finalizar Compra
            </Button>
          </div>
        </form>
      </div>
    </section>
  {/if}
</div>