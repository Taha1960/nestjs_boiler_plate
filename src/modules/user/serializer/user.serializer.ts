import { Exclude, Expose, plainToInstance } from 'class-transformer';
import { ModelSerializer } from 'src/common/serializer/model.serializer';

// Handles user data serialization for API responses
export class UserSerializer extends ModelSerializer {
  // User's full name
  @Expose()
  firstName: string;

  @Expose()
  lastName: string;

  @Expose()
  middleName: string;

  @Expose()
  email: string;

  @Expose()
  bvn: string

  @Expose()
  nin: string

  @Expose()
  updatedAt: Date;
}
