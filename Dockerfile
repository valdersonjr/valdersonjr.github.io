FROM ruby:3.1-slim

# Instala dependências essenciais e limpa cache
RUN apt-get update -qq && \
    apt-get install -y --no-install-recommends \
    build-essential \
    git \
    zlib1g-dev \
    liblzma-dev \
    && gem update --system \
    && gem install bundler \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Define diretório de trabalho
WORKDIR /app

# Copia arquivos de dependência
COPY Gemfile* ./

# Modificado o bundle install para ser mais verboso e garantir instalação
RUN bundle config set --local path 'vendor/bundle' && \
    bundle install --verbose && \
    bundle exec jekyll --version

# Copia o resto do projeto
COPY . .

# Expõe a porta
EXPOSE 4000

# Comando para desenvolvimento
CMD ["bundle", "exec", "jekyll", "serve", "--livereload", "--host", "0.0.0.0"]
