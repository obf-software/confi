import { Inject, Logger } from '@nestjs/common';
import { OpenAI } from 'openai';
import { Tag } from 'src/domain/tag';
import { z } from 'zod';

export interface TagTransformer {
  transform(data: Record<string, unknown>, availableTags: Tag[]): Promise<Tag[]>;
}

export const TagTransformer = Symbol('TagTransformer');

export class TagTransformerOpenAi implements TagTransformer {
  private readonly logger = new Logger(TagTransformerOpenAi.name);

  constructor(@Inject(OpenAI) private readonly openai: OpenAI) {}

  /**
   * 1. build prompt
   * 2. call openai
   * 3. parse response
   * 4. return tags
   */
  async transform(data: Record<string, unknown>, availableTags: Tag[]): Promise<Tag[]> {
    if (availableTags.length === 0) return [];
    if (Object.keys(data).length === 0) return [];

    const prompt = this.buildPrompt(data, availableTags);
    const response = await this.openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: prompt }],
      response_format: { type: 'json_object' },
      n: 1,
    });
    return this.parseResponse(response, availableTags);
  }

  private buildPrompt(data: Record<string, unknown>, availableTags: Tag[]): string {
    const dataString = this.formatDataForAnalysis(data);
    const tagsString = availableTags.map((tag) => `- ${tag.slug}: ${tag.description}`).join('\n');

    return `You are an AI assistant that analyzes data and selects the most relevant tags.

TASK: Analyze the provided data and select the tags that are most relevant to the content.

DATA TO ANALYZE:
${dataString}

AVAILABLE TAGS:
${tagsString}

INSTRUCTIONS:
1. Carefully read and understand the data provided
2. Consider the meaning and context of each available tag
3. Select only the tags that are truly relevant to the data
4. Prioritize quality over quantity - it's better to select fewer, more relevant tags
5. Consider semantic relationships, not just keyword matching
6. Return only the tag slugs (the part before the colon)

RESPONSE FORMAT:
Return only a JSON array of tag slugs, like this: ["tag1", "tag2", "tag3"]
Do not include any other text, explanations, or formatting.

EXAMPLE RESPONSES (JSON):
- Found tags: { "tags": ["technology", "education", "remote-work"] } 
- No tags found: { "tags": [] }
`;
  }

  private formatDataForAnalysis(data: Record<string, unknown>): string {
    const formatValue = (value: unknown, depth = 0): string => {
      if (depth > 3) return '[nested object]';

      if (value === null || value === undefined) {
        return 'null';
      }

      if (typeof value === 'string') {
        return value;
      }

      if (typeof value === 'number' || typeof value === 'boolean') {
        return value.toString();
      }

      if (Array.isArray(value)) {
        return value.map((item) => formatValue(item, depth + 1)).join(', ');
      }

      if (typeof value === 'object') {
        try {
          return Object.entries(value as Record<string, unknown>)
            .map(([key, val]) => `${key}: ${formatValue(val, depth + 1)}`)
            .join('; ');
        } catch {
          return '[object]';
        }
      }

      // For other types, convert safely to string
      return '[unknown]';
    };

    return Object.entries(data)
      .map(([key, value]) => `${key}: ${formatValue(value)}`)
      .join('\n');
  }

  private parseResponse(
    response: OpenAI.Chat.Completions.ChatCompletion,
    availableTags: Tag[]
  ): Tag[] {
    const content = response.choices[0].message.content ?? '{}';

    const { success, data } = z
      .object({
        tags: z.array(z.string()).optional(),
      })
      .safeParse(JSON.parse(content));

    if (!success) {
      this.logger.error(`Error parsing response: ${content}`);
      return [];
    }

    const tags = data.tags ?? [];

    return availableTags.filter((tag) => tags.includes(tag.slug));
  }
}
