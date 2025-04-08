# 🧠 Domain-Driven Design (DDD) — Fórum Acadêmico

Este projeto é um **Fórum Acadêmico** construído com os princípios do **Domain-Driven Design (DDD)**. Ele permite que estudantes e professores façam perguntas, respondam, votem nas melhores respostas e recebam notificações. Tudo isso respeitando o domínio e sua complexidade.

---

## 📌 Visão Geral

O sistema é dividido por **Bounded Contexts** (contextos delimitados) e modelado a partir de **entidades ricas**, **objetos de valor** e **eventos de domínio**, sempre alinhados à linguagem usada pelos especialistas do domínio: professores, alunos e moderadores.

---

## 🧠 Domínio: Fórum Acadêmico

### 👥 Usuários (Entidades)
- **Estudante**: cria perguntas, comenta e vota em respostas.
- **Professor**: pode responder perguntas e destacar melhores respostas.

Cada usuário possui uma **identidade única** e pode acumular reputação com base nas interações.

---

### ❓ Pergunta (Entidade)
- Possui título, conteúdo, autor e **slug** gerado automaticamente.
- Pode receber várias respostas.
- Pode ter uma **melhor resposta** destacada.
- Pertence a uma **categoria** do fórum.

---

### 💬 Resposta (Entidade)
- Criada por um estudante ou professor.
- Pode ser marcada como a **melhor resposta**.

---

### 🟢 Notificação (Entidade)
- Enviada quando uma resposta é publicada em uma pergunta seguida.
- Também é enviada quando a resposta de um usuário é marcada como a melhor.
- Contém título, corpo, data de envio e status (lida/não lida).

---

### 🔤 Slug (Value Object)
- Gerado automaticamente a partir do título da pergunta.
- Exemplo: `Como-funciona-o-DDD` → `como-funciona-o-ddd`.

---

### 🧱 Agregados
- `Pergunta` é um agregado que contém respostas.
- `Usuário` é um agregado que gerencia reputação e perfil.
- `Notificação` pode ser um agregado independente.

---

### 🧩 Objetos de Valor (Value Objects)
- **Slug**: identificador amigável de URLs.
- **Conteúdo**: usado para corpo de perguntas e respostas, com regras de tamanho e formatação.

---

### 📅 Eventos de Domínio
- `PerguntaCriada`
- `RespostaEnviada`
- `MelhorRespostaEscolhida`
- `NotificacaoEnviada`

Esses eventos servem para **desacoplar** ações e permitir integrações assíncronas (ex: envio de email, push notification, etc).

---

## 🌍 Subdomínios / Bounded Contexts

- `Forum`: perguntas, respostas, votos.
- `Usuarios`: perfis, autenticação, reputação.
- `Notificacoes`: gerenciamento de alertas.
- (Futuros contextos: `Administração`, `Gamificação`)

## 🚀 Objetivo do Projeto

Promover o aprendizado e o uso prático de **DDD** em um sistema real com regras de negócio relevantes, incentivando a separação de responsabilidades, alta coesão e baixo acoplamento entre módulos.

