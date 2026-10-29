import Link from "next/link";

//define as propriedades da âncora, o que pode ser passado como parâmetros
interface AnchorProps {
    content: string;
    color?: string;
    size?: string;
    weight?: 'normal' | 'bold';
    underline?: 'no-underline' | 'underline';
    family?: 'lato' | 'montserrat' | 'oswald';
    spacing?: 'normal' | 'wide' | 'wider' | 'widest';
    href: string;
}

//retorna o elemento HTML para reutilização geral
export function Anchor({content, color = "white", size = "20px", weight = "normal", underline = "underline", family = "montserrat", spacing = "normal", href}: AnchorProps) {
    //verifica se o tamanho está válido (só aceita px, em ou rem)
    const sizeAceitos = ["px", "em", "rem"];
    size = sizeAceitos.some((sufixo) => size.trim().endsWith(sufixo)) ? size : "20px";

    return(
        <Link
            //tailwind css para alguns parametros 
            href={href}
            className={`${underline} tracking-${spacing}`}
            style={
                //css normal para outros parametros
                {
                    fontSize: size,
                    fontWeight: weight,
                    fontFamily: `var(--font-${family})`,
                    color: color
                }
            }>{content}</Link>
    );
}