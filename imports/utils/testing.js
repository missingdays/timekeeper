
import process from 'process';

export function getAdminUser(){
    return { userId: process.env.METEOR_ADMIN_ID };
}
