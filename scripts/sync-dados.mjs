//imports do node para usar os codigos e conseguir configurar o app para ler arquivos internos
import fs from "node:fs";
import path from "node:path";
import Papa from "papaparse"

//pega a base definida no .env (por isso é importante configurar o .env para que o arquivo e o app rodem de forma segura em qualquer máquina)
const base = process.env.BASE_REGRAS;
//verifica se a base ta certa, se não avisa ao usuário que tem erro no caminho.
if(!fs.existsSync(base)) {
    console.log("Erro ao achar a base de dados");
    process.exit(1);
}

//define junto com a raiz do app o caminho para cada pasta de ORIGEM de dados
const origemPddu = path.join(base, "pddu", "dados");
const origemLouos = path.join(base, "louos", "dados");
//origem PDFS tem muitos locais, é passado posteriormente com o array

//pega a raiz do app (NÃO É A RAIZ DA BASE DE REGRAS, ESSA ESTÁ DEFINIDA NA VARIÁVEL base)
const raizDoApp = process.cwd();

//define junto com a raiz do app o caminho de cada pasta destino de dados
const destinoPddu = path.join(raizDoApp, "data", "pddu");
const destinoLouos = path.join(raizDoApp, "data", "louos");
const destinoPdfs = path.join(raizDoApp, "public", "normas");


//limpa os valores anteriormente escritos na pasta PDDU
fs.rmSync(destinoPddu, { 
    recursive: true ,
    force: true
});
//limpa os valores anteriormente escritos na pasta LOUOS
fs.rmSync(destinoLouos, { 
    recursive: true ,
    force: true
});
//limpa os valores anteriormente escritos na pasta dos PDFS
fs.rmSync(destinoPdfs, { 
    recursive: true ,
    force: true
});

//copiando os JSON para nosso app
//copiando os JSON do PDDU
fs.cpSync(origemPddu, destinoPddu, {
    recursive: true
});
//copiando os JSON do LOUOS
fs.cpSync(origemLouos, destinoLouos, {
    recursive: true
});

//para os PDFS, precisamos construir mais origens e mais destinos. para isso temos então a seguinte combinação
const paresDeOrigemDestino = [
    {
        from: "louos/alteracoes", 
        to: "louos/alteracoes"
    },
    {
        from: "louos/lei-vigente", 
        to: "louos/lei-vigente"
    },
    {
        from: "louos/regulamentos", 
        to: "louos/regulamentos"
    },
    {
        from: "pddu/lei-vigente", 
        to: "pddu/lei-vigente"
    },
    {
        from: "pddu/regulamentos", 
        to: "pddu/regulamentos"
    },
    {
        from: "normas-vinculadas", 
        to: "normas-vinculadas"
    },
    {
        from: "revisao-em-andamento", 
        to: "revisao-em-andamento"
    }
];

//looping para percorrer cada item dos PDFS
for(const item of paresDeOrigemDestino) {
    //busca o caminho certo para a origem da leitura
    const origem = path.join(base, item.from);
    //busca o caminho certo para o destino da escritura
    const destino = path.join(destinoPdfs, item.to);

    //cpsync já cria as pastas
    fs.cpSync(origem, destino, {
        //recursive garante que ele pegue os subdiretórios internos de cada caminho
        recursive: true,
        //filtra para so pegar o que é diretorio
        filter: (src) => {
            return fs.statSync(src).isDirectory() || src.trim().toLowerCase().endsWith(".pdf");
        }
    });
}