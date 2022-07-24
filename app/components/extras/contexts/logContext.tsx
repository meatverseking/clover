import { createContext, useState } from "react";

interface Login {
  data: any;
  update?: (state: any) => void;
}

export const LogContext = createContext<Login>({
    data: ''
});

export const LogProvider = ({ children }: { children: JSX.Element }) => {

  const [data, updData] = useState<any>(["", "", { main: "" }]);

  return (
    <LogContext.Provider value={{
        data: data,
        update: (state: any[]) => updData(state)
    }}>

      {children}

    </LogContext.Provider>
  );

};
