import { env } from '@/env';
import jwt from 'jsonwebtoken';

export function getTokens(userId: string) {
    const accessToken = jwt.sign({ userId }, env.JWT_SECRET, {
        expiresIn: '1d'
    });

    const refrashToken = jwt.sign({ userId }, env.JWT_REFRESH_SECRET, {
        expiresIn: '7d'
    });

    return { accessToken, refrashToken };
}