
export const getSize = (size: number) => {

    const format = (_size: number, subsize:number, type: string): string => {
        return (_size / subsize).toFixed(2) + type;
    }

    if(size > 1048576)
        return format(size, 1048576, 'TB');
    else if (size > 1024) 
          return format(size, 1024, "GB");
    else if(size > 1)
          return format(size, 1, 'MB');
    else if(size > 0.000977)
          return format(size, 0.000977, 'KB');
    else if (size > 0.000000977) 
          return format(size, 0.000000977, 'B');
  }



  