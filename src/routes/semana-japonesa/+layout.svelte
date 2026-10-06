<script lang="ts">
  import favicon from "#lib/assets/favicon.svg";
  import logo from "#lib/assets/logo.svg"
  import type { LayoutProps } from "./$types";

  let { children }: LayoutProps = $props();
  import * as NavigationMenu from "#lib/components/ui/navigation-menu/index.js";
  import { Button } from "#lib/components/ui/button/index.js"
  import { navigationMenuTriggerStyle } from "#lib/components/ui/navigation-menu/navigation-menu-trigger.svelte";

  const basePath = '/semana-japonesa'

</script>

<svelte:head>
  <link rel="icon" href={favicon} />
</svelte:head>

<div class="flex min-h-screen flex-col bg-background">
  <header class="sticky top-0 z-50 flex h-16 w-full items-center justify-between border-b bg-background px-4 md:px-6">
    <div class="flex items-center gap-1">
      <a href="{basePath}">
        <img class="aspect-auto w-35" src={logo} alt="logo"/>
      </a>
      <NavigationMenu.Root>
        <NavigationMenu.List>
          <NavigationMenu.Item>
            <NavigationMenu.Link
              href="{basePath}/programacao"
              class={navigationMenuTriggerStyle()}
            >
              Programação
            </NavigationMenu.Link>
          </NavigationMenu.Item>
          <NavigationMenu.Item>
            <NavigationMenu.Link
              href="{basePath}/evento"
              class={navigationMenuTriggerStyle()}
            >
              Evento
            </NavigationMenu.Link>
          </NavigationMenu.Item>
          <NavigationMenu.Item>
            <NavigationMenu.Link
              href="{basePath}/galeria"
              class={navigationMenuTriggerStyle()}
            >
              Galeria
            </NavigationMenu.Link>
          </NavigationMenu.Item>
          <NavigationMenu.Item>
            <NavigationMenu.Link
              href="{basePath}/culinaria"
              class={navigationMenuTriggerStyle()}
            >
              Culinária
            </NavigationMenu.Link>
          </NavigationMenu.Item>
          <NavigationMenu.Item>
            <NavigationMenu.Link
              href="{basePath}/ingressos"
              class={navigationMenuTriggerStyle()}
            >
              Ingresso
            </NavigationMenu.Link>
          </NavigationMenu.Item>
          <NavigationMenu.Indicator />
        </NavigationMenu.List>
      </NavigationMenu.Root>
    </div>
  </header>

  <main class="flex-1 overflow-y-auto p-6 md:p-8">
    {@render children()}
  </main>

  <footer class="border-t bg-muted/20 py-12 px-4 md:px-6">
    <div class="mx-auto w-full max-w-7xl">
      <div class="grid grid-cols-1 gap-8 md:grid-cols-4 lg:gap-12">
        <!-- Branding / About -->
        <div class="flex flex-col gap-4">
          <a href="/" class="text-xl font-bold tracking-tight">Semana da Cultura Japonesa</a>
          <p class="text-sm text-muted-foreground">
            A melhor experiência para o seu evento. Acompanhe nossas novidades, veja nossa galeria e garanta seu ingresso.
          </p>
        </div>

        <!-- Sitemap / Links -->
        <div class="flex flex-col gap-4">
          <h3 class="font-semibold text-foreground">Links Rápidos</h3>
          <ul class="flex flex-col gap-2 text-sm text-muted-foreground">
            <li>
              <a href="{basePath}/cardapio" class="hover:text-foreground transition-colors">Cardápio</a>
            </li>
            <li>
              <a href="{basePath}/evento" class="hover:text-foreground transition-colors">Evento</a>
            </li>
            <li>
              <a href="{basePath}/galeria" class="hover:text-foreground transition-colors">Galeria</a>
            </li>
            <li>
              <a href="{basePath}/culinaria" class="hover:text-foreground transition-colors">Galeria</a>
            </li>
            <li>
              <a href="{basePath}/ingressos" class="hover:text-foreground transition-colors">Ingressos</a>
            </li>
          </ul>
        </div>

        <!-- Contact Info -->
        <div class="flex flex-col gap-4">
          <h3 class="font-semibold text-foreground">Contato</h3>
          <ul class="flex flex-col gap-2 text-sm text-muted-foreground">
            <li>enzohhb@gmail.com</li>
            <li>(11) 991494-2391</li>
            <li>São Paulo, SP</li>
          </ul>
        </div>

        <!-- Social Media -->
        <div class="flex flex-col gap-4">
          <h3 class="font-semibold text-foreground">Redes Sociais</h3>
          <ul class="flex flex-col gap-2 text-sm text-muted-foreground">
            <li>
              <a href="https://instagram.com" target="_blank" class="hover:text-foreground transition-colors">Instagram</a>
            </li>
            <li>
              <a href="https://twitter.com" target="_blank" class="hover:text-foreground transition-colors">X (Twitter)</a>
            </li>
            <li>
              <a href="https://tiktok.com" target="_blank" class="hover:text-foreground transition-colors">TikTok</a>
            </li>
          </ul>
        </div>
      </div>

      <!-- Bottom Bar -->
      <div class="mt-12 flex flex-col items-center justify-between gap-4 border-t pt-8 text-sm text-muted-foreground md:flex-row">
        <p>© {new Date().getFullYear()} Enzo. Todos os direitos reservados.</p>
        <div class="flex gap-4">
          <a href="/termos" class="hover:text-foreground transition-colors">Termos de Uso</a>
          <a href="/privacidade" class="hover:text-foreground transition-colors">Privacidade</a>
        </div>
      </div>
    </div>
  </footer>
</div>
