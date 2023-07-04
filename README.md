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
- esta arquitetura de software é baseada em dominio, diferente da arquitetura padrão fornecida pelo Nest.js que prove uma arquitetura de software orientada a serviço;
- a camada de dominio tem por responsabilidade de unificar e isolar a regra de negocio pura em suas entidades (entity), e o fluxo de execução dessas regras nos caso de uso (usecase)
- a camada de "service" do Nest.js tem a responsabilidade de executar o "usecase" e caso seja necessario fluxo de serviços que não aplicam regra de negocio do dominio, como por exemplo, envio de email;
### recomendações de como desenvolver
- Um módulo contém toda a lógica associada a um domínio específico. É recomendado seguir de forma sensata o princípio da Responsabilidade Única do SOLID. Isso significa que cada módulo deve se preocupar apenas com seu próprio domínio e não com outros domínios. Esta regra pode ser quebrado caso julgue que o "trade-off" de tardar sua decisão de executar essa separação somente quando houver real necessidade tenha um custo beneficio satisfatorio;
- Deixe todas as bibliotecas, pacotes e qualquer outro importação de terceiros fora da camada de domínio. Pois tudo que esta dentro da camada de dominio só pode depender quase que exclusivamente da propria camada de dominio. Salve em caso que ha necessidade compense, como por exemplo tipagem de data-hora;
- Em teoria, você deve ser capaz de recortar e colar sua camada de domínio em qualquer projeto (dependente do idioma) e deve funcionar.
- cada "entidade forte" tende a ter seu proprio modulo;
- existem casos em que "entidade fraca" deve ser um submodulo de uma "entidade forte", mas por padrão tente criar um módulo separado, para não fazer o módulo "pai" não tenha dependencia somente por causa de seu submodulo;
- Se a entidade depende de outra(s) entidade externa, então talvez seja interessante cria-lo em um módulo separado, e não em submodulo, para que assim o modulo em que ela dependa não seja obrigado tambem ter suas respectivas dependencias;
- entidade "pivot" de junção em um relacionamento "M:M", só irão necessitar de controller e service caso tenha necessidade de expor externamente seus recursos como por exemplo REST, GraphQL e WebSockets. Mas caso o relacionamento de junção seja incorporado por algum dos lados do relacionamento "M:M", então recomendasse quem em seu respectivo módulo que seja criado um submodulo. Lembrando que isso pode fazer que seu módulo dependa de outro, assim aumentando a profundidade dos niveis de dependencias;
- a diferença entre "src/infra/gateways/external" e "src/infra/gateways/internal"
    - internal: são serviços de "conexão" com outro serviço, que está sendo usado exclusivamente internamente no sistema
    - external: são serviços com regra de negocio, que podem ser usados por outros sistemas, e que inclusive tem potencial para se tornar um microserviço caso haja necessidade
- alem de se preocupar com o princio da responsabilidade unica, tenha cuidado de se preocupar "motivação unica", pois alem de fazer que uma função tenha somente uma responsabilidade, considere em replicar essa função varias vezes se por preciso para manter sua unica motivação de existe, pois para cada motivo como um "service", "usecase" ou "repository" é um motivo diferente o porque esta usando esta função, com motivos diferentes de existir, consequentimente pode acontecer de com o passar do tempo cada função evoluir de forma idependente, tornando oque inicialmente era identico cada vez mais responsabilidades distintas. Mas lembre de que dentro da entidade de dominio nunca não pode haver replicação de código de regra de negocio;
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
