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
- Para desenvolvimento do projeto, foi escolhido o VueJS. Foi escolhido este framework devido sua boa curva de aprendizagem, excelente documentação e não menos importante, não tinha contato com o framework à cerca de 2 anos, então foi uma forma de reencontrá-lo.
>> Organização do projeto:
>>> - Por se tratar de um projeto pequeno, a sua estrutura se encontra bem simples. Desta forma temos:
>>> - /src/componentes : Neste diretório temos o componente Product, responsável por frontend + scripts de controle da tela de produtos
>>> - /src/router/index.js : neste arquivo temos a parte de roteamento, ou seja temos um relacionamento direto da url requisitada e o componente que deverá ser carregado
>>> - /src/api.js : arquivo responsável para mapear e consumir as apis necessárias para o CRUD
>>> - /config : nesta pasta temos as configurações de ambiente, ou seja, podemos parametrizar por exemplo o host e porta do backend.

>> Bibliotecas e Componentes:
- Para executar o projeto foi utilizado alguns componentes conhecidos entre eles temos:
>>> - Vue MDB : foi escolhido este material design para ajudar na estilização. Como já trabalho com botstrap já tem algum tempo, escolhi este material design por já projetar um pouco o que iria utilizar
>>> - Axios: para consumir o backend, utilizando padrão rest na api, foi utilizado o axios. Biblioteca bem padrão para estas tratativas.
>>> - VueRouter: biblioteca utilizada para facilitar o roteamento, biblioteca que tem boa compatibilidade com o vue e é de simples facilidade
>>> - okta-vue: adicionei esta biblioteca de forma opcional, para caso fosse necessário, facilitar no que diz respeito a segurança, utilizando JWT para proteger o acesso
