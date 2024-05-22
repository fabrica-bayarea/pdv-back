![Centro Universitário IESB](public/logoIesb.png)

# Projeto PDV (Ponto de Venda)

## Período do Projeto: 16/09/2023 - EM ANDAMENTO
Este repositório é dedicado ao projeto PDV (Ponto de Venda). O projeto tem como objetivo criar um sistema de ponto de venda eletrônico para aprimorar a eficiência e gestão de transações comerciais. Aqui, você encontrará toda a documentação relacionada ao projeto PDV.

## Visão Geral

O projeto PDV visa otimizar a eficiência e gestão de transações comerciais por meio de um sistema de ponto de venda eletrônico.

## Tecnologias Utilizadas

### Back-End

- **Insomnia**: Ferramenta de teste de API para depurar os endpoints do projeto.
- **Node.js e TypeScript (TSC)**: Desenvolvimento do backend em Node.js com TypeScript para adicionar tipagem estática ao JavaScript.
- **MySQL**: Sistema de gerenciamento de banco de dados para armazenar dados relacionados às transações comerciais.
- **Framework NestJS e TypeScript**: Utilização do framework NestJS em conjunto com TypeScript para criar uma estrutura robusta e escalável para o backend.
- **Prisma**: Ferramenta ORM para interação com bancos de dados relacionais.

### Front-End

- **Next.js**: Framework React utilizado para construir aplicações web modernas e eficientes.
- **TypeScript**: Linguagem de programação de código aberto para adicionar tipos estáticos ao JavaScript.
- **Styled Components**: Biblioteca para estilizar componentes em aplicações React.

# Executando o Projeto

## Instalação do Docker
### Para Linux:
- Abra o terminal.
- Execute os seguintes comandos para instalar o Docker:
```bash
$ sudo apt update
$ $udo apt install docker.io
```
Após a instalação, inicie o serviço do Docker:
```bash
$ sudo systemctl start docker
```
Verifique se o Docker foi instalado corretamente:
```bash
$ docker –version
```
## Para Windows:

#### Acesse o site oficial do Docker (https://www.docker.com/) e baixe o instalador para
Windows.
Siga as instruções do instalador para concluir a instalação.
Após a instalação, abra o Docker Desktop e aguarde até que o Docker esteja pronto para
uso.

### Instalando a extensão do VS Code para Docker
- Abra o VS Code
- Vá para a seção de extensões clicando no ícone de quadrados no canto esquerdo da barra lateral ou
pressionando Ctrl + Shift + X.
- No campo de pesquisa, digite "Docker".
- A extensão oficial do Docker será exibida. Clique em "Install" (Instalar) para instalá-la.

## Rodando o projeto com Docker

1. Back-End:
```bash
Clone o projeto: git clone https://github.com/fabrica-bayarea/pdv-back.git
Entre na branch develop
```
- Abra o terminal VS Code Ctrl + J (esse comando e pra rodar a primeira vez)
```bash
docker-compose up --build -d
```
- entre em na extenção do Docker aperte como botão direito em mysql  e aperte Attach Shell
```bash
npx prisma migrate dev --name migracao
```
- quando for abrir na maquina novamente para rodar faça
```bash
docker-compose up -d
```

2. Front-End:
     
```bash
Clone o projeto: git clone https://github.com/fabrica-bayarea/pdv-front.git
Entre na branch develop
```

### Rodando o projeto com Docker
- Abra o terminal VS Code Ctrl + J (esse comando e pra rodar a primeira vez)

```bash
docker-compose up --build -d
```

- quando for abrir na maquina novamente para rodar faça
```bash
docker-compose up -d
```


## Equipe (1°/2023)

### Backend

- [**André Cordeiro Ignacio**](https://github.com/AndreCordeir0)
- [**Gabriel Vieira Cavalcante**](https://github.com/elrate)
- [**Beatryz Kleuvyn Silva Arruda**](https://github.com/kleuvyn)

### Frontend

- [**Davi Marques Costa**](https://github.com/davimcostaa)
- [**Amanda Vieira Peres**](https://github.com/imxamanda)

## Requisitos/Testes

- [**Marco Antonio Rabelo Sales**](https://github.com/Marcoarsales)
- [**Gracielly dos Santos Ribeiro**](https://github.com/GraciellySRibeiro)

## Equipe (1°/2024)

### Líderes
- Líder: Beatryz 
- Líder Front: Matheus 

### Backend
- [**Gabriel Vieira Cavalcante**](https://github.com/elrate)
- [**Beatryz Kleuvyn Silva Arruda**](https://github.com/kleuvyn)

### Frontend
- [**Matheus Guilherme da Fonseca Iizuka**](https://github.com/MatheusFonseca849)
- [**Eduardo Luís Gonçalves de Azevedo**](https://github.com/EduardoLGAz)

# Link Figma
### [**Versão 1**](https://www.figma.com/file/xT45yDGk9xpkhD069jY39f/pdv?type=design&node-id=0-1&mode=design)
### [**Versão 2**](https://www.figma.com/file/iUszS01TjiNA9YIlDjpM2U/Untitled-(Copy)?type=design&node-id=0-1&mode=design&t=MFPFiOoKfAHgvCG0-0)

