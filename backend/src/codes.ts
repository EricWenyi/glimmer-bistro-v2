import { customAlphabet } from 'nanoid';

const alphaNum = customAlphabet('ABCDEFGHJKLMNPQRSTUVWXYZ23456789', 6);

export const makePlacementCode = () => `P-${alphaNum()}`;
export const makeMediaCode = () => `M-${alphaNum()}`;
