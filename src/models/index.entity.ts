import { AccessToken } from './access-token.entity';
import { Client } from './client.entity';
import { Theme } from './theme.entity';
import { User } from './user.entity';

export const ENTITIES = [User, AccessToken,Theme,Client]; // Array of all entities

export { User, AccessToken, Client, Theme };
