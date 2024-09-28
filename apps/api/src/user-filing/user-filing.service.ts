import { BadRequestException, Injectable } from '@nestjs/common';
import { UserService } from '../user_/user.service';
import { FilingService } from '../filing/filing.service';
import { validate as isUUID } from 'uuid';
import { Repository } from 'typeorm';
import { UserFiling } from '../entities/userFiling.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UserFilingDTO } from './user-filing.dto';
import { Filing } from '../entities/filing.entity';

@Injectable()
export class UserFilingService {
  constructor(
    @InjectRepository(UserFiling)
    private readonly userFilingRepository: Repository<UserFiling>,
    private readonly userService: UserService,
    private readonly filingService: FilingService,
  ) {}

  async findUserFilingOrderByLastOpen(
    userId: string,
    limit?: number,
  ): Promise<UserFilingDTO[]> {
    // if (!isUUID(userId)) {
    //   throw new BadRequestException('Id is not in UUID format');
    // }

    const userFilings = await this.userFilingRepository
      .createQueryBuilder('userFiling')
      .innerJoinAndSelect('userFiling.filing', 'filing')
      .where('userFiling.userId = :userId', { userId })
      .orderBy('userFiling.lastOpen', 'DESC')
      .limit(limit || 20)
      .getMany();

    const userFilingsDTOs = userFilings.map((userFiling) => {
      const userFilingDTO = new UserFilingDTO();
      userFilingDTO.userId = userFiling.filing.userId;
      userFilingDTO.lastOpen = userFiling.lastOpen;
      userFilingDTO.filing = userFiling.filing;

      return userFilingDTO;
    });

    return userFilingsDTOs;
  }

  async userOpenFiling(userId: string, filingId: string): Promise<UserFiling> {
    if (!isUUID(userId) || !isUUID(filingId)) {
      throw new BadRequestException('Id is not in UUID format');
    }

    const foundUser = await this.userService.findByUserID(userId);
    if (!foundUser) {
      throw new BadRequestException('User not found');
    }

    const foundFiling = await this.filingService.findByFilingID(filingId);
    if (!foundFiling) {
      throw new BadRequestException('Filing not found');
    }

    const preparedUserFiling: UserFiling = {
      user: foundUser,
      filing: foundFiling,
      lastOpen: new Date(),
    };

    return await this.userFilingRepository.save(preparedUserFiling);
  }
}
