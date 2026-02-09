# Plano de Testes – Orders API

## Escopo
Testar os endpoints:
- POST /orders
- GET /orders/{orderId}

Cobrindo:
- Fluxo assíncrono (PENDING → PROCESSED)
- Idempotência (não duplicar orderId)
- Validação de contrato/payload
- Cenários negativos (payload inválido)

## Fora do escopo
- Autenticação/autorização (não informado)
- Banco de dados real (API fictícia)
- UI

## Estratégia
- Priorizar cenários de maior risco (P1): idempotência e processamento assíncrono
- Executar testes manuais iniciais para entender o comportamento
- Automatizar cenários essenciais via Postman/Newman para regressão

## Critérios de saída
- Suíte Newman executando com sucesso (failed = 0)
- Evidências de execução (print/log)
- Bug report documentado

## O que automatizar primeiro
1. Happy path (POST + GET)
2. Fluxo assíncrono (polling até PROCESSED)
3. Contrato (status válido)
4. Idempotência (409 no duplicado)
5. Payload inválido (400)