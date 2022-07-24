import { createContext, useState } from "react";
import { store, dir } from "../storage";

interface Upload {
  error?: {
    status: string;
    update: (err: string) => void;
  };
  success?: {
    status: boolean;
    update: (err: boolean) => void;
  };
  loading?: {
    status: number;
    update: (err: number) => void;
  };
}

interface Login {
    name?: string,
    contract?: string,
    data?: {
      main: any,
      table?: string
    },
    update?: (state: [string, string, {main: string, table?: string}]) => void
}

interface Files { 
    fileList?: (dir | store)[]
    update?: (files: (dir | store)[]) => void,
    directory?: {
        value: boolean,
        update: (state: boolean) => void
    }
}

export interface gCon{
        upload: Upload,
        files: Files,
        login: Login
}

export const GenContext = createContext<gCon>({
    upload: {},
    files: {},
    login: {}
});


export const GenProvider = ({children}: {children: JSX.Element}) => {

    const [uploadError, updateError] = useState<string>('');
    const [ndirectory, updateDirectory] = useState<boolean>(false)
    const [isUploading, updateUploading] = useState<number>(0);

    const [uploadSuccess, updateUploadSuccess] = useState<boolean>(false);

    const [dirFiles, updateFiles] = useState<(dir | store)[]>([]);

    const [log, updLog] = useState<[string, string, {main: string, table?: string}]>(['','', {main: ''}]);

    return (
      <GenContext.Provider
        value={{
          upload: {
            error: {
              status: uploadError,
              update: (err: string) => updateError(err),
            },
            success: {
              status: uploadSuccess,
              update: (state: boolean) => updateUploadSuccess(state),
            },
            loading: {
              status: isUploading,
              update: (state: number) => updateUploading(state),
            },
          },
          files: {
            fileList: dirFiles,
            update: (files:(dir | store)[]) => updateFiles(files),
            directory: {
                value: ndirectory,
                update: (state: boolean) => updateDirectory(state)
            }
        },
        login: {
          name: log[0],
          contract: log[1],
          data: log[2],
          update: (state: [string, string, {main: string, table?: string}]) => updLog(state)
        } 
      }}
      >
        {children}
      </GenContext.Provider>
    );
}