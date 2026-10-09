# Pokédex TypeScript Lite

## Sobre o projeto

O Pokédex TypeScript Lite é uma aplicação em Node.js com TypeScript, executada pelo terminal, que consulta dados de Pokémon na [PokeAPI](https://pokeapi.co/docs/v2), transforma a resposta em um objeto simplificado e organiza alguns Pokémon em um catálogo local mantido em memória durante a execução do programa.

Não é uma API REST: a aplicação **consome** uma API externa e exibe os resultados com `console.log`.

## Objetivo

Praticar os principais conceitos do Módulo 01:

- Node.js e JavaScript no back-end;
- TypeScript, interfaces e funções tipadas;
- arrays, objetos e JSON;
- métodos de array;
- classes, construtores e modificadores de acesso;
- `fetch`, Promises e `async/await`;
- tratamento de erros com `try/catch`;
- GitHub, GitFlow e Kanban.

## Tecnologias utilizadas

- Node.js
- TypeScript
- TSX
- pnpm
- PokeAPI
- Git e GitHub

## Pré-requisitos

Antes de executar o projeto, é necessário ter instalado:

- Node.js (versão 18 ou superior, que já inclui o `fetch` nativo)
- pnpm (o npm também funciona para executar os scripts)
- Git

## Como instalar

Clone o repositório:

```bash
git clone LINK_DO_REPOSITORIO
```

Acesse a pasta do projeto:

```bash
cd NOME_DA_PASTA_DO_PROJETO
```

Instale as dependências:

```bash
pnpm install
```

## Como executar

Executar a aplicação:

```bash
pnpm start
```

Compilar o TypeScript para JavaScript (a saída vai para a pasta `dist/`):

```bash
pnpm build
```

Também é possível usar `npm run start` e `npm run build`, pois os scripts estão no `package.json`.

## Estrutura do projeto

```
src/
├── main.ts                        # ponto de entrada: cria os objetos e executa o fluxo de demonstração
├── controller/
│   └── pokedex-controller.ts      # orquestra o fluxo e exibe as mensagens no terminal
├── services/
│   ├── pokeapi-service.ts         # consulta a PokeAPI com fetch e mapeia a resposta
│   └── catalogo-service.ts        # classe do catálogo em memória (adicionar, listar, remover)
├── models/
│   ├── api-response-model.ts      # interface com os campos usados da resposta da PokeAPI
│   └── pokemon-model.ts           # interface do Pokémon simplificado usado no sistema
└── utils/
    └── formatter.ts               # função pura que formata um Pokémon como texto
package.json
tsconfig.json
README.md
```

## Funcionalidades

- Buscar Pokémon por nome ou ID na PokeAPI
- Tratar erro de Pokémon inexistente sem quebrar o programa
- Transformar a resposta da API em um objeto simplificado
- Adicionar Pokémon ao catálogo local
- Impedir Pokémon duplicado (pelo `id`)
- Listar o catálogo
- Remover Pokémon por ID
- Exibir mensagens claras no terminal (`[OK]`, `[AVISO]`, `[ERRO]`)

## Exemplos de execução

### Busca válida

Entrada testada:

```
charmander
```

Saída obtida:

```
[OK] Pokémon encontrado: charmander
#4 - charmander | Tipos: fire | Altura: 6 | Peso: 85
```

### Busca inválida

Entrada testada:

```
pikaccchu
```

Saída obtida:

```
[AVISO] Falha ao buscar Pokémon. Erro: 404
[ERRO] Pokémon pikaccchu não encontrado. Inexistente ou nome inválido.
```

### Duplicidade

Entrada testada:

```
adicionar pikachu duas vezes
```

Saída obtida:

```
[OK] pikachu adicionado ao catálogo com sucesso.
[AVISO] Pokémon pikachu já existe no catálogo.
[ERRO] Falha ao adicionar Pokémon ao catálogo.
```

### Remoção

Entrada testada:

```
remover ID 25
```

Saída obtida:

```
[OK] Pokémon removido do catálogo com sucesso.
```

### Execução completa

Saída do `pnpm start`:

```
$ tsx src/main.ts
---------- Iniciando Pokedex Lite ----------
[OK] pikachu adicionado ao catálogo com sucesso.
[OK] charmander adicionado ao catálogo com sucesso.
[AVISO] Pokémon pikachu já existe no catálogo.
[ERRO] Falha ao adicionar Pokémon ao catálogo.
[AVISO] Falha ao buscar Pokémon. Erro: 404
[ERRO] Pokémon pikaccchu não encontrado. Inexistente ou nome inválido.
#25 - pikachu | Tipos: electric | Altura: 4 | Peso: 60
#4 - charmander | Tipos: fire | Altura: 6 | Peso: 85
[OK] Pokémon removido do catálogo com sucesso.
#4 - charmander | Tipos: fire | Altura: 6 | Peso: 85
[OK] Pokémon encontrado: charmander
#4 - charmander | Tipos: fire | Altura: 6 | Peso: 85
```

## Conceitos aplicados

### TypeScript

O projeto usa o modo `strict` no `tsconfig.json`. Todos os parâmetros e retornos de funções e métodos são tipados (por exemplo, `Promise<PokemonModel | null>` na busca e `boolean` em `adicionar` e `remover`).

### Interfaces

- `ApiResponseModel`: descreve apenas os campos da PokeAPI que são usados (`id`, `name`, `height`, `weight` e `types`). Fica restrita ao `PokeApiService`.
- `PokemonModel`: descreve o Pokémon simplificado usado no restante do sistema. A diferença principal é o campo `types`, que na API é uma lista de objetos aninhados e no modelo é uma lista de strings.

### Fetch e async/await

O `PokeApiService` usa `fetch` com `await` para consultar `https://pokeapi.co/api/v2/pokemon/{nome-ou-id}`. O nome é tratado com `trim()` e `toLowerCase()` antes da requisição, e a resposta é convertida com `res.json()` e tipada com `as ApiResponseModel`.

### Tratamento de erros

A busca fica dentro de um `try/catch`. Se a resposta não for bem-sucedida (`res.ok` falso, como no 404 de um Pokémon inexistente), o método retorna `null`. Falhas de rede também caem no `catch` e retornam `null`. Assim, o programa não quebra e o controller exibe a mensagem de erro.

### Métodos de array

- `map`: transforma a lista de `types` da API em uma lista de nomes;
- `some`: verifica se um Pokémon com o mesmo `id` já existe no catálogo;
- `filter`: remove um Pokémon do catálogo pelo `id`;
- `forEach`: percorre o catálogo para exibir cada Pokémon.

### Classe CatalogoPokemon

Possui o atributo `private pokemons: PokemonModel[]` e os métodos `adicionar`, `listar` e `remover`. O array fica privado e só é alterado pelos métodos da classe, que retornam `boolean` para o controller decidir a mensagem exibida.

### Arquitetura em camadas

- **controller**: recebe as chamadas, usa os services e imprime as mensagens;
- **services**: integração com a PokeAPI e gerenciamento do catálogo;
- **models**: interfaces que definem o formato dos dados;
- **utils**: funções puras de formatação.

As dependências são entregues ao controller pelo construtor (injeção de dependências), montadas no `main.ts`.

## Organização do Kanban

Link do Kanban:

[LINK](https://devarthurquarxma.atlassian.net/jira/software/projects/KAN/boards/2?filter&groupBy=none)

## Branches utilizadas

- `main`: versão final e estável do projeto;
- `develop`: integração das funcionalidades;
- `feat/pokedex`: desenvolvimento do código da aplicação;
- `docs/readme`: escrita deste README.

## Vídeo de apresentação

[VIDEO](https://youtu.be/pP7FbipugFQ)

## Melhorias futuras

- Criar menu interativo no terminal;
- Salvar o catálogo em arquivo JSON;
- Exibir HP, ataque e defesa;
- Criar filtros por tipo de Pokémon;
- Validar o formato do JSON recebido da API antes de mapear;
- Criar uma API própria com Express.