import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { extname } from 'path';
import { MulterModule } from '@nestjs/platform-express';
import Users from './modules/user/user.entity';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import Siswa from './modules/siswa/siswa.entity';
import { SiswaModule } from './modules/siswa/siswa.module';
import { UploadController } from './modules/upload_data/upload.controller';
import { diskStorage } from 'multer';
import { NilaiModule } from './modules/nilai/nilai.module';
import Nilai from './modules/nilai/nilai.entity';
import Websites from './modules/website/website.entity';
import { WebsiteModule } from './modules/website/website.module';

@Module({
  imports: [
    MulterModule.register({
      storage: diskStorage({
        destination: './uploads',
        filename: (req: any, file: any, cb: any) => {
          const randomName = Array(32)
            .fill(null)
            .map(() => (Math.round(Math.random() * 16)).toString(16))
            .join('');
          const fileExt = extname(file.originalname);
          return cb(null, `${randomName}${fileExt}`);
        },
      }),
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.MYSQL_HOST || 'localhost',
      port: parseInt(process.env.MYSQL_PORT,10) || 3306,
      username: 'root',
      password: process.env.MYSQL_PASSWORD || '',
      database: process.env.MYSQL_DATABASE || 'db_sistem_ppdb',
      synchronize: true,
      entities: [
        Users,
        Siswa,
        Nilai,
        Websites
      ],
    }),
    AuthModule,
    UserModule,
    SiswaModule,
    NilaiModule,
    WebsiteModule
  ],
  controllers: [UploadController],
  // providers: [CloudinaryService],
})
export class AppModule { }
