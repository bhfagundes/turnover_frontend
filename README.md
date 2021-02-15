# Desafio Turnover : Frontend

> Projeto criado para desenvolver o desafio da turnover

## Instalação
- Configurar o endereço do backend através dos arquivos de configurações em src/config
``` bash
# Instalar dependências
npm install

# Startar o projeto para ambiente local
npm run dev

# Gerar Build
npm run build

# Gerar Build com relatórios
npm run build --report

# Executar testes unitários
npm run unit

# Executar testes e2e
npm run e2e

# Executar todos os testes
npm test
```
## Arquitetura do Projeto
> Escolha do Framework:
>> Para desenvolvimento do projeto, foi escolhido o VueJS. Foi escolhido este framework devido sua boa curva de aprendizagem, excelente documentação e não menos importante, não tinha contato com o framework à cerca de 2 anos, então foi uma forma de reencontrá-lo.
> Organização do projeto:
>> Por se tratar de um projeto pequeno, a sua estrutura se encontra bem simples. Desta forma temos:
>>> /src/componentes : Neste diretório temos o componente Product, responsável por frontend + scripts de controle da tela de produtos
>>> /src/router/index.js : neste arquivo temos a parte de roteamento, ou seja temos um relacionamento direto da url requisitada e o componente que deverá ser carregado
>>> /src/api.js : arquivo responsável para mapear e consumir as apis necessárias para o CRUD
>>> /config : nesta pasta temos as configurações de ambiente, ou seja, podemos parametrizar por exemplo o host e porta do backend.
