import { createClient } from '@supabase/supabase-js';
import * as fs from 'fs';
import * as path from 'path';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const supabase = createClient(supabaseUrl, supabaseKey);

async function runMigration() {
  console.log('Running migration: 004_add_supporting_documents.sql');
  
  try {
    // Read the migration file
    const migrationPath = path.join(process.cwd(), 'supabase', 'migrations', '004_add_supporting_documents.sql');
    const migrationSQL = fs.readFileSync(migrationPath, 'utf8');
    
    // Extract just the ALTER TABLE command (skip storage policies as they need admin)
    const alterTableCommand = migrationSQL.split('\n')
      .filter(line => !line.includes('CREATE POLICY') && !line.includes('INSERT INTO storage'))
      .filter(line => !line.startsWith('--') || line.startsWith('-- Add'))
      .join('\n');
    
    console.log('Executing SQL command...');
    
    // Note: This might not work with anon key, may need service role key
    const { data, error } = await supabase.rpc('exec_sql', {
      sql_query: alterTableCommand
    });
    
    if (error) {
      console.error('Migration failed:', error);
      console.log('\n⚠️  The migration needs to be run manually in Supabase SQL Editor.');
      console.log('Please run the following SQL in your Supabase dashboard:\n');
      console.log('ALTER TABLE referrals ADD COLUMN IF NOT EXISTS supporting_documents TEXT[] DEFAULT \'{}\';');
      return;
    }
    
    console.log('✅ Migration completed successfully!');
    
  } catch (error) {
    console.error('Error running migration:', error);
    console.log('\n⚠️  Please run the migration manually in Supabase SQL Editor.');
    console.log('Go to: Supabase Dashboard → SQL Editor');
    console.log('Run: ALTER TABLE referrals ADD COLUMN IF NOT EXISTS supporting_documents TEXT[] DEFAULT \'{}\';');
  }
}

runMigration();
