# Bug Report — Colisão de orderId sob carga concorrente

## Título
Colisão de `orderId` causa falhas (~20%) no endpoint POST /orders sob carga concorrente

---

## Ambiente
- API fictícia local (Node.js / Express)
- URL: http://localhost:3000
- Teste executado via k6
- Data: (preencha com a data de execução)

---

## Pré-condições
- API em execução
- Endpoint POST `/orders` disponível
- Regra de idempotência ativa

---

## Passos para reproduzir
1. Executar o script de carga com k6:
   ```bash
   k6 run performance/orders-load.js

O script envia múltiplas requisições concorrentes para o endpoint POST /orders
O orderId é gerado com base em timestamp

## Resultado esperado
Todas as requisições deveriam ser processadas com sucesso
A API deveria garantir unicidade de orderId mesmo sob concorrência

## Resultado atual
Aproximadamente 20% das requisições falham
A API retorna erro de idempotência (HTTP 409) para pedidos distintos
Falha ocorre devido à colisão de orderId em execuções simultâneas

## Evidência
Print do resultado do k6: `docs/evidences/k6-run.png`

## Severidade
Alta
Impacta diretamente a confiabilidade do sistema em cenários de carga e concorrência.