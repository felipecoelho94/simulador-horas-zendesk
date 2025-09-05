import { Router } from 'express';
import { simulate } from './simulations.js';
import { testDbConnection, testSupabaseConnection } from './dbTest.js';

const router = Router();

router.post('/simulate', simulate);
router.get('/test-db', testDbConnection);
router.get('/test-supabase', testSupabaseConnection);

export default router;