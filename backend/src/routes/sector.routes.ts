import { Router, Request, Response } from 'express';
import { getDataService } from '../services/data/data.factory';

const router = Router();
const dataService = getDataService();

/**
 * GET /api/sectors
 * Get list of available sectors
 */
router.get('/', async (req: Request, res: Response) => {
  try {
    // Return hardcoded list of available sectors
    // In production, this would query database or API
    const sectors = [
      { 
        id: 'it-services',
        name: 'IT Services',
        subSectors: ['Software Products & Services']
      },
      { 
        id: 'banking',
        name: 'Banking',
        subSectors: ['Private Sector Banks', 'Public Sector Banks']
      },
      {
        id: 'pharma',
        name: 'Pharmaceuticals',
        subSectors: []
      },
      {
        id: 'automobiles',
        name: 'Automobiles',
        subSectors: []
      },
      {
        id: 'fmcg',
        name: 'FMCG',
        subSectors: []
      }
    ];
    
    res.json({ sectors });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * GET /api/sectors/:sectorId
 * Get detailed sector overview
 */
router.get('/:sectorId', async (req: Request, res: Response) => {
  try {
    const { sectorId } = req.params;
    const { subSector } = req.query;
    
    const sectorData = await dataService.getSectorOverview(
      sectorId,
      subSector as string | undefined
    );
    
    res.json(sectorData);
  } catch (error: any) {
    res.status(404).json({ error: error.message });
  }
});

/**
 * GET /api/sectors/:sectorId/companies
 * Get companies in a sector
 */
router.get('/:sectorId/companies', async (req: Request, res: Response) => {
  try {
    const { sectorId } = req.params;
    const { subSector } = req.query;
    
    const companies = await dataService.getSectorCompanies(
      sectorId,
      subSector as string | undefined
    );
    
    res.json({ companies });
  } catch (error: any) {
    res.status(404).json({ error: error.message });
  }
});

export default router;
