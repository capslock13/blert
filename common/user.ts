import { Types } from 'mongoose';

export type ApiKey = {
  _id: Types.ObjectId;
  userId: Types.ObjectId;
};

export type User = {
  id: Types.ObjectId;
  username: string;
  password: string;
};

export enum RecordingType {
  SPECTATOR = 'SPECTATOR',
  RAIDER = 'RAIDER',
}

export type RecordedRaid = {
  raidId: string;
  recorderId: Types.ObjectId;
  recordingType: RecordingType;
};
