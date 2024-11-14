# Blog do Sílvio Meireles

Blog pessoal construído com Jekyll e hospedado no GitHub Pages.

## Pré-requisitos

- Ruby (versão 2.7.0 ou superior) - apenas para execução local
- RubyGems - apenas para execução local
- Bundler - apenas para execução local
- Docker e Docker Compose (para execução com Docker)

## Instalação e Execução

### Opção 1: Usando Docker (Recomendado)

1. Clone o repositório:
```bash
git clone https://github.com/mastersilvio/mastersilvio.github.io.git
cd mastersilvio.github.io
```

2. Construa e inicie o container:
```bash
docker-compose up --build
```

3. Acesse o blog em:
```
http://localhost:4000
```

Para parar a execução:
```bash
docker-compose down
```

### Opção 2: Usando Ruby local

1. Clone o repositório:
```bash
git clone https://github.com/mastersilvio/mastersilvio.github.io.git
cd mastersilvio.github.io
```

2. Instale as dependências:
```bash
bundle install
```

3. Execute o servidor local:
```bash
bundle exec jekyll serve --watch --port 4000
```

4. Acesse o blog em:
```
http://localhost:4000
```

## Comandos úteis Docker

- Reconstruir a imagem:
```bash
docker-compose build
```

- Visualizar logs:
```bash
docker-compose logs -f
```

- Remover volumes e containers:
```bash
docker-compose down -v
```

## Recursos

- Jekyll 3.9.3
- GitHub Pages
- Suporte a SEO
- Feed RSS
- Sitemap automático
- Docker para desenvolvimento

## Licença

Este projeto está sob a licença MIT.
