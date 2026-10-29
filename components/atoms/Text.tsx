//define as propriedades do texto, o que pode ser passado como parâmetros
export interface TextProps {
    tag: 'h1' | 'h2' | 'h3' | 'p'
    content: string;
    color?: string;
    size?: string;
    weight?: 'normal' | 'bold';
    underline?: 'no-underline' | 'underline';
    family?: 'lato' | 'montserrat' | 'oswald';
    spacing?: 'normal' | 'wide' | 'wider' | 'widest';
}

//retorna o elemento HTML para reutilização geral
export function Text({tag, content, color = "white", size = "20px", weight = "normal", underline = "no-underline", family = "montserrat", spacing = "normal"}: TextProps) {
    //define a TAG a partir do que veio como parâmetro
    const Tag = tag;
    //verifica se o tamanho está válido (só aceita px, em ou rem)
    const sizeAceitos = ["px", "em", "rem"];
    size = sizeAceitos.some((sufixo) => size.trim().endsWith(sufixo)) ? size : "20px";

    return(
        <Tag
        //tailwind css para alguns parametros 
            className={`${underline} tracking-${spacing}`}
            style={
                //css normal para outros parametros
                {
                    fontSize: size,
                    fontWeight: weight,
                    fontFamily: `var(--font-${family})`,
                    color: color
                }
            }>{content}</Tag>
    );
}