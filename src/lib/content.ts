export type TargetType = 'home' | 'event' | 'recipe';

export type ContentItem = {
  placementShortCode: string;
  mediaShortCode: string;
  imageUrl: string;
  caption: string | null;
  alt: string | null;
  position: number;
};

export type ContentBySlot = Record<string, ContentItem[]>;

const baseUrl =
  process.env.CONTENT_API_BASE_URL ||
  process.env.NEXT_PUBLIC_CONTENT_API_BASE_URL ||
  'http://localhost:4000';

export async function fetchContent(targetType: TargetType, targetKey: string): Promise<ContentBySlot> {
  const endpoint = `${baseUrl.replace(/\/$/, '')}/v1/content?targetType=${encodeURIComponent(targetType)}&targetKey=${encodeURIComponent(targetKey)}`;

  try {
    const response = await fetch(endpoint, {
      next: { revalidate: 30 },
    });

    if (!response.ok) {
      return {};
    }

    const data = (await response.json()) as { slots?: ContentBySlot };
    return data.slots || {};
  } catch {
    return {};
  }
}
