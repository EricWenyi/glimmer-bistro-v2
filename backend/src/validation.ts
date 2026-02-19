import { z } from 'zod';

export const targetTypeSchema = z.enum(['home', 'event', 'recipe']);

const slotMap: Record<z.infer<typeof targetTypeSchema>, readonly string[]> = {
  home: ['hero', 'gallery'],
  event: ['hero', 'gallery'],
  recipe: ['cover', 'gallery'],
};

export const uploadSchema = z.object({
  targetType: targetTypeSchema,
  targetKey: z.string().trim().min(1),
  slot: z.string().trim().min(1),
  position: z.coerce.number().int().positive().optional(),
  status: z.enum(['draft', 'published']).default('published'),
  caption: z.string().trim().max(500).optional(),
  alt: z.string().trim().max(500).optional(),
  captionOverride: z.string().trim().max(500).optional(),
  altOverride: z.string().trim().max(500).optional(),
});

export const patchPlacementSchema = z.object({
  status: z.enum(['draft', 'published', 'archived']).optional(),
  position: z.number().int().positive().optional(),
  targetType: targetTypeSchema.optional(),
  targetKey: z.string().trim().min(1).optional(),
  slot: z.string().trim().min(1).optional(),
  captionOverride: z.string().trim().max(500).nullable().optional(),
  altOverride: z.string().trim().max(500).nullable().optional(),
});

export function assertAllowedSlot(targetType: z.infer<typeof targetTypeSchema>, slot: string): void {
  if (!slotMap[targetType].includes(slot)) {
    throw new Error(`Invalid slot \"${slot}\" for targetType \"${targetType}\"`);
  }
}
