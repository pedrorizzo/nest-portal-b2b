import { Controller, Get, Param } from '@nestjs/common';
import { ClientServiceContract } from './contract/client-service-contract';
import { FindClientResponseDto } from './contract/dto/response/find-client.response';
import { FindClientRequestDto } from './contract/dto/request/find-client.request';
import { FindClientByIdPipe } from './pipes/find-client-by-id.pipe';

@Controller('/client')
export class ClientController {
  constructor(private clientService: ClientServiceContract) {}

  @Get(':id')
  async findClientById(
    @Param(FindClientByIdPipe) request: FindClientRequestDto,
  ): Promise<FindClientResponseDto> {
    return this.clientService.findClient(request);
  }
}
