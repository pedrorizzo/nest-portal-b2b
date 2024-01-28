import { Controller, Get, Param } from '@nestjs/common';
import { ClientServiceContract } from './contract/client-service-contract';
import { FindClientResponseDto } from './contract/dto/response/find-client.response';
import { FindClientRequestDto } from './contract/dto/request/find-client.request';
import { ApiResponse } from '@nestjs/swagger';

@Controller('/client')
export class ClientController {
  constructor(private clientService: ClientServiceContract) {}

  @Get(':id')
  @ApiResponse({ type: FindClientResponseDto })
  async findClientById(
    @Param() request: FindClientRequestDto,
  ): Promise<FindClientResponseDto> {
    return this.clientService.findClient(request);
  }
}
