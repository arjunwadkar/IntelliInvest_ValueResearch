import { IDataService } from './data.factory';
import axios from 'axios';
import { config } from '../../config/environment';

export class RealDataService implements IDataService {
  private fmpApiKey: string;
  private alphaVantageKey: string;
  
  constructor() {
    this.fmpApiKey = config.fmpApiKey;
    this.alphaVantageKey = config.alphaVantageApiKey;
    console.log('🌐 RealDataService initialized');
    console.log(`   FMP API Key: ${this.fmpApiKey ? '✓ Set' : '✗ Missing'}`);
    console.log(`   Alpha Vantage Key: ${this.alphaVantageKey ? '✓ Set' : '✗ Missing'}`);
  }
  
  async getSectorOverview(sector: string, subSector?: string): Promise<any> {
    // TODO: Implement real API call to get sector data
    // For now, throw error to force stub mode during development
    throw new Error('Real sector data API not yet implemented. Use USE_STUBS=true');
  }
  
  async getSectorCompanies(sector: string, subSector?: string): Promise<string[]> {
    // TODO: Implement
    throw new Error('Real sector companies API not yet implemented. Use USE_STUBS=true');
  }
  
  async getCompanyData(symbol: string): Promise<any> {
    // TODO: Implement using FMP, Screener.in, Alpha Vantage
    throw new Error('Real company data API not yet implemented. Use USE_STUBS=true');
  }
  
  async getCompanyFinancials(symbol: string): Promise<any> {
    // TODO: Implement
    throw new Error('Real financials API not yet implemented. Use USE_STUBS=true');
  }
  
  async getCompanyRatios(symbol: string): Promise<any> {
    // TODO: Implement
    throw new Error('Real ratios API not yet implemented. Use USE_STUBS=true');
  }
  
  async getCompanyValuation(symbol: string): Promise<any> {
    // TODO: Implement DCF, relative valuation
    throw new Error('Real valuation API not yet implemented. Use USE_STUBS=true');
  }
  
  async searchCompanies(criteria: any): Promise<any[]> {
    // TODO: Implement using Screener.in API
    throw new Error('Real company search API not yet implemented. Use USE_STUBS=true');
  }
  
  async compareCompanies(symbols: string[]): Promise<any> {
    // TODO: Implement
    throw new Error('Real company comparison API not yet implemented. Use USE_STUBS=true');
  }
}
