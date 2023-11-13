import { Entity, EntityType } from './entity';
import { SkillLevel } from '../../raid/stats';

export class PlayerEntity implements Entity {
  x: number;
  y: number;
  type: EntityType = EntityType.PLAYER;
  size = 1;
  outlineColor: string = '#979695';
  interactable: boolean = true;

  name: string;
  hitpoints?: SkillLevel;

  constructor(x: number, y: number, name: string, hitpoints?: SkillLevel) {
    this.x = x;
    this.y = y;
    this.name = name;
    this.hitpoints = hitpoints;
  }

  getUniqueId(): string {
    return `${this.type}-${this.name}`;
  }

  renderContents(): React.ReactNode {
    return (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          color: '#fff',
          fontSize: '12px',
          textShadow: '3px 3px 2px rgba(0, 0, 0, 1)',
        }}
      >
        {this.name}
        {this.hitpoints !== undefined && (
          <div>
            {this.hitpoints.current}/{this.hitpoints.base}
          </div>
        )}
      </div>
    );
  }
}
