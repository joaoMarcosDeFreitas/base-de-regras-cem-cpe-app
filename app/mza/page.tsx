//transforma o componente em um client component
'use client'

import { Card } from "@/components/molecules/Card";

import React from "react";


function hello() {
    console.log("oi");
    return;
}

export default function Page() {
    return(
        <Card 
            clickable={hello} 
            titulo={{
                tag: "h1",
                content: "oi"
            }}
            subtitulo={{
                tag: "h1",
                content: "oi"
            }}
            descricao={{
                tag: "h1",
                content: "oi"
            }}
            cursor="pointer"
        />
    );
}