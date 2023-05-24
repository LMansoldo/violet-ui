FROM --platform=linux/amd64 mcr.microsoft.com/devcontainers/base:jammy

ARG EPINIO_VERSION="1.5.2"
ARG NODE_VERSION="18.14.2"

# Add Docker engine repository
RUN mkdir -p /etc/apt/keyrings \
    && curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg \
    && echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
        $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

# Install Linux Packages
RUN apt update && apt install -y --no-install-recommends gcc g++ make wget netcat docker-ce docker-ce-cli containerd.io docker-compose docker-buildx-plugin

RUN apt clean

# Install Epinio
RUN curl -o epinio -L https://github.com/epinio/epinio/releases/download/v${EPINIO_VERSION}/epinio-linux-x86_64 \
    && chmod +x epinio \
    && mv ./epinio /usr/local/bin/epinio

# Install NodeJS
RUN mkdir -p /usr/local/lib/nodejs && curl -sSL https://nodejs.org/dist/v${NODE_VERSION}/node-v${NODE_VERSION}-linux-x64.tar.xz | sudo tar -C /usr/local/lib/nodejs -xJ

ENV PATH=/usr/local/lib/nodejs/node-v$NODE_VERSION-linux-x64/bin:$PATH