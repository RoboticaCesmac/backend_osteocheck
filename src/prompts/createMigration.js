const readline = require('readline');
const { execSync } = require('child_process');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question('Enter migration name: ', (migrationName) => {
  const command = `yarn typeorm migration:create ./src/database/migrations/${migrationName}`;
  execSync(command, { stdio: 'inherit' });
  rl.close();
})