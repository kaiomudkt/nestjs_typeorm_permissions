## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

- Sistema web a funcionalidade de usuário com cargo e suas respectivas permissões;
- podem ser criados diversos tipos de usuários, e cada cargo só pode ser atribuido a um tipo ou mais
- multi-tenancy: cada usuario pode estar relacionado com varios tenancy
- mas em cada tenancy de criar um novo user, pois cada tenancy deve ser todalmente independente 


### arquitetura
Por padrão o Nest.js tem um arquitetura de software orientado a serviços,
mas neste caso estamos se inspirando como o clean architecture é orientado a camada de dominio,
desta forma podemos 

- entity: camada do ORM
- domain: camada que aplica a regra de negócio 

### niveis de acesso

1ª valida se o usuário logado tem cargo com a permissão de realizar a ação do serviço
    - exemplo: somente usuários admininstrdores tem permissão de realizar essa ação
2ª valida se o usuario logado tem autorização sobre o dado que esta interagindo 
    - exemplo: usuario logado nao tem autorização para interagir com dados de outro tenancy
    - exemplo: usuário logado não tem autorização para interagir com dados de outros usuários
3ª valida se o dado que esta interagindo permite a ação 
    - exemplo: status do dado não permite realizar essa ação 

## Tecnologias

- npm
- postgres
- typeorm
- jest
- 

## arquitetura de software
### recomendações de como desenvolver
- cada entidade deve ter seu proprio modulo
- os modulos devem explicitamente identificar e separar suas entradas e saidas
    - exemplo: banco de dados, requisições, outros modulos, bibliotecas


## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
