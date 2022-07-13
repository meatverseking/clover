import { createContext, useState } from "react";

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

export interface gCon{
        upload: Upload
}

export const GenContext = createContext<gCon>({
    upload: {}
});

export const GenProvider = ({children}: {children: JSX.Element}) => {

    const [uploadError, updateError] = useState<string>('');

    const [isUploading, updateUploading] = useState<number>(0);

    const [uploadSuccess, updateUploadSuccess] = useState<boolean>(false);

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
        }}
      >
        {children}
      </GenContext.Provider>
    );
}