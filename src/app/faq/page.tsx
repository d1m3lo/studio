
'use client';

import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"


const faqItems = [
    {
        question: "Quais são os métodos de pagamento aceitos?",
        answer: "Aceitamos os principais cartões de crédito (Visa, MasterCard, American Express), Pix e boleto bancário. Todos os pagamentos são processados em um ambiente seguro."
    },
    {
        question: "Qual é o prazo de entrega?",
        answer: "O prazo de entrega varia de acordo com a sua localização. Em geral, para capitais, o prazo é de 3 a 7 dias úteis. Para outras regiões, pode levar de 5 a 15 dias úteis. Você pode calcular o frete e o prazo exato na página do produto ou no carrinho."
    },
    {
        question: "Como posso rastrear meu pedido?",
        answer: "Assim que seu pedido for despachado, você receberá um e-mail com o código de rastreamento e o link para acompanhar a entrega diretamente no site da transportadora."
    },
    {
        question: "Posso trocar ou devolver um produto?",
        answer: "Sim! A primeira troca é gratuita. Você tem até 30 dias corridos após o recebimento para solicitar a troca e até 7 dias corridos para solicitar a devolução por arrependimento. O produto deve estar em perfeitas condições e com a etiqueta original."
    },
    {
        question: "Os produtos são originais?",
        answer: "Sim, todos os nossos produtos são 100% originais e adquiridos diretamente das marcas e seus distribuidores oficiais. Garantimos a autenticidade de cada item vendido em nossa loja."
    }
]


export default function FAQPage() {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow">
                <div className="bg-background">
                    <div className="container max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
                        <div className="text-center mb-12">
                            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
                                Perguntas Frequentes
                            </h1>
                            <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
                                Encontre aqui as respostas para as dúvidas mais comuns sobre nossos produtos e serviços.
                            </p>
                        </div>
                        
                        <Accordion type="single" collapsible className="w-full">
                            {faqItems.map((item, index) => (
                                <AccordionItem value={`item-${index + 1}`} key={index}>
                                    <AccordionTrigger className="text-lg text-left hover:no-underline">
                                        {item.question}
                                    </AccordionTrigger>
                                    <AccordionContent className="text-base text-muted-foreground">
                                        {item.answer}
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
