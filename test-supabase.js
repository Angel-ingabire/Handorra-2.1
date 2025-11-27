// Quick Supabase Connection Test
// Run this with: node test-supabase.js

const SUPABASE_URL = 'https://xcxmuwhlkxxblkrowaoz.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhjeG11d2hsa3h4Ymxrcm93YW96Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQwNjA4MDcsImV4cCI6MjA3OTYzNjgwN30.MbW3iX-m_-d64vI_PsOKA1BhH8ESclg2iJ86LgvClyY';

console.log('🔍 Testing Supabase connection...\n');

// Test 1: Check if Supabase URL is reachable
fetch(`${SUPABASE_URL}/rest/v1/`, {
  headers: {
    'apikey': SUPABASE_KEY,
    'Content-Type': 'application/json'
  }
})
.then(response => {
  if (response.ok) {
    console.log('✅ Test 1: Supabase URL is reachable');
    return response.json();
  } else {
    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
  }
})
.then(data => {
  console.log('✅ Test 2: API responded successfully');
  console.log('   Response:', data);
})
.catch(error => {
  console.error('❌ Connection failed:', error.message);
  console.log('\n📋 Troubleshooting:');
  console.log('   1. Check if your Supabase project is paused');
  console.log('   2. Verify your .env file has correct credentials');
  console.log('   3. Go to https://supabase.com/dashboard to check project status');
});

// Test 2: Check products table
console.log('\n🔍 Testing database access...\n');

fetch(`${SUPABASE_URL}/rest/v1/products?select=count`, {
  headers: {
    'apikey': SUPABASE_KEY,
    'Content-Type': 'application/json',
    'Prefer': 'count=exact'
  }
})
.then(response => {
  if (response.ok) {
    const count = response.headers.get('content-range');
    console.log('✅ Test 3: Database is accessible');
    console.log(`   Products table: ${count || 'accessible'}`);
  } else {
    console.log('⚠️  Test 3: Database access issue (table might not exist yet)');
    console.log('   Run migrations to create tables');
  }
})
.catch(error => {
  console.log('⚠️  Test 3: Could not access database');
  console.log('   This is normal if you haven\'t run migrations yet');
});

console.log('\n' + '='.repeat(60));
console.log('📊 Test Summary:');
console.log('='.repeat(60));
console.log('If all tests pass, your Supabase is ready to use!');
console.log('If tests fail, check your Supabase dashboard.');
console.log('='.repeat(60) + '\n');
