'use client';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import messages from '@/messages.json';
import Autoplay from 'embla-carousel-autoplay';
export default function Home() {
  return (
    <>
      <main className="flex-grow flex flex-col items-center justify-center px-4 md:px-24 py-12">
        <section className="text-center mb-8 md:mb-12">
          <h1 className="text-3xl md:text-5xl font-bold">
            Dive into the world of Anyonymous conversations
          </h1>
          <p className="mt-3 md:mt-4 text-base md:text-lg">
            Explore Mysetery Message - Where you identity remains seceret
          </p>
        </section>
        <Carousel
          className="w-full max-w-xs"
          plugins={[Autoplay({ delay: 2000 })]}
        >
          <CarouselContent>
            {messages.map((message, index) => (
              <CarouselItem key={index}>
                <div className="p-1">
                  <Card>
                    <CardHeader>{message.title}</CardHeader>
                    <CardContent className="flex aspect-square items-center justify-center p-6">
                      <span className="text-lg font-semibold">
                        {message.content}
                      </span>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </main>
      <footer className="text-center p-4 md:p-6">
        @ 2024 Anonymous Message. Developed by Raghvendra Singh
      </footer>
    </>
  );
}
