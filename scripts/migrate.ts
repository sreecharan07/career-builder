import { createClient } from '@supabase/supabase-js';
import { skills } from '../lib/data/skills';
import { roles } from '../lib/data/roles';
const path = require('path');
const dotenv = require('dotenv');

// Load environment variables from .env.local
dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

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
            .insert({
                title: role.title,
                description: role.description,
                required_skills: role.requiredSkills
            });

        if (error) {
            console.error(`Error migrating role ${role.title}:`, error.message);
        }
    }
    console.log('Roles migration completed.');
}

migrate();
