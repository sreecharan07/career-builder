
import { createClient } from '@supabase/supabase-js';
import { skills } from '../lib/data/skills';
import { roles } from '../lib/data/roles';
import * as dotenv from 'dotenv';
import path from 'path';

// Load environment variables from .env.local
dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error('Error: Missing Supabase environment variables in .env.local');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function migrate() {
    console.log('Starting migration...');

    // Migrate Skills
    console.log(`Migrating ${skills.length} skills...`);
    for (const skill of skills) {
        const { error } = await supabase
            .from('skills')
            .upsert({
                name: skill.name,
                variations: skill.variations
            }, { onConflict: 'name' });

        if (error) {
            console.error(`Error migrating skill ${skill.name}:`, error.message);
        }
    }
    console.log('Skills migration completed.');

    // Migrate Roles
    console.log(`Migrating ${roles.length} roles...`);
    for (const role of roles) {
        const { error } = await supabase
            .from('roles')
            .upsert({
                title: role.title,
                description: role.description,
                required_skills: role.requiredSkills
            }, { onConflict: 'title' }); // Assuming title is unique for now, or we can just insert

        if (error) {
            // If there's no unique constraint on title via index, upsert might not work as expected for duplicates without an ID.
            // But for initial seeding, it's fine.
            console.error(`Error migrating role ${role.title}:`, error.message);
        }
    }
    console.log('Roles migration completed.');
}

migrate();
