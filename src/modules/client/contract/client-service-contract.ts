import { CreateClientRequestDto } from './dto/request/create-client.request';
import { FindClientRequestDto } from './dto/request/find-client.request';
import { CreateClientResponseDto } from './dto/response/create-client.response';
import { FindClientResponseDto } from './dto/response/find-client.response';

export abstract class ClientServiceContract {
  findClient: (oarams: FindClientRequestDto) => Promise<FindClientResponseDto>;
  createClient: (
    params: CreateClientRequestDto,
  ) => Promise<CreateClientResponseDto>;
}
