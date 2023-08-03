import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ExceptionDto {
  @ApiProperty({ example: 400 })
  statusCode: number;

  @ApiProperty({ example: 'Reponse Message' })
  message: string;

  @ApiPropertyOptional({ example: 'Error Message' })
  error?: string;
}
