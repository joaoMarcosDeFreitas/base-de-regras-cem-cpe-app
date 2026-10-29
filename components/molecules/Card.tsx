import { Text, TextProps } from "../atoms/Text";

//define as propriedades do texto, o que pode ser passado como parâmetros
interface CardProps {
    //isso permite que o cartão seja clicável
    clickable: ()=> void;
    titulo: TextProps;
    subtitulo: TextProps;
    descricao: TextProps;
    cursor?: 'default' | 'pointer';
}

//retorna o elemento HTML para reutilização geral
export function Card({clickable, titulo, subtitulo, descricao, cursor = "default"}: CardProps) {
    //passa a função como parâmetro para o botão ser clicável
    return(
        <div 
            className={`flex flex-col justify-center gap-10`} 
            style={
                {
                    cursor: cursor
                }
            }
            onClick={clickable}>
                <Text {...titulo}/>
                <Text {...subtitulo}/>
                <Text {...descricao}/>
        </div>
    );
}