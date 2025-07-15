import {
  BedrockRuntimeClient,
  InvokeModelCommand,
  InvokeModelCommandOutput,
} from '@aws-sdk/client-bedrock-runtime';
import { Inject, Logger } from '@nestjs/common';
import { Tag } from 'src/domain/tag';
import { z } from 'zod';

interface BedrockResponse {
  content: {
    text: string;
  }[];
}

export interface TagTransformer {
  /**
   * Transform a data record to a list of tags that are relevant to the data.
   */
  transform(data: Record<string, unknown>, availableTags: Tag[]): Promise<Tag[]>;
}

export const TagTransformer = Symbol('TagTransformer');

export class TagTransformerAwsBedrock implements TagTransformer {
  private readonly logger = new Logger(TagTransformerAwsBedrock.name);

  constructor(
    @Inject(BedrockRuntimeClient) private readonly bedrockRuntimeClient: BedrockRuntimeClient
  ) {}

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
    const response = await this.bedrockRuntimeClient.send(
      new InvokeModelCommand({
        modelId: 'anthropic.claude-3-5-sonnet-20240620-v1:0',
        body: JSON.stringify({
          messages: [
            {
              role: 'user',
              content: prompt
            }
          ],
          max_tokens: 4000,
          temperature: 0.7,
          anthropic_version: 'bedrock-2023-05-31'
        })
      })
    );
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

  private parseResponse(response: InvokeModelCommandOutput, availableTags: Tag[]): Tag[] {
    const responseBody = JSON.parse(response.body.transformToString()) as BedrockResponse;
    const content = responseBody.content[0]?.text;
    
    if (!content) {
      this.logger.error('No content in response');
      return [];
    }

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
