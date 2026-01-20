# 🔧 Troubleshooting - ServiçoPRO MVP

## Problemas Comuns e Soluções

### 1. Toasts (Notificações) Não Aparecem

**Sintoma:** Ao fazer login, aceitar proposta, etc., as notificações não aparecem.

**Solução:**
- Verifique se o componente `<Toaster />` está no App.tsx
- Ele já está adicionado no final do arquivo
- As notificações devem aparecer no canto superior direito

---

### 2. Filtros Não Funcionam

**Sintoma:** Ao ajustar os sliders ou checkboxes, nada acontece.

**Solução:**
1. Clique no botão "Aplicar Filtros" após ajustar
2. Se nenhum resultado aparecer:
   - Verifique os valores dos filtros
   - Clique em "Limpar Filtros"
   - Tente novamente com valores menos restritivos

**Exemplo:**
- Distância muito baixa (1-2km) pode não ter profissionais
- Nota 5.0 + apenas verificados = só Maria Oliveira

---

### 3. Upload de Imagens Não Funciona

**Sintoma:** Ao clicar no 📎, nada acontece.

**Solução:**
1. Certifique-se de estar na tela de chat
2. Clique no ícone de clipe (📎)
3. Selecione imagens do tipo: .jpg, .jpeg, .png
4. Aguarde o preview aparecer
5. Clique em "Enviar"

**Se não funcionar:**
- Tente com imagens menores (< 5MB)
- Use formatos padrão (JPG, PNG)
- Tente uma imagem por vez primeiro

---

### 4. Proposta Não Aparece no Chat

**Sintoma:** Após clicar em "Simular Envio de Proposta", nada acontece.

**Solução:**
1. Certifique-se de que há um profissional selecionado
2. O botão está no header da tela de chat
3. Após clicar, a proposta deve aparecer na área de mensagens
4. Role para baixo se necessário

---

### 5. Checkout Não Aceita Confirmação

**Sintoma:** Botão "Confirmar Pagamento" não funciona.

**Solução Cartão de Crédito:**
- Preencha TODOS os campos:
  - Número do cartão (16 dígitos)
  - Nome (qualquer nome)
  - Validade (MM/AA)
  - CVV (3 dígitos)

**Solução PIX/Boleto:**
- Essas formas são mais simples
- Apenas selecione e confirme

---

### 6. Avaliação Não É Aceita

**Sintoma:** Não consigo confirmar a conclusão do serviço.

**Solução - Checklist:**
- [ ] Checkbox "Confirmo que o serviço foi concluído" marcado
- [ ] Estrelas selecionadas (1-5)
- [ ] Comentário escrito (mínimo 20 caracteres)
- [ ] Botão "Confirmar e Liberar Pagamento" clicado

Se algum item faltar, você verá um erro específico.

---

### 7. Tela Branca ou Erro

**Sintoma:** Tela fica branca ou mostra erro no console.

**Solução:**
1. Abra o Console do Navegador (F12)
2. Veja a mensagem de erro
3. Tente voltar para home
4. Faça logout e login novamente
5. Recarregue a página (F5)

**Se persistir:**
- Limpe o cache do navegador
- Tente em modo anônimo
- Use outro navegador (Chrome recomendado)

---

### 8. Profissional Não Abre

**Sintoma:** Ao clicar em um profissional, nada acontece.

**Solução:**
1. Clique no card inteiro (não apenas na foto)
2. Ou clique no botão "Ver Perfil"
3. Aguarde 1 segundo (pode haver delay)
4. Se não funcionar, recarregue a página

---

### 9. Agendamento Não Confirma

**Sintoma:** Modal de agendamento não fecha ao confirmar.

**Solução - Checklist:**
- [ ] Tipo de serviço selecionado
- [ ] Data selecionada (dia futuro, não domingo)
- [ ] Horário selecionado
- [ ] Botão "Confirmar Agendamento" clicado

Todos os 3 campos são obrigatórios!

---

### 10. Cadastro Não Funciona

**Sintoma:** Formulário de cadastro não aceita.

**Solução - Validações:**

**Senha:**
- Mínimo 8 caracteres
- Senha e Confirmar Senha devem ser iguais

**Profissional:**
- Campo "Especialidade" é obrigatório

**Termos:**
- Checkbox "Aceito os termos" deve estar marcado

**Mensagens de erro específicas aparecerão!**

---

### 11. Logout Não Funciona

**Sintoma:** Ao clicar em "Sair", nada acontece.

**Solução:**
- O botão de logout está no canto superior direito da home
- Após clicar, você deve voltar para a tela de login
- Se não funcionar, recarregue a página (F5)

---

### 12. Busca Não Retorna Resultados

**Sintoma:** Digitei na busca mas não aparece nada.

**Soluções:**

**Termos sugeridos:**
- `pedreiro` → Carlos Silva
- `eletricista` → João Santos
- `pintor` ou `pintora` → Maria Oliveira
- `encanador` → Pedro Costa
- `marceneiro` → André Martins
- `arquiteta` → Fabiana Rocha

**Dica:**
- Use termos em português
- Tente palavras-chave simples
- Limpe os filtros antes de buscar
- Deixe o campo vazio para ver todos

---

### 13. Botão "Voltar" Não Funciona

**Sintoma:** Clico em "Voltar" mas nada acontece.

**Solução:**
- Aguarde 1 segundo e clique novamente
- O botão deve estar no header (canto superior esquerdo)
- Se não funcionar, use o fluxo completo até o fim
- Em último caso, recarregue (F5) e faça login novamente

---

### 14. Valores Não Aparecem Corretos

**Sintoma:** Preço, parcelas ou total estão errados.

**Solução:**
- Isso NÃO é um bug
- Os valores são calculados automaticamente:
  - Proposta: R$ 8.500,00
  - 1x: R$ 8.500,00
  - 2x: R$ 4.250,00 cada
  - 3x: R$ 2.833,33 cada

---

### 15. Imagens Não Carregam

**Sintoma:** Fotos dos profissionais ou portfólio não aparecem.

**Solução:**
1. Verifique sua conexão com internet
2. As imagens vêm do Unsplash
3. Se estiver em rede corporativa, pode haver bloqueio
4. Aguarde alguns segundos (pode ser internet lenta)
5. Recarregue a página

---

## 🔍 Como Verificar Erros

### Abrir Console do Navegador

**Chrome/Edge:**
- Pressione F12
- Ou clique direito → "Inspecionar"
- Vá na aba "Console"

**Firefox:**
- Pressione F12
- Ou Ctrl+Shift+K
- Vá na aba "Console"

### O Que Procurar

**Erros em vermelho:**
```
❌ Error: ...
❌ TypeError: ...
❌ Failed to ...
```

**Avisos em amarelo (pode ignorar):**
```
⚠️ Warning: ...
```

**Logs normais (esperados):**
```
ℹ️ Proposal action: accept
ℹ️ Filters applied
```

---

## 📋 Checklist de Verificação

Antes de reportar um bug, verifique:

- [ ] Está usando Chrome, Firefox ou Edge (navegadores modernos)
- [ ] JavaScript está habilitado
- [ ] Não está em modo de navegação privada (para testar)
- [ ] Tem conexão com internet
- [ ] Já tentou recarregar a página (F5)
- [ ] Já tentou fazer logout e login novamente
- [ ] Já tentou limpar cache
- [ ] Já verificou o console (F12)

---

## 🆘 Se Nada Funcionar

### Resetar Aplicação

1. Feche todas as abas do navegador
2. Abra uma nova aba
3. Carregue a aplicação novamente
4. Faça login do zero
5. Tente o fluxo básico:
   - Login → Home → Selecionar Profissional → Ver Perfil

### Testar Fluxo Mínimo

```
Login (qualquer e-mail/senha)
  ↓
Home (ver lista de profissionais)
  ↓
Clicar em "Carlos Silva"
  ↓
Ver perfil completo
  ↓
Clicar em "Portfólio"
  ↓
Ver 6 fotos
```

Se isso funcionar, o resto também deve funcionar!

---

## 💡 Dicas Gerais

### Para Melhor Experiência

1. **Use Chrome ou Firefox** (100% testado)
2. **Não recarregue no meio do fluxo** (vai perder dados)
3. **Complete o fluxo até o fim** para testar tudo
4. **Leia as notificações** (aparecem no canto superior direito)
5. **Aguarde os redirecionamentos** (alguns têm delay de 1-2s)

### Atalhos Úteis

- `F5` → Recarregar página
- `Ctrl+Shift+R` → Recarregar sem cache
- `F12` → Abrir console
- `Ctrl+Plus` → Zoom in
- `Ctrl+Minus` → Zoom out

---

## 📞 Informações para Reportar Bug

Se encontrar um bug real, anote:

1. **O que você estava fazendo:**
   - "Eu estava na tela de chat..."

2. **O que você clicou:**
   - "Cliquei no botão de anexo..."

3. **O que esperava:**
   - "Esperava poder selecionar uma foto..."

4. **O que aconteceu:**
   - "Nada aconteceu / Apareceu erro / Tela ficou branca..."

5. **Mensagem de erro (se houver):**
   - Copie do console (F12)

6. **Navegador e versão:**
   - Chrome 120, Firefox 121, etc.

---

## ✅ Funcionalidades Confirmadas

Se algo não funciona, compare com esta lista:

✅ **Funcionando:**
- Login/Cadastro
- Busca
- Filtros (distância, avaliação, preço)
- 6 profissionais diferentes
- Perfis dinâmicos
- Portfólio de fotos
- Avaliações
- Chat de texto
- Upload de imagens
- Propostas de orçamento
- Aceitar proposta
- Checkout (3 formas de pagamento)
- Parcelamento
- Finalização com avaliação
- Tela de sucesso

Se algo desta lista NÃO funciona, é um bug real!

---

## 🎯 Lembre-se

Este é um **MVP com dados mockados**.
- Não há servidor real
- Não há banco de dados
- Tudo funciona no navegador
- Os dados resetam ao recarregar

**Isso é esperado e não é um bug!**

---

Boa sorte com os testes! 🚀
