/**
 * Technology topics supported by the application.
 *
 * @summary Supported topics.
 * @author Kiara Tuesta
 */
export const TOPICS = ['angular', 'typescript', 'node', 'react'] as const;

/** Union type of the supported topics. */
export type Topic = (typeof TOPICS)[number];
