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
- o a entidade depende de mais de um outro entidade? se sim, então talvez seja interessante cria-lo em um módulo separado, para deixar o modulo em que ela dependa sem dependencias, desta forma o moduto "pai" ainda pode ser separado em um microserviço em algum dia 
- entidade pivot de junção, nem sempre precisam ter controller e service, neste caso recomendasse que seja um submodulo 
- Um módulo contém toda a lógica associada a um domínio específico. Devem seguir a primeira regra dos princípios SOLID que é a Responsabilidade Única. Isso significa que cada módulo deve se preocupar apenas com seu próprio domínio e não com outros domínios.
- Deixe todas as bibliotecas, pacotes etc. de terceiros fora da camada de domínio. Deve ser livre de dependência de terceiros.
- As ações de domínio devem aceitar apenas o modelo de domínio como um parâmetro ou um Id em forma de string. Os DTOs devem ser mapeados antes de chamar nossa camada de domínio.
- Em teoria, você deve ser capaz de recortar e colar sua camada de domínio em qualquer projeto (dependente do idioma) e deve funcionar.


## Installation
```bash
$ npm install
```

### cli nest
```bash
$ nest generate module nome-do-modulo
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
