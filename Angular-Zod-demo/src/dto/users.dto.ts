import { z } from 'zod';


const usersSchema = z.object({
  users: z.array(
    z.object({
      id: z.number(),
      firstName: z.string(),
      lastName: z.string(),
      age: z.number().optional(),
      gender: z.string(),
      address: z.object({
        address: z.string(),
        city: z.string(),
        state: z.string(),
      }),
      company: z.object({
        address: z.object({
          address: z.string(),
          city: z.string().optional(),
          state: z.string(),
        }),
        name: z.string(),
      }),
    })
  ),
});


export type UsersDto = z.infer<typeof usersSchema>;


export function parseUserDTO(source: unknown) {
  return usersSchema.safeParse(source);
}