import {
  MaidenCrabPosition,
  MaidenCrabSpawn,
  Mode,
  SkillLevel,
  Room,
  RoomStatus,
} from './raid-definitions';

export enum EventType {
  RAID_START = 'RAID_START',
  RAID_END = 'RAID_END',
  RAID_UPDATE = 'RAID_UPDATE',
  ROOM_STATUS = 'ROOM_STATUS',
  PLAYER_UPDATE = 'PLAYER_UPDATE',
  NPC_UPDATE = 'NPC_UPDATE',
  MAIDEN_CRAB_SPAWN = 'MAIDEN_CRAB_SPAWN',
  MAIDEN_BLOOD_SPLATS = 'MAIDEN_BLOOD_SPLATS',
}

export interface Event {
  type: EventType;
  raidId?: string;
  room?: Room;
  tick: number;
  xCoord: number;
  yCoord: number;
}

export interface RaidStartEvent extends Event {
  type: EventType.RAID_START;
  raidInfo: RaidInfo;
}

export interface RaidUpdateEvent extends Event {
  type: EventType.RAID_UPDATE;
  raidInfo: RaidInfo;
}

export interface RoomStatusEvent extends Event {
  type: EventType.ROOM_STATUS;
  roomStatus: RoomStatus;
}

export interface PlayerUpdateEvent extends Event {
  type: EventType.PLAYER_UPDATE;
  player: Player;
}

export interface NpcUpdateEvent extends Event {
  type: EventType.NPC_UPDATE;
  npc: Npc;
}

export interface MaidenCrabSpawnEvent extends Event {
  type: EventType.MAIDEN_CRAB_SPAWN;
  maidenEntity: MaidenEntity;
}

export interface MaidenBloodSplatsEvent extends Event {
  type: EventType.MAIDEN_CRAB_SPAWN;
  maidenEntity: MaidenEntity;
}

export type RaidInfo = {
  party: string[];
  mode?: Mode;
};

export type Player = {
  name: string;
  hitpoints?: SkillLevel;
  equipment?: EquipmentMap;
};

export type Item = {
  id: number;
  name: string;
  quantity: number;
};

export enum EquipmentSlot {
  HEAD = 'HEAD',
}

export type EquipmentMap = {
  [key in EquipmentSlot]: Item;
};

export type Npc = {
  id: number;
  roomId: number;
  hitpoints?: SkillLevel;
};

export type Coords = {
  x: number;
  y: number;
};

export type MaidenEntity = {
  bloodSplats?: Coords[];
  crab?: MaidenCrab;
};

export type MaidenCrab = {
  spawn: MaidenCrabSpawn;
  position: MaidenCrabPosition;
  scuffed: boolean;
};