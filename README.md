# QA Orders API Challenge

Este projeto foi desenvolvido para entrega de um desafio técnico de QA, com foco em planejamento, priorização por risco e automação de testes de API.

## Objetivo

Validar um fluxo de pedidos via API, que possui:

- Processamento assíncrono (status inicia PENDING e evolui para PROCESSED após alguns segundos)
- Regra de idempotência (não permitir duplicar o mesmo orderId)

## Estrutura do projeto

- `api/` → API fictícia (Node.js/Express) para simular o sistema
- `postman/` → Collection e Environment do Postman exportados
- `docs/` → Plano de testes, matriz de risco e bug report

## Requisitos

- Node.js instalado
- Newman instalado (via npm)

---

## Como rodar a API fictícia

1. Abra um terminal (CMD) na pasta do projeto  
2. Execute:

```bash
cd api
npm install
node server.js

A API ficará disponível em:
http://localhost:3000

Como rodar os testes automatizados (Newman)

Com a API rodando em um terminal separado, execute em outro terminal:
cd C:\Projetos\orders-api-datashelf
newman run "postman\Orders API Tests.postman_collection.json" -e "postman\Orders.postman_environment.json"

Escopo dos testes automatizados

Happy path (POST /orders)

Validação de contrato (status ∈ PENDING | PROCESSED | FAILED)

Fluxo assíncrono (polling até PROCESSED)

Idempotência (POST duplicado retorna 409)

Payload inválido (retorna 400)

Documentação

Plano de testes: docs/test-plan.md

Matriz de risco: docs/risk-matrix.md

Bug report: docs/bug-report.md

Evidências: docs/evidences/ 
