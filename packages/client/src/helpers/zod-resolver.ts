import { zodResolver as hookformZodResolver } from '@hookform/resolvers/zod';
import { FieldValues, Resolver } from 'react-hook-form';

/**
 * This type casting avoid typescript server issues with the hookform/resolvers library
 */
export const zodResolver = hookformZodResolver as unknown as <T extends FieldValues>(
  ...data: unknown[]
) => Resolver<T, unknown, T>;
