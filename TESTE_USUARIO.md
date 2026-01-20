# 🧪 Guia de Teste para Usuário - ServiçoPRO MVP

## 🎯 Objetivo
Testar todas as funcionalidades do marketplace de serviços residenciais.

## 📱 Fluxo de Teste Completo

### PASSO 1: Criar Conta ou Fazer Login

**Opção A - Criar nova conta:**
1. Selecione "Sou Cliente" ou "Sou Profissional"
2. Clique na aba "Cadastrar"
3. Preencha os campos:
   - Nome: `Teste da Silva`
   - E-mail: `teste@email.com`
   - Telefone: `(11) 99999-9999`
   - Especialidade: `Pedreiro` (só para profissionais)
   - Senha: `senha1234`
   - Confirmar Senha: `senha1234`
4. Marque "Aceito os termos de uso"
5. Clique em "Criar Conta"
6. ✅ Você será redirecionado para a home

**Opção B - Fazer login (mais rápido):**
1. Selecione "Sou Cliente"
2. Na aba "Entrar", digite:
   - E-mail: `qualquer@email.com`
   - Senha: `qualquersenha`
3. Clique em "Entrar"
4. ✅ Você será redirecionado para a home

---

### PASSO 2: Buscar e Filtrar Profissionais

**Teste de Busca:**
1. Digite no campo de busca: `pedreiro`
2. ✅ Veja apenas o Carlos Silva aparecer
3. Limpe e digite: `pintor`
4. ✅ Veja apenas a Maria Oliveira aparecer
5. Limpe o campo de busca

**Teste de Filtros:**
1. **Distância**: Mova o slider para "5 km"
   - ✅ Deve filtrar profissionais mais próximos
2. **Avaliação**: Marque "5 estrelas Excelente"
   - ✅ Só aparecem profissionais nota 5.0 (Maria Oliveira)
3. **Preço**: Ajuste para R$ 100 - R$ 150
   - ✅ Filtra por faixa de preço
4. **Verificados**: Desmarque esta opção
   - ✅ Agora mostra Pedro Costa (não verificado)
5. Clique em "Aplicar Filtros"
6. ✅ Veja notificação "Filtros aplicados!"

**Limpar Filtros:**
- Se nenhum profissional aparecer, clique em "Limpar Filtros"

---

### PASSO 3: Ver Perfil do Profissional

1. Clique em qualquer profissional (sugestão: Carlos Silva)
2. ✅ Você verá o perfil completo

**Explore as 3 abas:**

**Aba Portfólio:**
- ✅ Veja galeria de 6 fotos de trabalhos realizados
- Passe o mouse sobre as imagens para ver efeito

**Aba Avaliações:**
- ✅ Veja 3 avaliações reais com:
  - Foto do avaliador
  - Nome
  - Data
  - Nota (estrelas)
  - Comentário

**Aba Sobre:**
- ✅ Leia biografia completa
- ✅ Veja estatísticas (experiência, serviços completos, taxa de resposta)
- ✅ Veja certificações

---

### PASSO 4A: Testar Agendamento (Opcional)

1. No perfil do profissional, clique em "Agendar Serviço"
2. ✅ Modal de agendamento abre

**Preencha:**
1. Tipo de Serviço: `Construção de Laje`
2. Selecione uma data no calendário (dia futuro)
3. Clique em um horário: `09:00`
4. ✅ Veja o resumo do agendamento aparecer
5. Clique em "Confirmar Agendamento"
6. ✅ Modal fecha e você vai para o chat

---

### PASSO 4B: Testar Chat e Envio de Fotos

1. No perfil, clique em "Enviar Mensagem"
2. ✅ Chat abre com mensagens existentes

**Enviar mensagem de texto:**
1. Digite: `Olá, preciso de um orçamento`
2. Clique no botão de enviar (ícone de avião)
3. ✅ Mensagem aparece do lado direito em azul

**Enviar fotos (IMPORTANTE):**
1. Clique no ícone de 📎 (clipe/anexo)
2. Selecione uma ou mais imagens do seu computador
3. ✅ Veja preview das imagens embaixo do chat
4. (Opcional) Clique no X vermelho para remover alguma imagem
5. Clique em "Enviar"
6. ✅ Imagens aparecem no chat
7. ✅ Após 2 segundos, profissional responde automaticamente

**Receber e aceitar proposta:**
1. Clique no botão cinza no topo: "Simular Envio de Proposta"
2. ✅ Card de proposta aparece com:
   - Badge "Proposta de Orçamento"
   - Valor: R$ 8.500,00
   - Descrição do serviço
   - 3 botões: Aceitar, Negociar, Recusar
3. Clique em "Aceitar"
4. ✅ Notificação: "Proposta aceita!"
5. ✅ Após 1,5 segundo, você é redirecionado para o checkout

---

### PASSO 5: Finalizar Pagamento

**Escolher forma de pagamento:**
1. ✅ Veja o card de segurança Escrow no topo
2. Selecione uma forma de pagamento:

**Opção A - Cartão de Crédito (Recomendado para teste completo):**
1. Clique no radio button "Cartão de Crédito"
2. Preencha os dados:
   - Número: `4111 1111 1111 1111`
   - Nome: `Teste da Silva`
   - Validade: `12/28`
   - CVV: `123`
3. Escolha o parcelamento: `1x sem juros`
4. ✅ Veja o resumo no card à direita

**Opção B - PIX:**
1. Clique no radio button "PIX"
2. ✅ QR Code placeholder aparece
3. ✅ Botão "Copiar Código PIX" visível

**Opção C - Boleto:**
1. Clique no radio button "Boleto Bancário"
2. ✅ Informação sobre geração do boleto aparece

**Confirmar:**
1. Clique em "Confirmar Pagamento"
2. ✅ Notificação: "Pagamento confirmado! Seu dinheiro está em escrow."
3. ✅ Você é redirecionado para tela de finalização

---

### PASSO 6: Confirmar Conclusão e Avaliar

**Status do pagamento:**
1. ✅ Veja o card amarelo "Pagamento em Escrow"
2. ✅ Veja todos os detalhes do serviço contratado

**Confirmar conclusão:**
1. Leia o card com detalhes do serviço
2. Marque o checkbox: "Confirmo que o serviço foi concluído conforme acordado"
3. ✅ Checkbox fica marcado

**Avaliar profissional:**
1. Clique nas estrelas para dar uma nota (ex: 5 estrelas)
2. ✅ Veja feedback visual: "⭐ Excelente!"
3. Digite um comentário: `Trabalho excelente, muito profissional e pontual!`

**Finalizar:**
1. Clique em "Confirmar e Liberar Pagamento"
2. ✅ Notificações aparecem:
   - "Pagamento liberado ao profissional!"
   - "Avaliação registrada com sucesso!"
3. ✅ Após 2 segundos, você vai para tela de sucesso

---

### PASSO 7: Tela de Sucesso

1. ✅ Veja ícone verde de check
2. ✅ Mensagem de confirmação
3. **Opções:**
   - Clique em "Buscar Novos Serviços" → Volta para home
   - Clique em "Sair" → Volta para login

---

## 🧪 Testes Adicionais

### Testar Outros Profissionais

Volte para home e teste cada profissional:

1. **João Santos (Eletricista)**
   - Avaliação: 4.8
   - 4 fotos no portfólio
   - 3 avaliações

2. **Maria Oliveira (Pintora)**
   - Avaliação: 5.0 ⭐
   - 5 fotos no portfólio
   - 3 avaliações

3. **Pedro Costa (Encanador)**
   - NÃO verificado
   - Avaliação: 4.7
   - 3 fotos no portfólio

4. **André Martins (Marceneiro)**
   - Verificado
   - Avaliação: 4.9
   - 4 fotos no portfólio

5. **Fabiana Rocha (Arquiteta)**
   - Verificada
   - Avaliação: 4.8
   - 4 fotos no portfólio

### Testar Validações

**No cadastro:**
- Tente criar conta sem preencher campos → ❌ Erro
- Tente com senhas diferentes → ❌ Erro
- Tente com senha curta (menos de 8) → ❌ Erro
- Tente sem aceitar termos → ❌ Erro

**No chat:**
- Tente enviar mensagem vazia → ❌ Erro

**No checkout:**
- Tente confirmar sem preencher dados do cartão → ❌ Erro

**Na finalização:**
- Tente confirmar sem marcar conclusão → ❌ Erro
- Tente confirmar sem dar nota → ❌ Erro
- Tente confirmar sem comentário → ❌ Erro

---

## ✅ Checklist de Funcionalidades

- [ ] Login/Cadastro funciona
- [ ] Busca por nome/especialidade funciona
- [ ] Filtro de distância funciona
- [ ] Filtro de avaliação funciona
- [ ] Filtro de preço funciona
- [ ] 6 profissionais diferentes aparecem
- [ ] Perfil de cada profissional é único
- [ ] Portfólio mostra imagens
- [ ] Avaliações aparecem corretamente
- [ ] Modal de agendamento funciona
- [ ] Chat permite enviar texto
- [ ] Upload de imagens funciona
- [ ] Proposta pode ser aceita/rejeitada
- [ ] Checkout tem 3 formas de pagamento
- [ ] Parcelamento funciona
- [ ] Tela de finalização mostra dados corretos
- [ ] Sistema de avaliação com estrelas funciona
- [ ] Comentário pode ser escrito
- [ ] Confirmação libera pagamento
- [ ] Tela de sucesso aparece

---

## 🎯 O Que Observar

### Feedback Visual
- ✅ Toasts (notificações) aparecem no canto superior direito
- ✅ Cores mudam ao passar mouse
- ✅ Botões desabilitam quando necessário
- ✅ Loading states onde apropriado

### Navegação
- ✅ Botão "Voltar" sempre funciona
- ✅ Fluxo completo sem quebras
- ✅ Logout retorna para tela de login

### Dados
- ✅ Cada profissional tem dados únicos
- ✅ Avaliações são diferentes
- ✅ Portfólios têm imagens reais

---

## 🐛 Encontrou um Bug?

Se algo não funcionar como esperado, anote:
1. Qual tela você estava
2. O que você clicou
3. O que esperava que acontecesse
4. O que aconteceu de fato

---

## 💡 Dicas

- Use Chrome ou Firefox para melhor experiência
- Abra o console do navegador (F12) para ver logs
- Todas as notificações aparecem no canto superior direito
- Você pode testar quantas vezes quiser
- Os dados são mockados, então você pode experimentar à vontade!

---

## ✨ Recursos Destacados

1. **Sistema Escrow**: Pagamento fica retido até aprovação
2. **Upload Real de Fotos**: Funciona com arquivos do seu computador
3. **Filtros Dinâmicos**: Atualização em tempo real
4. **6 Profissionais**: Cada um com perfil completo
5. **Avaliações Reais**: Sistema completo de feedback
6. **Múltiplas Formas de Pagamento**: Cartão, PIX, Boleto
7. **Validações**: Todos os formulários validam corretamente

Bom teste! 🚀
