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
        files: Files
}

export const GenContext = createContext<gCon>({
    upload: {},
    files: {},
});


export const GenProvider = ({children}: {children: JSX.Element}) => {

    const [uploadError, updateError] = useState<string>('');
    const [ndirectory, updateDirectory] = useState<boolean>(false)
    const [isUploading, updateUploading] = useState<number>(0);

    const [uploadSuccess, updateUploadSuccess] = useState<boolean>(false);

    const [dirFiles, updateFiles] = useState<(dir | store)[]>([]);

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
            update: (files: (dir | store)[]) => updateFiles(files),
            directory: {
              value: ndirectory,
              update: (state: boolean) => updateDirectory(state),
            },
          }
        }}
      >
        {children}
      </GenContext.Provider>
    );
}