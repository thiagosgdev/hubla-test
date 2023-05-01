import MockDate from 'mockdate';
import { Test, TestingModule } from '@nestjs/testing';

import { GetAmountBySellerController } from './getAmountBySeller.controller';
import { GetAmountBySellerService } from './getAmountBySeller.service';
import { HttpException, NotFoundException } from '@nestjs/common';

const mockGetAmountBySellerService = {
  execute: jest.fn((dto) => 10000),
};

describe('Get Amount By Seller Controller', () => {
  let controller: GetAmountBySellerController;
  let service: GetAmountBySellerService;
  beforeEach(async () => {
    MockDate.set(new Date());

    const module: TestingModule = await Test.createTestingModule({
      controllers: [GetAmountBySellerController],
      providers: [GetAmountBySellerService],
    })
      .overrideProvider(GetAmountBySellerService)
      .useValue(mockGetAmountBySellerService)
      .compile();

    controller = module.get<GetAmountBySellerController>(
      GetAmountBySellerController,
    );
    service = module.get<GetAmountBySellerService>(GetAmountBySellerService);
  });
  it('Should call the service with the correct values', async () => {
    const loginSpy = jest.spyOn(service, 'execute');
    await controller.handle('any_user_id');
    expect(loginSpy).toHaveBeenCalledWith('any_user_id');
  });

  it('Should return the amount on service success', async () => {
    const response = await controller.handle('any_user_id');
    expect(response).toEqual(10000);
  });

  it('Should throw if the service throws', async () => {
    jest
      .spyOn(service, 'execute')
      .mockReturnValueOnce(Promise.reject(new NotFoundException()));
    const error = controller.handle('not_found_id');
    await expect(error).rejects.toBeInstanceOf(HttpException);
  });
});
