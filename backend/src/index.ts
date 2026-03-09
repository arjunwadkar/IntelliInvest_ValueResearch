import app from './app';
import { config } from './config/environment';

const PORT = config.port;

app.listen(PORT, () => {
  console.log(`\n🚀 IntelliInvest ValueResearch API`);
  console.log(`   Server running on port ${PORT}`);
  console.log(`   Health check: http://localhost:${PORT}/health`);
  console.log(`   Sectors API: http://localhost:${PORT}/api/sectors`);
  console.log(`   Companies API: http://localhost:${PORT}/api/companies/:symbol`);
  console.log('');
});
