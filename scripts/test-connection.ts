import { createClient } from '@supabase/supabase-js';
import { fileURLToPath } from 'url';
import path from 'path';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables from .env.local
dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error('Error: Missing Supabase environment variables');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function testConnection() {
    console.log('Testing Supabase connection (Detailed)...');

    // Fetch 1 skill
    const { data: skillData, error: skillError, count: skillCount } = await supabase
        .from('skills')
        .select('*', { count: 'exact' })
        .limit(1);

    if (skillError) {
        console.error('Error fetching skill:', skillError);
    } else {
        console.log(`Skills count: ${skillCount}`);
        console.log('First skill:', skillData && skillData.length > 0 ? skillData[0] : 'None');
    }

    // Fetch 1 role
    const { data: roleData, error: roleError, count: roleCount } = await supabase
        .from('roles')
        .select('*', { count: 'exact' })
        .limit(1);

    if (roleError) {
        console.error('Error fetching role:', roleError);
    } else {
        console.log(`Roles count: ${roleCount}`);
        console.log('First role:', roleData && roleData.length > 0 ? roleData[0] : 'None');
    }
}

testConnection();
