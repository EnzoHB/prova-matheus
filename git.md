A regra de ouro do Git é o ciclo contínuo: **sempre puxe (pull) as atualizações antes de começar a trabalhar, e envie (push) quando terminar.**

Abra o terminal na pasta do seu projeto e siga este fluxo diário:

1. **1. Faça o Pull (Sincronizar):** Traz as atualizações do GitHub para o seu computador.
Antes de começar a escrever código, garanta que você tem a versão mais recente do projeto. Isso evita conflitos com o código de outras pessoas.

```bash
git pull origin main

```

*(Nota: Se a sua branch principal se chamar `master` em vez de `main`, substitua no comando).*


2. **2. Faça suas alterações:** Crie, edite ou delete seus arquivos.
Trabalhe no seu projeto normalmente. Salve seus arquivos no seu editor de código (como o VS Code).


3. **3. Adicione as mudanças (Stage):** Avisa ao Git quais arquivos você quer enviar.
Quando terminar de editar, você precisa dizer ao Git para "preparar" essas alterações. O ponto `.` adiciona todos os arquivos modificados de uma vez.

```bash
git add .

```


4. **4. Salve as mudanças localmente (Commit):** Cria um 'pacote' com as suas alterações.
Agora você "empacota" essas alterações com uma mensagem descrevendo o que você fez. Seja claro e direto.

```bash
git commit -m "Corrigi o bug no botão de login"

```


5. **5. Faça o Push (Enviar):** Envia o seu pacote para a nuvem do GitHub.
Finalmente, faça o upload desse commit para o repositório remoto no GitHub.

```bash
git push origin main

```


> **Resumo do ciclo diário:** `pull` ➔ edita código ➔ `add .` ➔ `commit` ➔ `push`.