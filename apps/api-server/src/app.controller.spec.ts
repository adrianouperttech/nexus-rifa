import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should send HTML status page', () => {
      const send = jest.fn();
      const res = {
        contentType: jest.fn().mockReturnThis(),
        send,
      } as any;

      appController.getHello(res);

      expect(res.contentType).toHaveBeenCalledWith('text/html');
      expect(send).toHaveBeenCalledWith(expect.stringContaining('<html'));
    });
  });
});
