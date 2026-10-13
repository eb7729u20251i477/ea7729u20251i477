import { BaseEntity } from '../../../shared/infrastructure/base-entity';

/**
 * Open source repository provided by the external API provider (GitHub) for a topic.
 *
 * @summary Topic repository entity.
 * @author Kiara Tuesta
 */
export class TopicRepository implements BaseEntity {
  id: number;
  name: string;
  fullName: string;
  stargazersCount: number;

  /**
   * @param props - Initialization values.
   */
  constructor(props: { id: number; name: string; fullName: string; stargazersCount: number }) {
    this.id = props.id;
    this.name = props.name;
    this.fullName = props.fullName;
    this.stargazersCount = props.stargazersCount;
  }
}
