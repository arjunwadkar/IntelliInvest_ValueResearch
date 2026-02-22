import dotenv from 'dotenv';
import path from 'path';

// Load environment variables
dotenv.config({ path: path.join(__dirname, '../../.env') });

export interface EnvironmentConfig {
  // Application
  nodeEnv: string;
  port: number;
  
  // Feature Flags
  useStubs: boolean;
  useRealAI: boolean;
  enableCache: boolean;
  
  // API Keys
  anthropicApiKey: string;
  fmpApiKey: string;
  alphaVantageApiKey: string;
  screenerApiKey: string;
  tavilyApiKey: string;
  
  // Database
  databaseUrl: string;
  dbHost: string;
  dbPort: number;
  dbName: string;
  dbUser: string;
  dbPassword: string;
  
  // Redis Cache
  redisUrl: string;
  redisHost: string;
  redisPort: number;
  cacheTTL: number;
  
  // Logging
  logLevel: string;
}

class Environment {
  private config: EnvironmentConfig;
  
  constructor() {
    this.config = {
      // Application
      nodeEnv: process.env.NODE_ENV || 'development',
      port: parseInt(process.env.PORT || '8080', 10),
      
      // Feature Flags - Default to stubs for development
      useStubs: process.env.USE_STUBS === 'true',
      useRealAI: process.env.USE_REAL_AI === 'true',
      enableCache: process.env.ENABLE_CACHE === 'true',
      
      // API Keys
      anthropicApiKey: process.env.ANTHROPIC_API_KEY || '',
      fmpApiKey: process.env.FMP_API_KEY || '',
      alphaVantageApiKey: process.env.ALPHA_VANTAGE_API_KEY || '',
      screenerApiKey: process.env.SCREENER_API_KEY || '',
      tavilyApiKey: process.env.TAVILY_API_KEY || '',
      
      // Database
      databaseUrl: process.env.DATABASE_URL || '',
      dbHost: process.env.DB_HOST || 'localhost',
      dbPort: parseInt(process.env.DB_PORT || '5432', 10),
      dbName: process.env.DB_NAME || 'intelliinvest',
      dbUser: process.env.DB_USER || 'postgres',
      dbPassword: process.env.DB_PASSWORD || '',
      
      // Redis
      redisUrl: process.env.REDIS_URL || '',
      redisHost: process.env.REDIS_HOST || 'localhost',
      redisPort: parseInt(process.env.REDIS_PORT || '6379', 10),
      cacheTTL: parseInt(process.env.CACHE_TTL || '3600', 10),
      
      // Logging
      logLevel: process.env.LOG_LEVEL || 'debug'
    };
    
    this.validate();
  }
  
  private validate(): void {
    // Validate required fields based on feature flags
    if (this.config.useRealAI && !this.config.anthropicApiKey) {
      console.warn('⚠️  USE_REAL_AI=true but ANTHROPIC_API_KEY not set. AI features will fail.');
    }
    
    if (!this.config.useStubs && !this.config.fmpApiKey && !this.config.alphaVantageApiKey) {
      console.warn('⚠️  USE_STUBS=false but no data API keys set. Data fetching will fail.');
    }
    
    if (this.config.enableCache && !this.config.redisUrl && !this.config.redisHost) {
      console.warn('⚠️  ENABLE_CACHE=true but Redis not configured. Caching disabled.');
      this.config.enableCache = false;
    }
    
    // Log configuration mode
    this.logMode();
  }
  
  private logMode(): void {
    console.log('\n🔧 IntelliInvest Configuration:');
    console.log(`   Environment: ${this.config.nodeEnv}`);
    console.log(`   Port: ${this.config.port}`);
    console.log(`   Mode: ${this.getMode()}`);
    console.log(`   Data Source: ${this.config.useStubs ? '📦 Stubs (No API costs)' : '🌐 Real APIs'}`);
    console.log(`   AI: ${this.config.useRealAI ? '🤖 Claude API' : '📝 Mocked Responses'}`);
    console.log(`   Caching: ${this.config.enableCache ? '✅ Enabled' : '❌ Disabled'}`);
    console.log('');
  }
  
  private getMode(): string {
    if (this.config.useStubs && !this.config.useRealAI) {
      return '💻 Full Development Mode (Stubs + Mock AI)';
    } else if (!this.config.useStubs && !this.config.useRealAI) {
      return '🔍 Data Testing Mode (Real Data + Mock AI)';
    } else if (!this.config.useStubs && this.config.useRealAI) {
      return '🚀 Production Mode (Real Data + Real AI)';
    } else {
      return '🔬 Hybrid Mode (Stubs + Real AI)';
    }
  }
  
  public get(): EnvironmentConfig {
    return this.config;
  }
  
  public isDevelopment(): boolean {
    return this.config.nodeEnv === 'development';
  }
  
  public isProduction(): boolean {
    return this.config.nodeEnv === 'production';
  }
  
  public isStubMode(): boolean {
    return this.config.useStubs;
  }
  
  public isRealAI(): boolean {
    return this.config.useRealAI;
  }
  
  public isCacheEnabled(): boolean {
    return this.config.enableCache;
  }
}

// Export singleton instance
export const env = new Environment();
export const config = env.get();
