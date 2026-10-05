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
  
</div>
