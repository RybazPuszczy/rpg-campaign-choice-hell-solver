// Source - https://stackoverflow.com/a/79637950
// Posted by Jasperan
// Retrieved 2026-10-06, License - CC BY-SA 4.0

'use client';

import { PropsWithChildren, createContext, useContext, useEffect, useState } from 'react';
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from './tooltip';
import { Popover, PopoverTrigger, PopoverContent } from './popover';
import { TooltipPopupProps, TooltipRootProps, TooltipProviderProps, TooltipTriggerProps, TooltipPositionerProps } from '@base-ui/react/tooltip';
import { PopoverPopupProps, PopoverPositionerProps, PopoverRootProps, PopoverTriggerProps } from '@base-ui/react/popover';

const TouchContext = createContext<boolean | undefined>(undefined);
const useTouch = () => useContext(TouchContext);

const TouchProvider = (props: PropsWithChildren) => {
  const [isTouch, setTouch] = useState<boolean>();

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setTouch(window.matchMedia('(pointer: coarse)').matches);
  }, []);

  return <TouchContext.Provider value={isTouch} {...props} />;
};

const HybridTooltipProvider = (props: TooltipProviderProps) => {
  return <TooltipProvider delay={0} {...props} />
}

const HybridTooltip = (props: TooltipRootProps & PopoverRootProps) => {
  const isTouch = useTouch();

  return isTouch ? <Popover {...props} /> : <Tooltip {...props} />;
};

const HybridTooltipTrigger = (props: TooltipTriggerProps & PopoverTriggerProps & {nativebutton : "true" | "false"}) => {
  const isTouch = useTouch();
    
  return isTouch ? <PopoverTrigger {...props} /> : <TooltipTrigger {...props} />;
};

HybridTooltipTrigger.defaultProps = { nativebutton: "true"}

const HybridTooltipContent = (props: TooltipPopupProps & Pick<TooltipPositionerProps,"align" | "alignOffset" | "side" | "sideOffset"> & PopoverPopupProps & Pick<PopoverPositionerProps,"align" | "alignOffset" | "side" | "sideOffset"> ) => {
  const isTouch = useTouch();

  return isTouch ? <PopoverContent {...props} /> : <TooltipContent {...props} />;
};

export { TouchProvider, HybridTooltipProvider, HybridTooltip, HybridTooltipTrigger, HybridTooltipContent }
