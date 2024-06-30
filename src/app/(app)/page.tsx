'use client';
import { Card, CardContent, CardDescription } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import messages from '@/messages.json';
import Autoplay from 'embla-carousel-autoplay';
import { MessageSquareMore } from 'lucide-react';

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
          className="w-full max-w-md"
          plugins={[Autoplay({ delay: 2000 })]}
        >
          <CarouselContent>
            {messages.map((message, index) => (
              <CarouselItem key={index}>
                <Card>
                  <CardContent className="flex items-start justify-center p-5">
                    <MessageSquareMore className="mr-2 mt-1" />
                    <div>
                      <span className="text-lg font-semibold">
                        {message.content}
                      </span>
                      <CardDescription className="mt-4">
                        {message.createdAt}
                      </CardDescription>
                    </div>
                  </CardContent>
                </Card>
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
