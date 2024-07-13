'use client';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { messageSchema } from '@/schemas/messageSchema';
import { ApiResponse } from '@/types/ApiResponse';
import { zodResolver } from '@hookform/resolvers/zod';
import axios, { AxiosError } from 'axios';
import { Loader2 } from 'lucide-react';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

export default function Page() {
  const form = useForm<z.infer<typeof messageSchema>>({
    resolver: zodResolver(messageSchema),
    defaultValues: {
      content: '',
    },
  });
  const { toast } = useToast();
  const [isSendingMessage, setIsSendingMessage] = useState<boolean>(false);
  const params = useParams<{ username: string }>();

  const onSubmit = async (data: z.infer<typeof messageSchema>) => {
    setIsSendingMessage(true);
    try {
      const response = await axios.post<ApiResponse>('/api/send-messages', {
        content: data.content,
        username: params.username,
      });
      toast({ title: response.data.message });
      form.reset();
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      toast({
        title: 'Error',
        description:
          axiosError.response?.data.message || 'Failed to send messages',
        variant: 'destructive',
      });
    } finally {
      setIsSendingMessage(false);
    }
  };

  return (
    <main className="my-8 mx-4 md:mx-8 lg:mx-auto p-6 rounded w-full max-w-6xl grid place-items-center">
      <section className="text-center mb-8 md:mb-12">
        <p className="mt-3 md:mt-4 text-base md:text-lg">
          Send message anonymously - Where you identity remains secret
        </p>
      </section>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid w-full max-w-3xl gap-2"
        >
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea
                    placeholder="Type your message here..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isSendingMessage}>
            {isSendingMessage ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Sending message
              </>
            ) : (
              'Send message'
            )}
          </Button>
        </form>
      </Form>
    </main>
  );
}
