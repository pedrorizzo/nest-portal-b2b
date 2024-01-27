import { FindClientRequestDto } from './dto/request/find-client.request';
import { FindClientResponseDto } from './dto/response/find-client.response';

export abstract class ClientServiceContract {
  findClient: (oarams: FindClientRequestDto) => Promise<FindClientResponseDto>;
}
