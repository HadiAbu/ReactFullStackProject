import fs from 'fs';
import path from 'path';
import { query } from '../db/index.js';


const sqlPath = path.join(process.cwd(), 'src', 'models', 'posts.sql');


async function migrate() {
try {
const sql = fs.readFileSync(sqlPath, { encoding: 'utf8' });
console.log('Running migration...');
await query(sql);
console.log('✅ Migration complete');
process.exit(0);
} catch (err) {
console.error('Migration failed:', err);
process.exit(1);
}
}


migrate();