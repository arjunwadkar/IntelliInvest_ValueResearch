import fs from 'fs';
import path from 'path';
import { IDataService } from './data.factory';

export class StubDataService implements IDataService {
  private stubsPath: string;
  
  constructor() {
    this.stubsPath = path.join(__dirname, '../../../stubs');
    console.log('📦 StubDataService initialized');
    console.log(`   Stubs path: ${this.stubsPath}`);
  }
  
  async getSectorOverview(sector: string, subSector?: string): Promise<any> {
    try {
      const sectorFileName = this.normalizeSectorName(sector);
      const filePath = path.join(this.stubsPath, 'sectors', `${sectorFileName}.json`);
      
      console.log(`📖 Reading sector: ${filePath}`);
      
      if (!fs.existsSync(filePath)) {
        throw new Error(`Sector stub not found: ${sector}`);
      }
      
      const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
      
      // Filter by sub-sector if provided
      if (subSector && data.subSector !== subSector) {
        throw new Error(`Sub-sector ${subSector} not found in ${sector}`);
      }
      
      return data;
    } catch (error) {
      console.error('Error reading sector stub:', error);
      throw error;
    }
  }
  
  async getSectorCompanies(sector: string, subSector?: string): Promise<string[]> {
    const sectorData = await this.getSectorOverview(sector, subSector);
    return sectorData.companies || [];
  }
  
  async getCompanyData(symbol: string): Promise<any> {
    try {
      const normalizedSymbol = symbol.toLowerCase();
      const filePath = path.join(this.stubsPath, 'companies', `${normalizedSymbol}.json`);
      
      console.log(`📖 Reading company: ${filePath}`);
      
      if (!fs.existsSync(filePath)) {
        throw new Error(`Company stub not found: ${symbol}`);
      }
      
      const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
      return data;
    } catch (error) {
      console.error('Error reading company stub:', error);
      throw error;
    }
  }
  
  async getCompanyFinancials(symbol: string): Promise<any> {
    const companyData = await this.getCompanyData(symbol);
    return companyData.financials;
  }
  
  async getCompanyRatios(symbol: string): Promise<any> {
    const companyData = await this.getCompanyData(symbol);
    return companyData.ratios;
  }
  
  async getCompanyValuation(symbol: string): Promise<any> {
    const companyData = await this.getCompanyData(symbol);
    return companyData.valuation;
  }
  
  async searchCompanies(criteria: any): Promise<any[]> {
    // Get all available sectors
    const sectorsPath = path.join(this.stubsPath, 'sectors');
    const sectorFiles = fs.readdirSync(sectorsPath)
      .filter(f => f.endsWith('.json') && fs.statSync(path.join(sectorsPath, f)).size > 0);
    
    let allCompanies: any[] = [];
    
    // Collect companies from all sectors
    for (const sectorFile of sectorFiles) {
      const sectorData = JSON.parse(
        fs.readFileSync(path.join(sectorsPath, sectorFile), 'utf-8')
      );
      
      if (sectorData.companies) {
        for (const symbol of sectorData.companies) {
          try {
            const companyData = await this.getCompanyData(symbol);
            allCompanies.push(companyData);
          } catch (error) {
            // Skip if company file not found
          }
        }
      }
    }
    
    // Apply filters based on criteria
    return this.filterCompanies(allCompanies, criteria);
  }
  
  async compareCompanies(symbols: string[]): Promise<any> {
    const companies = await Promise.all(
      symbols.map(symbol => this.getCompanyData(symbol))
    );
    
    return {
      companies,
      comparison: this.generateComparison(companies)
    };
  }
  
  private normalizeSectorName(sector: string): string {
    // Convert "IT Services" to "it-services"
    return sector.toLowerCase().replace(/\s+/g, '-');
  }
  
  private filterCompanies(companies: any[], criteria: any): any[] {
    let filtered = companies;
    
    if (criteria.sector) {
      filtered = filtered.filter(c => c.sector === criteria.sector);
    }
    
    if (criteria.minROE) {
      filtered = filtered.filter(c => 
        c.ratios?.FY24?.roe && c.ratios.FY24.roe >= criteria.minROE
      );
    }
    
    if (criteria.maxPE) {
      filtered = filtered.filter(c => 
        c.valuation?.peRatio && c.valuation.peRatio <= criteria.maxPE
      );
    }
    
    if (criteria.minMarketCap) {
      filtered = filtered.filter(c => 
        c.valuation?.marketCap && c.valuation.marketCap >= criteria.minMarketCap
      );
    }
    
    if (criteria.classification) {
      filtered = filtered.filter(c => c.classification === criteria.classification);
    }
    
    return filtered;
  }
  
  private generateComparison(companies: any[]): any {
    return {
      count: companies.length,
      metrics: {
        avgPE: this.average(companies.map(c => c.valuation?.peRatio)),
        avgROE: this.average(companies.map(c => c.ratios?.FY24?.roe)),
        avgMargin: this.average(companies.map(c => c.ratios?.FY24?.netMargin))
      }
    };
  }
  
  private average(values: (number | undefined)[]): number {
    const valid = values.filter(v => v !== undefined) as number[];
    return valid.length > 0 
      ? valid.reduce((a, b) => a + b, 0) / valid.length 
      : 0;
  }
}
