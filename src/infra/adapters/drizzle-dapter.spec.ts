import { Test, TestingModule } from '@nestjs/testing';
import { DrizzleOrmAdapter } from '../adapters/drizzle-orm-adapter';
import { RentalSchema } from '../persistence/rental-schema';
import { Rental } from '../../core/domain/rental/entitiy/rental';

describe('DrizzleOrmAdapter', () => {
  let adapter: DrizzleOrmAdapter;
  
  const mockDb = {
    insert: jest.fn().mockReturnThis(),
    values: jest.fn().mockReturnThis(),
    select: jest.fn().mockReturnThis(),
    update: jest.fn().mockReturnThis(),
    set: jest.fn().mockReturnThis(),
    from: jest.fn().mockReturnThis(),
    delete: jest.fn().mockReturnThis(),
    where: jest.fn().mockReturnThis(),
    limit: jest.fn().mockReturnThis(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DrizzleOrmAdapter,
        {
          provide: 'DRIZZLE_CONNECTION', 
          useValue: mockDb,
        },
      ],
    }).compile();

    adapter = module.get<DrizzleOrmAdapter>(DrizzleOrmAdapter);
    jest.clearAllMocks();
  });


  describe('save()', () => {
    it('should return true when the rental is successfully saved', async () => {
      const mockData = { clientFirstName: 'Vini', clientLastName: 'Code', startDate: new Date(), endDate: new Date(), revenue: 1000 };
      mockDb.values.mockResolvedValueOnce({ rowCount: 1 });

      const result = await adapter.save(mockData as any);
      expect(result).toBe(true);
    });

    it('should return false when no rows are affected', async () => {
      // Covers the "if (operationResult.rowCount===0)" branch
      mockDb.values.mockResolvedValueOnce({ rowCount: 0 });
      const result = await adapter.save({ startDate: new Date(), endDate: new Date() } as any);
      expect(result).toBe(false);
    });
  });

  describe('delete()', () => {
    it('should return true if a row was deleted', async () => {
      mockDb.where.mockResolvedValueOnce({ rowCount: 1 });
      const result = await adapter.delete('some-id');
      expect(result).toBe(true);
    });

    it('should return false if no rows were deleted', async () => {
      // Covers the "if (operationResult.rowCount===0)" branch in delete
      mockDb.where.mockResolvedValueOnce({ rowCount: 0 });
      const result = await adapter.delete('some-id');
      expect(result).toBe(false);
    });
  });

  describe('getAll()', () => {
    it('should return a list of mapped Rental entities', async () => {
      const mockRows = [{ 
        id: '1', clientFirstName: 'Vini', clientLastName: 'Code', 
        startDate: new Date().toISOString(), endDate: new Date().toISOString(), 
        revenue: 100, createdAt: new Date().toISOString() 
      }];
      mockDb.from.mockResolvedValueOnce(mockRows);

      const result = await adapter.getAll();
      expect(result[0]).toBeInstanceOf(Rental);
      expect(result).toHaveLength(1);
    });
  });

  describe('findOne()', () => {
    const start = new Date();
    const end = new Date();

    it('should return a Rental instance if found', async () => {
      mockDb.where.mockResolvedValueOnce([{ 
        clientFirstName: 'Vini', clientLastName: 'Code', 
        startDate: start.toISOString(), endDate: end.toISOString(), 
        revenue: 100, id: '1', createdAt: new Date() 
      }]);

      const result = await adapter.findOne(start, end);
      expect(result).toBeInstanceOf(Rental);
    });

    it('should return null if no rental is found', async () => {
      // Covers "if (rental == null) return rental"
      mockDb.where.mockResolvedValueOnce([]);
      const result = await adapter.findOne(start, end);
      expect(result).toBeNull();
    });
  });

  describe('checkOverlapDate()', () => {
    it('should return true if overlap exists', async () => {
      // Covers overlap.length > 0 (true case)
      mockDb.limit.mockResolvedValueOnce([{ id: '1' }]);
      const result = await adapter.checkOverlapDate(new Date(), new Date());
      expect(result).toBe(true);
    });

    it('should return false if no overlap exists', async () => {
      // Covers overlap.length > 0 (false case)
      mockDb.limit.mockResolvedValueOnce([]);
      const result = await adapter.checkOverlapDate(new Date(), new Date());
      expect(result).toBe(false);
    });
  });

  describe('update()', () => {
    const updateData = { clientFirstName: 'New Name' };

    it('should return true when the update is successful', async () => {
      // Setup: Mock a successful update (1 row affected)
      mockDb.where.mockResolvedValueOnce({ rowCount: 1 });

      const result = await adapter.update('existing-id', updateData);

      expect(result).toBe(true);
      expect(mockDb.update).toHaveBeenCalledWith(RentalSchema);
      expect(mockDb.set).toHaveBeenCalledWith(updateData);
    });

    it('should return false when the record to update is not found', async () => {
      // Setup: Mock 0 rows affected
      mockDb.where.mockResolvedValueOnce({ rowCount: 0 });

      const result = await adapter.update('non-existent-id', updateData);

      expect(result).toBe(false);
    });
  });
});