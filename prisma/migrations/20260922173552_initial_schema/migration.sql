-- CreateTable
CREATE TABLE "usuario" (
    "id_cliente" SERIAL NOT NULL,
    "nome_cliente" VARCHAR(150) NOT NULL,

    CONSTRAINT "usuario_pkey" PRIMARY KEY ("id_cliente")
);

-- CreateTable
CREATE TABLE "profissional" (
    "id_profissional" SERIAL NOT NULL,
    "nome" VARCHAR(150) NOT NULL,
    "nome_profissional" VARCHAR(150) NOT NULL,
    "e-mail" VARCHAR(255) NOT NULL,
    "telefone" VARCHAR(20),
    "senha" VARCHAR(255) NOT NULL,
    "descricao_profissional" TEXT,
    "numero-whatsapp" VARCHAR(20),

    CONSTRAINT "profissional_pkey" PRIMARY KEY ("id_profissional")
);

-- CreateTable
CREATE TABLE "endereco" (
    "id_endereco" SERIAL NOT NULL,
    "id_profissional" INTEGER NOT NULL,
    "cidade" VARCHAR(120) NOT NULL,
    "logradouro" VARCHAR(255) NOT NULL,
    "bairro" VARCHAR(120) NOT NULL,
    "cep" VARCHAR(9) NOT NULL,
    "estado" CHAR(2) NOT NULL,

    CONSTRAINT "endereco_pkey" PRIMARY KEY ("id_endereco")
);

-- CreateTable
CREATE TABLE "profissional-portfolio" (
    "id_portfolio" SERIAL NOT NULL,
    "id_profissional" INTEGER NOT NULL,
    "image-url" VARCHAR(2048) NOT NULL,
    "titulo" VARCHAR(180) NOT NULL,
    "descricao" TEXT,

    CONSTRAINT "profissional-portfolio_pkey" PRIMARY KEY ("id_portfolio")
);

-- CreateTable
CREATE TABLE "categoria" (
    "id_categoria" SERIAL NOT NULL,
    "nome_categoria" VARCHAR(120) NOT NULL,

    CONSTRAINT "categoria_pkey" PRIMARY KEY ("id_categoria")
);

-- CreateTable
CREATE TABLE "profissional-servico" (
    "id_servico" SERIAL NOT NULL,
    "id_profissional" INTEGER NOT NULL,
    "id_categoria" INTEGER NOT NULL,
    "nome_servico" VARCHAR(180) NOT NULL,
    "descricao_servico" TEXT,
    "preco" DECIMAL(10,2) NOT NULL,

    CONSTRAINT "profissional-servico_pkey" PRIMARY KEY ("id_servico")
);

-- CreateIndex
CREATE UNIQUE INDEX "profissional_e-mail_key" ON "profissional"("e-mail");

-- CreateIndex
CREATE INDEX "endereco_id_profissional_idx" ON "endereco"("id_profissional");

-- CreateIndex
CREATE INDEX "profissional-portfolio_id_profissional_idx" ON "profissional-portfolio"("id_profissional");

-- CreateIndex
CREATE UNIQUE INDEX "categoria_nome_categoria_key" ON "categoria"("nome_categoria");

-- CreateIndex
CREATE INDEX "profissional-servico_id_profissional_idx" ON "profissional-servico"("id_profissional");

-- CreateIndex
CREATE INDEX "profissional-servico_id_categoria_idx" ON "profissional-servico"("id_categoria");

-- AddForeignKey
ALTER TABLE "endereco" ADD CONSTRAINT "endereco_id_profissional_fkey" FOREIGN KEY ("id_profissional") REFERENCES "profissional"("id_profissional") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "profissional-portfolio" ADD CONSTRAINT "profissional-portfolio_id_profissional_fkey" FOREIGN KEY ("id_profissional") REFERENCES "profissional"("id_profissional") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "profissional-servico" ADD CONSTRAINT "profissional-servico_id_profissional_fkey" FOREIGN KEY ("id_profissional") REFERENCES "profissional"("id_profissional") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "profissional-servico" ADD CONSTRAINT "profissional-servico_id_categoria_fkey" FOREIGN KEY ("id_categoria") REFERENCES "categoria"("id_categoria") ON DELETE RESTRICT ON UPDATE CASCADE;
