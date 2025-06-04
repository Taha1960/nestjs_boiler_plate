import { Exclude, Expose, plainToInstance } from 'class-transformer';
import { ModelSerializer } from 'src/common/serializer/model.serializer';

// Handles user data serialization for API responses
export class ClientSerializer extends ModelSerializer {
  @Expose()
  name: string;

  @Expose()
  updated_at: Date;
}
