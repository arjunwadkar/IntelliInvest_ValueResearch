import { config } from '../../config/environment';
import { StubDataService } from './stub-data.service';
import { RealDataService } from './real-data.service';

export interface IDataService {
  // Sector operations
  getSectorOverview(sector: string, subSector?: string): Promise<any>;
  getSectorCompanies(sector: string, subSector?: string): Promise<string[]>;
  
  // Company operations
  getCompanyData(symbol: string): Promise<any>;
  getCompanyFinancials(symbol: string): Promise<any>;
  getCompanyRatios(symbol: string): Promise<any>;
  getCompanyValuation(symbol: string): Promise<any>;
  
  // Research operations
  searchCompanies(criteria: any): Promise<any[]>;
  compareCompanies(symbols: string[]): Promise<any>;
}

/**
 * Factory to create appropriate data service based on configuration
 * Returns StubDataService (reads JSON files) or RealDataService (calls APIs)
 */
export class DataFactory {
  private static instance: IDataService | null = null;
  
  public static getDataService(): IDataService {
    if (!DataFactory.instance) {
      if (config.useStubs) {
        console.log('📦 Using STUB data service (development mode)');
        DataFactory.instance = new StubDataService();
      } else {
        console.log('🌐 Using REAL data service (production mode)');
        DataFactory.instance = new RealDataService();
      }
    }
    
    return DataFactory.instance;
  }
  
  /**
   * Reset instance - useful for testing or switching modes
   */
  public static reset(): void {
    DataFactory.instance = null;
  }
}

// Export convenience function
export const getDataService = () => DataFactory.getDataService();
