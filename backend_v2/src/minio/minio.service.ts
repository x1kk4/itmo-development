import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as Minio from 'minio';
import { AppConfig } from 'src/config';

@Injectable()
export class MinioService {
  private minioClient: Minio.Client;
  private bucketName: string;
  private endpoint: string;

  constructor(private readonly configService: ConfigService<AppConfig>) {
    const minioConfig = this.configService.get('minio', { infer: true });

    this.minioClient = new Minio.Client({
      endPoint: minioConfig.endpoint,
      accessKey: minioConfig.access_key,
      secretKey: minioConfig.secret_key,
      useSSL: minioConfig.ssl,
    });

    this.bucketName = minioConfig.bucket;
    this.endpoint = minioConfig.endpoint;
  }

  async createBucketIfNotExists() {
    const bucketExists = await this.minioClient.bucketExists(this.bucketName);
    if (!bucketExists) {
      await this.minioClient.makeBucket(this.bucketName);
      await this.setBucketPublicPolicy();
    }
  }

  private async setBucketPublicPolicy() {
    const policy = {
      Version: '2012-10-17',
      Statement: [
        {
          Effect: 'Allow',
          Principal: '*',
          Action: ['s3:GetObject'],
          Resource: [`arn:aws:s3:::${this.bucketName}/*`],
        },
      ],
    };

    await this.minioClient.setBucketPolicy(
      this.bucketName,
      JSON.stringify(policy),
    );
  }

  async uploadFile(file: Express.Multer.File) {
    const fileName = `${Date.now()}-${file.originalname}`;

    await this.minioClient.putObject(
      this.bucketName,
      fileName,
      file.buffer,
      file.size,
      {
        'Content-Type': file.mimetype,
        'Cache-Control': 'max-age=31536000',
      },
    );

    return this.getFileUrl(fileName);
  }

  getFileUrl(fileName: string) {
    return `https://${this.endpoint}/${this.bucketName}/${fileName}`;
  }

  async deleteFile(fileName: string) {
    await this.minioClient.removeObject(this.bucketName, fileName);
  }
}
