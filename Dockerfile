FROM ruby:3.1-slim

# Instala dependências essenciais e limpa cache
RUN apt-get update -qq && \
    apt-get install -y --no-install-recommends \
    build-essential \
    git \
    zlib1g-dev \
    liblzma-dev \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Define diretório de trabalho
WORKDIR /app

# Configura bundler e gems
ENV BUNDLE_PATH=/usr/local/bundle
ENV GEM_HOME=/usr/local/bundle
ENV PATH="/usr/local/bundle/bin:${PATH}"

# Instala gems necessários
RUN gem update --system && \
    gem install bundler jekyll

# Copia arquivos de dependência
COPY Gemfile* ./

# Instala dependências do projeto
RUN bundle install

# Copia o resto do projeto
COPY . .

# Expõe a porta
EXPOSE 4000

# Comando para desenvolvimento
CMD ["bundle", "exec", "jekyll", "serve", "--livereload", "--host", "0.0.0.0"]
