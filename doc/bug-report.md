# Bug Report

## Título
Mensagens de validação no POST /orders não informam qual campo está inválido

## Severidade
Média

## Ambiente
- API local: http://localhost:3000
- Execução via Postman/Newman
- Data: 08/02/2026

## Passos para reproduzir
1. Enviar POST /orders com payload inválido (sem o campo customer):
```json
{
  "orderId": "ORD-INVALID",
  "total": 100
}

## Resultado atual:
API retorna HTTP 400 com mensagem genérica:
{
  "error": "INVALID_PAYLOAD",
  "message": "Campos: orderId(string), customer(string), total(number > 0)"
}


## Resultado esperado:
API deve informar exatamente qual campo está inválido ou faltando, por exemplo:
{
  "error": "INVALID_PAYLOAD",
  "details": [
    { "field": "customer", "reason": "required" }
  ]
}

##Evidências:
- Log do Newman mostrando cenário de payload inválido (quando executado).
- O print do erro pode ser encontrado na pasta:
 `docs/evidences/BUG - pedido sem mensagem clara para o usuário.jpg