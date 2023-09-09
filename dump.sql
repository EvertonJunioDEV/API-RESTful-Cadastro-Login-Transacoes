create database dindin;

create table usuarios (
    id serial primary key,
    nome varchar(255) not null,
    email text unique not null,
    senha varchar(100) not null
);


create table categorias (
    id serial primary key,
    descricao text not null
);

create table transacoes (
    id serial primary key,
    descricao text,
    valor int,
    data date,
    categoria_id INT references categorias(id),
    usuario_id INT references usuarios(id),
    tipo text
);

insert into categorias (descricao) 
values
    ('Alimentação'),
    ('Assinaturas e Serviços'),
    ('Casa'),
    ('Mercado'),
    ('Cuidados Pessoais'),
    ('Educação'),
    ('Família'),
    ('Lazer'),
    ('Pets'),
    ('Presentes'),
    ('Roupas'),
    ('Saúde'),
    ('Transporte'),
    ('Salário'),
    ('Vendas'),
    ('Outras receitas'),
    ('Outras despesas');