import { Router, Request, Response } from 'express';
import { getDataService } from '../services/data/data.factory';

const router = Router();
const dataService = getDataService();

/**
 * GET /api/companies/:symbol
 * Get complete company data
 */
router.get('/:symbol', async (req: Request, res: Response) => {
  try {
    const { symbol } = req.params;
    const companyData = await dataService.getCompanyData(symbol);
    
    res.json(companyData);
  } catch (error: any) {
    res.status(404).json({ error: error.message });
  }
});

/**
 * GET /api/companies/:symbol/financials
 * Get company financials
 */
router.get('/:symbol/financials', async (req: Request, res: Response) => {
  try {
    const { symbol } = req.params;
    const financials = await dataService.getCompanyFinancials(symbol);
    
    res.json(financials);
  } catch (error: any) {
    res.status(404).json({ error: error.message });
  }
});

/**
 * GET /api/companies/:symbol/ratios
 * Get company ratios
 */
router.get('/:symbol/ratios', async (req: Request, res: Response) => {
  try {
    const { symbol } = req.params;
    const ratios = await dataService.getCompanyRatios(symbol);
    
    res.json(ratios);
  } catch (error: any) {
    res.status(404).json({ error: error.message });
  }
});

/**
 * GET /api/companies/:symbol/valuation
 * Get company valuation
 */
router.get('/:symbol/valuation', async (req: Request, res: Response) => {
  try {
    const { symbol } = req.params;
    const valuation = await dataService.getCompanyValuation(symbol);
    
    res.json(valuation);
  } catch (error: any) {
    res.status(404).json({ error: error.message });
  }
});

/**
 * POST /api/companies/search
 * Search companies by criteria
 */
router.post('/search', async (req: Request, res: Response) => {
  try {
    const criteria = req.body;
    const companies = await dataService.searchCompanies(criteria);
    
    res.json({ companies, count: companies.length });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * POST /api/companies/compare
 * Compare multiple companies
 */
router.post('/compare', async (req: Request, res: Response) => {
  try {
    const { symbols } = req.body;
    
    if (!Array.isArray(symbols) || symbols.length === 0) {
      return res.status(400).json({ error: 'symbols array required' });
    }
    
    const comparison = await dataService.compareCompanies(symbols);
    
    res.json(comparison);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
