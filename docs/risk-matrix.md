# Matriz de Risco

| Risco | Impacto | Probabilidade | Prioridade | Mitigação/Teste |
|-------|---------|---------------|-----------|------------------|
| Duplicar pedido (idempotência falhar) | Alto | Alta | P1 | POST com mesmo orderId deve retornar 409 |
| Pedido não processar (ficar PENDING) | Alto | Média | P1 | Polling até PROCESSED com timeout |
| API aceitar payload inválido | Médio/Alto | Alta | P1 | POST sem campos obrigatórios deve retornar 400 |
| GET retornar status fora do contrato | Médio | Média | P2 | Validar enum PENDING/PROCESSED/FAILED |
| Mensagens de erro pouco claras | Baixo | Média | P3 | Validar retorno de erro com mensagem clara |
