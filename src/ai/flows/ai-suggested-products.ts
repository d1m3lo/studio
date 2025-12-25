'use server';

/**
 * @fileOverview This file defines a Genkit flow for suggesting products based on items in the user's cart.
 *
 * - getSuggestedProducts - A function that takes the items in a user's cart and returns suggested products.
 * - SuggestedProductsInput - The input type for the getSuggestedProducts function.
 * - SuggestedProductsOutput - The return type for the getSuggestedProducts function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestedProductsInputSchema = z.object({
  cartItems: z.array(
    z.object({
      name: z.string().describe('The name of the item in the cart.'),
      description: z.string().describe('A description of the item.'),
      imageUrl: z.string().describe('URL of the image of the item.'),
      category: z.string().describe('The product category of the item.'),
    })
  ).describe('The items currently in the user\'s cart.'),
});
export type SuggestedProductsInput = z.infer<typeof SuggestedProductsInputSchema>;

const SuggestedProductsOutputSchema = z.array(
  z.object({
    name: z.string().describe('The name of the suggested product.'),
    description: z.string().describe('A description of the suggested product.'),
    imageUrl: z.string().describe('URL of the image of the suggested product.'),
    category: z.string().describe('The product category of the suggested product.'),
  })
).describe('A list of products suggested based on the items in the cart.');
export type SuggestedProductsOutput = z.infer<typeof SuggestedProductsOutputSchema>;

export async function getSuggestedProducts(input: SuggestedProductsInput): Promise<SuggestedProductsOutput> {
  return suggestedProductsFlow(input);
}

const suggestedProductsPrompt = ai.definePrompt({
  name: 'suggestedProductsPrompt',
  input: {schema: SuggestedProductsInputSchema},
  output: {schema: SuggestedProductsOutputSchema},
  prompt: `You are an e-commerce product recommendation engine.

  Given the items in the user's cart, suggest other products that the user might be interested in.
  These products should be related to the items already in the cart, either as complementary items or as similar items from the same category.
  Try to suggest a diverse range of products.

  The suggested products should be in the same style and aesthetic as the items in the cart.

  Here are the items in the cart:
  {{#each cartItems}}
  - Name: {{{name}}}
    Description: {{{description}}}
    Image URL: {{{imageUrl}}}
    Category: {{{category}}}
  {{/each}}`,
});

const suggestedProductsFlow = ai.defineFlow(
  {
    name: 'suggestedProductsFlow',
    inputSchema: SuggestedProductsInputSchema,
    outputSchema: SuggestedProductsOutputSchema,
  },
  async input => {
    const {output} = await suggestedProductsPrompt(input);
    return output!;
  }
);
