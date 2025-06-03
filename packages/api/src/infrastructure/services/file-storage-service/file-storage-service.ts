export interface FileStorageService {
  upload(input: FileStorageService.Upload.Input): Promise<FileStorageService.Upload.Output>;
  getFileDownloadUrl(
    input: FileStorageService.GetFileDownloadUrl.Input
  ): Promise<FileStorageService.GetFileDownloadUrl.Output>;
}

export const FileStorageService = Symbol('FileStorageService');

export namespace FileStorageService {
  export interface FileInfo {
    key: string;
    bucket: string;
    contentType: string;
  }

  export namespace Upload {
    export interface Input {
      content: string | Buffer;
      contentType: string;
      extension: string;
    }

    export interface Output {
      fileInfo: FileInfo;
    }
  }

  export namespace GetFileDownloadUrl {
    export interface Input {
      fileInfo: Omit<FileInfo, 'contentType'>;
    }

    export interface Output {
      url: string;
    }
  }
}
